import test from 'node:test';
import assert from 'node:assert/strict';
import { validationResult } from 'express-validator';
import { createArticleValidation, updateArticleValidation } from '../src/modules/articles/article.validation.js';
import service from '../src/modules/articles/article.service.js';
import { prisma } from '../src/config/database.js';

const base = {
  title: { en: 'News', bn: 'সংবাদ' },
  category: '123e4567-e89b-42d3-a456-426614174000',
};
const errors = async (body, validators = createArticleValidation) => {
  const req = { body: structuredClone(body), params: { id: base.category } };
  for (const validator of validators) await validator.run(req);
  return validationResult(req).array();
};

test('create accepts English-only, Bangla-only, and bilingual text', async () => {
  for (const text of [{ en: '<p>News</p>' }, { bn: '<p>সংবাদ</p>' }, { en: 'News', bn: 'সংবাদ' }]) {
    assert.deepEqual(await errors({ ...base, excerpt: text, content: text }), []);
  }
});

test('each text pair must contain real text and reject malformed values', async () => {
  for (const field of ['excerpt', 'content']) {
    for (const empty of [undefined, null, [], 'text', { en: 123 }, { en: '<p><br></p>', bn: '<p>&nbsp;\u200B</p>' }]) {
      const result = await errors({ ...base, excerpt: { en: 'Summary' }, content: { en: 'News' }, [field]: empty });
      assert.ok(result.some((error) => error.path === field));
    }
  }
});

test('partial update validation allows omitted translations but rejects malformed pairs', async () => {
  assert.deepEqual(await errors({ content: { bn: 'সংবাদ' } }, updateArticleValidation), []);
  assert.deepEqual(await errors({ status: 'draft' }, updateArticleValidation), []);
  assert.ok((await errors({ content: null }, updateArticleValidation)).length);
});

test('persistence supports one-language creation and safe partial updates without database access', async (t) => {
  let written;
  const originalArticle = prisma.article;
  prisma.article = {
    findFirst: async () => null,
    create: async ({ data }) => { written = data; return data; },
  };
  t.after(() => { prisma.article = originalArticle; });
  t.mock.method(service, 'mapArticle', (value) => value);
  await service.createArticle({ ...base, excerpt: { bn: 'সারাংশ' }, content: { bn: 'সংবাদ' } }, 'author');
  assert.equal(written.contentEn, '');
  assert.equal(written.contentBn, 'সংবাদ');
  assert.ok(written.readTime > 0);

  prisma.article.findUnique = async () => ({
    id: base.category, authorId: 'author', contentEn: 'Original English', contentBn: 'সংবাদ',
    excerptEn: 'Summary', excerptBn: '', metaKeywords: [],
  });
  prisma.article.update = async ({ data }) => { written = data; return data; };
  await service.updateArticle(base.category, { content: { bn: '' } }, 'author', 'admin');
  assert.equal(written.contentEn, 'Original English');
  assert.equal(written.contentBn, '');
  await assert.rejects(service.updateArticle(base.category, { content: { en: '', bn: '<p></p>' } }, 'author', 'admin'), /Content is required/);
  await assert.rejects(service.updateArticle(base.category, { excerpt: { en: '', bn: '' } }, 'author', 'admin'), /Excerpt is required/);
  await service.updateArticle(base.category, { status: 'draft' }, 'author', 'admin');
  assert.equal(written.contentEn, undefined);
});
