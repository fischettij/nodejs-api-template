require('dotenv').config({ path: './.env.test' });
const request = require('supertest');
const { CREATED, BAD_REQUEST } = require('http-status-codes');
const app = require('../../src/server');
const { sequelize } = require('../../db/models');

describe('Registry', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('should responde 201 when create a valid user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        email: 'jon.snow@winterfell.com',
        password: '1234',
      });
    expect(res.status).toBe(CREATED);
    expect(res.body).toHaveProperty('created');
    expect(res.body.created).toBe(true);
  });

  it('should responde 400 when try create user without some fields', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        email: '',
        password: '',
      });
    expect(res.status).toBe(BAD_REQUEST);
    expect(res.body).toEqual(
      {
        created: false,
        errors: [
          'E-Mail is required',
          'Password is required',
        ],
      },
    );
  });

  it('should responde 400 when try to register an email two times', async () => {
    const user = {
      email: 'jon.snow@winterfell.com',
      password: '1234',
    };
    let res = await request(app).post('/users').send(user);
    expect(res.status).toBe(CREATED);
    res = await request(app).post('/users').send(user);
    expect(res.status).toBe(BAD_REQUEST);
    expect(res.body).toEqual(
      {
        created: false,
        errors: ['E-Mail address already exists'],
      },
    );
  });
});
