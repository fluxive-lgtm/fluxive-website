<?php
// public/api/upload_homepage_ad.php

require_once 'auth_check.php';
require_once 'db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Verify Authorization
require_auth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("No file uploaded or upload error occurred. Error Code: " . ($_FILES['file']['error'] ?? 'Unknown'));
    }

    $file = $_FILES['file'];
    
    // File validation
    $fileName = basename($file['name']);
    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    $isImage = in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif']);
    $isVideo = in_array($ext, ['mp4', 'webm', 'mov']);

    if (!$isImage && !$isVideo) {
        throw new Exception("Invalid file type '$ext'. Allowed: JPG, PNG, WEBP, GIF, MP4, WEBM, MOV.");
    }

    $maxSize = $isImage ? (10 * 1024 * 1024) : (100 * 1024 * 1024); // 10MB images, 100MB videos
    $maxSizeLabel = $isImage ? '10MB' : '100MB';

    if ($file['size'] > $maxSize) {
        throw new Exception("File is too large. Maximum size for this type is {$maxSizeLabel}.");
    }

    // Directory creation
    $uploadDir = '../uploads/ads/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            throw new Exception("Failed to create upload directory.");
        }
    }

    // File moving
    $newFileName = uniqid() . '_' . preg_replace("/[^a-zA-Z0-9.\-_]/", "", $fileName);
    $targetPath = $uploadDir . $newFileName;
    $publicPath = '/uploads/ads/' . $newFileName;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new Exception("Failed to move uploaded file to destination.");
    }

    // Determine type for database
    $mediaType = $isVideo ? 'video' : 'image';

    // Update database (since it's a settings table, there's only 1 row)
    $stmt = $pdo->prepare("UPDATE homepage_settings SET ad_media_url = ?, ad_media_type = ? WHERE id = 1");
    $stmt->execute([$publicPath, $mediaType]);

    // Also checking if id=1 exists, if not, insert (fallback)
    if ($stmt->rowCount() === 0) {
        $checkStmt = $pdo->query("SELECT COUNT(*) FROM homepage_settings WHERE id = 1");
        if ($checkStmt->fetchColumn() == 0) {
            $insert = $pdo->prepare("INSERT INTO homepage_settings (id, ad_media_url, ad_media_type) VALUES (1, ?, ?)");
            $insert->execute([$publicPath, $mediaType]);
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Ad uploaded successfully',
        'media_url' => $publicPath,
        'media_type' => $mediaType
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
