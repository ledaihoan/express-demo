const _ = require('lodash');

const { User } = require('../entities/user.entity');

const encryptionService = require('./encryption');

async function createUser(payload, DI) {
  const dto = _.cloneDeep(payload);
  dto.password = await encryptionService.hashPassword(payload.password);

  const user = DI.em.create(User, dto);
  await DI.em.persistAndFlush(user);

  return user;
}

async function findOne(DI, payload, options = undefined) {
  return DI.orm.em.findOne(User, payload, options);
}

module.exports = {
  createUser,
  findOne
};
