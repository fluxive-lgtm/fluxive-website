<?php
// public/contact-handler.php

require_once 'db_connect.php'; // Includes $pdo (shared) and check_rate_limit()

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Rate Limiting: 5 requests per hour per IP
$ip = $_SERVER['REMOTE_ADDR'];
if (!check_rate_limit($pdo, $ip, 'contact_form_request', 5, 3600)) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests. Please try again later.']);
    exit;
}

// Honeypot anti-spam: hidden field "website" should stay empty
// (Note: Frontend needs to send this field)
if (!empty($_POST['website'] ?? '')) {
    // Pretend success but do nothing (ignore spam)
    echo json_encode(['ok' => true]);
    exit;
}

// Simple required field check
$required = ['name', 'email', 'service', 'message'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Missing field: ' . $field]);
        exit;
    }
}

// Read fields (trim spaces)
$name      = trim($_POST['name']);
$email     = trim($_POST['email']);
$phone     = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$company   = isset($_POST['company']) ? trim($_POST['company']) : null;
$service   = trim($_POST['service']);
$message   = trim($_POST['message']);
$lang      = isset($_POST['lang']) ? trim($_POST['lang']) : 'nl';

// Extra logging fields
$ip        = $_SERVER['REMOTE_ADDR'] ?? null;
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
$referrer  = $_SERVER['HTTP_REFERER'] ?? null;

// Database credentials for Contact Form
// IMPORTANT: UPDATE THIS PASSWORD
$dsn  = 'mysql:host=ID481076_contactform.db.webhosting.be;dbname=ID481076_contactform;charset=utf8mb4';
$user = 'ID481076_contactform';
$pass = '874TSIp80b6590kNIA9S'; // <-- change if you updated the DB password

try {
    $contactPdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    // Create table if not exists
    $contactPdo->exec("
        CREATE TABLE IF NOT EXISTS contact_requests (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            company VARCHAR(255),
            service VARCHAR(100),
            message TEXT,
            lang VARCHAR(10),
            status VARCHAR(50) DEFAULT 'new',
            ip_address VARCHAR(45),
            user_agent TEXT,
            referrer TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $stmt = $contactPdo->prepare(
        'INSERT INTO contact_requests
         (name, email, phone, company, service, message, lang, status, ip_address, user_agent, referrer)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );

    $status = 'new';

    $stmt->execute([
        $name,
        $email,
        $phone ?: null,
        $company ?: null,
        $service,
        $message,
        $lang,
        $status,
        $ip,
        $userAgent,
        $referrer,
    ]);

    $id = $contactPdo->lastInsertId();

    // -------------------------------
    // Email notification to YOU
    // -------------------------------
    $toOwner = 'info@fluxive.be'; 
    $subjectOwner = "New Contact Request #{$id} - {$service}";

    $bodyOwnerLines = [
        "New contact request received:",
        "",
        "Ticket ID: {$id}",
        "Name: {$name}",
        "Email: {$email}",
        "Phone: " . ($phone ?: "-"),
        "Company: " . ($company ?: "-"),
        "Service: {$service}",
        "Language: {$lang}",
        "",
        "Message:",
        $message,
        "",
        "Technical info:",
        "IP address: " . ($ip ?: "-"),
        "User agent: " . ($userAgent ?: "-"),
        "Referrer: " . ($referrer ?: "-"),
        "",
        "---------------------------",
        "Stored in DB: ID481076_contactform.contact_requests",
    ];

    $bodyOwner = implode("\n", $bodyOwnerLines);

    $headersOwner   = [];
    $headersOwner[] = 'From: Fluxive Contact <info@fluxive.be>';
    $headersOwner[] = 'Reply-To: ' . $email;
    $headersOwner[] = 'X-Mailer: PHP/' . phpversion();

    @mail($toOwner, $subjectOwner, $bodyOwner, implode("\r\n", $headersOwner));

    // -------------------------------
    // Email confirmation to CLIENT
    // -------------------------------

    // Localized subject/body based on $lang
    switch ($lang) {
        case 'fr':
            $subjectClient = "Confirmation de votre demande de contact (#{$id})";
            $bodyClientLines = [
                "Bonjour {$name},",
                "",
                "Nous avons bien reçu votre message. Voici un récapitulatif :",
                "",
                "Service : {$service}",
                "",
                "Votre message :",
                $message,
                "",
                "Nous vous contacterons dès que possible.",
                "",
                "Cordialement,",
                "L'équipe Fluxive",
                "info@fluxive.be",
            ];
            break;

        case 'en':
            $subjectClient = "Confirmation of your contact request (#{$id})";
            $bodyClientLines = [
                "Hi {$name},",
                "",
                "We have received your message. Here is a summary:",
                "",
                "Service: {$service}",
                "",
                "Your message:",
                $message,
                "",
                "We will contact you as soon as possible.",
                "",
                "Kind regards,",
                "The Fluxive Team",
                "info@fluxive.be",
            ];
            break;

        default: // nl or anything else
            $subjectClient = "Bevestiging van je contactaanvraag (#{$id})";
            $bodyClientLines = [
                "Beste {$name},",
                "",
                "We hebben je bericht goed ontvangen. Hieronder een overzicht:",
                "",
                "Service: {$service}",
                "",
                "Je bericht:",
                $message,
                "",
                "We nemen zo snel mogelijk contact met je op.",
                "",
                "Met vriendelijke groeten,",
                "Het Fluxive Team",
                "info@fluxive.be",
            ];
            break;
    }

    $bodyClient = implode("\n", $bodyClientLines);

    $headersClient   = [];
    $headersClient[] = 'From: Fluxive Contact <info@fluxive.be>';
    $headersClient[] = 'X-Mailer: PHP/' . phpversion();

    @mail($email, $subjectClient, $bodyClient, implode("\r\n", $headersClient));

    echo json_encode(['ok' => true, 'id' => $id]);

} catch (PDOException $e) {
    http_response_code(500);
    // Log error internally, don't expose to user
    error_log("Database error: " . $e->getMessage());
    echo json_encode(['ok' => false, 'error' => 'Database error']);
}
