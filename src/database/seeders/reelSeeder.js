import dotenv from 'dotenv';
import connectDB, { prisma } from '../../config/database.js';

dotenv.config();

const reels = [
  {
    title: 'City Floods: Live Rescue Update',
    url: 'https://www.youtube.com/shorts/9bZkp7q19f0',
    description: 'Short rescue update clip for testing the public and admin reels pages.',
    isActive: true,
  },
  {
    title: 'Election Brief: Morning Highlights',
    url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    description: 'Quick political recap used as active seeded reel content.',
    isActive: true,
  },
  {
    title: 'Sports Desk: Training Ground Moment',
    url: 'https://www.youtube.com/shorts/jNQXAC9IVRw',
    description: 'Sports short for reels grid and CMS list testing.',
    isActive: true,
  },
  {
    title: 'Draft Reel: Internal Promo',
    url: 'https://www.youtube.com/shorts/ScMzIvxBSi4',
    description: 'Inactive reel that should appear in admin lists but not public lists.',
    isActive: false,
  },
];

const seedReels = async () => {
  try {
    await connectDB();

    let created = 0;
    let updated = 0;

    for (const reelData of reels) {
      const existing = await prisma.reel.findFirst({
        where: { url: reelData.url },
      });

      if (existing) {
        await prisma.reel.update({
          where: { id: existing.id },
          data: reelData,
        });
        updated++;
      } else {
        await prisma.reel.create({ data: reelData });
        created++;
      }
    }

    console.log('Reel seed completed successfully.');
    console.log(`Created: ${created}`);
    console.log(`Updated: ${updated}`);
  } catch (error) {
    console.error('Reel seed failed:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

seedReels();
