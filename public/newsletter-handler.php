<?php
// public/newsletter-handler.php

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot anti-spam: hidden field "website_url" should stay empty
// Note: Frontend sends "website_url", check if it matches
if (!empty($_POST['website_url'] ?? '')) {
    // Pretend success but do nothing (ignore spam)
    echo json_encode(['ok' => true]);
    exit;
}

// Read fields
$email = trim($_POST['email'] ?? '');

// Validation
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

// Database Credentials
// UPDATE THESE WITH YOUR ACTUAL CREDENTIALS FOR ID481076_blogpost
$dsn  = 'mysql:host=ID481076_blogpost.db.webhosting.be;dbname=ID481076_blogpost;charset=utf8mb4';
$user = 'ID481076_blogpost';
$pass = 'rBF1fcJc1dXwVxtjzV3D'; // <--- PLEASE UPDATE THIS PASSWORD

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    // Create table if not exists (Helper for first run)
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
        // For security, don't show exact DB error in production, but helpful for debugging
        echo json_encode(['ok' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
}
