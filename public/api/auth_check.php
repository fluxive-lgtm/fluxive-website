<?php
// public/api/auth_check.php

require_once 'db_connect.php';

function require_auth() {
    global $pdo;

    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';

    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];

        // Check if token exists and is not expired
        $stmt = $pdo->prepare("SELECT id FROM admin_tokens WHERE token = ? AND expires_at > NOW()");
        $stmt->execute([$token]);
        
        if ($stmt->fetch()) {
            return true;
        }
    }

    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
?>
