import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB, { prisma } from '../../config/database.js';
import { USER_ROLES } from '../../config/constants.js';
import { createSlug } from '../../utils/slugUtils.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_PASSWORD = '123456';
const LAYOUT_SETTINGS_KEY = 'layout';
const RESET_USER_PASSWORDS = process.env.SEED_RESET_USER_PASSWORDS === 'true';
const SEED_ARTICLES = process.env.SEED_ARTICLES !== 'false';
const SEED_SAMPLE_ADS = process.env.SEED_SAMPLE_ADS !== 'false';
const SEED_REELS = process.env.SEED_REELS !== 'false';

const defaultLayoutSettings = {
  adsEnabled: true,
  homepageLeadId: null,
  homepageSecondaryIds: [],
  sectionPromoBySlug: {},
  mostReadOverrideIds: [],
};

const defaultCategories = [
  {
    nameEn: 'Politics',
    nameBn: 'রাজনীতি',
    slug: 'politics',
    descriptionEn: 'Political news and updates',
    descriptionBn: 'রাজনৈতিক সংবাদ এবং আপডেট',
    order: 1,
  },
  {
    nameEn: 'Business',
    nameBn: 'ব্যবসা',
    slug: 'business',
    descriptionEn: 'Business and economy news',
    descriptionBn: 'ব্যবসা এবং অর্থনীতি সংবাদ',
    order: 2,
  },
  {
    nameEn: 'Sports',
    nameBn: 'খেলাধুলা',
    slug: 'sports',
    descriptionEn: 'Sports news and updates',
    descriptionBn: 'খেলাধুলার সংবাদ এবং আপডেট',
    order: 3,
  },
  {
    nameEn: 'Entertainment',
    nameBn: 'বিনোদন',
    slug: 'entertainment',
    descriptionEn: 'Entertainment and celebrity news',
    descriptionBn: 'বিনোদন এবং সেলিব্রিটি সংবাদ',
    order: 4,
  },
  {
    nameEn: 'Technology',
    nameBn: 'প্রযুক্তি',
    slug: 'technology',
    descriptionEn: 'Technology and innovation news',
    descriptionBn: 'প্রযুক্তি এবং উদ্ভাবন সংবাদ',
    order: 5,
  },
  {
    nameEn: 'International',
    nameBn: 'আন্তর্জাতিক',
    slug: 'international',
    descriptionEn: 'International news',
    descriptionBn: 'আন্তর্জাতিক সংবাদ',
    order: 6,
  },
  {
    nameEn: 'Health',
    nameBn: 'স্বাস্থ্য',
    slug: 'health',
    descriptionEn: 'Health and wellness news',
    descriptionBn: 'স্বাস্থ্য এবং সুস্থতা সংবাদ',
    order: 7,
  },
  {
    nameEn: 'Education',
    nameBn: 'শিক্ষা',
    slug: 'education',
    descriptionEn: 'Education news and updates',
    descriptionBn: 'শিক্ষা সংবাদ এবং আপডেট',
    order: 8,
  },
];

const defaultReels = [
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

const defaultAdvertisements = [
  {
    name: 'Seed Top Banner',
    titleEn: 'Top Banner Advertisement',
    titleBn: 'টপ ব্যানার বিজ্ঞাপন',
    descriptionEn: 'Default top banner for homepage testing.',
    descriptionBn: 'হোমপেজ পরীক্ষার জন্য ডিফল্ট টপ ব্যানার।',
    type: 'banner',
    position: 'top',
    image: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Business analytics advertisement banner',
        bn: 'ব্যবসায়িক বিশ্লেষণ বিজ্ঞাপন ব্যানার',
      },
    },
    linkUrl: 'https://thecontemporary.news',
    openInNewTab: true,
    priority: 100,
    displayPages: ['home', 'all'],
    isActive: true,
    categorySlugs: ['business'],
  },
  {
    name: 'Seed Sidebar Sponsor',
    titleEn: 'Sidebar Sponsor',
    titleBn: 'সাইডবার স্পনসর',
    descriptionEn: 'Default sidebar advertisement for listing pages.',
    descriptionBn: 'লিস্টিং পেজের জন্য ডিফল্ট সাইডবার বিজ্ঞাপন।',
    type: 'sidebar',
    position: 'sidebar_top',
    image: {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      alt: {
        en: 'Travel sponsor sidebar advertisement',
        bn: 'ভ্রমণ স্পনসর সাইডবার বিজ্ঞাপন',
      },
    },
    linkUrl: 'https://thecontemporary.news',
    openInNewTab: true,
    priority: 80,
    displayPages: ['home', 'category', 'all'],
    isActive: true,
    categorySlugs: ['international', 'entertainment'],
  },
];

const isPlainObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const seedUsers = async () => {
  const users = [
    {
      role: USER_ROLES.SUPER_ADMIN,
      envPrefix: 'SUPER_ADMIN',
      defaultName: 'Super Admin',
      defaultEmail: 'admin@newsportal.com',
    },
    {
      role: USER_ROLES.ADMIN,
      envPrefix: 'ADMIN',
      defaultName: 'Admin',
      defaultEmail: 'admin.staff@newsportal.com',
    },
    {
      role: USER_ROLES.EDITORIAL,
      envPrefix: 'EDITORIAL',
      defaultName: 'Editorial',
      defaultEmail: 'editorial@newsportal.com',
    },
  ];

  let created = 0;
  let updated = 0;

  for (const userConfig of users) {
    const name = process.env[`${userConfig.envPrefix}_NAME`] || userConfig.defaultName;
    const email = process.env[`${userConfig.envPrefix}_EMAIL`] || userConfig.defaultEmail;
    const password = process.env[`${userConfig.envPrefix}_PASSWORD`] || DEFAULT_PASSWORD;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      const data = {
        name,
        role: userConfig.role,
        isActive: true,
        isEmailVerified: true,
      };

      if (RESET_USER_PASSWORDS) {
        data.password = hashedPassword;
      }

      await prisma.user.update({
        where: { email },
        data,
      });
      updated++;
    } else {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: userConfig.role,
          isActive: true,
          isEmailVerified: true,
        },
      });
      created++;
    }
  }

  return { created, updated };
};

const seedCategories = async () => {
  let created = 0;
  let updated = 0;

  for (const category of defaultCategories) {
    const existing = await prisma.category.findUnique({ where: { slug: category.slug } });

    if (existing) {
      await prisma.category.update({
        where: { slug: category.slug },
        data: {
          ...category,
          showInMenu: true,
          isActive: true,
        },
      });
      updated++;
    } else {
      await prisma.category.create({
        data: {
          ...category,
          showInMenu: true,
          isActive: true,
        },
      });
      created++;
    }
  }

  return { created, updated };
};

const getSeedAuthor = async () => {
  return prisma.user.findFirst({
    where: {
      role: {
        in: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.EDITORIAL],
      },
      isActive: true,
    },
    orderBy: { createdAt: 'asc' },
  });
};

const buildArticleRecord = (articleItem, categoryId, authorId) => {
  const wordCount = articleItem.content.en.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  const status = articleItem.status || 'draft';

  return {
    titleEn: articleItem.title.en,
    titleBn: articleItem.title.bn,
    slug: createSlug(articleItem.title.en),
    excerptEn: articleItem.excerpt?.en || null,
    excerptBn: articleItem.excerpt?.bn || null,
    contentEn: articleItem.content.en,
    contentBn: articleItem.content.bn,
    featuredImage: articleItem.featuredImage || null,
    gallery: articleItem.gallery || null,
    tags: articleItem.tags || null,
    status,
    scheduledAt: articleItem.scheduledAt ? new Date(articleItem.scheduledAt) : null,
    isFeatured: articleItem.isFeatured || false,
    isBreaking: articleItem.isBreaking || false,
    isTrending: articleItem.isTrending || false,
    readTime,
    metaTitleEn: articleItem.metaTitle?.en || articleItem.title.en,
    metaTitleBn: articleItem.metaTitle?.bn || articleItem.title.bn,
    metaDescriptionEn: articleItem.metaDescription?.en || articleItem.excerpt?.en || null,
    metaDescriptionBn: articleItem.metaDescription?.bn || articleItem.excerpt?.bn || null,
    metaKeywords: articleItem.metaKeywords || [],
    allowComments: articleItem.allowComments !== false,
    categoryId,
    authorId,
  };
};

