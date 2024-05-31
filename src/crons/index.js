const kmsJob = require('./kms-rotate');

const enabledJobs = [kmsJob];
module.exports = {
  start: function () {
    for (const job of enabledJobs) {
      job.start();
    }
  }
};
