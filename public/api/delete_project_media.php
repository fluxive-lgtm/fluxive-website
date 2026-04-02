<?php
// public/api/delete_project_media.php
require_once 'auth_check.php';
require_once 'db_connect_ourwork.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_auth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['project_id']) || !isset($data['media_path'])) {
        throw new Exception("Missing project_id or media_path parameter");
    }

    $projectId = $data['project_id'];
    $mediaPath = $data['media_path'];

    // Delete from project_media table
    $stmt = $pdo_ourwork->prepare("DELETE FROM project_media WHERE project_id = ? AND file_path = ?");
    $stmt->execute([$projectId, $mediaPath]);

    if ($stmt->rowCount() > 0) {
        // Attempt to delete physical file
        $physicalPath = '..' . $mediaPath;
        if (file_exists($physicalPath)) {
            unlink($physicalPath);
        }
    }

    echo json_encode(['success' => true, 'message' => 'Media deleted successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete media: ' . $e->getMessage()]);
}
?>
