const { addTimestampColumns } = require('../knex-utils');

const SCHEMA_NAME = 'express_demo';
const TABLE_NAME = 'user';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const schemaBuilder = knex.schema.withSchema(SCHEMA_NAME);
  const isTableExist = await schemaBuilder.hasTable(TABLE_NAME);

  if (isTableExist) {
    return;
  }
  await schemaBuilder.createTable(TABLE_NAME, (table) => {
    table.string('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.string('role').notNullable().defaultTo('user');
    table.unique(['email']);
    table.unique(['username']);

    addTimestampColumns(table);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const schemaBuilder = knex.schema.withSchema(SCHEMA_NAME);
  const isTableExist = await schemaBuilder.hasTable(TABLE_NAME);
  if (isTableExist) {
    await schemaBuilder.dropTable(TABLE_NAME);
  }
};
