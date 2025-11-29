<?php
// public/api/blog.php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];

// Helper to get JSON input
function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true);
}

// GET: Fetch posts
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? null;

    try {
        if ($slug) {
            $stmt = $pdo->prepare("SELECT * FROM posts WHERE slug = ?");
            $stmt->execute([$slug]);
            $post = $stmt->fetch();
            
            if ($post) {
                // Parse JSON tags
                $post['tags'] = json_decode($post['tags']);
                // Format author object to match frontend expectation
                $post['author'] = [
                    'name' => $post['authorName'],
                    'role' => $post['authorRole'],
                    'image' => $post['authorImage']
                ];
                // Boolean conversion
                $post['featured'] = (bool)$post['featured'];
                
                echo json_encode($post);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Post not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM posts ORDER BY date DESC");
            $posts = $stmt->fetchAll();
            
            // Format posts
            foreach ($posts as &$post) {
                $post['tags'] = json_decode($post['tags']);
                $post['author'] = [
                    'name' => $post['authorName'],
                    'role' => $post['authorRole'],
                    'image' => $post['authorImage']
                ];
                $post['featured'] = (bool)$post['featured'];
            }
            
            echo json_encode($posts);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// POST: Create or Update post
elseif ($method === 'POST') {
    $data = getJsonInput();
    
    // Basic validation
    if (empty($data['slug']) || empty($data['title'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    try {
        // Check if post exists
        $stmt = $pdo->prepare("SELECT id FROM posts WHERE slug = ?");
        $stmt->execute([$data['slug']]);
        $exists = $stmt->fetch();

        $authorName = $data['author']['name'] ?? 'Admin';
        $authorRole = $data['author']['role'] ?? 'Editor';
        $authorImage = $data['author']['image'] ?? null;
        $tags = json_encode($data['tags'] ?? []);
        $featured = !empty($data['featured']) ? 1 : 0;

        if ($exists) {
            // Update
            $sql = "UPDATE posts SET 
                    title = ?, excerpt = ?, content = ?, date = ?, readingTime = ?, 
                    category = ?, authorName = ?, authorRole = ?, authorImage = ?, 
                    image = ?, tags = ?, featured = ?, updatedAt = NOW()
                    WHERE slug = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $data['title'], $data['excerpt'], $data['content'], $data['date'], $data['readingTime'],
                $data['category'], $authorName, $authorRole, $authorImage,
                $data['image'], $tags, $featured,
                $data['slug']
            ]);
        } else {
            // Create
            $sql = "INSERT INTO posts (
                    id, slug, title, excerpt, content, date, readingTime, 
                    category, authorName, authorRole, authorImage, 
                    image, tags, featured, createdAt, updatedAt
                ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $data['slug'], $data['title'], $data['excerpt'], $data['content'], $data['date'], $data['readingTime'],
                $data['category'], $authorName, $authorRole, $authorImage,
                $data['image'], $tags, $featured
            ]);
        }

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// DELETE: Delete post
elseif ($method === 'DELETE') {
    $slug = $_GET['slug'] ?? null;

    if (!$slug) {
        http_response_code(400);
        echo json_encode(['error' => 'Slug is required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM posts WHERE slug = ?");
        $stmt->execute([$slug]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
