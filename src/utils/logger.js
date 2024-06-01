const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const dailyRotateFile = new transports.DailyRotateFile({
  filename: 'log/express-demo.%DATE%.log',
  datePattern: 'YYYY-MM-DD'
});

// Configure the logger
const logger = createLogger({
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    format.padLevels(), // Pad level so message align for better visual
    format.json() // Format logs as JSON
  ),
  transports: [
    new transports.Console(), // Log to the console
    dailyRotateFile
  ]
});

module.exports = logger;
