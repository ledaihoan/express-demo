const path = require('path');

const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');

const { initAppRoutes } = require('./routes');
const authUtils = require('./utils/auth');

authUtils.generateSuperUserToken();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initAppRoutes(app);

module.exports = app;
