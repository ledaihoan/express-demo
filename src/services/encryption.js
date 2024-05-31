const bcrypt = require('bcrypt');

const logger = require('../utils/logger');

// Number of rounds for salt generation
const saltRounds = +process.env.PASSWORD_SALT_ROUNDS || 10;

const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (err) {
    logger.error('Error hashing password:', err);
  }
};

// Example function to compare a plain password with a hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    await bcrypt.compare(plainPassword, hashedPassword);
    return true;
  } catch (err) {
    logger.error('Error comparing password:', err);
  }
  return false;
};

module.exports = {
  hashPassword,
  comparePassword
};
