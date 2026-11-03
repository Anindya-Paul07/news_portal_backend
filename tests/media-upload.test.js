import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import jwt from 'jsonwebtoken';
import { once } from 'node:events';
import { readFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import mediaRoutes from '../src/modules/media/media.routes.js';
import { errorHandler } from '../src/middleware/errorHandler.js';
import { prisma } from '../src/config/database.js';

test('authenticated multipart image upload, retrieval, and error responses', async (t) => {
  const originals = { user: prisma.user, media: prisma.media, secret: process.env.JWT_SECRET, env: process.env.NODE_ENV };
  const files = [];
  process.env.JWT_SECRET = 'upload-test-only-secret';
  process.env.NODE_ENV = 'production';
  prisma.user = { findUnique: async () => ({ id: 'test-author', role: 'admin', isActive: true }) };
  prisma.media = { create: async ({ data }) => {
    files.push(path.resolve('uploads', data.filename));
    return { id: 'test-media', ...data };
  } };
  const app = express();
  app.use('/api/v1/media', mediaRoutes);
  app.use('/uploads', express.static('uploads'));
  app.use(errorHandler);
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const token = jwt.sign({ id: 'test-author' }, process.env.JWT_SECRET);
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    for (const file of files) await unlink(file);
    prisma.user = originals.user;
    prisma.media = originals.media;
    for (const [key, value] of [['JWT_SECRET', originals.secret], ['NODE_ENV', originals.env]]) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  });
  const upload = (bytes, mime, name, field = 'file', authenticated = true) => {
    const form = new FormData();
    form.append(field, new Blob([bytes], { type: mime }), name);
    return fetch(`${base}/api/v1/media/upload`, {
      method: 'POST', headers: authenticated ? { Authorization: `Bearer ${token}` } : {}, body: form,
    });
  };
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aRZ0AAAAASUVORK5CYII=', 'base64');
  const response = await upload(png, 'image/png', 'news image%2Fsample.PNG');
  assert.equal(response.status, 201);
  const { data } = await response.json();
  assert.match(data.url, /^\/uploads\/news-image-sample.*\.png$/);
  assert.equal(data.type, 'image');
  assert.deepEqual(await readFile(files[0]), png);
  const image = await fetch(`${base}${data.url}`);
  assert.equal(image.status, 200);
  assert.deepEqual(Buffer.from(await image.arrayBuffer()), png);
  assert.equal((await upload(png, 'image/png', 'test.png', 'file', false)).status, 401);
  assert.equal((await upload('invalid', 'application/octet-stream', 'test.exe')).status, 400);
  assert.equal((await upload(png, 'image/png', 'test.png', 'wrong-field')).status, 400);
  const oversized = await upload(Buffer.alloc(20 * 1024 * 1024 + 1), 'image/png', 'oversized.png');
  assert.equal(oversized.status, 413);
  assert.match((await oversized.json()).message, /20 MB/);
  assert.equal(files.length, 1, 'Only the valid upload reaches the mocked database');
});
