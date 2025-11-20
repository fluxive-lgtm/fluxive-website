<?php
// public/wifi-support-handler.php

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
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
$device    = isset($_POST['device']) ? trim($_POST['device']) : null;
$issueType = trim($_POST['issueType']);
$urgency   = trim($_POST['urgency']);
$message   = trim($_POST['message']);
$lang      = isset($_POST['lang']) ? trim($_POST['lang']) : null;

// Easyhost MySQL credentials (your WiFi-support DB)
$dsn  = 'mysql:host=ID481076_wifisupport.db.webhosting.be;dbname=ID481076_wifisupport;charset=utf8mb4';
$user = 'ID481076_wifisupport';
$pass = 'YOUR_DB_PASSWORD_HERE'; // <-- REPLACE with: Pyu5GhU7XfdyPCuvMyR7 (you can change later in Easyhost)

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $stmt = $pdo->prepare(
        'INSERT INTO wifi_support_requests
         (name, email, phone, company, location, device, issue_type, urgency, message, lang)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );

    $stmt->execute([
        $name,
        $email,
        $phone ?: null,
        $company ?: null,
        $location ?: null,
        $device ?: null,
        $issueType,
        $urgency,
        $message,
        $lang ?: null,
    ]);

    $id = $pdo->lastInsertId();
    echo json_encode(['ok' => true, 'id' => $id]);
} catch (PDOException $e) {
    http_response_code(500);
    // Don’t leak DB error details
    echo json_encode(['ok' => false, 'error' => 'Database error']);
}
