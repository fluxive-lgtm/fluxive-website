<?php
// public/api/approve_review.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once 'db_connect_reviews.php';

$data = json_decode(file_get_contents('php://input'), true);
$reviewId = $data['id'] ?? null;

if (!$reviewId) {
    http_response_code(400);
    echo json_encode(['error' => 'Review ID is required']);
    exit;
}

try {
    // Update review status to approved
    $stmt = $pdoReviews->prepare("UPDATE reviews SET is_approved = 1 WHERE id = ?");
    $stmt->execute([$reviewId]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update review status: ' . $e->getMessage()]);
}
?>
