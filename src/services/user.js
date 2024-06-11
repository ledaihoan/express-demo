const { wrap } = require('@mikro-orm/core');
const _ = require('lodash');

const { USER } = require('../constants/auth-roles');
const { User } = require('../entities/user.entity');
const { paginatedResponse } = require('../utils/pagination');

const encryptionService = require('./encryption');

async function createUser(payload, DI) {
  const dto = _.cloneDeep(payload);
  dto.password = await encryptionService.hashPassword(payload.password);

  const user = DI.em.create(User, dto);
  await DI.em.persistAndFlush(user);

  return user;
}
async function registerUser(payload, DI) {
  const dto = _.cloneDeep(payload);
  dto.role = USER;
  dto.isActive = false;
  return createUser(payload, DI);
}

async function activateUser(id, DI) {
  const user = await findOneOrFail(DI, { id });
  wrap(user).assign({ isActive: true });
  await DI.em.persistAndFlush(user);
  return user;
}

async function findOneOrFail(DI, payload, options = undefined) {
  return DI.orm.em.findOneOrFail(User, payload, options);
}

async function findOne(DI, payload, options = undefined) {
  return DI.orm.em.findOne(User, payload, options);
}

async function searchUsers(DI, pagination, authenticatedUser = null) {
  const { sortField, sortOrder, limit, payload, cursor } = pagination;
  const qb = DI.em
    .createQueryBuilder(User, 'u')
    .orderBy({ [sortField]: sortOrder })
    .limit(limit + 1); // +1 record to see if pagination has next cursor
  const whereCondition = {};
  if (!_.isEmpty(payload)) {
    _.assign(whereCondition, payload);
  }
  if (!_.isEmpty(cursor)) {
    whereCondition[sortField] =
      sortOrder === 'asc'
        ? { $gt: cursor[sortField] }
        : { $lt: cursor[sortField] };
  }
  if (!_.isEmpty(whereCondition)) {
    qb.where(whereCondition);
  }
  const users = await qb.getResultList();
  return paginatedResponse(users, pagination, authenticatedUser);
}

async function deleteUser(DI, id) {
  const user = await findOneOrFail(DI, { id });
  return DI.orm.em.removeAndFlush(user);
}

async function find(DI, payload, options = undefined) {
  return DI.orm.em.find(User, payload, options);
}

async function changePassword(DI, id, password) {
  const user = await findOneOrFail(DI, id);
  wrap(user).assign({ password });
  await DI.em.persistAndFlush(user);
  return user;
}

module.exports = {
  createUser,
  findOne,
  findOneOrFail,
  deleteUser,
  find,
  registerUser,
  activateUser,
  changePassword,
  searchUsers
};
