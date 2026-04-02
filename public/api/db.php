<?php
// public/api/db.php
require_once 'waf.php'; // Include WAF Middleware

// Database credentials
$host = 'ID481076_blogpost.db.webhosting.be';
$dbname = 'ID481076_blogpost';
$username = 'ID481076_blogpost';
$password = 'rBF1fcJc1dXwVxtjzV3D';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
