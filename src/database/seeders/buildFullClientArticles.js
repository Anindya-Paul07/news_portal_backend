import fs from 'fs';
import path from 'path';

const now = Date.now();
const hour = 3600 * 1000;

const getPublishedDate = (hoursAgo) => {
  return new Date(now - (hoursAgo + 0.5) * hour).toISOString();
};

// Load existing articles
const existingArticlesPath = path.resolve('article-seed.json');
let existing = [];
if (fs.existsSync(existingArticlesPath)) {
  existing = JSON.parse(fs.readFileSync(existingArticlesPath, 'utf8'));
}

// New client articles for the remaining categories
const newClientArticles = [
  // ==========================================
  // EXPLAINER (3 articles)
  // ==========================================
  {
    title: {
      en: "How Does Bangladesh's Power Grid Transition to Renewable Solar Energy Work?",
      bn: "বাংলাদেশে নবায়নযোগ্য সৌরবিদ্যুতের গ্রিড রূপান্তর কীভাবে কাজ করে?"
    },
    slug: "how-does-bangladeshs-power-grid-transition-to-renewable-solar-energy-work",
    content: {
      en: "<p>The ambitious transition toward renewable energy in developing economies demands both structural capital and cutting-edge electrical grid engineering. In Bangladesh, where daytime solar potential peaks above standard tropical baselines, integrating distributed rooftop photovoltaic installations with high-voltage regional transmission requires sophisticated real-time frequency stabilization.</p><p>Specialized engineers explain that decentralized microgrids equipped with automated smart-inverters can mitigate traditional curtailment issues. By feeding excess industrial rooftop solar capacity into regional distribution sub-stations during midday hours, overall fossil fuel dependency diminishes significantly.</p><p>As regulatory frameworks streamline net-metering protocols for garment manufacturing units and agro-processing clusters, clean solar generation is evolving from an environmental aspiration into a commercially viable industrial standard.</p>",
      bn: "<p>উন্নয়নশীল অর্থনীতিতে নবায়নযোগ্য জ্বালানির পথে যাত্রা কেবল মূলধন বিনিয়োগের বিষয় নয়, এটি জটিল গ্রিড ইঞ্জিনিয়ারিংয়ের সাথে জড়িত। বাংলাদেশে গ্রীষ্মমণ্ডলীয় রোদকে কাজে লাগিয়ে শিল্পকারখানার ছাদে স্থাপিত সৌরবিদ্যুৎ জাতীয় গ্রিডের সাথে যুক্ত করতে বাস্তবমুখী প্রযুক্তির ব্যবহার শুরু হয়েছে।</p><p>বিশেষজ্ঞ প্রকৌশলীদের মতে, আধুনিক স্মার্ট-ইনভার্টার প্রযুক্তিসম্পন্ন মাইক্রোগ্রিড গ্রিডের লোড সামাল দিতে অত্যন্ত কার্যকর। দুপুরের পিক আওয়ারে অতিরিক্ত সৌরবিদ্যুৎ সাব-স্টেশনে সরবরাহের মাধ্যমে জীবাশ্ম জ্বালানি বা ডিজেল-ভিত্তিক কেন্দ্রের ওপর নির্ভরতা নাটকীয়ভাবে কমানো সম্ভব।</p><p>রপ্তানিমুখী পোশাক কারখানা ও বাণিজ্যিক ভবনগুলোতে নেট-মিটারিং নীতিমালা সহজ করায় পরিবেশবান্ধব সবুজ জ্বালানি এখন টেকসই শিল্পের অবিচ্ছেদ্য অঙ্গে রূপ নিয়েছে।</p>"
    },
    excerpt: {
      en: "A comprehensive technical breakdown of how distributed solar rooftops connect with national sub-stations through smart net-metering.",
      bn: "স্মার্ট নেট-মিটারিং এবং গ্রিড স্ট্যাবিলাইজার ব্যবহারের মাধ্যমে ছাদভিত্তিক সৌরবিদ্যুৎ জাতীয় গ্রিডে যুক্ত হওয়ার সহজবোধ্য ব্যাখ্যা।"
    },
    category: "explainer",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Modern solar panels absorbing sunlight on renewable farm",
        bn: "নবায়নযোগ্য সৌরবিদ্যুৎ প্রকল্পের প্যানেল"
      }
    },
    tags: [
      { en: "Explainer", bn: "এক্সপ্লেইনার" },
      { en: "Renewable Energy", bn: "সবুজ শক্তি" },
      { en: "Technology", bn: "প্রযুক্তি" }
    ],
    status: "published",
    publishedAt: getPublishedDate(1),
    isFeatured: true,
    isBreaking: false,
    isTrending: true,
    views: 2420,
    likes: 189,
    shares: 64,
    metaTitle: {
      en: "Explainer: Power Grid Transition to Renewable Solar in Bangladesh",
      bn: "এক্সপ্লেইনার: বাংলাদেশে সৌরবিদ্যুতের গ্রিড রূপান্তর কীভাবে কাজ করে"
    },
    metaDescription: {
      en: "Understanding net-metering, microgrids, and smart solar integration into the national electrical grid.",
      bn: "সহজ ভাষায় জানুন কীভাবে সৌরবিদ্যুৎ আধুনিক প্রযুক্তির মাধ্যমে জাতীয় গ্রিডে বিদ্যুৎ সরবরাহ করছে।"
    },
    metaKeywords: ["explainer", "solar power", "grid", "renewable energy"]
  },
  {
    title: {
      en: "Understanding the Universal Pension Scheme: A Clear Step-by-Step Breakdown",
      bn: "সর্বজনীন পেনশন স্কিম: সহজ ভাষায় বিস্তারিত নিয়ম, কিস্তি ও ভবিষ্যৎ সুবিধা"
    },
    slug: "understanding-the-universal-pension-scheme-a-clear-step-by-step-breakdown",
    content: {
      en: "<p>Financial security in post-retirement life has entered a historic milestone with the rollout of the Universal Pension Scheme. Spanning four distinct tiers—Pragati, Surokkha, Samata, and Probash—the initiative aims to bring citizens from all economic segments under a dependable social safety umbrella.</p><p>For informal sector workers and day earners, the government contributes a matching subsidy under the Samata package, making retirement planning accessible even with minimal daily savings. Meanwhile, expatriate wage earners can secure long-term guaranteed monthly annuities through foreign remittance accounts.</p><p>Financial analysts highlight the scheme's compound return structure, underscoring that transparent digital tracking and guaranteed state underwriting provide long-term peace of mind against macroeconomic inflation.</p>",
      bn: "<p>কর্মজীবন পরবর্তী সময়ে বয়োবৃদ্ধ নাগরিকের আর্থিক নিরাপত্তা নিশ্চিত করতে সর্বজনীন পেনশন স্কিম একটি যুগান্তকারী পদক্ষেপ। প্রগতি, সুরক্ষা, সমতা ও প্রবাস—এই চারটি পৃথক ক্যাটাগরিতে সমাজের সকল স্তরের মানুষকে কাঠামোগত সামাজিক সুরক্ষার আওতায় আনা হয়েছে।</p><p>অনানুষ্ঠানিক খাতের কর্মী এবং স্বল্প আয়ের মানুষদের জন্য ‘সমতা’ স্কিমে সরকারের পক্ষ থেকে ৫০ শতাংশ অনুদান দেওয়া হচ্ছে। অন্যদিকে বিদেশে অবস্থানরত প্রবাসী বাংলাদেশিরা রেমিট্যান্সের মাধ্যমে নিজের দেশে সুরক্ষিত ভবিষ্যৎ নিশ্চিত করতে পারছেন।</p><p>অর্থনীতিবিদদের মতে, ডিজিটাল প্ল্যাটফর্মের মাধ্যমে স্বচ্ছভাবে সঞ্চয় পর্যবেক্ষণ এবং রাষ্ট্রীয় নিশ্চয়তা থাকায় এটি মুদ্রাস্ফীতির বিপরীতে সবচেয়ে নির্ভরযোগ্য সঞ্চয় মাধ্যম হতে পারে।</p>"
    },
    excerpt: {
      en: "How Pragati, Surokkha, Samata, and Probash schemes work, monthly installments, and long-term financial yield.",
      bn: "প্রগতি, সুরক্ষা, সমতা ও প্রবাস প্যাকেজের পার্থক্য, আবেদনের নিয়মাবলী এবং মাসিক রিটার্নের পরিষ্কার বিশ্লেষণ।"
    },
    category: "explainer",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Financial planning documents and investment calculations",
        bn: "আর্থিক সঞ্চয় ও ভবিষ্যৎ সুরক্ষা পরিকল্পনা সংক্রান্ত নথি"
      }
    },
    tags: [
      { en: "Explainer", bn: "এক্সপ্লেইনার" },
      { en: "Economy", bn: "অর্থনীতি" },
      { en: "Pension", bn: "পেনশন" }
    ],
    status: "published",
    publishedAt: getPublishedDate(6),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1850,
    likes: 120,
    shares: 45,
    metaTitle: {
      en: "Universal Pension Scheme Explained Step by Step",
      bn: "সর্বজনীন পেনশন স্কিমের বিস্তারিত নির্দেশিকা"
    },
    metaDescription: {
      en: "Complete guide explaining eligibility, monthly tiers, and retirement dividends of the Universal Pension.",
      bn: "পেনশন স্কিমের যোগ্যতা, কিস্তির পরিমাণ এবং মাসিক সুবিধার সার্বিক পর্যালোচনা।"
    },
    metaKeywords: ["pension", "finance", "explainer", "bangladesh"]
  },
  {
    title: {
      en: "The Evolution of Artificial Intelligence and Everyday Workplace Productivities",
      bn: "কৃত্রিম বুদ্ধিমত্তা এবং ভবিষ্যৎ কর্মসংস্থান: কর্মক্ষেত্রে উৎপাদনশীলতা বৃদ্ধির সহজ পাঠ"
    },
    slug: "the-evolution-of-artificial-intelligence-and-everyday-workplace-productivities",
    content: {
      en: "<p>The narrative surrounding artificial intelligence has shifted rapidly from speculative science fiction to practical operational tooling. Today's generative language models and automated data synthesis pipelines assist administrative professionals, software developers, and educators in eliminating routine mechanical tasks.</p><p>Instead of wholesale human replacement, modern workplace studies illustrate an augmentation paradigm: professionals equipped with prompt engineering and automated workflows complete multi-day analytical briefs in fractions of the time.</p><p>The critical frontier now lies in institutional upskilling, digital ethics, and cultivating creative critical thinking skills that automated algorithms cannot organically replicate.</p>",
      bn: "<p>কৃত্রিম বুদ্ধিমত্তা বা এআই নিয়ে আলোচনা এখন আর কল্পবিজ্ঞানের বিষয় নয়, এটি প্রতিদিনের দাপ্তরিক কাজের অপরিহার্য সহকারী। জেনারেটিভ এআই এবং ডেটা বিশ্লেষণ টুলগুলো শিক্ষক, প্রোগ্রামার এবং করপোরেট পেশাজীবীদের কাজের গতি বহুগুণ বাড়িয়ে দিচ্ছে।</p><p>কর্মসংস্থান হ্রাসের ভীতি দূর করে গবেষণায় দেখা যাচ্ছে যে, যারা আধুনিক এআই টুল ব্যবহারে দক্ষ, তারা সাধারণ সহকর্মীদের তুলনায় জটিল বিশ্লেষণমূলক কাজ অনেক দ্রুত ও নির্ভুলভাবে সম্পন্ন করতে পারছেন।</p><p>ভবিষ্যতের টেকসই ক্যারিয়ারের জন্য তাই প্রযুক্তিকে ভয় না পেয়ে বরং প্রম্পট ইঞ্জিনিয়ারিং এবং সিদ্ধান্ত গ্রহণের সৃজনশীল দক্ষতায় নিজেকে পারদর্শী করা সময়ের অন্যতম দাবি।</p>"
    },
    excerpt: {
      en: "A clear perspective on how generative algorithms augment human workflows and the skills essential for future careers.",
      bn: "কর্মক্ষেত্রে এআই কীভাবে মানুষের সহায়ক হিসেবে কাজ করে এবং ভবিষ্যতের জন্য কী ধরনের দক্ষতা জরুরি, তার বিশদ আলোচনা।"
    },
    category: "explainer",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Abstract digital neural network and artificial intelligence visualization",
        bn: "কৃত্রিম বুদ্ধিমত্তা ও নিউরাল নেটওয়ার্কের প্রতীকী চিত্র"
      }
    },
    tags: [
      { en: "Explainer", bn: "এক্সপ্লেইনার" },
      { en: "AI", bn: "এআই" },
      { en: "Future of Work", bn: "কর্মসংস্থান" }
    ],
    status: "published",
    publishedAt: getPublishedDate(18),
    isFeatured: false,
    isBreaking: false,
    isTrending: true,
    views: 1940,
    likes: 165,
    shares: 72,
    metaTitle: {
      en: "AI and Future of Workplace Productivity Explained",
      bn: "কর্মক্ষেত্রে কৃত্রিম বুদ্ধিমত্তার প্রভাব ও ভবিষ্যৎ"
    },
    metaDescription: {
      en: "Demystifying artificial intelligence and how human-in-the-loop workflows drive next-generation efficiency.",
      bn: "সহজ ভাষায় জানুন আধুনিক এআই প্রযুক্তি কীভাবে আমাদের দৈনন্দিন কাজকে সহজ করছে।"
    },
    metaKeywords: ["ai", "explainer", "future", "workplace"]
  },

  // ==========================================
  // BANGLADESH (4 articles)
  // ==========================================
  {
    title: {
      en: "Cox's Bazar Sea Beach Receives Global Eco-Tourism and Coastal Cleanliness Award",
      bn: "পরিবেশ সুরক্ষায় বৈশ্বিক স্বীকৃতি পেল কক্সবাজার সমুদ্র সৈকত পরিচ্ছন্নতা মিশন"
    },
    slug: "coxs-bazar-sea-beach-receives-global-eco-tourism-and-coastal-cleanliness-award",
    content: {
      en: "<p>The pristine shoreline of Cox's Bazar has been conferred with a prestigious international coastal stewardship award, acknowledging rigorous community-led zero-plastic initiatives, waste segregations, and turtle nesting habitat restorations along the 120-kilometer coastal belt.</p><p>District administration and local youth volunteer coalitions have deployed solar-powered beach sweepers and established biodegradable waste recovery centers at major tourist entry points such as Laboni and Kolatoli shores.</p><p>Tourism operators report an encouraging resurgence in eco-conscious international travelers seeking sustainable coastal holiday experiences while supporting local artisanal fisherfolk communities.</p>",
      bn: "<p>বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত কক্সবাজারে প্লাস্টিক বর্জ্য অপসারণ ও পরিবেশবান্ধব পর্যটন গড়ে তোলার লক্ষ্যে পরিচালিত দীর্ঘমেয়াদি উদ্যোগ আন্তর্জাতিক স্বীকৃতি অর্জন করেছে। সামুদ্রিক কাছিমের প্রজনন ক্ষেত্র সংরক্ষণ এবং পরিচ্ছন্নতায় তরুণ স্বেচ্ছাসেবীদের অবদান বিশেষভাবে প্রশংসিত হয়েছে।</p><p>জেলা প্রশাসন ও পরিবেশবাদী সংগঠনের সমন্বয়ে সৈকতের লাবণী ও কলাতলী পয়েন্টে পরিবেশবান্ধব সৌরচালিত ক্লিনিং মেশিন ও বর্জ্য পুনর্ব্যবহারযোগ্য কেন্দ্র স্থাপন করা হয়েছে।</p><p>হোটেল ও রিসোর্ট মালিকরা জানিয়েছেন, সৈকতের এই ইতিবাচক পরিবেশের ফলে দেশি-বিদেশি পরিবেশসচেতন ভ্রমণপিপাসুদের সংখ্যা উল্লেখযোগ্য হারে বৃদ্ধি পাচ্ছে।</p>"
    },
    excerpt: {
      en: "International coastal management consortium recognizes community-driven waste management and sea turtle preservation along the Bay of Bengal.",
      bn: "প্লাস্টিকমুক্ত সৈকত নিশ্চিতকরণ এবং উপকূলীয় জীববৈচিত্র্য সুরক্ষায় স্থানীয় তরুণদের সমন্বিত উদ্যোগ আন্তর্জাতিক সম্মাননা পেয়েছে।"
    },
    category: "bangladesh",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Golden sunlight illuminating waves breaking upon the sandy coast",
        bn: "কক্সবাজারের সোনালী সৈকতে আছড়ে পড়া বঙ্গোপসাগরের ঢেউ"
      }
    },
    tags: [
      { en: "Bangladesh", bn: "বাংলাদেশ" },
      { en: "Tourism", bn: "পর্যটন" },
      { en: "Environment", bn: "পরিবেশ" }
    ],
    status: "published",
    publishedAt: getPublishedDate(3),
    isFeatured: true,
    isBreaking: false,
    isTrending: true,
    views: 3100,
    likes: 240,
    shares: 98,
    metaTitle: {
      en: "Cox's Bazar Beach Wins Global Coastal Stewardship Recognition",
      bn: "কক্সবাজার সমুদ্র সৈকত পেল আন্তর্জাতিক পরিবেশ সুরক্ষা সম্মাননা"
    },
    metaDescription: {
      en: "Cox's Bazar recognized for community-led beach cleanliness, zero plastic initiatives, and marine life protection.",
      bn: "সৈকত পরিচ্ছন্নতা ও সামুদ্রিক জীববৈচিত্র্য সংরক্ষণে কক্সবাজারের অনন্য সাফল্য।"
    },
    metaKeywords: ["bangladesh", "coxs bazar", "environment", "beach"]
  },
  {
    title: {
      en: "Bangabandhu Tunnel Sparks Fast-Paced Industrial Growth in Southern Chattogram",
      bn: "কর্ণফুলী টানেল ঘিরে দক্ষিণ চট্টগ্রামে শিল্প ও বাণিজ্যে নতুন দিগন্ত উন্মোচন"
    },
    slug: "bangabandhu-tunnel-sparks-fast-paced-industrial-growth-in-southern-chattogram",
    content: {
      en: "<p>South Asia's first underwater expressway tunnel beneath the Karnaphuli River has unlocked immense commercial potential across Anwara and southern Chattogram, transforming former agricultural frontiers into dynamic export-oriented industrial hubs.</p><p>Dozens of multinational logistics terminals, cold-storage warehouses, and specialized manufacturing plants are nearing completion. Travel time between the seaport terminals and the southern economic corridor has been reduced from hours to mere minutes.</p><p>Urban planners project that this interconnected multimodal transportation axis will form the backbone of the Matarbari deep-sea port logistics hinterland, cementing Bangladesh's status as a regional maritime gateway.</p>",
      bn: "<p>কর্ণফুলী নদীর তলদেশ দিয়ে নির্মিত দক্ষিণ এশিয়ার প্রথম টানেল দক্ষিণ চট্টগ্রামের অর্থনীতি ও শিল্পায়নে বৈপ্লবিক পরিবর্তনের সূচনা করেছে। আনোয়ারা প্রান্তে গড়ে উঠছে নতুন অর্থনৈতিক অঞ্চল ও বিশ্বমানের রপ্তানিমুখী কারখানা।</p><p>টানেল চালুর ফলে চট্টগ্রাম বন্দর ও শহরের সাথে দক্ষিণাঞ্চলের যোগাযোগে ঘণ্টার পর ঘণ্টা সময় বেঁচে যাচ্ছে। দ্রুত গড়ে উঠছে স্বয়ংক্রিয় কোল্ড স্টোরেজ, লজিস্টিকস পার্ক ও হালকা শিল্পকারখানা।</p><p>অর্থনীতিবিদদের মতে, মাতারবাড়ী গভীর সমুদ্র বন্দর ও কর্ণফুলী টানেলের সমন্বয়ে একটি আধুনিক অর্থনৈতিক করিডোর তৈরি হচ্ছে, যা দেশের সামগ্রিক জিডিপিতে গুরুত্বপূর্ণ অবদান রাখবে।</p>"
    },
    excerpt: {
      en: "Underwater tunnel connectivity transforms Anwara into an economic powerhouse connecting maritime logistics with deep-sea corridors.",
      bn: "টানেলের ফলে যোগাযোগ সময় নাটকীয়ভাবে কমে যাওয়ায় দক্ষিণ চট্টগ্রামে দেশি-বিদেশি বিনিয়োগকারীদের আগ্রহের জোয়ার।"
    },
    category: "bangladesh",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Modern highway infrastructure and illuminated tunnel entry",
        bn: "আধুনিক সড়ক অবকাঠামো ও যোগাযোগ ব্যবস্থা"
      }
    },
    tags: [
      { en: "Bangladesh", bn: "বাংলাদেশ" },
      { en: "Infrastructure", bn: "অবকাঠামো" },
      { en: "Economy", bn: "অর্থনীতি" }
    ],
    status: "published",
    publishedAt: getPublishedDate(12),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1650,
    likes: 110,
    shares: 34,
    metaTitle: {
      en: "Bangabandhu Tunnel Drives Industrial Expansion in Chattogram",
      bn: "কর্ণফুলী টানেল ঘিরে দক্ষিণ চট্টগ্রামে শিল্পায়ন"
    },
    metaDescription: {
      en: "Industrial boom in Anwara and southern Chattogram as underwater tunnel provides seamless trade transit.",
      bn: "টানেল যোগাযোগের সুবাদে আনোয়ারায় গড়ে উঠছে বিশ্বমানের শিল্পাঞ্চল ও বন্দর লজিস্টিকস কেন্দ্র।"
    },
    metaKeywords: ["chattogram", "tunnel", "bangladesh", "infrastructure"]
  },
  {
    title: {
      en: "Sylhet Tea Estates Record Historic Harvest Yield Following Timely Monsoon Showers",
      bn: "অনুকূল আবহাওয়া ও নিয়মিত বৃষ্টিপাতে সিলেটে চা উৎপাদনে রেকর্ড গড়ল বাগানগুলো"
    },
    slug: "sylhet-tea-estates-record-historic-harvest-yield-following-timely-monsoon-showers",
    content: {
      en: "<p>Across the verdant undulating hillocks of Sreemangal and greater Sylhet, tea gardens have registered unprecedented monthly harvest yields, buoyed by well-distributed rainfall patterns and optimal tropical humidity throughout the prime plucking season.</p><p>Estate managers commend garden laborers for timely flush plucking and modern biological pest mitigation methods, which have simultaneously elevated liquor quality, aroma, and dry-leaf export grades.</p><p>Auction houses in Chattogram and Sreemangal have experienced vigorous bidding from both national packers and Middle Eastern buyers seeking premium orthodox and CTC blends.</p>",
      bn: "<p>শ্রীমঙ্গল ও বৃহত্তর সিলেটের সবুজ পাহাড়ঘেরা চা বাগানগুলোতে চলতি মৌসুমে স্মরণকালের রেকর্ড পরিমাণ চা উৎপাদিত হয়েছে। সময়মতো পরিমিত বৃষ্টিপাত এবং আর্দ্র আবহাওয়া চায়ের গুণগত মান ও পাতার উৎপাদন বৃদ্ধিতে বড় ভূমিকা রেখেছে।</p><p>বাগান মালিক ও শ্রমিকদের নিরলস পরিশ্রমে তৈরি প্রিমিয়াম অর্থাডক্স ও সিটিসি চায়ের দাম স্থানীয় ও আন্তর্জাতিক নিলামে ব্যাপক সাড়া ফেলেছে। আধুনিক জৈব বালাইনাশক ব্যবহারের ফলে চায়ের প্রাকৃতিক স্বাদ ও সুবাস অক্ষুণ্ণ রয়েছে।</p><p>নিলাম কেন্দ্রে দেশীয় ব্র্যান্ডগুলোর পাশাপাশি মধ্যপ্রাচ্য ও ইউরোপের ক্রেতাদের সক্রিয় উপস্থিতিতে চা শিল্পের রপ্তানি আয়ে নতুন সম্ভাবনার আলো দেখা যাচ্ছে।</p>"
    },
    excerpt: {
      en: "Favorable monsoon conditions and biological farming lift green leaf output and premium tea auction values to multi-year highs.",
      bn: "পরিমিত বৃষ্টি ও আধুনিক কৃষি ব্যবস্থাপনায় শ্রীমঙ্গলের চা বাগানগুলোতে উৎপাদন ও আন্তর্জাতিক নিলাম দর উল্লেখযোগ্য হারে বৃদ্ধি।"
    },
    category: "bangladesh",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Rolling emerald green tea bushes across misty morning hills",
        bn: "কুয়াশাঘেরা সকালে সিলেটের সবুজ চা বাগান"
      }
    },
    tags: [
      { en: "Bangladesh", bn: "বাংলাদেশ" },
      { en: "Agriculture", bn: "কৃষি" },
      { en: "Sylhet", bn: "সিলেট" }
    ],
    status: "published",
    publishedAt: getPublishedDate(20),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1420,
    likes: 92,
    shares: 28,
    metaTitle: {
      en: "Sylhet Tea Estates Achieve Record Yield",
      bn: "সিলেটে চা উৎপাদনে নতুন রেকর্ড"
    },
    metaDescription: {
      en: "Optimal rainfall and sustainable estate practices power historic tea yields in Sreemangal and Sylhet.",
      bn: "শ্রীমঙ্গল ও সিলেটের চা বাগানগুলোতে বাম্পার ফলন এবং নিলামে ভালো দাম পাওয়ায় আনন্দিত চাষিরা।"
    },
    metaKeywords: ["tea", "sylhet", "bangladesh", "agriculture"]
  },
  {
    title: {
      en: "Padma Bridge Rail Link Accelerates Cross-District Agricultural and Trade Movement",
      bn: "পদ্মা সেতু রেল সংযোগে দক্ষিণ-পশ্চিমাঞ্চলের কৃষি বাণিজ্যে নতুন প্রাণচাঞ্চল্য"
    },
    slug: "padma-bridge-rail-link-accelerates-cross-district-agricultural-and-trade-movement",
    content: {
      en: "<p>Direct freight and express passenger rail operations across the Padma Multipurpose Bridge are fundamentally reshaping the domestic distribution channels for perishable vegetables, fresh fish, and dairy from the southern heartland to Dhaka's metropolitan markets.</p><p>Farmers in Jashore, Faridpur, and Khulna can now dispatch harvest wagons directly to capital sidings overnight, drastically curbing transit perishability losses and bypassing traditional intermediary bottlenecks.</p><p>Commuters also celebrate affordable, reliable everyday travel, turning once-remote rural sub-districts into thriving suburban satellite communities.</p>",
      bn: "<p>পদ্মা সেতু রেল সংযোগ চালুর পর দক্ষিণ-পশ্চিমাঞ্চলের ২১টি জেলার সাথে রাজধানীর পণ্য পরিবহন ও বাণিজ্যে নতুন গতির সঞ্চার হয়েছে। বিশেষ করে যশোর, খুলনা ও ফরিদপুরের টাটকা শাকসবজি, মাছ ও ফলমূল দ্রুততম সময়ে ঢাকার বাজারে পৌঁছাচ্ছে।</p><p>রেলওয়ের বিশেষ লাগেজ ও মালবাহী ট্রেনের সুবিধার কারণে প্রান্তিক চাষিরা ন্যায্য মূল্য পাচ্ছেন এবং মধ্যস্বত্বভোগীদের দৌরাত্ম্য কমেছে। কম খরচে নিরাপদে যাতায়াতের সুযোগে দক্ষিণাঞ্চলের মানুষের জীবনযাত্রায় বড় পরিবর্তন এসেছে।</p><p>কৃষি অর্থনীতিবিদরা বলছেন, রেলভিত্তিক এই নিরবচ্ছিন্ন পরিবহন ব্যবস্থা গ্রামীণ অর্থনীতিকে শক্তিশালী করার পাশাপাশি জাতীয় খাদ্য নিরাপত্তা নিশ্চিত করতে সহায়ক ভূমিকা রাখছে।</p>"
    },
    excerpt: {
      en: "Fast rail transit over the Padma cuts travel times, lowers vegetable transport wastage, and enriches rural farmers.",
      bn: "রেল সংযোগের সুবাদে স্বল্প খরচে ও দ্রুত সময়ে রাজধানীমুখী কৃষিপণ্য পরিবহন সহজ হওয়ায় লাভবান হচ্ছেন দক্ষিণাঞ্চলের কৃষক।"
    },
    category: "bangladesh",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Passenger and freight train cruising along scenic rail bridge",
        bn: "পদ্মা সেতুর ওপর দিয়ে ছুটে চলা আধুনিক এক্সপ্রেস ট্রেন"
      }
    },
    tags: [
      { en: "Bangladesh", bn: "বাংলাদেশ" },
      { en: "Railways", bn: "রেলওয়ে" },
      { en: "Economy", bn: "অর্থনীতি" }
    ],
    status: "published",
    publishedAt: getPublishedDate(28),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1530,
    likes: 104,
    shares: 31,
    metaTitle: {
      en: "Padma Bridge Rail Connectivity Boosts Trade",
      bn: "পদ্মা সেতু রেল সংযোগে দক্ষিণ-পশ্চিমাঞ্চলে বাণিজ্যে নতুন গতি"
    },
    metaDescription: {
      en: "Direct train connectivity across Padma bridge bridges regional farmers and metropolitan food security.",
      bn: "পদ্মা রেল সেতুর মাধ্যমে কম খরচে পণ্য পরিবহন এবং কৃষকদের জীবনমান উন্নয়নের সামগ্রিক প্রতিবেদন।"
    },
    metaKeywords: ["padma bridge", "train", "bangladesh", "trade"]
  },

  // ==========================================
  // OPINION (3 articles)
  // ==========================================
  {
    title: {
      en: "Reimagining Urban Planning for a Truly Livable and Climate-Resilient Megacity",
      bn: "বসবাসযোগ্য শহরের জন্য প্রয়োজন প্রকৃতিবান্ধব নগর পরিকল্পনা ও উন্মুক্ত পরিসর"
    },
    slug: "reimagining-urban-planning-for-a-truly-livable-and-climate-resilient-megacity",
    content: {
      en: "<p>As rapid urban migration continues to challenge city boundaries, the traditional approach of piecemeal road expansions and reactive concrete construction must give way to holistic, climate-resilient spatial design.</p><p>True livability requires reclaiming neighborhood water bodies, expanding pedestrian walkways shaded by native flora, and implementing stringent zoning regulations that prevent the encroachment of urban wetlands. When children lack play areas and elderly residents cannot safely walk their streets, our collective civic wealth diminishes regardless of economic metrics.</p><p>We must prioritize decentralized communal infrastructure, localized civic amenities, and mass rapid transit over private automobile conveniences if we hope to leave a thriving urban legacy for the next generation.</p>",
      bn: "<p>দ্রুত বর্ধনশীল জনসংখ্যার চাপে আমাদের শহরগুলো যখন দমবন্ধ করা ইট-পাথরের খাঁচায় পরিণত হচ্ছে, তখন গতানুগতিক সড়ক সম্প্রসারণের চেয়ে প্রকৃতিবান্ধব সমন্বিত নগর পরিকল্পনার প্রয়োজনীয়তা সবচেয়ে জরুরি হয়ে দাঁড়িয়েছে।</p><p>বসবাসযোগ্য শহর মানে শুধু বহুতল ভবন নয়; সেখানে থাকতে হবে পর্যাপ্ত খেলার মাঠ, জলাধার, ছায়াদার হাঁটার পথ এবং স্বাস্থ্যকর পরিবেশ। যে শহরে শিশুরা খোলা আকাশের নিচে খেলতে পারে না এবং প্রবীণরা নিরাপদে হাঁটতে পারেন না, সে শহর কখনো মানবিক হতে পারে না।</p><p>ব্যক্তিগত গাড়িকেন্দ্রিক চিন্তাভাবনা থেকে বেরিয়ে এসে গণপরিবহনমুখী যাতায়াত ব্যবস্থা এবং প্রতিটি পাড়া-মহল্লায় উন্মুক্ত পার্ক নিশ্চিত করাই হোক ভবিষ্যৎ নগর ভাবনার মূল এজেন্ডা।</p>"
    },
    excerpt: {
      en: "A thought-provoking analysis on integrating ecological waterways, accessible pedestrian promenades, and civic zoning in urban centers.",
      bn: "একটি সমৃদ্ধ ও মানবিক নগর জীবনের জন্য উন্মুক্ত খেলার মাঠ, সবুজ বেষ্টনী এবং গণপরিবহনভিত্তিক কাঠামোর গুরুত্ব নিয়ে বিশ্লেষণধর্মী কলাম।"
    },
    category: "opinion",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Modern urban architecture juxtaposed with blue skies and open space",
        bn: "আধুনিক মানবিক নগর স্থাপত্য ও খোলামেলা আকাশের রূপরেখা"
      }
    },
    tags: [
      { en: "Opinion", bn: "মতামত" },
      { en: "Urban Planning", bn: "নগর পরিকল্পনা" },
      { en: "Environment", bn: "পরিবেশ" }
    ],
    status: "published",
    publishedAt: getPublishedDate(5),
    isFeatured: true,
    isBreaking: false,
    isTrending: false,
    views: 1870,
    likes: 145,
    shares: 56,
    metaTitle: {
      en: "Reimagining Urban Planning for Climate Resilient Cities",
      bn: "বসবাসযোগ্য শহরের জন্য প্রকৃতিবান্ধব নগর ভাবনার গুরুত্ব"
    },
    metaDescription: {
      en: "Opinion on creating inclusive, walking-friendly, and ecologically sound urban neighborhoods.",
      bn: "নগর জীবনের মান উন্নয়ন ও সবুজ পরিবেশ বজায় রাখার প্রয়োজনীয়তা তুলে ধরে বিশেষ মতামত কলাম।"
    },
    metaKeywords: ["opinion", "urban planning", "city", "livability"]
  },
  {
    title: {
      en: "Economic Resilience Lies in Local Innovation and Micro-Enterprise Empowerment",
      bn: "অর্থনৈতিক স্থিতিশীলতার মূল চাবিকাঠি স্থানীয় উদ্ভাবন ও প্রান্তিক উদ্যোক্তা বিকাশ"
    },
    slug: "economic-resilience-lies-in-local-innovation-and-micro-enterprise-empowerment",
    content: {
      en: "<p>Amid global macroeconomic turbulence and geopolitical supply chain shocks, domestic economic fortitude depends on nurturing our home-grown micro, small, and medium enterprises (MSMEs).</p><p>Too often, high-finance discourse fixates exclusively on billion-dollar conglomerates, overlooking the resilient cottage weavers, artisanal food producers, and grassroots tech repair hubs that employ millions. Democratizing collateral-free credit, simplifying bureaucratic trade licenses, and bridging rural producers with e-commerce logistics creates an impenetrable shock absorber for the national economy.</p><p>Real prosperity is bottom-up, sustainable, and rooted in the creative industriousness of everyday citizens striving in small workshops and village bazaars.</p>",
      bn: "<p>বিশ্ব অর্থনীতির অস্থিরতা ও ভূ-রাজনৈতিক টানাপোড়েনের এই সময়ে জাতীয় অর্থনীতির প্রকৃত রক্ষাকবচ হলো আমাদের তৃণমূল ও ক্ষুদ্র উদ্যোক্তারা (এমএসএমই)।</p><p>বড় করপোরেট প্রতিষ্ঠানগুলোর পাশাপাশি যখন গ্রামীণ তাঁতি, হস্তশিল্পের কারিগর এবং তরুণ স্টার্টআপ উদ্যোক্তারা সহজ শর্তে মূলধন পান, তখনই অর্থনীতির ভিত মজবুত হয়। জটিল লাইসেন্সিং প্রক্রিয়া সহজ করা এবং প্রত্যন্ত অঞ্চলের উদ্যোক্তাদের ডিজিটাল পেমেন্ট ব্যবস্থার সাথে যুক্ত করা এখন জাতীয় অগ্রাধিকার হওয়া উচিত।</p><p>অর্থনৈতিক স্বনির্ভরতা কোনো অলীক স্বপ্ন নয়; এটি তৃণমূলের মেধা ও পরিশ্রমকে রাষ্ট্রীয়ভাবে সম্মান ও সুযোগ প্রদানের স্বাভাবিক পরিণতি।</p>"
    },
    excerpt: {
      en: "Why strengthening decentralized cottage industries and digital access for grassroots artisans is the bedrock of lasting prosperity.",
      bn: "তৃণমূলের ক্ষুদ্র উদ্যোক্তা ও কুটির শিল্পকে সহজ অর্থায়ন ও প্রযুক্তি সহায়তার মাধ্যমে জাতীয় অর্থনীতিকে স্বাবলম্বী করার পথরেখা।"
    },
    category: "opinion",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Hands working on creative craftsmanship and economic planning",
        bn: "পরিকল্পনা ও উদ্যোক্তা বিকাশের প্রতীকী দৃশ্য"
      }
    },
    tags: [
      { en: "Opinion", bn: "মতামত" },
      { en: "SME", bn: "ক্ষুদ্র শিল্প" },
      { en: "Economy", bn: "অর্থনীতি" }
    ],
    status: "published",
    publishedAt: getPublishedDate(15),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1320,
    likes: 98,
    shares: 33,
    metaTitle: {
      en: "Economic Resilience Through Grassroots Enterprise",
      bn: "স্থানীয় উদ্ভাবন ও ক্ষুদ্র উদ্যোক্তা বিকাশে অর্থনৈতিক সমৃদ্ধি"
    },
    metaDescription: {
      en: "An essay exploring how micro-enterprises and artisan cooperatives shield developing economies from external shocks.",
      bn: "ক্ষুদ্র ও মাঝারি শিল্পের বিকাশ কীভাবে জাতীয় অর্থনীতিকে শক্তিশালী করতে পারে তা নিয়ে বিশ্লেষণ।"
    },
    metaKeywords: ["opinion", "economy", "sme", "innovation"]
  },
  {
    title: {
      en: "Journalistic Ethics and Factuality in the Age of Sensational Algorithmic Feeds",
      bn: "অ্যালগরিদমের কোলাহলে বস্তুনিষ্ঠ সাংবাদিকতার নীতি ও সামাজিক দায়বদ্ধতা"
    },
    slug: "journalistic-ethics-and-factuality-in-the-age-of-sensational-algorithmic-feeds",
    content: {
      en: "<p>The digital age has democratized publishing while simultaneously subjecting public discourse to the tyranny of engagement-driven social media algorithms. In an environment that prioritizes sensational outrage over nuanced truth, the ethical role of the fourth estate is more vital than ever.</p><p>Journalism is not merely reporting what happened first; it is discerning why it matters, validating corroborating evidence, and providing compassionate context. Sacrificing editorial integrity for ephemeral clicks degrades public trust and undermines democratic accountability.</p><p>Newsrooms that invest in deep field investigations, ethical verification protocols, and measured analysis will endure long after the algorithmic fad fades.</p>",
      bn: "<p>ডিজিটাল প্রযুক্তির যুগে তথ্য প্রচার যেমন সহজ হয়েছে, তেমনি লাইক ও ভিউ বাড়ানোর অসুস্থ প্রতিযোগিতায় অনেক সময় সত্য আড়ালে চলে যাচ্ছে। সামাজিক যোগাযোগ মাধ্যমের অ্যালগরিদম যখন উত্তেজনাকর খবরকে পুরস্কৃত করে, তখন গণমাধ্যমের সামাজিক দায়বদ্ধতা আরও গভীর হয়ে ওঠে।</p><p>সাংবাদিকতার মূল ভিত্তি হলো বস্তুনিষ্ঠতা, যাচাইকৃত তথ্য এবং জনস্বার্থের সুরক্ষা। সবার আগে খবর দেওয়ার তাড়নায় ভুল বা অর্ধসত্য পরিবেশন পাঠকের আস্থা নষ্ট করে।</p><p>একটি সচেতন গণতান্ত্রিক সমাজের জন্য প্রয়োজন অনুসন্ধানী ও দায়িত্বশীল সাংবাদিকতা, যা কোনো প্রলোভন বা চাপের মুখে নতি স্বীকার না করে সত্যের পক্ষে কথা বলে।</p>"
    },
    excerpt: {
      en: "Reflections on defending investigative rigor, reader trust, and editorial independence in an era dominated by clickbait.",
      bn: "চটকদার শিরোনাম ও ভুয়া তথ্যের বিপরীতে দায়িত্বশীল ও বস্তুনিষ্ঠ সাংবাদিকতার গুরুত্ব নিয়ে সম্পাদকীয় কলাম।"
    },
    category: "opinion",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Classic typewriter and fountain pen symbolizing thoughtful journalistic writing",
        bn: "বস্তুনিষ্ঠ সাংবাদিকতা ও অনুসন্ধানী লেখার প্রতীক"
      }
    },
    tags: [
      { en: "Opinion", bn: "মতামত" },
      { en: "Journalism", bn: "সাংবাদিকতা" },
      { en: "Ethics", bn: "নীতিবোধ" }
    ],
    status: "published",
    publishedAt: getPublishedDate(25),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1440,
    likes: 112,
    shares: 41,
    metaTitle: {
      en: "Journalistic Ethics in the Social Media Era",
      bn: "ডিজিটাল যুগে বস্তুনিষ্ঠ সাংবাদিকতার চ্যালেঞ্জ ও দায়বদ্ধতা"
    },
    metaDescription: {
      en: "Why responsible verification and editorial honesty matter more than viral vanity metrics.",
      bn: "সামাজিক যোগাযোগ মাধ্যমের যুগে দায়িত্বশীল সাংবাদিকতার অপরিহার্যতা নিয়ে মতামত কলাম।"
    },
    metaKeywords: ["opinion", "journalism", "media", "ethics"]
  },

  // ==========================================
  // SOCIAL MEDIA (3 articles)
  // ==========================================
  {
    title: {
      en: "Viral Community Library Project in Rangpur Inspires Youth Across the Nation",
      bn: "রংপুরের প্রত্যন্ত গ্রামের ভ্রাম্যমাণ পাঠাগারের উদ্যোগ সোশ্যাল মিডিয়ায় ভাইরাল"
    },
    slug: "viral-community-library-project-in-rangpur-inspires-youth-across-the-nation",
    content: {
      en: "<p>A humble initiative launched by three university graduates in a remote union of Rangpur has captured the hearts of millions across Facebook, TikTok, and YouTube. Equipping a repurposed three-wheeler with curated textbooks, science classics, and illustrated children's fiction, the team visits five rural primary schools weekly.</p><p>Photos and short reels showing children eagerly gathering around the colorful wooden mobile shelf have amassed hundreds of thousands of shares, sparking a nationwide book donation drive supported by diaspora groups and national publishing houses.</p><p>The creators emphasize that their primary aim is rekindling the tactile joy of paper books in young minds amidst rampant smartphone screen addictions.</p>",
      bn: "<p>রংপুরের একটি প্রত্যন্ত গ্রামে তিন তরুণ গ্র্যাজুয়েটের হাত ধরে শুরু হওয়া ভ্রাম্যমাণ পাঠাগারের ভিডিও এখন ফেসবুক ও টিকটকে কোটি মানুষের হৃদয় জয় করেছে। একটি ভ্যানগাড়িতে কাঠের সুন্দর তাক তৈরি করে তারা বই নিয়ে ছুটে যান গ্রামের বিভিন্ন বিদ্যালয়ে।</p><p>শিশুদের হাসিমুখ আর বই পড়ার তীব্র আগ্রহের ছবি সামাজিক যোগাযোগ মাধ্যমে ছড়িয়ে পড়লে দেশ-বিদেশের বহু মানুষ বই পাঠানোর আগ্রহ প্রকাশ করেন। ইতিমধ্যে এক ডজনের বেশি প্রকাশনা সংস্থা তাদের পাঠাগারে নতুন বই উপহার দিয়েছে।</p><p>উদ্যোক্তারা জানান, সোশ্যাল মিডিয়াকে ইতিবাচক কাজে ব্যবহার করে শিশুদের স্মার্টফোনের আসক্তি দূর করে বইয়ের পাতায় ফিরিয়ে আনাই তাদের এই প্রচেষ্টার মূল লক্ষ্য।</p>"
    },
    excerpt: {
      en: "How a colorful cycle van library bringing stories to village school children sparked a heartwarming viral wave of book donations.",
      bn: "একটি ভ্যানে সাজানো বই নিয়ে গ্রামের স্কুলে স্কুলে যাওয়ার অনন্য দৃশ্য সামাজিক যোগাযোগ মাধ্যমে ব্যাপক প্রশংসা কুড়িয়েছে।"
    },
    category: "social-media",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Stack of colorful books and literature in an open library setting",
        bn: "রংবেরঙের বইয়ের সমাহার ও পড়ার আনন্দ"
      }
    },
    tags: [
      { en: "Social Media", bn: "সোশ্যাল মিডিয়া" },
      { en: "Viral", bn: "ভাইরাল" },
      { en: "Youth", bn: "তরুণ প্রজন্ম" }
    ],
    status: "published",
    publishedAt: getPublishedDate(2),
    isFeatured: true,
    isBreaking: false,
    isTrending: true,
    views: 3890,
    likes: 420,
    shares: 180,
    metaTitle: {
      en: "Viral Mobile Library in Rangpur Inspires Millions",
      bn: "রংপুরের ভ্রাম্যমাণ পাঠাগারের ভিডিও সোশ্যাল মিডিয়ায় ভাইরাল"
    },
    metaDescription: {
      en: "Community youth project providing mobile books to village children goes viral on social platforms.",
      bn: "সোশ্যাল মিডিয়ার ইতিবাচক ব্যবহারে গ্রামে জ্ঞানের আলো ছড়াচ্ছে তরুণদের ভ্রাম্যমাণ পাঠাগার।"
    },
    metaKeywords: ["viral", "social media", "library", "rangpur"]
  },
  {
    title: {
      en: "Content Creators Lead Massive Digital Safety Workshop for School Teachers",
      bn: "শিক্ষার্থীদের সাইবার নিরাপত্তা বিষয়ে শিক্ষকদের জন্য কনটেন্ট ক্রিয়েটরদের সচেতনতা কর্মশালা"
    },
    slug: "content-creators-lead-massive-digital-safety-workshop-for-school-teachers",
    content: {
      en: "<p>A collective of prominent educational influencers, animators, and digital rights advocates conducted an interactive livestreamed symposium aimed at equipping educators with practical cyber defense awareness.</p><p>Addressing issues ranging from password hygiene and phishing detection to managing online bullying and privacy leaks, the creators shared actionable infographics designed for classroom integration. The event trended across Twitter and LinkedIn under #SafeInternetBD.</p><p>Organizers noted that teaching digital literacy through approachable visual narratives is substantially more effective than formal didactic circulars.</p>",
      bn: "<p>দেশের শীর্ষস্থানীয় এডুকেশনাল কনটেন্ট ক্রিয়েটর ও প্রযুক্তিবিদরা যৌথভাবে শিক্ষকদের জন্য সাইবার সুরক্ষা ও সচেতনতামূলক এক বিশেষ অনলাইন কর্মশালার আয়োজন করেছেন।</p><p>শিক্ষার্থীদের সোশ্যাল মিডিয়ার ক্ষতিকর প্রভাব, ফিশিং লিংক চেনার উপায় এবং অনলাইন বুলিং প্রতিরোধে শিক্ষকদের কী করণীয়, তা হাতে-কলমে তুলে ধরা হয়। এই আয়োজনটি সামাজিক মাধ্যমে ব্যাপক সাড়া ফেলে এবং হাজারো শিক্ষক এতে অংশ নেন।</p><p>আয়োজকরা বলেন, ইন্টারনেটের ইতিবাচক ব্যবহারের জন্য তরুণ ও শিক্ষকদের মধ্যে বন্ধুত্বপূর্ণ পরিবেশে সচেতনতা তৈরি করাই আধুনিক সাইবার সুরক্ষার চাবিকাঠি।</p>"
    },
    excerpt: {
      en: "Educational influencers and cyber advocates partner to train thousands of educators on preventing online harassment and protecting student privacy.",
      bn: "শিক্ষার্থীদের নিরাপদ ইন্টারনেট ব্যবহার নিশ্চিত করতে শিক্ষক ও অভিভাবকদের জন্য ডিজিটাল সচেতনতামূলক বিশেষ উদ্যোগ।"
    },
    category: "social-media",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Person engaging with modern digital media and social communication devices",
        bn: "ডিজিটাল ডিভাইস ও সোশ্যাল মিডিয়া ব্যবহারের আধুনিক চিত্র"
      }
    },
    tags: [
      { en: "Social Media", bn: "সোশ্যাল মিডিয়া" },
      { en: "Cyber Safety", bn: "সাইবার নিরাপত্তা" },
      { en: "Education", bn: "শিক্ষা" }
    ],
    status: "published",
    publishedAt: getPublishedDate(10),
    isFeatured: false,
    isBreaking: false,
    isTrending: true,
    views: 2150,
    likes: 190,
    shares: 68,
    metaTitle: {
      en: "Creators Lead Digital Safety Workshops for Schools",
      bn: "সাইবার সুরক্ষায় কনটেন্ট ক্রিয়েটরদের বিশেষ কর্মশালা"
    },
    metaDescription: {
      en: "Symposium trains teachers on combating misinformation, phishing, and online harassment in school environments.",
      bn: "শিক্ষার্থীদের ইন্টারনেটে সুরক্ষিত রাখতে শিক্ষক ও অভিভাবকদের সচেতন করার সময়োপযোগী উদ্যোগ।"
    },
    metaKeywords: ["social media", "cyber safety", "creators", "awareness"]
  },
  {
    title: {
      en: "Trending Hashtag Drive Mobilizes Thousands to Clean Public Lakes and Urban Parks",
      bn: "সোশ্যাল মিডিয়া ক্যাম্পেইনের ডাকে নগরীর লেক ও পার্ক পরিচ্ছন্নতায় হাজারো তরুণ"
    },
    slug: "trending-hashtag-drive-mobilizes-thousands-to-clean-public-lakes-and-urban-parks",
    content: {
      en: "<p>What started as a single weekend reel highlighting discarded single-use plastic cups around Dhanmondi Lake has transformed into an energetic civic cleaning movement spanning five divisional cities.</p><p>Volunteers equipped with reusable gloves and biodegradable bags gathered at designated collection posts on Friday morning, removing over twelve tons of floating non-biodegradable debris. Participants documented their before-and-after snapshots online, inspiring corporate teams and student clubs to adopt nearby neighborhood ponds.</p><p>Environmental activists praise the organic mobilization, noting that social media's greatest power lies in translating online engagement into tangible offline community service.</p>",
      bn: "<p>ধানমন্ডি লেকের পাড়ে জমে থাকা প্লাস্টিক বর্জ্য নিয়ে একটি সচেতনতামূলক ভিডিও প্রকাশের পর তা সামাজিক যোগাযোগ মাধ্যমে এক বিশাল সামাজিক আন্দোলনে রূপ নিয়েছে।</p><p>শুক্রবার ছুটির দিনে ‘ক্লিন সিটি ইনিশিয়েটিভ’ ব্যানারে শত শত তরুণ-তরুণী লেক ও পার্কের চারপাশ পরিচ্ছন্নতার কাজে অংশ নেন। মাত্র কয়েক ঘণ্টার পরিশ্রমে তারা টন টন অপচনশীল প্লাস্টিক বর্জ্য অপসারণ করেন। তাদের এই কাজের ছবি ও ভিডিও সোশ্যাল মিডিয়ায় ছড়িয়ে পড়লে অন্যান্য শহরের তরুণরাও নিজ নিজ এলাকায় একই ধরনের কর্মসূচি ঘোষণা করেন।</p><p>পরিবেশবিদদের মতে, সামাজিক যোগাযোগ মাধ্যমকে শুধু বিনোদনে সীমাবদ্ধ না রেখে নাগরিক দায়িত্ব পালনে কাজে লাগানোর এই দৃষ্টান্ত অত্যন্ত অনুপ্রেরণাদায়ক।</p>"
    },
    excerpt: {
      en: "A civic call-to-action on social channels inspires massive youth clean-up turnouts across five metropolitan cities.",
      bn: "সোশ্যাল মিডিয়ার একটি ট্রেন্ডিং হ্যাশট্যাগকে কেন্দ্র করে স্বতঃস্ফূর্তভাবে নগর পরিচ্ছন্নতায় এগিয়ে এলো হাজারো তরুণ।"
    },
    category: "social-media",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Youth volunteers coming together for community cleanliness and eco-action",
        bn: "পরিবেশ সুরক্ষায় একত্রিত তরুণ স্বেচ্ছাসেবকদের দল"
      }
    },
    tags: [
      { en: "Social Media", bn: "সোশ্যাল মিডিয়া" },
      { en: "Volunteering", bn: "স্বেচ্ছাসেবা" },
      { en: "Environment", bn: "পরিবেশ" }
    ],
    status: "published",
    publishedAt: getPublishedDate(22),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1720,
    likes: 154,
    shares: 49,
    metaTitle: {
      en: "Social Media Campaign Drives Civic Park Cleanups",
      bn: "নগর পরিচ্ছন্নতায় সোশ্যাল মিডিয়া ক্যাম্পেইনের অভূতপূর্ব সাফল্য"
    },
    metaDescription: {
      en: "How viral community reels inspired weekend clean-up blitzes at popular city parks and lakes.",
      bn: "সোশ্যাল মিডিয়ায় প্রচারিত ডাকে সাড়া দিয়ে লেক পরিচ্ছন্নতায় অংশ নেওয়া তরুণদের ইতিবাচক গল্প।"
    },
    metaKeywords: ["social media", "volunteers", "cleanup", "civic"]
  },

  // ==========================================
  // FEATURE (3 articles)
  // ==========================================
  {
    title: {
      en: "The Traditional Weaver Families of Tangail Preserving Century-Old Jamdani Craft",
      bn: "শতাব্দীর ঐতিহ্য বুকে ধারণ করে বেঁচে আছেন টাঙ্গাইলের নিপুণ তাঁতশিল্পীরা"
    },
    slug: "the-traditional-weaver-families-of-tangail-preserving-century-old-jamdani-craft",
    content: {
      en: "<p>In the quiet riverside hamlet of Bajitpur in Tangail, the rhythm of wooden looms continues unabated from dawn till dusk. Master weavers, working by hand using techniques passed down across four generations, produce intricately patterned handloom sarees that are prized across fashion runways globally.</p><p>A single heirloom saree with gold zari filigree work can demand upwards of three weeks of painstaking manual alignment. Despite rising cotton yarn costs and mechanized counterfeit replicas, younger family artisans are introducing organic dyes and modern geometrical motifs, rejuvenating the craft for contemporary international buyers.</p><p>Preserving these living heritage practitioners remains essential to honoring the nation's profound textile identity and supporting rural craft ecosystems.</p>",
      bn: "<p>টাঙ্গাইলের বাজিতপুর ও পোড়াবাড়ীর নিভৃত পল্লীতে ভোর থেকে সন্ধ্যা পর্যন্ত কাঠের তাঁতের ছন্দময় শব্দ থামে না। চার প্রজন্মের ঐতিহ্য বহন করে এখানকার কারিগররা নিপুণ হাতে বুনে চলেন বিশ্বখ্যাত টাঙ্গাইল তাঁতের শাড়ি।</p><p>একটি সূক্ষ্ম নকশার শাড়ি তৈরি করতে একজন কারিগরের দুই থেকে তিন সপ্তাহ পর্যন্ত একনিষ্ঠ পরিশ্রম করতে হয়। যান্ত্রিক তাঁত ও বাজারদরের প্রতিযোগিতার মাঝেও নতুন প্রজন্মের শিল্পীরা প্রাকৃতিক রং ও আধুনিক মোটিফ যোগ করে এই ঐতিহ্যকে বিশ্বমঞ্চে নতুন করে তুলে ধরছেন।</p><p>বাঙালির ইতিহাস ও সংস্কৃতির সাথে জড়িয়ে থাকা এই তাঁতশিল্পীদের টিকিয়ে রাখতে ন্যায্য মজুরি এবং বিশ্বব্যাপী সরাসরি বাজার সংযোগ তৈরির ওপর গুরুত্ব দিচ্ছেন বিশেষজ্ঞরা।</p>"
    },
    excerpt: {
      en: "Inside the peaceful riverside villages where master weavers combine heritage cotton loomed artistry with contemporary botanical dyes.",
      bn: "টাঙ্গাইলের ঐতিহ্যবাহী তাঁতিদের জীবনযুদ্ধ, সুতোর কারুকাজ এবং তাদের হাত ধরে দেশীয় শিল্পের বিশ্বজয়ের গল্প।"
    },
    category: "feature",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Artisan hands weaving colorful textured threads on traditional loom",
        bn: "ঐতিহ্যবাহী তাঁতে সুতো বুনছেন নিপুণ কারিগর"
      }
    },
    tags: [
      { en: "Feature", bn: "ফিচার" },
      { en: "Heritage", bn: "ঐতিহ্য" },
      { en: "Artisans", bn: "তাঁতশিল্প" }
    ],
    status: "published",
    publishedAt: getPublishedDate(4),
    isFeatured: true,
    isBreaking: false,
    isTrending: false,
    views: 2280,
    likes: 210,
    shares: 82,
    metaTitle: {
      en: "Tangail Weavers Preserving Century-Old Handloom Heritage",
      bn: "টাঙ্গাইলের ঐতিহ্যবাহী তাঁতশিল্পীদের অনন্য জীবনগাথা"
    },
    metaDescription: {
      en: "Deep dive into the artisan families of Tangail weaving timeless heritage textile sarees.",
      bn: "টাঙ্গাইল শাড়ির ইতিহাস, কারিগরদের ভালোবাসা এবং ঐতিহ্যবাহী তাঁতশিল্পের ধারাবাহিকতা নিয়ে বিশেষ ফিচার।"
    },
    metaKeywords: ["tangail", "feature", "handloom", "heritage"]
  },
  {
    title: {
      en: "Sundarbans Honey Hunters: Courage, Conservation, and Coexistence in Mangrove Forests",
      bn: "সুন্দরবনের মৌয়ালদের জীবনযুদ্ধ: প্রকৃতির সাথে সহাবস্থান ও বন্য রোমাঞ্চের গল্প"
    },
    slug: "sundarbans-honey-hunters-courage-conservation-and-coexistence-in-mangrove-forests",
    content: {
      en: "<p>Each spring, traditional honey harvesters—known locally as Mouwals—embark on perilous expeditions deep into the dense mangrove labyrinth of the Sundarbans. Guided by ancestral intuition and mutual trust, they navigate tidal creeks fraught with estuarine crocodiles and the regal Royal Bengal tiger.</p><p>Sustainable harvesting protocols dictate cutting only the outer combs while leaving the brood cells undamaged, ensuring bee colonies replenish rapidly before the monsoon rains set in. Community forest rangers now provide GPS panic transmitters and medical first-aid kits to improve safety.</p><p>Their seasonal harvest yields some of the world's most sought-after organic multifloral mangrove honey, sustaining indigenous forest economies while reinforcing ecological vigilance.</p>",
      bn: "<p>বসন্তের শুরুতে সুন্দরবনের গহীনে শুরু হয় রোমাঞ্চকর ও ঝুঁকিপূর্ণ এক অভিযান। বংশপরম্পরায় চলে আসা এই পেশায় মৌয়ালরা ছোট ছোট নৌকায় করে জীবিকার সন্ধানে প্রবেশ করেন রয়েল বেঙ্গল টাইগার ও কুমির অধ্যুষিত বিপদসংকুল ম্যানগ্রোভ বনে।</p><p>মৌয়ালরা জানেন কীভাবে মৌচাকের কেবল মধুর অংশটি সাবধানে কেটে নিতে হয় যাতে মৌমাছির বংশবিস্তারে কোনো ক্ষতি না হয়। বনবিভাগ এখন মৌয়ালদের নিরাপত্তার জন্য বিশেষ লাইসেন্স ও প্রাথমিক চিকিৎসা সরঞ্জাম নিশ্চিত করছে।</p><p>সুন্দরবনের খাঁটি পদ্মমধু ও খলিশা ফুলের মধুর চাহিদা দেশজুড়ে। জীবনের ঝুঁকি নিয়ে সংগ্রহ করা এই সোনালী তরল কেবল তাদের পরিবারকেই বাঁচায় না, দেশের প্রাকৃতিক সম্পদকে অনন্য উচ্চতায় নিয়ে যায়।</p>"
    },
    excerpt: {
      en: "An evocative narrative into the lives of traditional mangrove harvesters navigating tiger habitats with ancient sustainable foraging rules.",
      bn: "সুন্দরবনের গভীর অরণ্যে জীবনের ঝুঁকি নিয়ে খাঁটি মধু সংগ্রহকারী মৌয়ালদের জীবন ও প্রকৃতির সাথে টিকে থাকার লড়াই।"
    },
    category: "feature",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Lush deep mangrove forest canopy and tranquil wilderness river",
        bn: "সুন্দরবনের শ্বাসমূল ও চিরসবুজ ম্যানগ্রোভ অরণ্য"
      }
    },
    tags: [
      { en: "Feature", bn: "ফিচার" },
      { en: "Sundarbans", bn: "সুন্দরবন" },
      { en: "Wildlife", bn: "বন্যপ্রাণী" }
    ],
    status: "published",
    publishedAt: getPublishedDate(14),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1950,
    likes: 175,
    shares: 55,
    metaTitle: {
      en: "Honey Hunters of the Sundarbans Mangrove",
      bn: "সুন্দরবনের সাহসী মৌয়ালদের জীবনসংগ্রাম"
    },
    metaDescription: {
      en: "Human interest feature documenting the traditional Mouwals harvesting organic honey in tiger forests.",
      bn: "সুন্দরবনের ম্যানগ্রোভ বনে মধু সংগ্রহের রোমাঞ্চ ও প্রকৃতির সঙ্গে জীবনের মেলবন্ধন নিয়ে সচিত্র প্রতিবেদন।"
    },
    metaKeywords: ["sundarbans", "feature", "honey", "nature"]
  },
  {
    title: {
      en: "Urban Rooftop Farming Becoming a Green Revolution Across Metropolitan Terraces",
      bn: "শহরের ছাদে সবুজের বিপ্লব: ছাদবাগানে পুষ্টি ও স্বাবলম্বী হাজারো নাগরিক"
    },
    slug: "urban-rooftop-farming-becoming-a-green-revolution-across-metropolitan-terraces",
    content: {
      en: "<p>Across apartment terraces and industrial factory rooftops in Dhaka and Chattogram, a quiet green transformation is taking root. Urbanites are transforming bare concrete into lush micro-orchards yielding organic papayas, guavas, chillies, and medicinal herbs.</p><p>Drip irrigation kits and composting tumblers have made rooftop gardening accessible to everyday apartment dwellers, substantially lowering surface thermal heat absorption during sweltering summer months.</p><p>Agricultural extension officers report that widespread rooftop foliage can reduce surrounding ambient temperatures by up to three degrees Celsius while fostering rich biodiversity of migratory urban pollinators.</p>",
      bn: "<p>রাজধানীর ঘিঞ্জি বহুতল ভবনের ছাদগুলো এখন আর শূন্য পড়ে থাকছে না। সচেতন নাগরিকদের হাত ধরে গড়ে উঠছে চোখ জুড়ানো সবুজ ছাদবাগান, যেখানে ফলছে বিষমুক্ত আম, পেয়ারা, লেবু এবং নানা ধরনের শাকসবজি।</p><p>আধুনিক ড্রিপ ইরিগেশন এবং জৈব সারের সহজলভ্যতা সাধারণ মানুষকে ছাদবাগানে আগ্রহী করে তুলেছে। এই ছাদবাগান কেবল পরিবারের পুষ্টির চাহিদাই মেটাচ্ছে না, গ্রীষ্মকালে ভবনের অভ্যন্তরীণ তাপমাত্রা নিয়ন্ত্রণেও উল্লেখযোগ্য ভূমিকা রাখছে।</p><p>কৃষিবিদরা বলছেন, পরিকল্পিত ছাদবাগান গড়ে তোলা গেলে শহরের দূষণ কমার পাশাপাশি পাখির কলকাকলি ও জীববৈচিত্র্য ফিরে আসবে নাগরিক কোলাহলে।</p>"
    },
    excerpt: {
      en: "How rooftop gardens and micro-orchards cool urban buildings while supplying households with fresh organic produce.",
      bn: "কংক্রিটের শহরে অক্সিজেনের খোঁজে ছাদবাগান তৈরি করে নিজের ও পরিবেশের যত্ন নিচ্ছেন সাধারণ মানুষ।"
    },
    category: "feature",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Green potted plants and organic garden on sunny city rooftop",
        bn: "রৌদ্রোজ্জ্বল বিকেলে শহরের ছাদে সবুজ বাগানের মনোরম রূপ"
      }
    },
    tags: [
      { en: "Feature", bn: "ফিচার" },
      { en: "Rooftop Garden", bn: "ছাদবাগান" },
      { en: "Environment", bn: "পরিবেশ" }
    ],
    status: "published",
    publishedAt: getPublishedDate(26),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1680,
    likes: 142,
    shares: 44,
    metaTitle: {
      en: "Urban Rooftop Farming Transforms City Skylines",
      bn: "ছাদবাগানে শহরের পরিবেশ রূপান্তরের গল্প"
    },
    metaDescription: {
      en: "Exploration of rooftop organic agriculture and climate resilience across urban apartment communities.",
      bn: "শহরের ছাদে গড়ে ওঠা সবুজ বাগানের উপকারিতা ও নাগরিক অভিজ্ঞতার চমৎকার বিবরণ।"
    },
    metaKeywords: ["rooftop garden", "feature", "urban green", "lifestyle"]
  },

  // ==========================================
  // LITERATURE - DHUMKETU (3 articles)
  // ==========================================
  {
    title: {
      en: "Remembering Kazi Nazrul Islam's Revolutionary Periodical 'Dhumketu': A Century of Defiance",
      bn: "নজরুলের 'ধূমকেতু' পত্রিকার শতবর্ষ: দ্রোহ, বিপ্লব ও জাগরণের অবিনাশী সুর"
    },
    slug: "remembering-kazi-nazrul-islams-revolutionary-periodical-dhumketu-a-century-of-defiance",
    content: {
      en: "<p>When National Poet Kazi Nazrul Islam founded the bi-weekly periodical 'Dhumketu' (The Comet) in August 1922, Bengali literature witnessed an unprecedented seismic explosion of revolutionary passion, anti-colonial courage, and human egalitarianism.</p><p>With Rabindranath Tagore blessing its inaugural issue with fiery benedictions, Dhumketu fearlessly demanded complete, unconditional political independence for the subcontinent at a time when moderate politicians hesitated to utter the phrase. Nazrul's editorial poems published within its fiery pages challenged tyranny, social prejudice, and sectarian bigotry with unmatched cadence.</p><p>A century later, the spirit of Dhumketu remains a blazing guiding star for every generation asserting intellectual freedom and speaking truth to power.</p>",
      bn: "<p>১৯২২ সালের ১১ আগস্ট জাতীয় কবি কাজী নজরুল ইসলামের সম্পাদনায় যখন অর্ধ-সাপ্তাহিক পত্রিকা ‘ধূমকেতু’ আত্মপ্রকাশ করে, তখন বাংলা সাহিত্যের জগতে এক অভূতপূর্ব জাগরণের সূচনা হয়েছিল।</p><p>রবীন্দ্রনাথ ঠাকুরের আশীর্বাণী নিয়ে প্রকাশিত এই পত্রিকা কোনো দ্বিধা বা আপস ছাড়াই উপমহাদেশের পূর্ণাঙ্গ রাজনৈতিক স্বাধীনতার স্পষ্ট দাবি তুলে ধরেছিল। নজরুলের অগ্নিবর্ষী কবিতা ও সম্পাদকীয় লেখাগুলো ঔপনিবেশিক শাসন, সামাজিক বৈষম্য ও সাম্প্রদায়িকতার ভিত্তিমূল কাঁপিয়ে দিয়েছিল।</p><p>শতবর্ষ পেরিয়ে আজও ধূমকেতু মুক্তচিন্তা, তারুণ্যের সাহসিকতা এবং অন্যায়ের বিরুদ্ধে গর্জে ওঠার এক চিরন্তন বাতিঘর হিসেবে ভাস্বর।</p>"
    },
    excerpt: {
      en: "A historic homage to the seminal literary periodical that shook colonial authority and heralded complete sovereignty in Bengal.",
      bn: "বিদ্রোহী কবি কাজী নজরুল ইসলামের সম্পাদনায় প্রকাশিত ঐতিহাসিক ‘ধূমকেতু’ পত্রিকার সাহিত্যিক ও রাজনৈতিক তাৎপর্যের মূল্যায়ন।"
    },
    category: "literature-dhumketu",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Vintage parchment pages and antique ink pens symbolizing historic literature",
        bn: "সাহিত্য ও প্রাচীন পাণ্ডুলিপির প্রতীকী চিত্র"
      }
    },
    tags: [
      { en: "Literature", bn: "সাহিত্য" },
      { en: "Dhumketu", bn: "ধূমকেতু" },
      { en: "Nazrul", bn: "নজরুল" }
    ],
    status: "published",
    publishedAt: getPublishedDate(7),
    isFeatured: true,
    isBreaking: false,
    isTrending: false,
    views: 2650,
    likes: 280,
    shares: 110,
    metaTitle: {
      en: "Century of Nazrul's Dhumketu Periodical",
      bn: "নজরুলের 'ধূমকেতু' পত্রিকার শতবর্ষ: দ্রোহ ও জাগরণের অবিনাশী সুর"
    },
    metaDescription: {
      en: "Commemorating the centenary of revolutionary literary journal Dhumketu edited by Kazi Nazrul Islam.",
      bn: "বাংলা সাহিত্যের ঐতিহাসিক মাইলফলক ‘ধূমকেতু’র ইতিহাস ও বর্তমান প্রাসঙ্গিকতা নিয়ে বিশেষ নিবন্ধ।"
    },
    metaKeywords: ["dhumketu", "literature", "nazrul", "poetry"]
  },
  {
    title: {
      en: "Contemporary Bengali Poetry: Exploring Alienation, Digital Solitude, and Human Connection",
      bn: "সমকালীন বাংলা কবিতা: যান্ত্রিক জীবনের একাকীত্ব ও আত্মানুসন্ধানের নবীন প্রকাশ"
    },
    slug: "contemporary-bengali-poetry-exploring-alienation-digital-solitude-and-human-connection",
    content: {
      en: "<p>In the quiet study rooms of emerging poets across Dhaka and Kolkata, contemporary Bengali verse is embarking on bold semantic explorations. Departing from conventional pastoral nostalgia, modern poems articulate the subtle melancholy of glowing screen interfaces, fragmented urban friendships, and metaphysical longing.</p><p>Critics note that the language has become crisper, stripping away excessive ornamentation in favor of evocative minimalism. Yet underneath the contemporary lexical cadence beats the enduring lyrical pulse of Jibanananda Das and Shamsur Rahman.</p><p>Literary circles and underground chapbooks demonstrate that poetry continues to be a resilient sanctuary for contemplation in an era of digital distraction.</p>",
      bn: "<p>সমকালীন বাংলা কবিতার রূপ ও বক্তব্যে এসেছে উল্লেখযোগ্য পরিবর্তন। গ্রামীণ স্নিগ্ধতার পাশাপাশি আজকের কবিদের কলমে তীব্রভাবে ফুটে উঠছে আধুনিক মহানগরের নিঃসঙ্গতা, যান্ত্রিক ব্যস্ততা এবং সামাজিক মাধ্যমে ভার্চুয়াল সম্পর্কের জটিল সমীকরণ।</p><p>অতি-অলঙ্করণ বর্জন করে নতুন প্রজন্মের কবিরা বেছে নিচ্ছেন স্বল্পকথার তীক্ষ্ণ ব্যঞ্জনা। তবে এই পরিবর্তন সত্ত্বেও জীবনানন্দ ও শামসুর রাহমানের ঐতিহ্যবাহী সংবেদনশীলতা সমকালীন পঙক্তিমালায় সজীব রয়ে গেছে।</p><p>ছোটকাগজ ও সাহিত্য আড্ডায় তরুণদের স্বতঃস্ফূর্ত অংশগ্রহণ প্রমাণ করে যে, প্রযুক্তির চরম উৎকর্ষের যুগেও কবিতা মানুষের অন্তরাত্মার গভীরতম আশ্রয়স্থল।</p>"
    },
    excerpt: {
      en: "Critical review of modern verses confronting high-speed technological alienation with intimate emotional candor.",
      bn: "ভার্চুয়াল জীবনের আড়ালে মানুষের নিঃসঙ্গতা ও আবেগের নতুন প্রকাশ নিয়ে সমকালীন বাংলা কবিতার ধারা।"
    },
    category: "literature-dhumketu",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Open poetry collection book resting on a wooden literary desk",
        bn: "খোলা কবিতার বই ও সাহিত্য চিন্তার আবহ"
      }
    },
    tags: [
      { en: "Literature", bn: "সাহিত্য" },
      { en: "Poetry", bn: "কবিতা" },
      { en: "Arts", bn: "শিল্প" }
    ],
    status: "published",
    publishedAt: getPublishedDate(17),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1380,
    likes: 124,
    shares: 38,
    metaTitle: {
      en: "Contemporary Bengali Poetry and Digital Solitude",
      bn: "সমকালীন বাংলা কবিতায় আধুনিক জীবনের রূপ"
    },
    metaDescription: {
      en: "Analytical reflection on the thematic evolution of Bengali poetry in the modern digital millennium.",
      bn: "আধুনিক বাংলা কবিতার গতিপ্রকৃতি ও তরুণ কবিদের লেখনী নিয়ে সুলিখিত সাহিত্য সমালোচনা।"
    },
    metaKeywords: ["poetry", "bengali literature", "arts", "dhumketu"]
  },
  {
    title: {
      en: "The Timeless Melodies of Mymensingh Gitika: Folklore Echoes in Modern Theatrical Adaptations",
      bn: "ময়মনসিংহ গীতিকার রূপকথা ও লোকসাহিত্যের চিরন্তন সুর: আধুনিক মঞ্চনাটকে পুনর্ব্যাখ্যা"
    },
    slug: "the-timeless-melodies-of-mymensingh-gitika-folklore-echoes-in-modern-theatrical-adaptations",
    content: {
      en: "<p>The epic balladry of Mymensingh Gitika—collected a century ago under the visionary guidance of folklorist Dinesh Chandra Sen—remains one of the world's most vivid oral literary treasures. Tales of Mahua, Malua, and Chandravati continue to mesmerize audiences with their unvarnished emotional realism and formidable female agency.</p><p>Recently staged adaptations by university drama repertories in the capital have reimagined these ancient village ballads using avant-garde physical theater and indigenous percussion instruments.</p><p>Theater directors argue that these folktales carry timeless universal truths about justice, love, and community resilience that transcend historical epochs.</p>",
      bn: "<p>ড. দীনেশচন্দ্র সেনের সংগৃহীত ‘ময়মনসিংহ গীতিকা’ কেবল বাংলার নয়, বিশ্ব লোকসাহিত্যের এক অমূল্য সম্পদ। মহুয়া, মলুয়া ও চন্দ্রাবতীর আত্মত্যাগ ও সাহসিকতার আখ্যান আজও বাংলা ভাষার পাঠক ও দর্শকদের গভীরভাবে মুগ্ধ করে।</p><p>রাজধানীর বিভিন্ন নাট্যদল আধুনিক মঞ্চসজ্জা ও দেশীয় বাদ্যযন্ত্রের মেলবন্ধনে এই লোকগাথাগুলোকে নতুন আঙ্গিকে মঞ্চস্থ করছে। লোকজ রূপকথা কীভাবে আধুনিক সমাজের নারী স্বাধীনতা ও নৈতিক প্রশ্নগুলোকে স্পর্শ করে, তা এই প্রযোজনাগুলোতে চমৎকারভাবে উপস্থাপিত হচ্ছে।</p><p>লোকসংস্কৃতি গবেষকদের মতে, আমাদের নিজস্ব ঐতিহ্যের শিকড়ে ফিরে গিয়ে তাকে সমকালীন ভাষায় প্রকাশ করাই নাট্য সাহিত্যের শ্রেষ্ঠ সাধনা।</p>"
    },
    excerpt: {
      en: "How centuries-old rural ballads of love, valor, and moral defiance inspire cutting-edge metropolitan drama stages.",
      bn: "ময়মনসিংহ গীতিকার অমর চরিত্রগুলো কীভাবে সমকালীন মঞ্চে নতুন রূপে জীবন্ত হয়ে উঠছে, তা নিয়ে বিশেষ নাট্য প্রবন্ধ।"
    },
    category: "literature-dhumketu",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Traditional string musical instrument evoking folk storytelling",
        bn: "ঐতিহ্যবাহী লোকসঙ্গীত ও নাট্যের সুর"
      }
    },
    tags: [
      { en: "Literature", bn: "সাহিত্য" },
      { en: "Folklore", bn: "লোকসাহিত্য" },
      { en: "Theater", bn: "নাটক" }
    ],
    status: "published",
    publishedAt: getPublishedDate(29),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1290,
    likes: 95,
    shares: 26,
    metaTitle: {
      en: "Mymensingh Gitika Folktales in Modern Theater",
      bn: "আধুনিক মঞ্চে ময়মনসিংহ গীতিকার রূপকথা"
    },
    metaDescription: {
      en: "Essay examining the enduring artistic brilliance of Mymensingh Gitika oral ballads on the stage.",
      bn: "লোকসাহিত্যের ঐতিহ্যবাহী চরিত্রগুলোর সমকালীন মঞ্চায়ন নিয়ে বিশ্লেষণমূলক লেখা।"
    },
    metaKeywords: ["mymensingh gitika", "literature", "theater", "folklore"]
  },

  // ==========================================
  // FACT CHECK (3 articles)
  // ==========================================
  {
    title: {
      en: "Fact Check: Fabricated Video Claims Weather Anomaly in the Bay of Bengal",
      bn: "ফ্যাক্টচেক: বঙ্গোপসাগরে অস্বাভাবিক প্রাকৃতিক দুর্যোগের বিভ্রান্তিকর ভিডিও যাচাই"
    },
    slug: "fact-check-fabricated-video-claims-weather-anomaly-in-the-bay-of-bengal",
    content: {
      en: "<p>A dramatic video clip showing towering, apocalyptic coastal tidal waves has accumulated over two million views across social media platforms with false captions claiming an imminent unannounced super cyclone along the Saint Martin coastline.</p><p>A rigorous forensic investigation conducted by digital verification specialists revealed that the footage was originally captured during a 2018 Pacific typhoon in Taiwan. Meteorological department officials have officially confirmed that no such catastrophic anomaly exists in Bangladesh maritime territories.</p><p>Citizens are urged to consult verified bulletins issued by national weather centers before amplifying unverified, fear-inducing social media speculation.</p>",
      bn: "<p>বঙ্গোপসাগরে সেন্টমার্টিন উপকূলের কাছে বিশাল জলোচ্ছ্বাস ও অস্বাভাবিক ঘূর্ণিঝড়ের দাবি করে সম্প্রতি সামাজিক যোগাযোগ মাধ্যমে ছড়িয়ে পড়া একটি ভিডিও ব্যাপক বিভ্রান্তি সৃষ্টি করেছে।</p><p>আমাদের ফ্যাক্টচেক টিম ভিডিওটির ফ্রেম ধরে রিভার্স ইমেজ সার্চ ও মেটাডেটা বিশ্লেষণ করে দেখেছে যে, ভিডিওটি প্রকৃতপক্ষে ২০১৮ সালে তাইওয়ানের উপকূলে আঘাত হানা টাইফুনের দৃশ্য। বাংলাদেশ আবহাওয়া অধিদপ্তরের সাথে যোগাযোগ করা হলে কর্মকর্তারা জানান, বর্তমানে দেশের উপকূলীয় অঞ্চলে এ ধরনের কোনো বিপদের পূর্বাভাস নেই।</p><p>যেকোনো সংবেদনশীল খবর শেয়ার করার আগে সরকারি আবহাওয়া বুলেটিন ও দায়িত্বশীল গণমাধ্যমের সত্যতা নিশ্চিত করার জন্য সাধারণ পাঠকদের সতর্ক করা হচ্ছে।</p>"
    },
    excerpt: {
      en: "Verification confirms dramatic viral video claiming super storm off Saint Martin is repurposed 2018 footage from Taiwan.",
      bn: "ভাইরাল ভিডিওর সত্যতা যাচাই করে দেখা গেছে এটি ২০১৮ সালের তাইওয়ানের পুরোনো টাইফুনের ভিডিও, যা বিভ্রান্তিকর শিরোনামে ছড়ানো হয়েছে।"
    },
    category: "fact-check",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Magnifying glass examining digital screen information for truth verification",
        bn: "তথ্য যাচাই ও ফ্যাক্টচেকিংয়ের প্রতীকী রূপ"
      }
    },
    tags: [
      { en: "Fact Check", bn: "ফ্যাক্টচেক" },
      { en: "Weather", bn: "আবহাওয়া" },
      { en: "Verification", bn: "যাচাই" }
    ],
    status: "published",
    publishedAt: getPublishedDate(1),
    isFeatured: true,
    isBreaking: false,
    isTrending: true,
    views: 3410,
    likes: 310,
    shares: 145,
    metaTitle: {
      en: "Fact Check: False Bay of Bengal Storm Video Debunked",
      bn: "ফ্যাক্টচেক: বঙ্গোপসাগরের ঘূর্ণিঝড় সংক্রান্ত ভুয়া ভিডিওর সত্যতা যাচাই"
    },
    metaDescription: {
      en: "Fact-checking viral video falsely attributing Taiwanese typhoon footage to the Bay of Bengal coastline.",
      bn: "সোশ্যাল মিডিয়ায় ছড়িয়ে পড়া সামুদ্রিক ঝড়ের ভুয়া ভিডিও যাচাই করে সঠিক তথ্য প্রকাশ।"
    },
    metaKeywords: ["fact check", "verification", "weather", "rumors"]
  },
  {
    title: {
      en: "Fact Check: False Rumors on International Foreign Currency Reserve Depletion Debunked",
      bn: "ফ্যাক্টচেক: বৈদেশিক মুদ্রার রিজার্ভ হ্রাস সংক্রান্ত সামাজিক মাধ্যমের গুজবের আসল সত্য"
    },
    slug: "fact-check-false-rumors-on-international-foreign-currency-reserve-depletion-debunked",
    content: {
      en: "<p>Unverified graphics circulating across messaging groups have falsely claimed an emergency liquidity shutdown of national foreign exchange reserves, generating unnecessary anxiety among overseas remittance senders and importers.</p><p>Official records, audited monthly balance sheets from the central bank, and cross-verified reports from international multilateral institutions confirm that reserves remain resilient, comfortably covering over four months of standard national import obligations.</p><p>Financial regulators reiterate that monetary metrics are published publicly with complete transparency and warn against malicious financial misinformation.</p>",
      bn: "<p>মেসেজিং অ্যাপ ও সোশ্যাল মিডিয়ায় কিছু বিভ্রান্তিকর গ্রাফিক্স পোস্ট করে দাবি করা হচ্ছিল যে, দেশের বৈদেশিক মুদ্রার রিজার্ভ আশঙ্কাজনকভাবে শেষ হয়ে গেছে। এই খবরটি প্রবাসীদের মাঝে সাময়িক উদ্বেগ তৈরি করে।</p><p>কেন্দ্রীয় ব্যাংকের সর্বশেষ অডিটেড প্রতিবেদন ও আন্তর্জাতিক আর্থিক সংস্থার ডাটাবেজ যাচাই করে দেখা গেছে যে, রিজার্ভের পরিমাণ সম্পূর্ণ স্থিতিশীল এবং দেশের চার মাসেরও বেশি সময়ের আমদানি ব্যয় মেটানোর জন্য যথেষ্ট।</p><p>ব্যাংক কর্মকর্তারা নিশ্চিত করেছেন যে দেশের বৈদেশিক বাণিজ্য ও লেনদেন স্বাভাবিকভাবে পরিচালিত হচ্ছে এবং অসত্য গুজবে বিভ্রান্ত না হওয়ার জন্য সবাইকে অনুরোধ জানিয়েছেন।</p>"
    },
    excerpt: {
      en: "Central bank figures and multi-lateral audits disprove manipulated infographics claiming foreign currency liquidity failure.",
      bn: "বাংলাদেশ ব্যাংকের আনুষ্ঠানিক তথ্য ও রিজার্ভ ডাটা যাচাই করে দেখা গেছে রিজার্ভ ফুরিয়ে যাওয়ার দাবিটি সম্পূর্ণ অসত্য ও বানোয়াট।"
    },
    category: "fact-check",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Official financial inspection checkmark and auditing tools",
        bn: "আর্থিক নথি নিরীক্ষা ও তথ্য অনুসন্ধানের প্রতীক"
      }
    },
    tags: [
      { en: "Fact Check", bn: "ফ্যাক্টচেক" },
      { en: "Economy", bn: "অর্থনীতি" },
      { en: "Reserves", bn: "রিজার্ভ" }
    ],
    status: "published",
    publishedAt: getPublishedDate(11),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1890,
    likes: 135,
    shares: 52,
    metaTitle: {
      en: "Fact Check: Forex Reserve Depletion Rumors Debunked",
      bn: "ফ্যাক্টচেক: বৈদেশিক মুদ্রা রিজার্ভ নিয়ে ছড়ানো গুজবের সত্যতা"
    },
    metaDescription: {
      en: "Fact check exposing manipulated social media graphics concerning foreign currency reserves.",
      bn: "রিজার্ভের সঠিক পরিসংখ্যান তুলে ধরে সামাজিক মাধ্যমের ভুয়া খবরের তথ্যভিত্তিক পর্যালোচনা।"
    },
    metaKeywords: ["fact check", "reserves", "finance", "bangladesh"]
  },
  {
    title: {
      en: "Fact Check: Manipulated Circular Regarding Public Examination Cancellation Clarified",
      bn: "ফ্যাক্টচেক: পাবলিক পরীক্ষা বাতিলের ভুয়া সরকারি প্রজ্ঞাপন নিয়ে বিভ্রান্তি নিরসন"
    },
    slug: "fact-check-manipulated-circular-regarding-public-examination-cancellation-clarified",
    content: {
      en: "<p>A photoshopped notification bearing the official crest and forged signature of an education board official went viral online, claiming that upcoming secondary board examinations had been deferred indefinitely.</p><p>Cross-referencing the official ministry gazette repository revealed that the document number belonged to an unrelated administrative transfer order from the previous calendar year. Education ministry spokespersons officially issued an urgent clarification confirming all examination routines proceed precisely as published.</p><p>Educators and students are advised to rely exclusively on verified board portals for formal academic schedules.</p>",
      bn: "<p>শিক্ষা বোর্ডের লোগো ও স্মারক নম্বর জাল করে তৈরি করা একটি ভুয়া নোটিশ ইন্টারনেটে ছড়িয়ে পড়ে, যাতে দাবি করা হয়েছিল যে আসন্ন পাবলিক পরীক্ষা অনির্দিষ্টকালের জন্য স্থগিত করা হয়েছে।</p><p>ফ্যাক্টচেক অনুসন্ধানে দেখা যায়, ব্যবহৃত স্মারক নম্বরটি গত বছরের অন্য একটি প্রশাসনিক বদলি আদেশের। শিক্ষা মন্ত্রণালয় থেকে তাৎক্ষণিকভাবে বিবৃতি দিয়ে জানানো হয়েছে যে এই নোটিশটি সম্পূর্ণ ভিত্তিহীন এবং ঘোষিত সময়সূচি অনুযায়ীই যথাসময়ে পরীক্ষা অনুষ্ঠিত হবে।</p><p>পরীক্ষার্থী ও অভিভাবকদের শিক্ষা বোর্ডের ওয়েবসাইট ছাড়া সামাজিক মাধ্যমের কোনো অপ্রমাণিত তথ্য বিশ্বাস না করার পরামর্শ দেওয়া হয়েছে।</p>"
    },
    excerpt: {
      en: "Education ministry confirms fabricated letter circulating on chat apps used forged signatures from old administrative files.",
      bn: "শিক্ষা বোর্ডের সিল ও স্বাক্ষর নকল করে বানানো প্রজ্ঞাপনটি ভুয়া বলে নিশ্চিত করেছে সংশ্লিষ্ট কর্তৃপক্ষ।"
    },
    category: "fact-check",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Official documents being verified under review",
        bn: "সরকারি নথি ও সত্যতা যাচাইয়ের প্রতীক"
      }
    },
    tags: [
      { en: "Fact Check", bn: "ফ্যাক্টচেক" },
      { en: "Education", bn: "শিক্ষা" },
      { en: "Verification", bn: "যাচাই" }
    ],
    status: "published",
    publishedAt: getPublishedDate(21),
    isFeatured: false,
    isBreaking: false,
    isTrending: false,
    views: 1780,
    likes: 122,
    shares: 47,
    metaTitle: {
      en: "Fact Check: Fake Public Exam Cancellation Notice Debunked",
      bn: "ফ্যাক্টচেক: পরীক্ষা বাতিলের ভুয়া নোটিশের আসল সত্য"
    },
    metaDescription: {
      en: "Investigation into forged education ministry notice claiming examination cancellation.",
      bn: "পরীক্ষা স্থগিতের ভুয়া নোটিশের সত্যতা উন্মোচন এবং মন্ত্রণালয়ের আনুষ্ঠানিক বক্তব্য।"
    },
    metaKeywords: ["fact check", "exam", "education", "circular"]
  }
];

// Combine existing + new client articles
// Make sure existing articles don't duplicate slugs
const existingSlugs = new Set(newClientArticles.map(a => a.slug));
const filteredExisting = existing.filter(a => !existingSlugs.has(a.slug));

const allArticles = [...filteredExisting, ...newClientArticles];

fs.writeFileSync(existingArticlesPath, JSON.stringify(allArticles, null, 2), 'utf-8');

console.log('✅ Generated total articles:', allArticles.length);
const catSummary = {};
allArticles.forEach(a => catSummary[a.category] = (catSummary[a.category] || 0) + 1);
console.log('Categories:', catSummary);
