const { defineConfig, PostgreSqlDriver } = require('@mikro-orm/postgresql');
module.exports = defineConfig({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME || 'express-demo',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  entities: ['./**/*.entity.js'],
  driver: PostgreSqlDriver,
  pool: {
    min: 2,
    max: 10
  },
  cache: {
    enabled: true,
    pretty: true // for pretty printing the cache
  }
});
