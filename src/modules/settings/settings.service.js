import { prisma } from '../../config/database.js';

const LAYOUT_SETTINGS_KEY = 'layout';

const DEFAULT_LAYOUT_SETTINGS = {
  adsEnabled: true,
  homepageLeadId: null,
  homepageSecondaryIds: [],
  homepageTopPickCategorySlug: null,
  onThisDay: {
    enabled: true,
    description: {
      en: '',
      bn: '',
    },
  },
  sectionPromoBySlug: {},
  mostReadOverrideIds: [],
};

const isPlainObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

class SettingsService {
  async getLayoutSettings() {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: LAYOUT_SETTINGS_KEY },
    });

    if (!isPlainObject(setting?.value)) {
      return DEFAULT_LAYOUT_SETTINGS;
    }

    return {
      ...DEFAULT_LAYOUT_SETTINGS,
      ...setting.value,
    };
  }

  async updateLayoutSettings(payload) {
    const currentSettings = await this.getLayoutSettings();
    const nextSettings = {
      ...currentSettings,
      ...payload,
    };

    await prisma.siteSetting.upsert({
      where: { key: LAYOUT_SETTINGS_KEY },
      create: {
        key: LAYOUT_SETTINGS_KEY,
        value: nextSettings,
      },
      update: {
        value: nextSettings,
      },
    });

    return nextSettings;
  }
}

export default new SettingsService();
