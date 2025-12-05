<?php
// public/api/get_project.php

require_once 'db_connect_ourwork.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $id = $_GET['id'] ?? null;

    if (!$id) {
        throw new Exception('Project ID is required');
    }

    $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
    $stmt->execute([$id]);
    $project = $stmt->fetch();

    if (!$project) {
        http_response_code(404);
        echo json_encode(['error' => 'Project not found']);
        exit;
    }

    // Fetch media files
    $mediaStmt = $pdo->prepare("SELECT * FROM project_media WHERE project_id = ? ORDER BY display_order ASC");
    $mediaStmt->execute([$id]);
    $project['media'] = $mediaStmt->fetchAll();

    echo json_encode($project);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
