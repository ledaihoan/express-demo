const path = require('path');

const { MikroORM, RequestContext } = require('@mikro-orm/core');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');

const { User } = require('./entities');
const ormConfig = require('./mikro-orm.config');
const { initAppRoutes } = require('./routes');
const authUtils = require('./utils/auth');

module.exports = async () => {
  authUtils.generateSuperUserToken();
  const DI = {};
  const app = express();
  DI.orm = await MikroORM.init(ormConfig);
  DI.em = DI.orm.em;
  DI.users = DI.orm.em.getRepository(User);
  app.use(logger('dev'));
  app.use(express.json());
  app.use((req, res, next) => {
    RequestContext.create(DI.orm.em, next);
    req.di = DI;
  });
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  initAppRoutes(app);

  return { app, DI };
};
