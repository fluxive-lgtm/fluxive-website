<?php
// public/api/waf.php

// -----------------------------------------------------------------------------
// FLUXIVE WAF (Web Application Firewall) Middleware
// -----------------------------------------------------------------------------
// Blocks common attacks: SQL Injection, XSS, Path Traversal, etc.
// -----------------------------------------------------------------------------

class FluxiveWAF {
    private $blockedPatterns = [
        // SQL Injection
        '/UNION\s+SELECT/i',
        '/UNION\s+ALL\s+SELECT/i',
        '/\s+OR\s+1=1/i',
        '/\s+OR\s+\'1\'=\'1\'/i',
        '/SLEEP\(\d+\)/i',
        '/BENCHMARK\(\d+,/i',
        '/WAITFOR\s+DELAY/i',
        '/DROP\s+TABLE/i',
        '/DELETE\s+FROM/i',
        '/INSERT\s+INTO/i',
        
        // XSS (Basic)
        '/<script\b[^>]*>(.*?)<\/script>/is',
        '/javascript:/i',
        '/onerror\s*=/i',
        '/onload\s*=/i',
        '/onmouseover\s*=/i',
        '/onclick\s*=/i',
        
        // Path Traversal
        '/\.\.\//',
        '/\/etc\/passwd/i',
        '/C:\\\Windows/i',
    ];

    private $logFile = __DIR__ . '/waf_logs.txt';

    public function run() {
        // Inspect GET, POST, COOKIE, and RAW INPUT
        $this->inspect($_GET, 'GET');
        $this->inspect($_POST, 'POST');
        $this->inspect($_COOKIE, 'COOKIE');
        
        // Inspect JSON body
        $rawInput = file_get_contents('php://input');
        if (!empty($rawInput)) {
            $this->inspectString($rawInput, 'RAW_BODY');
            // Try to decode JSON and inspect it recursively
            $json = json_decode($rawInput, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($json)) {
                $this->inspect($json, 'JSON_BODY');
            }
        }

        // Inspect Headers (User-Agent, Referer)
        if (isset($_SERVER['HTTP_USER_AGENT'])) {
            $this->inspectString($_SERVER['HTTP_USER_AGENT'], 'USER_AGENT');
        }
        if (isset($_SERVER['HTTP_REFERER'])) {
            $this->inspectString($_SERVER['HTTP_REFERER'], 'REFERER');
        }
    }

    private function inspect($data, $source) {
        if (!is_array($data)) return;

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $this->inspect($value, $source); // Recursion
            } else {
                $this->inspectString((string)$value, "$source [$key]");
            }
        }
    }

    private function inspectString($value, $context) {
        if (empty($value)) return;

        foreach ($this->blockedPatterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $this->blockRequest($pattern, $context, $value);
            }
        }
    }

    private function blockRequest($pattern, $context, $payload) {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
        $logMessage = sprintf(
            "[%s] BLOCKED IP: %s | Source: %s | Pattern: %s | Payload (truncated): %s\n",
            date('Y-m-d H:i:s'),
            $ip,
            $context,
            $pattern,
            substr(htmlspecialchars($payload), 0, 100)
        );

        // Append to log (ensure permissions are set for this file)
        file_put_contents($this->logFile, $logMessage, FILE_APPEND);

        // Clean output buffer and exit
        if (ob_get_level()) ob_end_clean();
        
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Request blocked by WAF Security Rule.']);
        exit;
    }
}

// -----------------------------------------------------------------------------
// EXCEPTION FOR AUTHORIZED BLOG POSTS
// -----------------------------------------------------------------------------
// We want to allow specific HTML tags (like <iframe>) in authorized blog posts
// but block everything else.
// -----------------------------------------------------------------------------

// Run WAF
$waf = new FluxiveWAF();
$waf->run();
?>
