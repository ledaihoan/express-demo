module.exports = {
  apps: [
    {
      name: 'express-demo',
      script: 'bin/www', // Entry point of Express.js application
      watch: true, // Enable auto-restart on file changes
      ignore_watch: ['node_modules', 'logs'], // Ignore watching certain directories
      instances: 2, // Number of processes
      exec_mode: 'cluster', // Use cluster mode for scaling
      env: {
        NODE_ENV: 'development' // Environment variables for development (default)
      },
      env_development: {
        NODE_ENV: 'development' // Environment variables for development
      },
      env_production: {
        NODE_ENV: 'production' // Environment variables for production
      }
    }
  ]
};
