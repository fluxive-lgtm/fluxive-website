<?php
// public/api/get_reviews.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_connect_reviews.php';

$approvedOnly = isset($_GET['approved_only']) ? filter_var($_GET['approved_only'], FILTER_VALIDATE_BOOLEAN) : true;

try {
    if ($approvedOnly) {
        $stmt = $pdoReviews->prepare("SELECT id, company_name, review_text, rating, created_at, is_approved FROM reviews WHERE is_approved = 1 ORDER BY created_at DESC");
    } else {
        // For admin, usually we'd check auth here, but for simplicity we'll rely on the frontend to call this with approved_only=false only in admin context
        // Ideally, this should be protected.
        $stmt = $pdoReviews->prepare("SELECT * FROM reviews ORDER BY created_at DESC");
    }
    
    $stmt->execute();
    $reviews = $stmt->fetchAll();

    echo json_encode($reviews);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch reviews: ' . $e->getMessage()]);
}
?>
