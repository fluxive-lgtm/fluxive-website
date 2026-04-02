// scripts/seed.mjs
// Run: DATABASE_URL="..." node scripts/seed.mjs

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Seed default admin
const adminCount = await prisma.admin.count();
if (adminCount === 0) {
  const hash = await bcrypt.hash('FluxiveAdmin2026!', 10);
  await prisma.admin.create({ data: { username: 'admin', passwordHash: hash } });
  console.log('✅ Seeded admin (username: admin, password: FluxiveAdmin2026!)');
} else {
  console.log('ℹ️  Admin already exists, skipping');
}

// Seed homepage settings
const settingsCount = await prisma.homepageSetting.count();
if (settingsCount === 0) {
  await prisma.homepageSetting.create({ data: { adMediaType: 'image', adTitle: 'Featured Update' } });
  console.log('✅ Seeded homepage settings');
} else {
  console.log('ℹ️  Homepage settings already exist, skipping');
}

await prisma.$disconnect();
await pool.end();
console.log('🎉 Seed complete');
