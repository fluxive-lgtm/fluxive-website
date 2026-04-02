<?php
// public/api/blog.php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];

// Helper to get JSON input
function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true);
}

// Helper to decode JSON fields if they are strings
function decodeMultilingualFields($post) {
    $fields = ['title', 'excerpt', 'content'];
    foreach ($fields as $field) {
        if (isset($post[$field])) {
            $decoded = json_decode($post[$field], true);
            // If it decodes to an array/object, use it. Otherwise keep original string (legacy support)
            if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_object($decoded))) {
                $post[$field] = $decoded;
            }
        }
    }
    return $post;
}

// GET: Fetch posts
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? null;

    try {
        if ($slug) {
            $stmt = $pdo->prepare("SELECT * FROM Post WHERE slug = ?");
            $stmt->execute([$slug]);
            $post = $stmt->fetch();
            
            if ($post) {
                // Parse JSON tags
                $post['tags'] = json_decode($post['tags']);
                $post['media'] = json_decode($post['media'] ?? '[]');
                // Format author object to match frontend expectation
                $post['author'] = [
                    'name' => $post['authorName'],
                    'role' => $post['authorRole'],
                    'image' => $post['authorImage']
                ];
                // Boolean conversion
                $post['featured'] = (bool)$post['featured'];
                
                // Decode multilingual fields
                $post = decodeMultilingualFields($post);

                echo json_encode($post);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Post not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM Post ORDER BY date DESC");
            $posts = $stmt->fetchAll();
            
            // Format posts
            foreach ($posts as &$post) {
                $post['tags'] = json_decode($post['tags']);
                $post['media'] = json_decode($post['media'] ?? '[]');
                $post['author'] = [
                    'name' => $post['authorName'],
                    'role' => $post['authorRole'],
                    'image' => $post['authorImage']
                ];
                $post['featured'] = (bool)$post['featured'];
                
                // Decode multilingual fields
                $post = decodeMultilingualFields($post);
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
    if (empty($data['slug'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    try {
        // Check if post exists
        $stmt = $pdo->prepare("SELECT id FROM Post WHERE slug = ?");
        $stmt->execute([$data['slug']]);
        $exists = $stmt->fetch();

        $authorName = $data['author']['name'] ?? 'Admin';
        $authorRole = $data['author']['role'] ?? 'Editor';
        $authorImage = $data['author']['image'] ?? null;
        $authorImage = $data['author']['image'] ?? null;
        $tags = json_encode($data['tags'] ?? []);
        $media = json_encode($data['media'] ?? []);
        $featured = !empty($data['featured']) ? 1 : 0;
        $coverImage = $data['coverImage'] ?? null;
        $videoEmbed = $data['videoEmbed'] ?? null;

        // Handle multilingual fields: if array/object, json_encode it
        $title = is_array($data['title']) || is_object($data['title']) ? json_encode($data['title']) : $data['title'];
        $excerpt = is_array($data['excerpt']) || is_object($data['excerpt']) ? json_encode($data['excerpt']) : $data['excerpt'];
        $content = is_array($data['content']) || is_object($data['content']) ? json_encode($data['content']) : $data['content'];

        if ($exists) {
        // Sanitize videoEmbed (Allow only iframe from trusted sources)
        $videoEmbed = $data['videoEmbed'] ?? null;
        if ($videoEmbed) {
            // Simple check: must be an iframe and contain youtube or vimeo
            if (!preg_match('/^<iframe.*src=["\']https?:\/\/(www\.)?(youtube\.com|vimeo\.com|player\.vimeo\.com).*iframe>$/i', $videoEmbed)) {
                $videoEmbed = null; // Invalid video embed
            }
        }
            // Update
            $sql = "UPDATE Post SET 
                    title = ?, excerpt = ?, content = ?, date = ?, readingTime = ?, 
                    category = ?, authorName = ?, authorRole = ?, authorImage = ?, 
                    image = ?, coverImage = ?, videoEmbed = ?, tags = ?, featured = ?, media = ?, updatedAt = NOW()
                    WHERE slug = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $title, $excerpt, $content, $data['date'], $data['readingTime'],
                $data['category'], $authorName, $authorRole, $authorImage,
                $data['image'], $coverImage, $videoEmbed, $tags, $featured, $media,
                $data['slug']
            ]);
        } else {
            // Sanitize videoEmbed (Allow only iframe from trusted sources)
            $videoEmbed = $data['videoEmbed'] ?? null;
            if ($videoEmbed) {
                 if (!preg_match('/^<iframe.*src=["\']https?:\/\/(www\.)?(youtube\.com|vimeo\.com|player\.vimeo\.com).*iframe>$/i', $videoEmbed)) {
                    $videoEmbed = null;
                }
            }

            // Create
            $sql = "INSERT INTO Post (
                    id, slug, title, excerpt, content, date, readingTime, 
                    category, authorName, authorRole, authorImage, 
                    image, coverImage, videoEmbed, tags, featured, media, createdAt, updatedAt
                ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $data['slug'], $title, $excerpt, $content, $data['date'], $data['readingTime'],
                $data['category'], $authorName, $authorRole, $authorImage,
                $data['image'], $coverImage, $videoEmbed, $tags, $featured, $media
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
        $stmt = $pdo->prepare("DELETE FROM Post WHERE slug = ?");
        $stmt->execute([$slug]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
