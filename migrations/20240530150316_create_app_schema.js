const {
  addUserIfNotExist,
  dropUserIfExists,
  grantAllSchemaPermissionToRole,
  revokeAllSchemaPermissionFromRole
} = require('../knex-role-utils');

const USER = process.env.DB_USER;
const SCHEMA_NAME = 'express_demo';
const PASSWORD = process.env.DB_PASSWORD;
if (!USER || !PASSWORD) {
  throw new Error('DB env not loaded. Exiting...');
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await addUserIfNotExist(knex, USER, PASSWORD);

  await knex.schema.createSchemaIfNotExists(SCHEMA_NAME);

  await grantAllSchemaPermissionToRole(knex, SCHEMA_NAME, USER);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await revokeAllSchemaPermissionFromRole(knex, SCHEMA_NAME, USER);

  await knex.schema.dropSchemaIfExists(SCHEMA_NAME);

  await dropUserIfExists(knex, USER);
};
