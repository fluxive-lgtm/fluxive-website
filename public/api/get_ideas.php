<?php
// public/api/get_ideas.php
require_once 'db_connect.php'; // Includes $pdo

header('Content-Type: application/json');

// Get auth header
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

// Function to handle various authentications
function isAuthenticated($pdo, $authHeader) {
    // 1. Check Bearer token (Next.js client-side)
    if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        $token = $matches[1];
        $stmt = $pdo->prepare("SELECT id FROM admin_tokens WHERE token = ? AND expires_at > NOW()");
        $stmt->execute([$token]);
        if ($stmt->fetch()) {
            return true;
        }
    }
    return false;
}

if (!isAuthenticated($pdo, $authHeader)) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $stmt = $pdo->query("SELECT id, idea, business_name, email, status, ip_address, created_at FROM idea_submissions ORDER BY created_at DESC");
    $ideas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['ok' => true, 'ideas' => $ideas]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
