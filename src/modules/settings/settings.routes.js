import express from 'express';
import settingsController from './settings.controller.js';
import { protect, restrictTo } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { USER_ROLES } from '../../config/constants.js';
import { updateLayoutSettingsValidation } from './settings.validation.js';

const router = express.Router();

router.get('/layout', settingsController.getLayoutSettings);

router.use(protect);
router.use(restrictTo(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.EDITORIAL));

router.put('/layout', updateLayoutSettingsValidation, validate, settingsController.updateLayoutSettings);

export default router;
