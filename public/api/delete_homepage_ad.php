<?php
// public/api/delete_homepage_ad.php
require_once 'auth_check.php';
require_once 'db_connect.php';

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
    // We get the current ad media url so we can delete the file
    $stmt = $pdo->query("SELECT ad_media_url FROM homepage_settings WHERE id = 1 LIMIT 1");
    $settings = $stmt->fetch();

    if ($settings && !empty($settings['ad_media_url'])) {
        $filePath = '..' . $settings['ad_media_url']; // e.g., ../uploads/ads/filename.mp4
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // Clear the ad settings in DB
    $updateStmt = $pdo->prepare("UPDATE homepage_settings SET ad_media_url = NULL, ad_media_type = 'image', ad_title = 'Featured Update' WHERE id = 1");
    $updateStmt->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Homepage ad deleted successfully'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete ad: ' . $e->getMessage()]);
}
?>
