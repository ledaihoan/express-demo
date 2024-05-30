async function addUserIfNotExist(knex, name, password) {
  await knex.raw(
    `DO $$ BEGIN IF NOT EXISTS ( SELECT FROM pg_catalog.pg_roles WHERE rolname = '${name}' ) THEN CREATE USER ${name} WITH PASSWORD '${password}'; END IF; END $$;`
  );
}

async function changeTableOwner(knex, table, roleName) {
  await knex.raw(`ALTER TABLE ${table} owner to ${roleName};`);
}

async function dropUserIfExists(knex, roleName) {
  await knex.raw(
    `DO $$ BEGIN IF EXISTS ( SELECT FROM pg_catalog.pg_roles WHERE rolname = '${roleName}' ) THEN DROP USER ${roleName}; END IF; END $$;`
  );
}

async function grantAllTablePermissionsToRole(knex, table, roleName) {
  await knex.raw(`GRANT ALL ON TABLE ${table} TO ${roleName}`);
}

async function revokeAllTablePermissionsFromRole(knex, table, roleName) {
  await knex.raw(`REVOKE ALL ON TABLE ${table} FROM ${roleName}`);
}

function getConnectionProperties(knex) {
  const { user, database } = knex.client.connectionSettings;
  return { migratorUser: user, connectedDatabase: database };
}

async function grantAllSchemaPermissionToRole(knex, schema, roleName) {
  const { migratorUser, connectedDatabase } = getConnectionProperties(knex);
  await knex.raw(`GRANT ${roleName} TO ${migratorUser}`);
  await knex.raw(
    `GRANT CONNECT ON DATABASE ${connectedDatabase} TO ${roleName}`
  );
  await knex.raw(`GRANT USAGE ON SCHEMA ${schema} TO ${roleName}`);
  await knex.raw(
    `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ${schema} TO ${roleName}`
  );
  await knex.raw(
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${migratorUser} IN SCHEMA ${schema} GRANT ALL PRIVILEGES ON TABLES TO ${roleName}`
  );
  await knex.raw(
    `GRANT USAGE ON ALL SEQUENCES IN SCHEMA ${schema} TO ${roleName}`
  );
  await knex.raw(
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${migratorUser} IN SCHEMA ${schema} GRANT USAGE ON SEQUENCES TO ${roleName}`
  );
}

async function revokeAllSchemaPermissionFromRole(knex, schema, roleName) {
  const { migratorUser, connectedDatabase } = getConnectionProperties(knex);
  await knex.raw(`REVOKE ${roleName} FROM ${migratorUser}`);
  await knex.raw(
    `REVOKE CONNECT ON DATABASE ${connectedDatabase} FROM ${roleName}`
  );
  await knex.raw(`REVOKE USAGE ON SCHEMA ${schema} FROM ${roleName}`);
  await knex.raw(
    `REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA ${schema} FROM ${roleName}`
  );
  await knex.raw(
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${migratorUser} IN SCHEMA ${schema} REVOKE ALL PRIVILEGES ON TABLES FROM ${roleName}`
  );
  await knex.raw(
    `REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ${schema} FROM ${roleName}`
  );
  await knex.raw(
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${migratorUser} IN SCHEMA ${schema} REVOKE ALL ON SEQUENCES FROM ${roleName}`
  );
}

module.exports = {
  addUserIfNotExist,
  changeTableOwner,
  dropUserIfExists,
  grantAllTablePermissionsToRole,
  revokeAllTablePermissionsFromRole,
  getConnectionProperties,
  grantAllSchemaPermissionToRole,
  revokeAllSchemaPermissionFromRole
};
