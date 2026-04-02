<?php
// public/api/scrape.php

require_once 'db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// 1. Authentication Check (Optional for scraping? Better to secure it)
$headers = function_exists('getallheaders') ? getallheaders() : [];
$authHeader = $headers['Authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = '';

if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $token = $matches[1];
}

if (empty($token)) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized: No token provided']);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM admin_tokens WHERE token = ? AND expires_at > NOW()");
$stmt->execute([$token]);
if (!$stmt->fetch()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized: Invalid or expired token']);
    exit;
}

// 2. Get URL from body
$data = json_decode(file_get_contents('php://input'), true);
$url = $data['url'] ?? '';

if (!filter_var($url, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid URL']);
    exit;
}

// SSRF Protection:
// 1. Scheme check
$parsed = parse_url($url);
if (!isset($parsed['scheme']) || !in_array($parsed['scheme'], ['http', 'https'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Only HTTP/HTTPS allowed']);
    exit;
}

// 2. Host resolution check (block private IPs)
$host = $parsed['host'];
$ip = gethostbyname($host);

// Private/Reserved ranges
if (
    filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false
) {
    http_response_code(403);
    echo json_encode(['error' => 'Access to private network denied']);
    exit;
}

// 3. Fetch Content
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_MAXREDIRS, 3); // Limit redirects
curl_setopt($ch, CURLOPT_USERAGENT, 'Fluxive-Scraper/1.0');
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$html = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || empty($html)) {
    http_response_code(400);
    echo json_encode(['error' => 'Failed to fetch URL']);
    exit;
}

// 4. Parse Metadata (Simple Regex/DOM)
$title = '';
$description = '';
$image = '';

// Try Open Graph tags first
if (preg_match('/<meta property="og:title" content="([^"]+)"/i', $html, $matches)) {
    $title = $matches[1];
} elseif (preg_match('/<title>(.*?)<\/title>/i', $html, $matches)) {
    $title = $matches[1];
}

if (preg_match('/<meta property="og:description" content="([^"]+)"/i', $html, $matches)) {
    $description = $matches[1];
} elseif (preg_match('/<meta name="description" content="([^"]+)"/i', $html, $matches)) {
    $description = $matches[1];
}

if (preg_match('/<meta property="og:image" content="([^"]+)"/i', $html, $matches)) {
    $image = $matches[1];
}

// Attempt to guess category based on keywords in title/description
$category = 'wifi'; // Default
$text = strtolower($title . ' ' . $description);
if (strpos($text, 'marketing') !== false || strpos($text, 'seo') !== false) $category = 'marketing';
if (strpos($text, 'security') !== false || strpos($text, 'hack') !== false) $category = 'security';
if (strpos($text, 'ai') !== false || strpos($text, 'bot') !== false) $category = 'ai';
if (strpos($text, 'web') !== false || strpos($text, 'design') !== false) $category = 'web';

echo json_encode([
    'title' => html_entity_decode($title),
    'excerpt' => html_entity_decode($description),
    'image' => $image,
    'category' => $category,
    'content' => "Imported from: " . $url . "\n\n" . html_entity_decode($description) // Placeholder content
]);
?>
