const { check, validationResult } = require('express-validator');
const { sequelize, User } = require('../../db/models');

const emailAlreadyExists = async (email) => {
  const foundedUser = await User.findOne({ where: { email } });
  return foundedUser !== null;
};

const saveUser = (newUser) => {
  sequelize.transaction(t => User.create(newUser, { transaction: t }).then(user => user)).then(result => result)
    .catch(err => err);
};

const formValidations = [
  check('email', 'E-Mail is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];

const registry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      created: false,
      errors: errors.array().map(e => e.msg),
    });
  }
  if (await emailAlreadyExists(req.body.email)) {
    res.status(400).json({
      created: false,
      errors: ['E-Mail address already exists'],
    });
  } else {
    const {
      email, password,
    } = req.body;
    const newUser = {
      email, password,
    };
    await saveUser(newUser);
    res.status(201).json({ created: true });
  }
  return res;
};

module.exports = { formValidations, registry };
