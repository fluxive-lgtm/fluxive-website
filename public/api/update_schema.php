<?php
// public/api/update_schema.php
require_once 'db_connect_ourwork.php';

try {
    // Add new columns if they don't exist
    $columns = [
        'title_nl' => 'VARCHAR(255) DEFAULT NULL',
        'description_nl' => 'TEXT DEFAULT NULL',
        'content_en' => 'LONGTEXT DEFAULT NULL',
        'content_nl' => 'LONGTEXT DEFAULT NULL'
    ];

    foreach ($columns as $column => $definition) {
        try {
            $pdo->exec("ALTER TABLE projects ADD COLUMN $column $definition");
            echo "Added column $column to projects.<br>";
        } catch (PDOException $e) {
            // Column likely already exists
            echo "Column $column might already exist in projects or error: " . $e->getMessage() . "<br>";
        }
    }

    // Create project_media table
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS project_media (
            id INT AUTO_INCREMENT PRIMARY KEY,
            project_id INT NOT NULL,
            file_path VARCHAR(255) NOT NULL,
            file_type VARCHAR(50) NOT NULL, -- 'image' or 'video'
            display_order INT DEFAULT 0,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        )");
        echo "Created project_media table.<br>";
    } catch (PDOException $e) {
        echo "Error creating project_media table: " . $e->getMessage() . "<br>";
    }

    // Add language columns to reviews
    $reviewColumns = [
        'review_text_en' => 'TEXT DEFAULT NULL',
        'review_text_nl' => 'TEXT DEFAULT NULL'
    ];

    foreach ($reviewColumns as $column => $definition) {
        try {
            $pdo->exec("ALTER TABLE reviews ADD COLUMN $column $definition");
            echo "Added column $column to reviews.<br>";
        } catch (PDOException $e) {
             echo "Column $column might already exist in reviews or error: " . $e->getMessage() . "<br>";
        }
    }

    echo "Schema update completed.";

} catch (PDOException $e) {
    echo "Error updating schema: " . $e->getMessage();
}
?>
