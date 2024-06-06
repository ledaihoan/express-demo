const _ = require('lodash');

const authService = require('../services/auth');
const logger = require('../utils/logger');

/* Just for demonstration purpose about kms, don't use for production */
function execute() {
  logger.info('Forcing auth tokens rotation...');
  try {
    authService.rotateAuthTokens(true);
    logger.info('Token rotated!');
  } catch (e) {
    logger.error(`Error while rotating tokens: ${_.get(e, 'message')}`);
  }
}
execute();
