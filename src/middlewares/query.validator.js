const _ = require('lodash');
module.exports = function (schema) {
  return (req, res, next) => {
    if (_.isEmpty(schema)) {
      return next();
    }
    const { error } = schema.validate(req.query);
    if (error) {
      const errMessage = _.get(error, 'details.0.message');
      return res.status(400).json({ error: errMessage });
    } else {
      return next();
    }
  };
};
