<?php
require_once 'db.php';

try {
    // 1. Create the projects table if it doesn't exist already to be safe
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_nl VARCHAR(255),
            title_fr VARCHAR(255),
            description TEXT NOT NULL,
            description_nl TEXT,
            description_fr TEXT,
            content_en LONGTEXT,
            content_nl LONGTEXT,
            content_fr LONGTEXT,
            image_url VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $stmt = $pdo->query("SELECT COUNT(*) FROM projects");
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        $demos = [
            [
                'title' => 'Hotel Wi-Fi Transformation',
                'title_nl' => 'Hotel Wi-Fi Transformatie',
                'title_fr' => 'Transformation Wi-Fi d\'Hôtel',
                'description' => 'Upgraded a 50-room boutique hotel from legacy copper wiring to a modern enterprise-grade Unifi Wi-Fi 6 mesh network, eliminating all dead zones.',
                'description_nl' => 'We hebben een boetiekhotel met 50 kamers geüpgraded van verouderde koperbedrading naar een modern zakelijk Unifi Wi-Fi 6 mesh-netwerk, waardoor alle dode hoeken zijn geëlimineerd.',
                'description_fr' => 'Mise à niveau complète du réseau d\'un hôtel-boutique de 50 chambres, passant d\'un câblage obsolète à un réseau maillé moderne Unifi Wi-Fi 6.',
                'image_url' => 'https://images.unsplash.com/photo-1542314831-c6a4d27eceb0?q=80&w=1000&auto=format&fit=crop',
                'content_en' => '## The Challenge\nThe hotel was experiencing severe connectivity issues, leading to poor guest reviews. The legacy routers were unable to penetrate the thick concrete walls of the historic building.\n\n## The Solution\nWe deployed 15 strategically placed Ubiquiti Access Points, managed via a cloud controller. We isolated the guest network from the staff network for security.\n\n## The Result\nWi-Fi complaints dropped to zero within the first month. The hotel recorded a 15% increase in positive TripAdvisor reviews referencing fast connection speeds.',
                'content_nl' => '## De Uitdaging\nHet hotel ondervond ernstige verbindingsproblemen, wat leidde tot slechte gastbeoordelingen. De oude routers konden niet door de dikke betonnen muren van het historische gebouw dringen.\n\n## De Oplossing\nWe hebben 15 strategisch geplaatste Ubiquiti Access Points geïnstalleerd, beheerd via een cloudcontroller.\n\n## Het Resultaat\nWi-Fi klachten daalden binnen de eerste maand naar nul.',
                'content_fr' => '## Le Défi\nL\'hôtel connaissait de graves problèmes de connectivité, entraînant de mauvaises critiques. Les anciens routeurs ne parvenaient pas à traverser les murs en béton.\n\n## La Solution\nNous avons déployé 15 points d\'accès Ubiquiti placés stratégiquement.\n\n## Le Résultat\nLes plaintes concernant le Wi-Fi sont tombées à zéro au cours du premier mois.'
            ],
            [
                'title' => 'Cybersecurity Awareness Training',
                'title_nl' => 'Cybersecurity Bewustwordingstraining',
                'title_fr' => 'Formation Sensibilisation Cybersécurité',
                'description' => 'Conducted live, interactive hacking demonstrations for a local municipality to train 100+ public servants on phishing and physical security threats.',
                'description_nl' => 'Live, interactieve hackdemonstraties gegeven voor een lokale gemeente om meer dan 100 ambtenaren te trainen in phishing en fysieke veiligheidsrisico\'s.',
                'description_fr' => 'Démonstrations de piratage interactives en direct pour former plus de 100 fonctionnaires communaux sur le phishing et les menaces de sécurité physique.',
                'image_url' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
                'content_en' => '## Scope\nThe commune requested a high-impact presentation to wake up their staff to modern cyber threats.\n\n## Execution\nUsing tools like the Flipper Zero and automated phishing campaigns, we demonstrated exactly how easy it is to compromise weak systems. We walked them through identifying fake emails and protecting physical access badges.',
                'content_nl' => '## Opgave\nDe gemeente vroeg om een impactvolle presentatie om hun medewerkers bewust te maken van moderne cyberdreigingen.\n\n## Uitvoering\nMet behulp van tools zoals de Flipper Zero toonden we aan hoe eenvoudig het is om zwakke systemen compromitteren.',
                'content_fr' => '## Portée\nLa commune a demandé une présentation à fort impact pour alerter son personnel sur les cybermenaces modernes.\n\n## Exécution\nÀ l\'aide d\'outils comme le Flipper Zero, nous avons démontré exactement à quel point il est facile de compromettre des systèmes.'
            ],
            [
                'title' => 'Custom Web Platform Build',
                'title_nl' => 'Maatwerk Webplatform',
                'title_fr' => 'Création Plateforme Web Sur Mesure',
                'description' => 'Developed a high-performance, SEO-optimized web application for a logistics company, completely replacing their sluggish 10-year-old WordPress site.',
                'description_nl' => 'Ontwikkeling van een krachtige, SEO-geoptimaliseerde webapplicatie voor een logistiek bedrijf, ter vervanging van hun trage 10 jaar oude WordPress-site.',
                'description_fr' => 'Développement d\'une application web performante et optimisée pour le référencement pour une entreprise de logistique, remplaçant leur site WordPress obsolète.',
                'image_url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
                'content_en' => '## The Build\nWe utilized Next.js and TailwindCSS to create a blazing-fast front-end. We integrated a custom headless CMS allowing their non-technical team to easily manage shipments, tracking numbers, and news updates asynchronously without affecting site speed.',
                'content_nl' => '## De Ontwikkeling\nWe hebben Next.js en TailwindCSS gebruikt om een razendsnelle front-end te creëren. Geïntegreerd met een speciaal CMS.',
                'content_fr' => '## La Conception\nNous avons utilisé Next.js et TailwindCSS pour créer une interface ultra-rapide, couplée à un CMS sur mesure pour leur équipe.'
            ]
        ];

        $insert = $pdo->prepare("
            INSERT INTO projects (title, title_nl, title_fr, description, description_nl, description_fr, content_en, content_nl, content_fr, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        foreach ($demos as $demo) {
            $insert->execute([
                $demo['title'],
                $demo['title_nl'],
                $demo['title_fr'],
                $demo['description'],
                $demo['description_nl'],
                $demo['description_fr'],
                $demo['content_en'],
                $demo['content_nl'],
                $demo['content_fr'],
                $demo['image_url']
            ]);
        }
        echo json_encode(["success" => true, "message" => "Added 3 demo projects."]);
    } else {
        echo json_encode(["success" => true, "message" => "Projects already exist, skipping demo insertion."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "DB Error: " . $e->getMessage()]);
}
?>
