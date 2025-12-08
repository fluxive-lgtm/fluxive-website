<?php
// public/api/upload_content_image.php

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
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Image upload failed');
    }

    // Check file size (max 10MB)
    if ($_FILES['image']['size'] > 10 * 1024 * 1024) {
        throw new Exception('Image too large. Maximum size is 10MB.');
    }

    $uploadDir = '../uploads/content/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $fileExtension = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    if (!in_array($fileExtension, $allowedExtensions)) {
        throw new Exception('Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.');
    }

    $fileName = uniqid('content_') . '.' . $fileExtension;
    $uploadPath = $uploadDir . $fileName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
        throw new Exception('Failed to move uploaded file');
    }

    $imageUrl = '/uploads/content/' . $fileName;

    echo json_encode(['success' => true, 'url' => $imageUrl]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
