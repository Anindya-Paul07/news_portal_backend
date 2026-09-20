import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppError } from '../middleware/errorHandler.js';
import { ALLOWED_FILE_TYPES, UPLOAD_LIMITS } from '../config/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    fs.mkdir(uploadPath, { recursive: true }, (error) => {
      cb(error, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    // Sanitize base name: strip %2F and unsafe characters to prevent URL 404 issues
    let cleanName = path.basename(file.originalname, ext)
      .replace(/%2[fF]/gi, '-')
      .replace(/[^a-zA-Z0-9_\-\.]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    if (!cleanName) cleanName = 'media';
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  },
});

const isImageFile = (file) => {
  return (
    ALLOWED_FILE_TYPES.IMAGE.includes(file.mimetype) ||
    file.mimetype.startsWith('image/') ||
    /\.(jpe?g|png|webp|avif|gif|svg|bmp|tiff?|ico|heic|heif|apng)$/i.test(file.originalname)
  );
};

const isVideoFile = (file) => {
  return (
    ALLOWED_FILE_TYPES.VIDEO.includes(file.mimetype) ||
    file.mimetype.startsWith('video/') ||
    /\.(mp4|webm|ogg|mov|mkv|avi)$/i.test(file.originalname)
  );
};

const isDocumentFile = (file) => {
  return (
    ALLOWED_FILE_TYPES.DOCUMENT.includes(file.mimetype) ||
    file.mimetype.includes('pdf') ||
    file.mimetype.includes('document') ||
    /\.(pdf|docx?|xlsx?|pptx?|txt)$/i.test(file.originalname)
  );
};

// File filter
const fileFilter = (req, file, cb) => {
  if (isImageFile(file) || isVideoFile(file) || isDocumentFile(file)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Invalid file type. Only images (including AVIF, WEBP, PNG, JPG, SVG), videos, and documents are allowed.',
        400
      ),
      false
    );
  }
};

// Multer upload configuration
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: UPLOAD_LIMITS.IMAGE_MAX_SIZE, // Default limit
  },
});

// Specific upload configurations
export const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (isImageFile(file)) {
      cb(null, true);
    } else {
      cb(new AppError('Only image files are allowed (JPEG, PNG, WEBP, AVIF, GIF, SVG, etc.)', 400), false);
    }
  },
  limits: { fileSize: UPLOAD_LIMITS.IMAGE_MAX_SIZE },
});

export const uploadVideo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.VIDEO.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Only video files are allowed', 400), false);
    }
  },
  limits: { fileSize: UPLOAD_LIMITS.VIDEO_MAX_SIZE },
});

export const uploadDocument = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.DOCUMENT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Only document files are allowed', 400), false);
    }
  },
  limits: { fileSize: UPLOAD_LIMITS.DOCUMENT_MAX_SIZE },
});
