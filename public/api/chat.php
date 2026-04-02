<?php
// public/api/chat.php

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get the request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// n8n Webhook URL
// Ideally this should be in a config file or environment variable.
// Using the one provided by the user.
$n8nUrl = 'https://whise-bibek.app.n8n.cloud/webhook/4fa64e18-ddf7-40c3-8b43-88f7d04749ce';

// You can also try to read from .env if it exists in the root
// Check root directory (public_html) or parent (outside public_html)
$possiblePaths = [
    __DIR__ . '/../.env',  // In public_html
    __DIR__ . '/../../.env' // Outside public_html (safer)
];

foreach ($possiblePaths as $path) {
    if (file_exists($path)) {
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            list($name, $value) = explode('=', $line, 2);
            if (trim($name) === 'NEXT_PUBLIC_N8N_WEBHOOK_URL') {
                $n8nUrl = trim($value);
                break 2;
            }
        }
    }
}

if (!$n8nUrl) {
    http_response_code(500);
    echo json_encode(['error' => 'Chat configuration missing']);
    exit;
}

// Forward request to n8n
$ch = curl_init($n8nUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Enable streaming/buffer handling if possible, but for simple proxy:
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy error: ' . curl_error($ch)]);
} else {
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
?>
