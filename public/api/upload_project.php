<?php
// public/api/upload_project.php

require_once 'db_connect_ourwork.php';
require_once 'auth_check.php';
require_auth();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $id = $_POST['id'] ?? null;
    $title = $_POST['title'] ?? '';
    $title_nl = $_POST['title_nl'] ?? '';
    $description = $_POST['description'] ?? '';
    $description_nl = $_POST['description_nl'] ?? '';
    $content_en = $_POST['content_en'] ?? '';
    $content_nl = $_POST['content_nl'] ?? '';
    $title_fr = $_POST['title_fr'] ?? '';
    $description_fr = $_POST['description_fr'] ?? '';
    $content_fr = $_POST['content_fr'] ?? '';

    // Fallback: If English title is missing but other language title exists, use that as the main identifier
    if (empty($title)) {
        if (!empty($title_nl)) {
            $title = $title_nl;
        } elseif (!empty($title_fr)) {
            $title = $title_fr;
        }
    }

    if (empty($title)) {
        throw new Exception('Title is required (please provide a title in at least one language)');
    }

    // Handle main image (backward compatibility or thumbnail)
    $imageUrl = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        if ($_FILES['image']['size'] > 10 * 1024 * 1024) {
            throw new Exception('Main image too large. Maximum size is 10MB.');
        }
        $uploadDir = '../uploads/projects/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $fileExtension = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($fileExtension, $allowedExtensions)) {
            throw new Exception('Invalid file type for main image. Only JPG, PNG, and WEBP are allowed.');
        }

        $fileName = uniqid('project_') . '.' . $fileExtension;
        $uploadPath = $uploadDir . $fileName;

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            throw new Exception('Failed to move uploaded file');
        }

        $imageUrl = '/uploads/projects/' . $fileName;
    }

    // Handle multiple media files
    $uploadedMedia = [];
    if (isset($_FILES['media'])) {
        $mediaFiles = $_FILES['media'];
        $count = count($mediaFiles['name']);
        
        // Validate counts (separate limits for images and videos)
        $imageCount = 0;
        $videoCount = 0;
        $allowedImageExts = ['jpg', 'jpeg', 'png', 'webp'];
        $allowedVideoExts = ['mp4', 'webm'];

        for ($i = 0; $i < $count; $i++) {
            if ($mediaFiles['error'][$i] === UPLOAD_ERR_OK) {
                $ext = strtolower(pathinfo($mediaFiles['name'][$i], PATHINFO_EXTENSION));
                $isImage = in_array($ext, $allowedImageExts);
                $isVideo = in_array($ext, $allowedVideoExts);
                
                $maxSize = $isImage ? (10 * 1024 * 1024) : (250 * 1024 * 1024); // 10MB for images, 250MB for videos
                $maxSizeLabel = $isImage ? '10MB' : '250MB';

                if ($mediaFiles['size'][$i] > $maxSize) {
                    throw new Exception("File '{$mediaFiles['name'][$i]}' is too large. Maximum size for this type is {$maxSizeLabel}.");
                }
                
                if ($isImage) {
                    $imageCount++;
                } elseif ($isVideo) {
                    $videoCount++;
                }
            }
        }
        
        if ($imageCount > 10) {
            throw new Exception("Maximum 10 images allowed. You tried to upload $imageCount.");
        }
        if ($videoCount > 5) {
            throw new Exception("Maximum 5 videos allowed. You tried to upload $videoCount.");
        }

        $uploadDir = '../uploads/projects/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        for ($i = 0; $i < $count; $i++) {
            if ($mediaFiles['error'][$i] === UPLOAD_ERR_OK) {
                $fileExtension = strtolower(pathinfo($mediaFiles['name'][$i], PATHINFO_EXTENSION));
                $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'webm'];
                
                if (!in_array($fileExtension, $allowedExtensions)) {
                    continue; // Skip invalid files or throw error
                }

                $fileType = in_array($fileExtension, ['mp4', 'webm']) ? 'video' : 'image';
                $fileName = uniqid('media_') . '.' . $fileExtension;
                $uploadPath = $uploadDir . $fileName;

                if (move_uploaded_file($mediaFiles['tmp_name'][$i], $uploadPath)) {
                    $uploadedMedia[] = [
                        'path' => '/uploads/projects/' . $fileName,
                        'type' => $fileType
                    ];
                }
            }
        }
    }

    if ($id) {
    // Update existing project
        $sql = "UPDATE projects SET title = ?, title_nl = ?, title_fr = ?, description = ?, description_nl = ?, description_fr = ?, content_en = ?, content_nl = ?, content_fr = ?";
        $params = [$title, $title_nl, $title_fr, $description, $description_nl, $description_fr, $content_en, $content_nl, $content_fr];

        if ($imageUrl) {
            $sql .= ", image_url = ?";
            $params[] = $imageUrl;
        }

        $sql .= " WHERE id = ?";
        $params[] = $id;

        $stmt = $pdo_ourwork->prepare($sql);
        $stmt->execute($params);

        // Insert new media files
        if (!empty($uploadedMedia)) {
            $mediaStmt = $pdo_ourwork->prepare("INSERT INTO project_media (project_id, file_path, file_type, display_order) VALUES (?, ?, ?, ?)");
            foreach ($uploadedMedia as $index => $media) {
                $mediaStmt->execute([$id, $media['path'], $media['type'], $index]);
            }
        }

        echo json_encode(['success' => true, 'message' => 'Project updated successfully']);
    } else {
        // Create new project
        // If no main image provided but media exists, use first image as main image
        if (!$imageUrl && !empty($uploadedMedia)) {
            foreach ($uploadedMedia as $media) {
                if ($media['type'] === 'image') {
                    $imageUrl = $media['path'];
                    break;
                }
            }
        }

        if (!$imageUrl) {
            // If no image is available at all (e.g. they only uploaded a video), use a fallback generic placeholder
            // This prevents the SQLSTATE[23000] Column 'image_url' cannot be null crash.
            $imageUrl = '/uploads/projects/default-video-placeholder.png'; 
        }

        $stmt = $pdo_ourwork->prepare("INSERT INTO projects (title, title_nl, title_fr, description, description_nl, description_fr, content_en, content_nl, content_fr, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $title_nl, $title_fr, $description, $description_nl, $description_fr, $content_en, $content_nl, $content_fr, $imageUrl]);
        $newProjectId = $pdo_ourwork->lastInsertId();

        // Insert media files
        if (!empty($uploadedMedia)) {
            $mediaStmt = $pdo_ourwork->prepare("INSERT INTO project_media (project_id, file_path, file_type, display_order) VALUES (?, ?, ?, ?)");
            foreach ($uploadedMedia as $index => $media) {
                $mediaStmt->execute([$newProjectId, $media['path'], $media['type'], $index]);
            }
        }

        echo json_encode(['success' => true, 'message' => 'Project uploaded successfully']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
