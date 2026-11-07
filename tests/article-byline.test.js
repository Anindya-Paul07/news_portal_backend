import test from 'node:test';
import assert from 'node:assert/strict';
import { validationResult } from 'express-validator';
import { createArticleValidation, updateArticleValidation } from '../src/modules/articles/article.validation.js';
import service from '../src/modules/articles/article.service.js';
import { prisma } from '../src/config/database.js';
import controller from '../src/modules/articles/article.controller.js';

const base = {
  title: { en: 'News', bn: 'সংবাদ' },
  category: '123e4567-e89b-42d3-a456-426614174000',
  excerpt: { en: 'Summary' }, content: { en: 'Story' },
};
const errors = async (fields, validators) => {
  const req = { body: { ...base, ...fields }, params: { id: base.category } };
  for (const validator of validators) await validator.run(req);
  return validationResult(req).array();
};

test('public article response exposes custom and cleared bylines directly inside data', async (t) => {
  const originalArticle = prisma.article;
  t.after(() => { prisma.article = originalArticle; });
  for (const byline of [
    { authorName: 'আনিসুর রহমান', authorPhoto: '/uploads/author-photo.jpg' },
    { authorName: null, authorPhoto: null },
  ]) {
    prisma.article = {
      findFirst: async () => ({ id: base.category, slug: 'news', views: 0, ...byline,
        author: { id: 'account-owner', name: 'Account Author' } }),
      update: async () => ({}),
    };
    const response = await new Promise((resolve, reject) => {
      const res = {
        status(code) { assert.equal(code, 200); return this; },
        json(body) { resolve(JSON.parse(JSON.stringify(body))); },
      };
      controller.getArticle({ params: { identifier: 'news' } }, res, reject);
    });
    assert.equal(response.success, true);
    assert.equal(response.data.authorName, byline.authorName);
    assert.equal(response.data.authorPhoto, byline.authorPhoto);
    assert.equal(response.data.author.name, 'Account Author');
  }
});

test('author fields are optional, independently configurable, and clearable', async () => {
  for (const validators of [createArticleValidation, updateArticleValidation]) {
    for (const fields of [{}, { authorName: 'লেখক' }, { authorPhoto: '/uploads/author.jpg' },
      { authorName: 'Reporter', authorPhoto: 'https://example.com/photo.jpg' },
      { authorName: '', authorPhoto: '' }, { authorName: null, authorPhoto: null }]) {
      assert.deepEqual(await errors(fields, validators), []);
    }
  }
});

test('author validation rejects malformed names and unsafe photo URLs', async () => {
  for (const validators of [createArticleValidation, updateArticleValidation]) {
    for (const fields of [{ authorName: {} }, { authorName: 'a'.repeat(201) },
      { authorPhoto: {} }, { authorPhoto: 'javascript:alert(1)' }, { authorPhoto: '//example.com/photo.jpg' }]) {
      assert.ok((await errors(fields, validators)).length);
    }
  }
});

test('byline persistence trims values, preserves omitted fields, and clears explicit blanks', () => {
  const data = service.buildArticleData({ authorName: ' Reporter ', authorPhoto: ' /uploads/photo.jpg ' });
  assert.equal(data.authorName, 'Reporter');
  assert.equal(data.authorPhoto, '/uploads/photo.jpg');
  assert.equal(service.buildArticleData({}).authorName, undefined);
  assert.equal(service.buildArticleData({}).authorPhoto, undefined);
  for (const value of ['', '   ', null]) {
    const cleared = service.buildArticleData({ authorName: value, authorPhoto: value });
    assert.equal(cleared.authorName, null);
    assert.equal(cleared.authorPhoto, null);
  }
  const mapped = service.mapArticle({ ...data, authorId: 'account-owner' });
  assert.equal(mapped.authorName, 'Reporter');
  assert.equal(mapped.authorPhoto, '/uploads/photo.jpg');
  assert.equal(data.authorId, undefined);
});

test('create and update return bylines while preserving account ownership and default fallback', async (t) => {
  const originalArticle = prisma.article;
  let stored;
  const author = { id: 'account-owner', name: 'Default Author', avatar: '/uploads/default.jpg' };
  prisma.article = {
    findFirst: async () => null,
    create: async ({ data }) => {
      stored = { id: base.category, authorName: null, authorPhoto: null,
        ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)), author };
      return stored;
    },
    findUnique: async () => stored,
    update: async ({ data }) => {
      stored = { ...stored, ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) };
      return stored;
    },
  };
  t.after(() => { prisma.article = originalArticle; });

  const defaults = await service.createArticle(base, author.id);
  assert.equal(defaults.authorName, null);
  assert.equal(defaults.authorPhoto, null);
  assert.equal(defaults.author.name, author.name);

  const custom = await service.createArticle({ ...base, authorName: ' Reporter ', authorPhoto: ' /uploads/reporter.jpg ' }, author.id);
  assert.equal(custom.authorName, 'Reporter');
  assert.equal(custom.authorPhoto, '/uploads/reporter.jpg');
  const preserved = await service.updateArticle(base.category, { isFeatured: true }, author.id, 'admin');
  assert.equal(preserved.authorName, 'Reporter');
  assert.equal(preserved.authorPhoto, '/uploads/reporter.jpg');
  const cleared = await service.updateArticle(base.category, { authorName: '', authorPhoto: null }, author.id, 'admin');
  assert.equal(cleared.authorName, null);
  assert.equal(cleared.authorPhoto, null);
  assert.equal(cleared.author.name, author.name);
  assert.equal(cleared.author.avatar, author.avatar);
  assert.equal(stored.authorId, author.id);
});