const seedArticles = async () => {
  if (!SEED_ARTICLES) {
    return { skipped: true, created: 0, updated: 0 };
  }

  const articleDataPath = path.join(__dirname, '../../../article-seed.json');
  if (!fs.existsSync(articleDataPath)) {
    return { skipped: true, created: 0, updated: 0, reason: 'article-seed.json not found' };
  }

  const author = await getSeedAuthor();
  if (!author) {
    return { skipped: true, created: 0, updated: 0, reason: 'no active content author found' };
  }

  const articleSeedData = JSON.parse(fs.readFileSync(articleDataPath, 'utf-8'));
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const articleItem of articleSeedData) {
    const slug = createSlug(articleItem.title.en);
    const category =
      (await prisma.category.findUnique({ where: { slug: articleItem.category } })) ||
      (await prisma.category.findFirst({ orderBy: { order: 'asc' } }));

    if (!category) {
      skipped++;
      continue;
    }

    const data = buildArticleRecord(articleItem, category.id, author.id);
    const existing = await prisma.article.findUnique({ where: { slug } });

    if (existing) {
      await prisma.article.update({
        where: { slug },
        data: {
          ...data,
          publishedAt:
            data.status === 'published' ? existing.publishedAt || new Date() : existing.publishedAt,
        },
      });
      updated++;
    } else {
      await prisma.article.create({
        data: {
          ...data,
          publishedAt: data.status === 'published' ? new Date() : null,
          views: 0,
          likes: 0,
          shares: 0,
        },
      });
      created++;
    }
  }

  return { skipped: false, created, updated, articleSkipped: skipped };
};

const seedReels = async () => {
  if (!SEED_REELS) {
    return { skipped: true, created: 0, updated: 0 };
  }

  let created = 0;
  let updated = 0;

  for (const reelData of defaultReels) {
    const existing = await prisma.reel.findFirst({ where: { url: reelData.url } });

    if (existing) {
      await prisma.reel.update({ where: { id: existing.id }, data: reelData });
      updated++;
    } else {
      await prisma.reel.create({ data: reelData });
      created++;
    }
  }

  return { created, updated };
};

const seedAdvertisements = async () => {
  if (!SEED_SAMPLE_ADS) {
    return { skipped: true, created: 0, updated: 0 };
  }

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 1);
  const endDate = new Date(now);
  endDate.setFullYear(endDate.getFullYear() + 1);

  let created = 0;
  let updated = 0;

  for (const ad of defaultAdvertisements) {
    const { categorySlugs, ...adData } = ad;
    const categories = await prisma.category.findMany({
      where: { slug: { in: categorySlugs } },
      select: { id: true },
    });
    const categoryLinks = categories.map((category) => ({
      category: { connect: { id: category.id } },
    }));

    const existing = await prisma.advertisement.findFirst({ where: { name: ad.name } });
    const data = {
      ...adData,
      startDate,
      endDate,
    };

    if (existing) {
      await prisma.advertisement.update({
        where: { id: existing.id },
        data: {
          ...data,
          categories: {
            deleteMany: {},
            create: categoryLinks,
          },
        },
      });
      updated++;
    } else {
      await prisma.advertisement.create({
        data: {
          ...data,
          categories: categoryLinks.length ? { create: categoryLinks } : undefined,
        },
      });
      created++;
    }
  }

  return { created, updated };
};

const seedLayoutSettings = async () => {
  const existing = await prisma.siteSetting.findUnique({
    where: { key: LAYOUT_SETTINGS_KEY },
  });
  const existingValue = isPlainObject(existing?.value) ? existing.value : {};
  const value = {
    ...defaultLayoutSettings,
    ...existingValue,
  };

  await prisma.siteSetting.upsert({
    where: { key: LAYOUT_SETTINGS_KEY },
    create: {
      key: LAYOUT_SETTINGS_KEY,
      value,
    },
    update: {
      value,
    },
  });

  return { created: existing ? 0 : 1, updated: existing ? 1 : 0 };
};

const runUniversalSeed = async () => {
  try {
    await connectDB();

    console.log('Starting universal database seed...');

    const users = await seedUsers();
    const categories = await seedCategories();
    const layoutSettings = await seedLayoutSettings();
    const reels = await seedReels();
    const advertisements = await seedAdvertisements();
    const articles = await seedArticles();

    console.log('Universal seed completed successfully.');
    console.table({
      users,
      categories,
      layoutSettings,
      reels,
      advertisements,
      articles,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Default password for newly created seed users: ${DEFAULT_PASSWORD}`);
      console.log('Set SEED_RESET_USER_PASSWORDS=true if you intentionally need to reset them.');
    }
  } catch (error) {
    console.error('Universal seed failed:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

runUniversalSeed();
