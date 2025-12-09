<?php
// public/api/get_projects.php

require_once 'db_connect_ourwork.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $stmt = $pdo->query("SELECT * FROM projects ORDER BY created_at DESC");
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch media for each project
    foreach ($projects as &$project) {
        $stmtMedia = $pdo->prepare("SELECT file_path as path, file_type as type FROM project_media WHERE project_id = ? ORDER BY display_order ASC");
        $stmtMedia->execute([$project['id']]);
        $project['media'] = $stmtMedia->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode($projects);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch projects: ' . $e->getMessage()]);
}
?>
