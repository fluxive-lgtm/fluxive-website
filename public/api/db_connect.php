<?php
// public/api/db_connect.php

// Database credentials
$host = 'ID481076_blogpost.db.webhosting.be';
$dbname = 'ID481076_blogpost';
$username = 'ID481076_blogpost';
$password = 'rBF1fcJc1dXwVxtjzV3D';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Create rate_limits table if not exists
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS rate_limits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ip_address VARCHAR(45) NOT NULL,
            action VARCHAR(50) NOT NULL,
            request_time INT NOT NULL,
            INDEX (ip_address, action, request_time)
        )
    ");

    // Create admin_tokens table for session management
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            token VARCHAR(64) NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME NOT NULL
        )
    ");

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

/**
 * Check rate limit
 * @param PDO $pdo
 * @param string $ip
 * @param string $action
 * @param int $limit Max requests
 * @param int $window Time window in seconds
 * @return bool True if allowed, False if limit exceeded
 */
function check_rate_limit($pdo, $ip, $action, $limit, $window) {
    $currentTime = time();
    $windowStartTime = $currentTime - $window;

    // Delete old records
    $stmt = $pdo->prepare("DELETE FROM rate_limits WHERE request_time < ?");
    $stmt->execute([$windowStartTime]);

    // Count recent requests
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM rate_limits WHERE ip_address = ? AND action = ? AND request_time > ?");
    $stmt->execute([$ip, $action, $windowStartTime]);
    $count = $stmt->fetchColumn();

    if ($count >= $limit) {
        return false;
    }

    // Record this request
    $stmt = $pdo->prepare("INSERT INTO rate_limits (ip_address, action, request_time) VALUES (?, ?, ?)");
    $stmt->execute([$ip, $action, $currentTime]);

    return true;
}
?>
