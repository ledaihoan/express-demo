const _ = require('lodash');

const { User } = require('../entities/user.entity');

const encryptionService = require('./encryption');

async function createUser(payload, DI) {
  const dto = _.cloneDeep(payload);
  dto.password = encryptionService.encryptPassword(payload.password);
  const user = DI.em.create(User, dto);
  await DI.em.persistAndFlush(user);
  return user;
}

module.exports = {
  createUser
};