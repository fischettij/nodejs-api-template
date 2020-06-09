require('dotenv').config();
const { check, validationResult } = require('express-validator');
const { BAD_REQUEST } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');

const loginFormValidations = [
  check('email', 'E-Mail is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];
const generateAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

const isValidCredentials = async (email, password) => {
  const foundedUser = await User.findOne({ where: { email, password } });
  return foundedUser !== null;
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      created: false,
      errors: errors.array().map(e => e.msg),
    });
  }
  const { email, password } = req.body;
  if (await isValidCredentials(email, password)) {
    const token = generateAccessToken({ email });
    res.jsonOK({ token });
  } else {
    res.status(BAD_REQUEST).json({
      token: false,
      errors: ['Invalid email or password'],
    });
  }
  return res;
};

module.exports = { login, loginFormValidations };
