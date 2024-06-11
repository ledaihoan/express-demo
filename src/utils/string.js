module.exports = {
  encodeBase64: function (str) {
    return Buffer.from(str).toString('base64');
  },
  decodeBase64: function (str) {
    return Buffer.from(str, 'base64').toString();
  }
};
