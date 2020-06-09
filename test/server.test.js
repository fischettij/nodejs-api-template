require('dotenv').config({ path: `${__dirname}/../.env.test` });
const request = require('supertest');
const { NOT_FOUND } = require('http-status-codes');
const app = require('../src/server');

describe('Hi Endpoints', () => {
  it('should response 404 when request invalid url', async () => {
    const res = await request(app)
      .get('/invalidURL')
      .send();
    expect(res.status).toBe(NOT_FOUND);
  });
});
