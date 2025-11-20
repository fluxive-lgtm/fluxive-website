<?php
// public/wifi-support-admin.php
session_start();

// -----------------------------
// Simple config
// -----------------------------
const WIFI_ADMIN_PASSWORD = 'g2TEJPBXXKCHacFJfs1s!'; // <-- CHANGE this to something strong

// Easyhost DB
$dsn  = 'mysql:host=ID481076_wifisupport.db.webhosting.be;dbname=ID481076_wifisupport;charset=utf8mb4';
$user = 'ID481076_wifisupport';
$pass = 'Pyu5GhU7XfdyPCuvMyR7'; // <-- update if needed

// -----------------------------
// Handle login
// -----------------------------
if (isset($_POST['action']) && $_POST['action'] === 'login') {
    $password = $_POST['password'] ?? '';
    if ($password === WIFI_ADMIN_PASSWORD) {
        $_SESSION['wifi_admin_logged_in'] = true;
    } else {
        $loginError = 'Invalid password';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    unset($_SESSION['wifi_admin_logged_in']);
    header('Location: wifi-support-admin.php');
    exit;
}

// Require login
if (empty($_SESSION['wifi_admin_logged_in'])) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Wi-Fi Support Admin Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                background: #050816;
                color: #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
            }
            .card {
                background: rgba(15, 23, 42, 0.95);
                border-radius: 16px;
                padding: 24px;
                width: 100%;
                max-width: 360px;
                box-shadow: 0 20px 40px rgba(15, 23, 42, 0.7);
                border: 1px solid rgba(56, 189, 248, 0.35);
            }
            h1 {
                font-size: 1.4rem;
                margin-bottom: 1rem;
            }
            label {
                display: block;
                font-size: 0.9rem;
                margin-bottom: 0.35rem;
            }
            input[type="password"] {
                width: 100%;
                padding: 0.5rem 0.65rem;
                border-radius: 8px;
                border: 1px solid #4b5563;
                background: #020617;
                color: #e5e7eb;
            }
            button {
                margin-top: 1rem;
                width: 100%;
                padding: 0.6rem;
                border-radius: 999px;
                border: none;
                background: linear-gradient(to right, #3b82f6, #22c55e);
                color: white;
                font-weight: 600;
                cursor: pointer;
            }
            .error {
                color: #f97373;
                font-size: 0.85rem;
                margin-top: 0.5rem;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Fluxive Wi-Fi Support — Admin</h1>
            <form method="post">
                <input type="hidden" name="action" value="login">
                <label for="password">Admin password</label>
                <input type="password" id="password" name="password" required>
                <button type="submit">Log in</button>
                <?php if (!empty($loginError)): ?>
                    <div class="error"><?php echo htmlspecialchars($loginError); ?></div>
                <?php endif; ?>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// -----------------------------
// Logged in: handle status updates
// -----------------------------
try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    if (isset($_POST['action']) && $_POST['action'] === 'update_status') {
        $id     = (int)($_POST['id'] ?? 0);
        $status = $_POST['status'] ?? 'new';

        if ($id > 0 && in_array($status, ['new', 'in_progress', 'resolved'], true)) {
            $stmt = $pdo->prepare('UPDATE wifi_support_requests SET status = ? WHERE id = ?');
            $stmt->execute([$status, $id]);
        }
    }

    // Fetch tickets (newest first)
    $stmt = $pdo->query(
        'SELECT id, created_at, name, email, phone, company, location, issue_type, urgency, message, lang, status 
         FROM wifi_support_requests
         ORDER BY created_at DESC'
    );
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die('Database error');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wi-Fi Support Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        :root {
            color-scheme: dark;
        }
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #020617;
            color: #e5e7eb;
            margin: 0;
            padding: 0;
        }
        header {
            padding: 1rem 1.5rem;
            background: radial-gradient(circle at top left, #1e293b, #020617);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(148, 163, 184, 0.4);
        }
        header h1 {
            font-size: 1.25rem;
            margin: 0;
        }
        header a {
            color: #e5e7eb;
            font-size: 0.85rem;
            text-decoration: none;
            opacity: 0.85;
        }
        main {
            padding: 1rem 1.5rem 2rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
        }
        th, td {
            padding: 0.5rem 0.6rem;
            border-bottom: 1px solid rgba(31, 41, 55, 0.9);
            vertical-align: top;
        }
        th {
            text-align: left;
            font-weight: 600;
            background: rgba(15, 23, 42, 0.95);
            position: sticky;
            top: 0;
            z-index: 1;
        }
        tr:nth-child(even) td {
            background: rgba(15, 23, 42, 0.6);
        }
        tr:nth-child(odd) td {
            background: rgba(15, 23, 42, 0.9);
        }
        .status-pill {
            display: inline-block;
            padding: 0.15rem 0.55rem;
            border-radius: 999px;
            font-size: 0.75rem;
        }
        .status-new {
            background: rgba(248, 250, 252, 0.1);
            color: #f97316;
        }
        .status-in_progress {
            background: rgba(248, 250, 252, 0.1);
            color: #38bdf8;
        }
        .status-resolved {
            background: rgba(34, 197, 94, 0.1);
            color: #4ade80;
        }
        .status-form select {
            background: #020617;
            color: #e5e7eb;
            border-radius: 999px;
            border: 1px solid #4b5563;
            font-size: 0.75rem;
            padding: 0.15rem 0.4rem;
        }
        .status-form button {
            border-radius: 999px;
            border: none;
            background: #3b82f6;
            color: white;
            font-size: 0.75rem;
            padding: 0.15rem 0.45rem;
            margin-left: 0.25rem;
            cursor: pointer;
        }
        .message-cell {
            max-width: 260px;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .meta {
            font-size: 0.75rem;
            color: #9ca3af;
        }
        .tag-lang {
            font-size: 0.7rem;
            text-transform: uppercase;
            opacity: 0.8;
        }
    </style>
</head>
<body>
<header>
    <h1>Fluxive — Wi-Fi Support Tickets</h1>
    <a href="?logout=1">Log out</a>
</header>
<main>
    <table>
        <thead>
            <tr>
                <th># / Date</th>
                <th>Client</th>
                <th>Issue</th>
                <th>Message</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
        <?php if (empty($tickets)): ?>
            <tr>
                <td colspan="5">No tickets yet.</td>
            </tr>
        <?php else: ?>
            <?php foreach ($tickets as $t): ?>
                <tr>
                    <td>
                        <div>#<?php echo htmlspecialchars($t['id']); ?></div>
                        <div class="meta">
                            <?php echo htmlspecialchars($t['created_at']); ?>
                        </div>
                        <div class="meta tag-lang">
                            <?php echo htmlspecialchars($t['lang'] ?: '-'); ?>
                        </div>
                    </td>
                    <td>
                        <div><?php echo htmlspecialchars($t['name']); ?></div>
                        <div class="meta">
                            <?php echo htmlspecialchars($t['email']); ?>
                        </div>
                        <?php if (!empty($t['phone'])): ?>
                            <div class="meta">
                                📞 <?php echo htmlspecialchars($t['phone']); ?>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($t['company'])): ?>
                            <div class="meta">
                                🏢 <?php echo htmlspecialchars($t['company']); ?>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($t['location'])): ?>
                            <div class="meta">
                                📍 <?php echo htmlspecialchars($t['location']); ?>
                            </div>
                        <?php endif; ?>
                    </td>
                    <td>
                        <div><?php echo htmlspecialchars($t['issue_type']); ?></div>
                        <div class="meta">
                            Urgency: <?php echo htmlspecialchars($t['urgency']); ?>
                        </div>
                    </td>
                    <td class="message-cell">
                        <?php echo nl2br(htmlspecialchars($t['message'])); ?>
                    </td>
                    <td>
                        <div class="status-pill status-<?php echo htmlspecialchars($t['status']); ?>">
                            <?php echo htmlspecialchars($t['status']); ?>
                        </div>
                        <form method="post" class="status-form" style="margin-top: 0.35rem;">
                            <input type="hidden" name="action" value="update_status">
                            <input type="hidden" name="id" value="<?php echo htmlspecialchars($t['id']); ?>">
                            <select name="status">
                                <option value="new" <?php if ($t['status'] === 'new') echo 'selected'; ?>>new</option>
                                <option value="in_progress" <?php if ($t['status'] === 'in_progress') echo 'selected'; ?>>in_progress</option>
                                <option value="resolved" <?php if ($t['status'] === 'resolved') echo 'selected'; ?>>resolved</option>
                            </select>
                            <button type="submit">Save</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
        <?php endif; ?>
        </tbody>
    </table>
</main>
</body>
</html>
