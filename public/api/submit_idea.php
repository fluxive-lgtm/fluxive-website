<?php
// public/api/submit_idea.php

require_once 'db_connect.php'; // Includes $pdo (shared) and check_rate_limit()

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Rate Limiting: 5 requests per hour per IP
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
if (!check_rate_limit($pdo, $ip, 'submit_idea_request', 5, 3600)) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests. Please try again later.']);
    exit;
}

// Real-world, you might use a honeypot field if needed.
// if (!empty($_POST['website'] ?? '')) {
//     echo json_encode(['ok' => true]);
//     exit;
// }

// Read JSON input or POST form
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if ($contentType === "application/json") {
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    if (!is_array($decoded)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'JSON decoding failed']);
        exit;
    }
    $_POST = $decoded;
}

$idea = isset($_POST['idea']) ? trim($_POST['idea']) : '';
$businessName = isset($_POST['businessName']) ? trim($_POST['businessName']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';

// Validation
if (empty($idea)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Idea is required.']);
    exit;
}

if (empty($businessName) && empty($email)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Either Business Name or Email is required.']);
    exit;
}

// Extra logging fields
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$referrer  = $_SERVER['HTTP_REFERER'] ?? null;

// Database for Ideas
try {
    // Create table if not exists
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS idea_submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idea TEXT NOT NULL,
            business_name VARCHAR(255),
            email VARCHAR(255),
            status VARCHAR(50) DEFAULT 'new',
            ip_address VARCHAR(45),
            user_agent TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $stmt = $pdo->prepare(
        'INSERT INTO idea_submissions
         (idea, business_name, email, ip_address, user_agent)
         VALUES (?, ?, ?, ?, ?)'
    );

    $stmt->execute([
        $idea,
        $businessName ?: null,
        $email ?: null,
        $ip,
        $userAgent
    ]);

    $id = $pdo->lastInsertId();

    // -------------------------------
    // Email notification to YOU
    // -------------------------------
    $toOwner = 'info@fluxive.be'; 
    $subjectOwner = "New Idea Submission #{$id}";

    $bodyOwnerLines = [
        "New idea submission received:",
        "",
        "Ticket ID: {$id}",
        "Idea:",
        $idea,
        "",
        "Business Name: " . ($businessName ?: "-"),
        "Email: " . ($email ?: "-"),
        "",
        "Technical info:",
        "IP address: " . ($ip ?: "-"),
        "User agent: " . ($userAgent ?: "-"),
        "Referrer: " . ($referrer ?: "-"),
    ];

    $bodyOwner = implode("\n", $bodyOwnerLines);

    $headersOwner   = [];
    $headersOwner[] = 'From: Fluxive Ideas <info@fluxive.be>';
    if (!empty($email)) {
        $headersOwner[] = 'Reply-To: ' . $email;
    }
    $headersOwner[] = 'X-Mailer: PHP/' . phpversion();

    @mail($toOwner, $subjectOwner, $bodyOwner, implode("\r\n", $headersOwner));

    echo json_encode(['ok' => true, 'id' => $id, 'message' => 'Idea submitted successfully.']);

} catch (PDOException $e) {
    http_response_code(500);
    error_log("Database error (idea submission): " . $e->getMessage());
    echo json_encode(['ok' => false, 'error' => 'Database error']);
}
