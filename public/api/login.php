<?php
// public/api/login.php

require_once 'waf.php'; // Include WAF Middleware
require_once 'db_connect.php';

header('Content-Type: application/json');
// Remove wildcard CORS or restrict it. For now, we assume same-origin or specific domain.
// header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'];

// Rate Limiting: 5 failed attempts per 15 minutes
if (!check_rate_limit($pdo, $ip, 'admin_login_fail', 10, 900)) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many failed login attempts. Please try again in 15 minutes.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Hardcoded credentials (CHANGE THIS PASSWORD!)
// Check credentials against DB
$stmt = $pdo->prepare("SELECT id, password_hash FROM admins WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password_hash'])) {
    // Generate a secure token
    $token = bin2hex(random_bytes(32));
    
    // Store token in DB (valid for 24 hours)
    $expiresAt = date('Y-m-d H:i:s', time() + 86400);
    $stmt = $pdo->prepare("INSERT INTO admin_tokens (token, expires_at) VALUES (?, ?)");
    $stmt->execute([$token, $expiresAt]);

    // Return success
    echo json_encode(['success' => true, 'token' => $token]);
} else {
    // Record failed attempt for rate limiting
    // Note: check_rate_limit records *every* call if it returns true. 
    // But we only want to count *failures*.
    // So we manually insert into rate_limits here.
    $stmt = $pdo->prepare("INSERT INTO rate_limits (ip_address, action, request_time) VALUES (?, 'admin_login_fail', ?)");
    $stmt->execute([$ip, time()]);

    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
?>
