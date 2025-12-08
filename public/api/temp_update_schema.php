<?php
require_once 'db.php';

try {
    // Check if column exists
    $check = $pdo->query("SHOW COLUMNS FROM Post LIKE 'media'");
    if ($check->rowCount() == 0) {
        // Add column
        $pdo->exec("ALTER TABLE Post ADD COLUMN media TEXT DEFAULT NULL");
        echo "Column 'media' added successfully.";
    } else {
        echo "Column 'media' already exists.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
