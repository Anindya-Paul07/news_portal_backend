import { body, param } from 'express-validator';

export const createReelValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  body('url')
    .trim()
    .notEmpty()
    .withMessage('YouTube article URL is required')
    .isURL()
    .withMessage('Invalid URL format'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
];

export const updateReelValidation = [
  param('id').isUUID().withMessage('Invalid reel ID'),

  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  body('url')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid URL format'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
];

export const reelIdParamValidation = [
  param('id').isUUID().withMessage('Invalid reel ID'),
];
