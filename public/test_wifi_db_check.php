<?php
// public/test_wifi_db_check.php

// Credentials for ID481076_review (from db_connect_reviews.php)
$host = 'ID481076_review.db.webhosting.be';
$dbname = 'ID481076_review';
$username = 'ID481076_review';
$password = '7KOb3Qg77g3878TL8QKj';

header('Content-Type: text/plain');

echo "Attempting to connect to database: $dbname ...\n";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection successful!\n\n";

    echo "Checking for 'wifi_support_requests' table...\n";
    
    $stmt = $pdo->query("SHOW TABLES LIKE 'wifi_support_requests'");
    $tableExists = $stmt->fetchColumn();

    if ($tableExists) {
        echo "SUCCESS: Table 'wifi_support_requests' FOUND in database '$dbname'.\n";
        echo "You can safely switch the wifi support handler to use this database.\n";
    } else {
        echo "FAILURE: Table 'wifi_support_requests' NOT FOUND in database '$dbname'.\n";
        echo "If you switch to this database, the wifi support form will fail unless you create the table first.\n";
    }

} catch (PDOException $e) {
    echo "ERROR: Connection failed: " . $e->getMessage() . "\n";
}
?>
