module.exports = {
  apps: [
    {
      name: 'express-demo',
      script: 'bin/www', // Entry point of Express.js application
      instances: 2, // Number of processes
      exec_mode: 'cluster'
    }
  ]
};
