const _ = require('lodash');

function encryptPassword(password) {
  if (_.isEmpty(_.trim(password))) {
    throw new Error('Password can not be empty.');
  }
  return password;
}

module.exports = {
  encryptPassword
};
