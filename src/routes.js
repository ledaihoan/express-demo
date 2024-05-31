const adminApiModule = require('./admin-apis');
const publicApiModule = require('./public-apis');
const systemApiModule = require('./system-apis');
module.exports = {
  initAppRoutes: function (app) {
    /* GET home page. */
    app.get('/', function (req, res) {
      res.render('index', { title: 'Express' });
    });
    app.use('/system-apis', systemApiModule.routes);
    app.use('/admin-apis', adminApiModule.routes);
    app.use('/public-apis', publicApiModule.routes);
  }
};
