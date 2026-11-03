// Treat empty rich-text editor markup as an empty translation.
export const hasArticleText = (value) => typeof value === 'string' && Boolean(value
  .replace(/<[^>]*>/g, '')
  .replace(/&(?:nbsp|#160|#x0*a0);/gi, ' ')
  .replace(/[\u200B-\u200D\uFEFF]/g, '')
  .trim());

export const normalizeArticleText = (value) => hasArticleText(value) ? value.trim() : '';

export const validArticleTextPair = (value) => value !== null && typeof value === 'object'
  && !Array.isArray(value)
  && ['en', 'bn'].every((language) => value[language] == null || typeof value[language] === 'string');
