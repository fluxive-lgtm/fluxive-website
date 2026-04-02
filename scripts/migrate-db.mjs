import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: 'interchange.proxy.rlwy.net',
  port: 50020,
  database: 'fluxive_db',
  user: 'fluxive_user',
  password: 'Fluxive@2026!',
  charset: 'utf8mb4',
});

console.log('✅ Connected to Railway MySQL');

const queries = [
  // Blog posts (matches PHP blog.php using Prisma-style "Post" table)
  `CREATE TABLE IF NOT EXISTS Post (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title TEXT,
    excerpt TEXT,
    content LONGTEXT,
    date VARCHAR(50),
    readingTime VARCHAR(50),
    category VARCHAR(100),
    authorName VARCHAR(255),
    authorRole VARCHAR(255),
    authorImage VARCHAR(500),
    image VARCHAR(500),
    coverImage VARCHAR(500),
    videoEmbed TEXT,
    tags TEXT,
    featured TINYINT(1) DEFAULT 0,
    media TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Reviews
  `CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Projects
  `CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_nl VARCHAR(255),
    title_fr VARCHAR(255),
    description TEXT,
    description_nl TEXT,
    description_fr TEXT,
    content_en LONGTEXT,
    content_nl LONGTEXT,
    content_fr LONGTEXT,
    image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Project media
  `CREATE TABLE IF NOT EXISTS project_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX (project_id)
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Admins
  `CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Admin tokens
  `CREATE TABLE IF NOT EXISTS admin_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(64) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Rate limits
  `CREATE TABLE IF NOT EXISTS rate_limits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    action VARCHAR(50) NOT NULL,
    request_time INT NOT NULL,
    INDEX (ip_address, action, request_time)
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Homepage settings
  `CREATE TABLE IF NOT EXISTS homepage_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_media_url VARCHAR(500) DEFAULT NULL,
    ad_media_type VARCHAR(50) DEFAULT 'image',
    ad_title VARCHAR(255) DEFAULT 'Featured Update',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Newsletter subscribers
  `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Contact requests
  `CREATE TABLE IF NOT EXISTS contact_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service VARCHAR(100),
    message TEXT,
    lang VARCHAR(10),
    status VARCHAR(50) DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // WiFi support requests
  `CREATE TABLE IF NOT EXISTS wifi_support_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    location VARCHAR(255),
    device VARCHAR(255),
    issue_type VARCHAR(100),
    urgency VARCHAR(50),
    message TEXT,
    lang VARCHAR(10),
    status VARCHAR(50) DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  // Idea submissions
  `CREATE TABLE IF NOT EXISTS idea_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idea TEXT NOT NULL,
    business_name VARCHAR(255),
    email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
];

for (const sql of queries) {
  const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1];
  await conn.execute(sql);
  console.log(`  ✅ Table ready: ${tableName}`);
}

// Seed homepage_settings row if empty
const [rows] = await conn.execute('SELECT COUNT(*) as cnt FROM homepage_settings');
if (rows[0].cnt === 0) {
  await conn.execute("INSERT INTO homepage_settings (ad_media_url, ad_media_type, ad_title) VALUES (NULL, 'image', 'Featured Update')");
  console.log('  ✅ Seeded homepage_settings');
}

// Seed default admin if empty (password: FluxiveAdmin2026!)
const [adminRows] = await conn.execute('SELECT COUNT(*) as cnt FROM admins');
if (adminRows[0].cnt === 0) {
  const bcrypt = await import('bcryptjs');
  const hash = await bcrypt.hash('FluxiveAdmin2026!', 10);
  await conn.execute('INSERT INTO admins (username, password_hash) VALUES (?, ?)', ['admin', hash]);
  console.log('  ✅ Seeded default admin (username: admin, password: FluxiveAdmin2026!)');
}

await conn.end();
console.log('\n🎉 Database migration complete!');
