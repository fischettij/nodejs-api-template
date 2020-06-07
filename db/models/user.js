/* eslint-disable no-unused-vars */
/* eslint-disable func-names */


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
