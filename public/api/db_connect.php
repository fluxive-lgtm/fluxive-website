<?php
// public/api/db_connect.php
require_once 'waf.php'; // Include WAF Middleware

// Database credentials
$host = 'interchange.proxy.rlwy.net';
$port = '50020';
$dbname = 'fluxive_db';
$username = 'fluxive_user';
$password = 'Fluxive@2026!';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password);
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

    // Create admins table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Create homepage settings table for Dynamic Ads
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS homepage_settings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ad_media_url VARCHAR(255) DEFAULT NULL,
            ad_media_type VARCHAR(50) DEFAULT 'image',
            ad_title VARCHAR(255) DEFAULT 'Featured Update',
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");

    // Auto-migrate to add ad_title if upgrading an older version of the table
    try {
        $pdo->exec("ALTER TABLE homepage_settings ADD COLUMN ad_title VARCHAR(255) DEFAULT 'Featured Update'");
    } catch (PDOException $e) {
        // Ignored, column likely already exists
    }

    // Seed default homepage settings if not exists
    $stmtSettings = $pdo->query("SELECT COUNT(*) FROM homepage_settings");
    if ($stmtSettings->fetchColumn() == 0) {
        $pdo->exec("INSERT INTO homepage_settings (ad_media_url, ad_media_type) VALUES (NULL, 'image')");
    }

    // Seed default admin if not exists
    $stmt = $pdo->query("SELECT COUNT(*) FROM admins");
    if ($stmt->fetchColumn() == 0) {
        // Default credentials: admin / U6AaQHHfBtwWdXtb1qrD
        // We use password_hash() to store it securely
        $defaultPass = 'U6AaQHHfBtwWdXtb1qrD';
        $hash = password_hash($defaultPass, PASSWORD_DEFAULT);
        
        $insert = $pdo->prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)");
        $insert->execute(['admin', $hash]);
    }

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
