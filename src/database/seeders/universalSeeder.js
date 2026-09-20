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
const SEED_CLEAN_ARTICLES = process.env.SEED_CLEAN_ARTICLES !== 'false';
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
    nameEn: 'Explainer',
    nameBn: 'এক্সপ্লেইনার',
    slug: 'explainer',
    descriptionEn: 'In-depth explainers and context on major issues',
    descriptionBn: 'গুরুত্বপূর্ণ বিষয়ের বিশদ ও সহজবোধ্য ব্যাখ্যা',
    order: 1,
  },
  {
    nameEn: 'Politics',
    nameBn: 'রাজনীতি',
    slug: 'politics',
    descriptionEn: 'Political news, parliament, and governance',
    descriptionBn: 'রাজনৈতিক সংবাদ, সংসদ ও শাসন ব্যবস্থা',
    order: 2,
  },
  {
    nameEn: 'Business',
    nameBn: 'ব্যবসা',
    slug: 'business',
    descriptionEn: 'Business, finance, trade, and economy',
    descriptionBn: 'ব্যবসা, অর্থায়ন, বাণিজ্য ও অর্থনীতি',
    order: 3,
  },
  {
    nameEn: 'Bangladesh',
    nameBn: 'বাংলাদেশ',
    slug: 'bangladesh',
    descriptionEn: 'National and regional news across Bangladesh',
    descriptionBn: 'সারাদেশের জাতীয় ও আঞ্চলিক সংবাদ',
    order: 4,
  },
  {
    nameEn: 'International',
    nameBn: 'ইন্টারন্যাশনাল',
    slug: 'international',
    descriptionEn: 'Global affairs, geopolitics, and international news',
    descriptionBn: 'আন্তর্জাতিক সংবাদ ও বিশ্ব পরিস্থিতি',
    order: 5,
  },
  {
    nameEn: 'Opinion',
    nameBn: 'মতামত',
    slug: 'opinion',
    descriptionEn: 'Editorials, columns, and analytical commentary',
    descriptionBn: 'সম্পাদকীয়, মতামত ও মন্তব্য কলাম',
    order: 6,
  },
  {
    nameEn: 'Social Media',
    nameBn: 'সোশ্যাল মিডিয়া',
    slug: 'social-media',
    descriptionEn: 'Trending conversations, viral topics, and digital culture',
    descriptionBn: 'সামাজিক যোগাযোগ মাধ্যমের আলোচিত বিষয় ও ট্রেন্ডিং খবর',
    order: 7,
  },
  {
    nameEn: 'Entertainment',
    nameBn: 'বিনোদন',
    slug: 'entertainment',
    descriptionEn: 'Cinema, music, theatre, and pop culture',
    descriptionBn: 'চলচ্চিত্র, নাটক, সঙ্গীত ও সংস্কৃতি',
    order: 8,
  },
  {
    nameEn: 'Feature',
    nameBn: 'ফিচার',
    slug: 'feature',
    descriptionEn: 'Special stories, human interest, and lifestyle features',
    descriptionBn: 'বিশেষ প্রতিবেদন, জীবনযাত্রা ও মানবিক গল্প',
    order: 9,
  },
  {
    nameEn: 'Literature - Dhumketu',
    nameBn: 'সাহিত্য- ধূমকেতু',
    slug: 'literature-dhumketu',
    descriptionEn: 'Literary essays, poems, book reviews, and creative arts',
    descriptionBn: 'সাহিত্য, কবিতা, বই পর্যালোচনা ও সৃজনশীল রচনা',
    order: 10,
  },
  {
    nameEn: 'Fact Check',
    nameBn: 'ফ্যাক্টচেক',
    slug: 'fact-check',
    descriptionEn: 'Fact verification, misinformation analysis, and myth busting',
    descriptionBn: 'তথ্য যাচাই ও সঠিক তথ্যের অনুসন্ধান',
    order: 11,
  },
  {
    nameEn: 'Sports',
    nameBn: 'খেলাধুলা',
    slug: 'sports',
    descriptionEn: 'Sports news, cricket, football, and tournaments',
    descriptionBn: 'খেলাধুলার সংবাদ, ক্রিকেট, ফুটবল ও টুর্নামেন্ট',
    order: 12,
  },
  {
    nameEn: 'Technology',
    nameBn: 'প্রযুক্তি',
    slug: 'technology',
    descriptionEn: 'Technology, gadgets, AI, and digital innovation',
    descriptionBn: 'প্রযুক্তি, উদ্ভাবন, গ্যাজেট ও ডিজিটাল জগৎ',
    order: 13,
  },
  {
    nameEn: 'Health',
    nameBn: 'স্বাস্থ্য',
    slug: 'health',
    descriptionEn: 'Health, wellness, medical advances, and fitness',
    descriptionBn: 'স্বাস্থ্যসেবা, সুস্থতা ও চিকিৎসা বিজ্ঞানের খবর',
    order: 14,
  },
  {
    nameEn: 'Education',
    nameBn: 'শিক্ষা',
    slug: 'education',
    descriptionEn: 'Schools, universities, research, and career insights',
    descriptionBn: 'শিক্ষা সংবাদ, বিশ্ববিদ্যালয় ও ক্যারিয়ার ভাবনা',
    order: 15,
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
    title: 'Tech Pulse: AI Revolution in 60s',
    url: 'https://www.youtube.com/shorts/kJQP7kiw5Fk',
    description: 'Rapid overview of modern machine learning breakthroughs.',
    isActive: true,
  },
  {
    title: 'Culture Beat: Behind the Scenes at Festival',
    url: 'https://www.youtube.com/shorts/fJ9rUzIMcZQ',
    description: 'Exclusive look at backstage festival performances.',
    isActive: true,
  },
  {
    title: 'Nature Watch: River Delta Wildlife',
    url: 'https://www.youtube.com/shorts/L_LUpnjgPso',
    description: 'Short documentary clip of coastal ecosystem and mangroves.',
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
    descriptionEn: 'Default top banner for homepage and category testing.',
    descriptionBn: 'হোমপেজ ও ক্যাটাগরি পরীক্ষার জন্য ডিফল্ট টপ ব্যানার।',
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
    categorySlugs: ['business', 'politics'],
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
  {
    name: 'Seed In-Content Sponsor',
    titleEn: 'Health and Tech Innovation Sponsor',
    titleBn: 'স্বাস্থ্য ও প্রযুক্তি উদ্ভাবনী স্পনসর',
    descriptionEn: 'In-content native advertisement for article reading experience.',
    descriptionBn: 'নিউজ আর্টিকেলের ভেতরে প্রদর্শনের জন্য নেটিভ বিজ্ঞাপন।',
    type: 'in_content',
    position: 'middle',
    image: {
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Modern team collaboration and technology sponsor',
        bn: 'আধুনিক টিম ও প্রযুক্তি স্পনসর বিজ্ঞাপন',
      },
    },
    linkUrl: 'https://thecontemporary.news',
    openInNewTab: true,
    priority: 70,
    displayPages: ['article', 'all'],
    isActive: true,
    categorySlugs: ['technology', 'health'],
  },
  {
    name: 'Seed Bottom Banner',
    titleEn: 'Education & Global Forum Banner',
    titleBn: 'শিক্ষা ও আন্তর্জাতিক ফোরাম ব্যানার',
    descriptionEn: 'Bottom placement banner for page footers.',
    descriptionBn: 'পেজের নিচের অংশের জন্য পূর্ণ ব্যানার বিজ্ঞাপন।',
    type: 'banner',
    position: 'bottom',
    image: {
      url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
      alt: {
        en: 'Creative learning and education forum banner',
        bn: 'সৃজনশীল শিক্ষা ও একাডেমি ফোরাম ব্যানার',
      },
    },
    linkUrl: 'https://thecontemporary.news',
    openInNewTab: true,
    priority: 60,
    displayPages: ['home', 'category', 'all'],
    isActive: true,
    categorySlugs: ['education', 'sports'],
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
  const publishedAt = articleItem.publishedAt
    ? new Date(articleItem.publishedAt)
    : status === 'published'
      ? new Date()
      : null;

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
    publishedAt,
    scheduledAt: articleItem.scheduledAt ? new Date(articleItem.scheduledAt) : null,
    isFeatured: articleItem.isFeatured || false,
    isBreaking: articleItem.isBreaking || false,
    isTrending: articleItem.isTrending || false,
    views: typeof articleItem.views === 'number' ? articleItem.views : 0,
    likes: typeof articleItem.likes === 'number' ? articleItem.likes : 0,
    shares: typeof articleItem.shares === 'number' ? articleItem.shares : 0,
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

  if (SEED_CLEAN_ARTICLES) {
    const existingCount = await prisma.article.count();
    if (existingCount > 0) {
      console.log(`Cleaning ${existingCount} existing articles before seeding fresh dataset...`);
      await prisma.article.deleteMany({});
      console.log('Existing articles cleared.');
    }
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
          publishedAt: data.publishedAt || existing.publishedAt,
        },
      });
      updated++;
    } else {
      await prisma.article.create({
        data,
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
