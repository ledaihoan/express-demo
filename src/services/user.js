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

async function deleteUser(DI, id) {
  const user = await findOne(DI, { id });
  if (user) {
    return DI.orm.em.removeAndFlush(user);
  }
}

async function find(DI, payload, options = undefined) {
  return DI.orm.em.find(User, payload, options);
}

module.exports = {
  createUser,
  findOne,
  deleteUser,
  find
};
