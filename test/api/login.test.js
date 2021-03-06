require('dotenv').config({ path: './.env.test' });
const request = require('supertest');
const { OK, BAD_REQUEST } = require('http-status-codes');
const app = require('../../src/server');
const { sequelize, User } = require('../../db/models');

describe('Auth', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('should response 200 when login is successfully', async () => {
    const user = {
      email: 'jon.snow@winterfell.com',
      password: '1234',
    };
    await User.create(user);
    const res = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: user.password,
      });
    expect(res.status).toBe(OK);
    expect(res.body).toHaveProperty('token');
  });

  it('should response 400 when login has invalid email', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'jon.snow@winterfell.com',
        password: '1234',
      });
    expect(res.status).toBe(BAD_REQUEST);
    expect(res.body).toEqual(
      {
        token: false,
        errors: ['Invalid email or password'],
      },
    );
  });

  it('should response 400 when login has invalid pass', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'jon.snow@winterfell.com',
        password: '1234',
      });
    expect(res.status).toBe(BAD_REQUEST);
    expect(res.body).toEqual(
      {
        token: false,
        errors: ['Invalid email or password'],
      },
    );
  });
});
