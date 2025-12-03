<?php
// public/api/delete_review.php
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
    $stmt = $pdoReviews->prepare("DELETE FROM reviews WHERE id = ?");
    $stmt->execute([$reviewId]);

    echo json_encode(['message' => 'Review deleted successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete review: ' . $e->getMessage()]);
}
?>
