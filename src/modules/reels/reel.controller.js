import reelService from './reel.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { sendResponse, sendPaginatedResponse } from '../../utils/responseUtils.js';
import { USER_ROLES } from '../../config/constants.js';

class ReelController {
  // @desc    Get all reels
  // @route   GET /api/v1/reels
  // @access  Public
  getAllReels = asyncHandler(async (req, res) => {
    const isAdmin = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN].includes(req.user?.role);
    const result = await reelService.getAllReels(req.query, isAdmin);
    sendPaginatedResponse(res, 200, result.reels, result.pagination, 'YouTube articles retrieved successfully');
  });

  // @desc    Get single reel
  // @route   GET /api/v1/reels/:id
  // @access  Public
  getReel = asyncHandler(async (req, res) => {
    const reel = await reelService.getReelById(req.params.id);
    sendResponse(res, 200, reel, 'YouTube article retrieved successfully');
  });

  // @desc    Create a new reel
  // @route   POST /api/v1/reels
  // @access  Private (Admin, Super Admin)
  createReel = asyncHandler(async (req, res) => {
    const reel = await reelService.createReel(req.body);
    sendResponse(res, 201, reel, 'YouTube article created successfully');
  });

  // @desc    Update a reel
  // @route   PUT /api/v1/reels/:id
  // @access  Private (Admin, Super Admin)
  updateReel = asyncHandler(async (req, res) => {
    const reel = await reelService.updateReel(req.params.id, req.body);
    sendResponse(res, 200, reel, 'YouTube article updated successfully');
  });

  // @desc    Delete a reel
  // @route   DELETE /api/v1/reels/:id
  // @access  Private (Admin, Super Admin)
  deleteReel = asyncHandler(async (req, res) => {
    const result = await reelService.deleteReel(req.params.id);
    sendResponse(res, 200, result, 'YouTube article deleted successfully');
  });
}

export default new ReelController();
