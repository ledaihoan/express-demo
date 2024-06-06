const userService = require('../../services/user');

async function getUserById(req, res) {
  const user = await userService.findOne(req.di, req.params.id);
  return res.json(user);
}

function updateUser(req, res) {
  res.send('Update an user data');
}

async function changePassword(req, res) {
  await userService.changePassword(req.di, req.params.id, req.body.password);
  return res.json();
}

module.exports = {
  getUserById,
  updateUser,
  changePassword
};
