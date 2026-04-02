<?php
// public/api/db_connect_ourwork.php
require_once 'waf.php'; // Include WAF Middleware

// Database credentials
$host = 'interchange.proxy.rlwy.net';
$port = '50020';
$dbname = 'fluxive_db';
$username = 'fluxive_user';
$password = 'Fluxive@2026!';

try {
    $pdo_ourwork = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo_ourwork->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo_ourwork->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Create projects table if not exists
    $pdo_ourwork->exec("
        CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_nl VARCHAR(255),
            description TEXT,
            description_nl TEXT,
            content_en LONGTEXT,
            content_nl LONGTEXT,
            image_url VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Auto-migration to ensure columns exist (for existing tables)
    $columns = [
        'title_nl' => 'VARCHAR(255) DEFAULT NULL',
        'title_fr' => 'VARCHAR(255) DEFAULT NULL',
        'description_nl' => 'TEXT DEFAULT NULL',
        'description_fr' => 'TEXT DEFAULT NULL',
        'content_en' => 'LONGTEXT DEFAULT NULL',
        'content_nl' => 'LONGTEXT DEFAULT NULL',
        'content_fr' => 'LONGTEXT DEFAULT NULL'
    ];

    foreach ($columns as $column => $definition) {
        try {
            $pdo_ourwork->query("SELECT $column FROM projects LIMIT 1");
        } catch (PDOException $e) {
            // Column doesn't exist, add it
            $pdo_ourwork->exec("ALTER TABLE projects ADD COLUMN $column $definition");
        }
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
