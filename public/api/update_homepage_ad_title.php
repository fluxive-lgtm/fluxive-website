<?php
// public/api/update_homepage_ad_title.php

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
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->ad_title)) {
        throw new Exception("Title is missing");
    }

    $adTitle = trim($data->ad_title);

    // Ensure record exists
    $checkStmt = $pdo->query("SELECT COUNT(*) FROM homepage_settings WHERE id = 1");
    if ($checkStmt->fetchColumn() == 0) {
        $insert = $pdo->prepare("INSERT INTO homepage_settings (id, ad_title) VALUES (1, ?)");
        $insert->execute([$adTitle]);
    } else {
        $stmt = $pdo->prepare("UPDATE homepage_settings SET ad_title = ? WHERE id = 1");
        $stmt->execute([$adTitle]);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Ad title updated successfully',
        'ad_title' => $adTitle
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
