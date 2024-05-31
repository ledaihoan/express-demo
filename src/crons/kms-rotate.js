/* demonstration purpose for secret rotation */
const { CronJob } = require('cron');

const authService = require('../services/auth');
const logger = require('../utils/logger');

const job = new CronJob(
  '00 */30 * * * *', // cronTime
  function () {
    logger.info('KMS rotate start...');
    authService.generateSuperUserToken();
  }, // onTick
  null, // onComplete
  false, // start
  'America/Los_Angeles' // timeZone
);

module.exports = job;
