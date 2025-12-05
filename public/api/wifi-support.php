<?php
// public/wifi-support-handler.php

// Prevent HTML errors from breaking JSON
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Start output buffering to catch any unexpected output
ob_start();

header('Content-Type: application/json');

require_once 'db_connect.php'; // For check_rate_limit

// Rate Limiting: 5 requests per hour per IP
$ip = $_SERVER['REMOTE_ADDR'];
if (!check_rate_limit($pdo, $ip, 'wifi_support_request', 5, 3600)) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests. Please try again later.']);
    exit;
}

try {
    // Only allow POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
        exit;
    }

    // Honeypot anti-spam: hidden field "website" should stay empty
    if (!empty($_POST['website'] ?? '')) {
        // Pretend success but do nothing (ignore spam)
        echo json_encode(['ok' => true]);
        exit;
    }

    // Simple required field check
    $required = ['name', 'email', 'issueType', 'urgency', 'message'];
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
    $location  = isset($_POST['location']) ? trim($_POST['location']) : null;
    $issueType = trim($_POST['issueType']);
    $urgency   = trim($_POST['urgency']);
    $message   = trim($_POST['message']);
    $lang      = isset($_POST['lang']) ? trim($_POST['lang']) : null;

    // Extra logging fields
    $ip        = $_SERVER['REMOTE_ADDR'] ?? null;
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
    $referrer  = $_SERVER['HTTP_REFERER'] ?? null;

    // Easyhost MySQL credentials (WiFi support DB)
    $dsn  = 'mysql:host=ID481076_wifisupport.db.webhosting.be;dbname=ID481076_wifisupport;charset=utf8mb4';
    $user = 'ID481076_wifisupport';
    $pass = '4210j5nm28WDOlVjt08u'; // Correct password

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $stmt = $pdo->prepare(
        'INSERT INTO wifi_support_requests
         (name, email, phone, company, location, device, issue_type, urgency, message, lang, status, ip_address, user_agent, referrer)
         VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?)'
    );

    $status = 'new';

    $stmt->execute([
        $name,
        $email,
        $phone ?: null,
        $company ?: null,
        $location ?: null,
        $issueType,
        $urgency,
        $message,
        $lang ?: null,
        $status,
        $ip,
        $userAgent,
        $referrer,
    ]);

    $id = $pdo->lastInsertId();

    // -------------------------------
    // Email notification to YOU
    // -------------------------------
    $toOwner = 'wifisupport@fluxive.be'; 
    $subjectOwner = "New Wi-Fi Support Request #{$id} - {$issueType}";

    $bodyOwnerLines = [
        "New Wi-Fi support ticket received:",
        "",
        "Ticket ID: {$id}",
        "Name: {$name}",
        "Email: {$email}",
        "Phone: " . ($phone ?: "-"),
        "Company: " . ($company ?: "-"),
        "Location: " . ($location ?: "-"),
        "Issue type: {$issueType}",
        "Urgency: {$urgency}",
        "Language: " . ($lang ?: "-"),
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
        "Stored in DB: ID481076_wifisupport.wifi_support_requests",
    ];

    $bodyOwner = implode("\n", $bodyOwnerLines);

    $headersOwner   = [];
    $headersOwner[] = 'From: Fluxive WiFi Support <wifisupport@fluxive.be>';
    $headersOwner[] = 'Reply-To: ' . $email;
    $headersOwner[] = 'X-Mailer: PHP/' . phpversion();

    @mail($toOwner, $subjectOwner, $bodyOwner, implode("\r\n", $headersOwner));

    // -------------------------------
    // Email confirmation to CLIENT
    // -------------------------------

    // Localized subject/body based on $lang
    switch ($lang) {
        case 'fr':
            $subjectClient = "Confirmation de votre demande d'assistance Wi-Fi (#{$id})";
            $bodyClientLines = [
                "Bonjour {$name},",
                "",
                "Nous avons bien reçu votre demande d'assistance Wi-Fi. Voici un récapitulatif :",
                "",
                "Numéro de ticket : {$id}",
                "Type de problème : {$issueType}",
                "Urgence : {$urgency}",
                "",
                "Description que vous avez envoyée :",
                $message,
                "",
                "Nous vous contacterons dès que possible.",
                "",
                "Cordialement,",
                "Fluxive — Support Wi-Fi & Réseau",
                "wifisupport@fluxive.be",
            ];
            break;

        case 'en':
            $subjectClient = "Confirmation of your Wi-Fi support request (#{$id})";
            $bodyClientLines = [
                "Hi {$name},",
                "",
                "We have received your Wi-Fi support request. Here is a summary:",
                "",
                "Ticket ID: {$id}",
                "Issue type: {$issueType}",
                "Urgency: {$urgency}",
                "",
                "Message you sent:",
                $message,
                "",
                "We will contact you as soon as possible.",
                "",
                "Kind regards,",
                "Fluxive — Wi-Fi & Network Support",
                "wifisupport@fluxive.be",
            ];
            break;

        default: // nl or anything else
            $subjectClient = "Bevestiging van je Wi-Fi supportaanvraag (#{$id})";
            $bodyClientLines = [
                "Beste {$name},",
                "",
                "We hebben je Wi-Fi supportaanvraag goed ontvangen. Hieronder een overzicht:",
                "",
                "Ticketnummer: {$id}",
                "Probleemtype: {$issueType}",
                "Urgentie: {$urgency}",
                "",
                "Beschrijving die je stuurde:",
                $message,
                "",
                "We nemen zo snel mogelijk contact met je op.",
                "",
                "Met vriendelijke groeten,",
                "Fluxive — Wi-Fi & Netwerk Support",
                "wifisupport@fluxive.be",
            ];
            break;
    }

    $bodyClient = implode("\n", $bodyClientLines);

    $headersClient   = [];
    $headersClient[] = 'From: Fluxive WiFi Support <wifisupport@fluxive.be>';
    $headersClient[] = 'X-Mailer: PHP/' . phpversion();

    @mail($email, $subjectClient, $bodyClient, implode("\r\n", $headersClient));

    echo json_encode(['ok' => true, 'id' => $id]);

} catch (Throwable $e) {
    // Catch ANY error (Exception or Error)
    ob_clean(); // Clear any previous output
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Server Error: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine()]);
}

// Flush buffer
ob_end_flush();
