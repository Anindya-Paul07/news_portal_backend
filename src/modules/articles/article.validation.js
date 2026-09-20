import { body, param } from 'express-validator';
import { ARTICLE_STATUS } from '../../config/constants.js';

export const createArticleValidation = [
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

  body('content.en').trim().notEmpty().withMessage('English content is required'),

  body('content.bn').trim().notEmpty().withMessage('Bangla content is required'),

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
