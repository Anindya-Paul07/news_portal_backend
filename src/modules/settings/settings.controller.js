import settingsService from './settings.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendResponse } from '../../utils/responseUtils.js';
import { AppError } from '../../middleware/errorHandler.js';
import { USER_ROLES } from '../../config/constants.js';

class SettingsController {
  // @desc    Get layout settings
  // @route   GET /api/v1/settings/layout
  // @access  Public
  getLayoutSettings = asyncHandler(async (req, res) => {
    const settings = await settingsService.getLayoutSettings();
    sendResponse(res, 200, settings, 'Layout settings retrieved successfully');
  });

  // @desc    Update layout settings
  // @route   PUT /api/v1/settings/layout
  // @access  Private (Admin, Editorial for onThisDay only)
  updateLayoutSettings = asyncHandler(async (req, res) => {
    if (req.user?.role === USER_ROLES.EDITORIAL) {
      const keys = Object.keys(req.body);
      if (keys.length !== 1 || keys[0] !== 'onThisDay') {
        throw new AppError('Editorial users can only update the On this day homepage text', 403);
      }
    }

    const settings = await settingsService.updateLayoutSettings(req.body);
    const updatedFields = Object.keys(req.body).reduce((result, key) => {
      result[key] = settings[key];
      return result;
    }, {});

    sendResponse(res, 200, updatedFields, 'Layout settings updated successfully');
  });
}

export default new SettingsController();
