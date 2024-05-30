'use strict';

const { EntitySchema } = require('@mikro-orm/core');
const { v4: uuidv4 } = require('uuid');

const { BaseEntity } = require('./base.entity');

/**
 * @property {number} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
class User extends BaseEntity {
  constructor(username, password) {
    super();
    this.id = uuidv4();
    this.username = username;
    this.password = password;
  }
}

const schema = new EntitySchema({
  class: User,
  tableName: 'express_demo.user',
  properties: {
    id: { primary: true, type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' }
  }
});

module.exports = { User, schema };
