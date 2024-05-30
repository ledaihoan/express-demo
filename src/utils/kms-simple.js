const fs = require('fs');

const jwt = require('./jwt');
const logger = require('./logger');

/**
 *
 * This file just for simple demonstration, production use should use managed service like AWS KMS
 */

function getTokenPath(key) {
  const tokenPathBase = process.env.KMS_SECRET_PATH || '/data/kms/';
  fs.mkdirSync(tokenPathBase, { recursive: true });
  const tokenFilePath = `${tokenPathBase}/${key}.token`;
  const secretFilePath = `${tokenPathBase}/${key}.secret`;
  return { tokenFilePath, secretFilePath };
}

function rotateToken(data, key = 'default', forceRotate = false) {
  const { secret, token } = getCurrentToken(key);
  const decoded = jwt.decodeToken(token, secret);
  if (forceRotate || !decoded) {
    const { tokenFilePath, secretFilePath } = getTokenPath(key);
    const newSecret = jwt.generateRandomSecret(16);
    const newToken = jwt.generateToken(
      data,
      newSecret,
      process.env.JWT_TOKEN_EXPIRE_MINUTES || 60
    );
    fs.writeFileSync(tokenFilePath, newToken);
    fs.writeFileSync(secretFilePath, newSecret);
  }
}

function getCurrentToken(key) {
  const { tokenFilePath, secretFilePath } = getTokenPath(key);
  let token;
  let secret;
  try {
    if (fs.existsSync(tokenFilePath)) {
      token = fs.readFileSync(tokenFilePath, 'utf8');
    }
    if (fs.existsSync(secretFilePath)) {
      secret = fs.readFileSync(secretFilePath, 'utf8');
    }
  } catch (e) {
    logger.error(`Error getting token ${key}: ${e}`);
  }
  return { token, secret };
}
module.exports = {
  rotateToken,
  getCurrentToken
};
