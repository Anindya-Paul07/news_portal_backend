import { prisma } from '../../config/database.js';
import { AppError } from '../../middleware/errorHandler.js';
import { getPaginationParams } from '../../utils/queryUtils.js';

class ReelService {
  mapReel(reel) {
    if (!reel) return null;

    return {
      id: reel.id,
      title: reel.title,
      url: reel.url,
      description: reel.description ?? null,
      isActive: reel.isActive,
      createdAt: reel.createdAt,
      updatedAt: reel.updatedAt,
    };
  }

  // Get all reels (public: only active; admin: all)
  async getAllReels(query, isAdmin = false) {
    const { page, limit, skip } = getPaginationParams(query);

    const where = {};

    if (isAdmin && query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    } else if (!isAdmin) {
      where.isActive = true;
    }

    const [reels, total] = await Promise.all([
      prisma.reel.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.reel.count({ where }),
    ]);

    return {
      reels: reels.map((reel) => this.mapReel(reel)),
      pagination: { page, limit, total },
    };
  }

  // Get single reel by ID
  async getReelById(id) {
    const reel = await prisma.reel.findUnique({ where: { id } });

    if (!reel) {
      throw new AppError('Reel not found', 404);
    }

    return this.mapReel(reel);
  }

  // Create a new reel
  async createReel(data) {
    const reel = await prisma.reel.create({
      data: {
        title: data.title,
        url: data.url,
        description: data.description ?? null,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });

    return this.mapReel(reel);
  }

  // Update an existing reel
  async updateReel(id, data) {
    const existing = await prisma.reel.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError('Reel not found', 404);
    }

    const reel = await prisma.reel.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.url !== undefined && { url: data.url }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });

    return this.mapReel(reel);
  }

  // Delete a reel
  async deleteReel(id) {
    const existing = await prisma.reel.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError('Reel not found', 404);
    }

    await prisma.reel.delete({ where: { id } });

    return { message: 'Reel deleted successfully' };
  }
}

export default new ReelService();
