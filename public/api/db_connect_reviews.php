<?php
// public/api/db_connect_reviews.php
require_once 'waf.php'; // Include WAF Middleware

// Database credentials for Reviews
$host = 'interchange.proxy.rlwy.net';
$port = '50020';
$dbname = 'fluxive_db';
$username = 'fluxive_user';
$password = 'Fluxive@2026!';

try {
    $pdoReviews = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdoReviews->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdoReviews->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Create reviews table if not exists
    $pdoReviews->exec("
        CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            company_name VARCHAR(255) NOT NULL,
            review_text TEXT NOT NULL,
            rating INT NOT NULL,
            is_approved BOOLEAN DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Review Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
