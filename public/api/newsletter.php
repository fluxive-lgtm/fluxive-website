<?php
// public/newsletter-handler.php

require_once 'db_connect.php'; // Includes $pdo and check_rate_limit()

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Rate Limiting: 5 requests per hour per IP
$ip = $_SERVER['REMOTE_ADDR'];
if (!check_rate_limit($pdo, $ip, 'newsletter_signup', 5, 3600)) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many attempts. Please try again later.']);
    exit;
}

// Honeypot anti-spam: hidden field "website_url" should stay empty
if (!empty($_POST['website_url'] ?? '')) {
    // Pretend success but do nothing (ignore spam)
    echo json_encode(['ok' => true]);
    exit;
}

// Read fields
$email = trim($_POST['email'] ?? '');

// Validation
// 1. Check if empty
// 2. Check max length (255 chars)
// 3. Validate email format
if (empty($email) || strlen($email) > 255 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

try {
    // Create table if not exists (Helper for first run) - moved to db_connect.php or kept here?
    // db_connect.php only creates rate_limits and admin_tokens. We still need newsletter_subscribers.
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $stmt = $pdo->prepare(
        'INSERT INTO newsletter_subscribers (email, created_at) VALUES (?, NOW())'
    );

    $stmt->execute([$email]);

    echo json_encode(['ok' => true, 'message' => 'Successfully subscribed!']);

} catch (PDOException $e) {
    // Handle duplicate email
    if ($e->getCode() == 23000) { // Integrity constraint violation
        http_response_code(409);
        echo json_encode(['ok' => false, 'error' => 'You are already subscribed!']);
    } else {
        http_response_code(500);
        // For security, don't show exact DB error in production
        echo json_encode(['ok' => false, 'error' => 'Database error']);
    }
}
?>
