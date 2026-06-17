import { body } from 'express-validator';

const SUPPORTED_LAYOUT_KEYS = [
  'adsEnabled',
  'homepageLeadId',
  'homepageSecondaryIds',
  'homepageTopPickCategorySlug',
  'onThisDay',
  'sectionPromoBySlug',
  'mostReadOverrideIds',
];

const isPlainObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const hasOnlySupportedKeys = (value) => {
  return Object.keys(value).every((key) => SUPPORTED_LAYOUT_KEYS.includes(key));
};

const isLocalizedText = (value) => {
  if (typeof value === 'string') return true;
  if (!isPlainObject(value)) return false;
  return Object.values(value).every((entry) => typeof entry === 'string');
};

export const updateLayoutSettingsValidation = [
  body()
    .custom((value) => isPlainObject(value))
    .withMessage('Payload must be a JSON object')
    .bail()
    .custom((value) => Object.keys(value).length > 0)
    .withMessage('At least one layout setting is required')
    .bail()
    .custom(hasOnlySupportedKeys)
    .withMessage(`Supported layout settings are: ${SUPPORTED_LAYOUT_KEYS.join(', ')}`),

  body('adsEnabled')
    .optional()
    .custom((value) => typeof value === 'boolean')
    .withMessage('adsEnabled must be a boolean'),

  body('homepageLeadId')
    .optional({ nullable: true })
    .isString()
    .withMessage('homepageLeadId must be a string or null'),

  body('homepageSecondaryIds')
    .optional()
    .isArray()
    .withMessage('homepageSecondaryIds must be an array'),

  body('homepageSecondaryIds.*')
    .optional()
    .isString()
    .withMessage('homepageSecondaryIds must contain only strings'),

  body('homepageTopPickCategorySlug')
    .optional({ nullable: true })
    .isString()
    .withMessage('homepageTopPickCategorySlug must be a string or null'),

  body('onThisDay')
    .optional()
    .custom(isPlainObject)
    .withMessage('onThisDay must be an object'),

  body('onThisDay.enabled')
    .optional()
    .custom((value) => typeof value === 'boolean')
    .withMessage('onThisDay.enabled must be a boolean'),

  body('onThisDay.date')
    .optional()
    .custom(isLocalizedText)
    .withMessage('onThisDay.date must be localized text'),

  body('onThisDay.kicker')
    .optional()
    .custom(isLocalizedText)
    .withMessage('onThisDay.kicker must be localized text'),

  body('onThisDay.title')
    .optional()
    .custom(isLocalizedText)
    .withMessage('onThisDay.title must be localized text'),

  body('onThisDay.description')
    .optional()
    .custom(isLocalizedText)
    .withMessage('onThisDay.description must be localized text'),

  body('sectionPromoBySlug')
    .optional()
    .custom(isPlainObject)
    .withMessage('sectionPromoBySlug must be an object'),

  body('mostReadOverrideIds')
    .optional()
    .isArray()
    .withMessage('mostReadOverrideIds must be an array'),

  body('mostReadOverrideIds.*')
    .optional()
    .isString()
    .withMessage('mostReadOverrideIds must contain only strings'),
];
