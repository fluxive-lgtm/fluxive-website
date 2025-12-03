<?php
// public/api/submit_review.php
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

$companyName = $data['company_name'] ?? '';
$reviewText = $data['review_text'] ?? '';
$rating = $data['rating'] ?? 0;

if (empty($companyName) || empty($reviewText) || empty($rating)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if ($rating < 1 || $rating > 5) {
    http_response_code(400);
    echo json_encode(['error' => 'Rating must be between 1 and 5']);
    exit;
}

try {
    $stmt = $pdoReviews->prepare("INSERT INTO reviews (company_name, review_text, rating, is_approved) VALUES (?, ?, ?, 0)");
    $stmt->execute([$companyName, $reviewText, $rating]);

    echo json_encode(['message' => 'Review submitted successfully and is pending approval']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to submit review: ' . $e->getMessage()]);
}
?>
