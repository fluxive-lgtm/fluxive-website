<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'ID481076_wifisupport.db.webhosting.be';
$dbname = 'ID481076_wifisupport';
$user = 'ID481076_wifisupport';
$pass = '4210j5nm28WDOlVjt08u';

$response = [];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $response['connection'] = 'success';
    
    $stmt = $pdo->query("SHOW TABLES LIKE 'wifi_support_requests'");
    $tableExists = $stmt->rowCount() > 0;
    
    $response['table_exists'] = $tableExists;
    
    if ($tableExists) {
        $stmt = $pdo->query("DESCRIBE wifi_support_requests");
        $response['columns'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } else {
        $response['message'] = 'Table wifi_support_requests does NOT exist.';
    }

} catch (PDOException $e) {
    $response['connection'] = 'failed';
    $response['error'] = $e->getMessage();
}

echo json_encode($response);
