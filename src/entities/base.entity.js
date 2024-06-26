'use strict';

const {
  Collection,
  ReferenceKind,
  EntitySchema,
  wrap
} = require('@mikro-orm/core');

/**
 * @property {number} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
class BaseEntity {
  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    const props = wrap(this).__meta.properties;

    Object.keys(props).forEach((prop) => {
      if (
        [ReferenceKind.ONE_TO_MANY, ReferenceKind.MANY_TO_MANY].includes(
          props[prop].reference
        )
      ) {
        this[prop] = new Collection(this);
      }
    });
  }
}

const schema = new EntitySchema({
  name: 'BaseEntity',
  properties: {
    id: { primary: true, type: 'number' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date', onUpdate: () => new Date() }
  }
});

module.exports = { BaseEntity, schema };
