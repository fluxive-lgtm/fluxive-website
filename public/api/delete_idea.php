<?php
// public/api/delete_idea.php
require_once 'db_connect.php'; // Includes $pdo

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get auth header
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

function isAuthenticated($pdo, $authHeader) {
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

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing idea ID']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM idea_submissions WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['ok' => true, 'message' => 'Idea deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Idea not found']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
