const systemApis = require('./system-apis');
module.exports = {
  initAppRoutes: function (app) {
    /* GET home page. */
    app.get('/', function (req, res) {
      res.render('index', { title: 'Express' });
    });
    app.use('/system-apis', systemApis);
  }
};
