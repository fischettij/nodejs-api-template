require('dotenv').config({ path: `${__dirname}/../.env.test` });
const request = require('supertest');
const { OK } = require('http-status-codes');
const app = require('../../src/server');

describe('Hi Endpoints', () => {
  const resposeSchema = {
    result: { type: 'string' },
  };

  it('/hi', async () => {
    const res = await request(app)
      .get('/hi')
      .send();
    expect(res.status).toBe(OK);
    expect(res.body).toEqual({ result: 'Its work!' });
  });
});
