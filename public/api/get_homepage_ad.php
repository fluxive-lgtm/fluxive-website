<?php
// public/api/get_homepage_ad.php

require_once 'db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $stmt = $pdo->prepare("SELECT ad_media_url, ad_media_type, ad_title FROM homepage_settings WHERE id = 1 LIMIT 1");
    $stmt->execute();
    
    $settings = $stmt->fetch();
    
    if (!$settings || empty($settings['ad_media_url'])) {
        // Return null if no ad is set yet
        echo json_encode(['ad_media_url' => null, 'ad_media_type' => 'image', 'ad_title' => 'Featured Update']);
        exit;
    }

    echo json_encode([
        'ad_media_url' => $settings['ad_media_url'],
        'ad_media_type' => $settings['ad_media_type'],
        'ad_title' => $settings['ad_title'] ? $settings['ad_title'] : 'Featured Update'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
