'use strict';

const { EntitySchema } = require('@mikro-orm/core');
const { v4: uuidv4 } = require('uuid');

const authRoles = require('../constants/auth-roles');

const { BaseEntity } = require('./base.entity');

/**
 * @property {number} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
class User extends BaseEntity {
  constructor(
    email,
    password,
    firstName,
    lastName,
    isActive = false,
    username = null,
    role = authRoles.USER
  ) {
    super();
    // Check if username is provided, otherwise default to email
    if (username === null || username === undefined) {
      username = email;
    }
    this.id = uuidv4();
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
    this.role = role;
  }
}

const schema = new EntitySchema({
  class: User,
  tableName: 'express_demo.user',
  properties: {
    id: { primary: true, type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    firstName: { type: 'string', name: 'first_name' },
    lastName: { type: 'string', name: 'last_name' },
    isActive: { type: 'boolean', name: 'is_active' },
    role: { type: 'string' }
  }
});

module.exports = { User, schema };
