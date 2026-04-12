import express from 'express';
import reelController from './reel.controller.js';
import { protect, restrictTo } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import {
  createReelValidation,
  updateReelValidation,
  reelIdParamValidation,
} from './reel.validation.js';
import { USER_ROLES } from '../../config/constants.js';

const router = express.Router();

// Public routes
router.get('/', reelController.getAllReels);
router.get('/:id', reelIdParamValidation, validate, reelController.getReel);

// Protected routes - Admin / Super Admin only
router.use(protect);

router.post(
  '/',
  restrictTo(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  createReelValidation,
  validate,
  reelController.createReel
);

router.put(
  '/:id',
  restrictTo(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  updateReelValidation,
  validate,
  reelController.updateReel
);

router.delete(
  '/:id',
  restrictTo(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  reelIdParamValidation,
  validate,
  reelController.deleteReel
);

export default router;
