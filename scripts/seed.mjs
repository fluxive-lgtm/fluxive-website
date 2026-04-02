// scripts/seed.mjs
// Run: node scripts/seed.mjs
// Seeds the default admin account after `prisma migrate deploy`

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Seed default admin (password: FluxiveAdmin2026!)
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
}

await prisma.$disconnect();
console.log('🎉 Seed complete');
