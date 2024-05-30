const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const logger = require('./logger');

function generateToken(data, secretKey, expireMinutes = 60) {
  return jwt.sign(data, secretKey, { expiresIn: `${expireMinutes}m` });
}

function decodeToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    logger.error('Invalid token', err);
    return null;
  }
}

function generateRandomSecret(length) {
  if (length <= 0 || length % 2 !== 0) {
    throw new Error('Length must be a positive even number');
  }
  return crypto.randomBytes(length / 2).toString('hex');
}

module.exports = { generateToken, decodeToken, generateRandomSecret };
