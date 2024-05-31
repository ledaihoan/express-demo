const _ = require('lodash');

const authService = require('../services/auth');
const logger = require('../utils/logger');

/* Just for demonstration purpose about kms, don't use for production */
function execute() {
  logger.info('Forcing super user token rotation...');
  try {
    authService.generateSuperUserToken(true);
    logger.info('Token rotated!');
  } catch (e) {
    logger.error(`Error while rotating token: ${_.get(e, 'message')}`);
  }
}
execute();
