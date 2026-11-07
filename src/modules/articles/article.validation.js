import { body, param } from 'express-validator';
import { hasArticleText, validArticleTextPair } from '../../utils/articleText.js';
import { ARTICLE_STATUS } from '../../config/constants.js';

const authorBylineValidation = () => [
  body('authorName').optional({ nullable: true }).isString().bail().trim()
    .isLength({ max: 200 }).withMessage('Author name cannot exceed 200 characters'),
  body('authorPhoto').optional({ nullable: true }).isString().bail().trim()
    .isLength({ max: 2048 }).bail()
    .custom((value) => {
      if (!value) return true;
      if (/^(?:\/(?!\/)|uploads\/)/.test(value)) return true;
      try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol);
      } catch { return false; }
    }).withMessage('Author photo must be an image path or HTTP(S) URL'),
];

export const createArticleValidation = [
  ...authorBylineValidation(),
  body('title.en')
    .trim()
    .notEmpty()
    .withMessage('English title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  body('title.bn')
    .trim()
    .notEmpty()
    .withMessage('Bangla title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  ...['excerpt', 'content'].map((field) => body(field)
    .custom((value) => validArticleTextPair(value)
      && (hasArticleText(value.en) || hasArticleText(value.bn)))
    .withMessage(`${field === 'excerpt' ? 'Excerpt' : 'Content'} is required in English or Bangla`)),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isUUID()
    .withMessage('Invalid category ID'),

  body('status').optional().isIn(Object.values(ARTICLE_STATUS)).withMessage('Invalid status'),

  body('featuredImage.url')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      if (typeof value !== 'string') {
        throw new Error('Invalid featured image URL');
      }
      const trimmed = value.trim();
      if (!trimmed) return true;
      if (
        trimmed.startsWith('/') ||
        trimmed.startsWith('uploads/') ||
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('data:image/')
      ) {
        return true;
      }
      try {
        new URL(trimmed);
        return true;
      } catch {
        if (/^[a-zA-Z0-9_\-./%?=&#+@]+$/.test(trimmed)) {
          return true;
        }
        throw new Error('Invalid featured image URL');
      }
    }),
];

export const updateArticleValidation = [
  ...authorBylineValidation(),
  // The service validates the merged translations for partial updates.
  ...['excerpt', 'content'].map((field) => body(field).optional()
    .custom(validArticleTextPair)
    .withMessage(`${field} must contain English or Bangla text fields`)),

  param('id').isUUID().withMessage('Invalid article ID'),

  body('title.en')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  body('title.bn')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  body('category').optional().isUUID().withMessage('Invalid category ID'),

  body('status').optional().isIn(Object.values(ARTICLE_STATUS)).withMessage('Invalid status'),

  body('featuredImage.url')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value) return true;
      if (typeof value !== 'string') {
        throw new Error('Invalid featured image URL');
      }
      const trimmed = value.trim();
      if (!trimmed) return true;
      if (
        trimmed.startsWith('/') ||
        trimmed.startsWith('uploads/') ||
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('data:image/')
      ) {
        return true;
      }
      try {
        new URL(trimmed);
        return true;
      } catch {
        if (/^[a-zA-Z0-9_\-./%?=&#+@]+$/.test(trimmed)) {
          return true;
        }
        throw new Error('Invalid featured image URL');
      }
    }),
];

export const articleIdentifierValidation = [
  param('identifier').notEmpty().withMessage('Article ID or slug is required'),
];

export const articleIdParamValidation = [param('id').isUUID().withMessage('Invalid article ID')];
