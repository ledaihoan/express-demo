const userService = require('../../services/user');

async function searchUsers(req, res) {
  const users = await userService.find(req.di, {});
  return res.json(users);
}

async function getUserById(req, res) {
  const user = await userService.findOne(req.di, req.params.id);
  return res.json(user);
}

async function createUser(req, res) {
  const user = await userService.createUser(req.body, req.di);
  return res.json(user);
}

function registerUser(req, res) {
  res.send(
    'Return OK and send email registration-confirm with activation token url'
  );
}

async function deleteUser(req, res) {
  const id = req.params.id;
  await userService.deleteUser(req.di, id);
  return res.json();
}

function updateUser(req, res) {
  res.send('Update an user data');
}

function activateUser(req, res) {
  res.send('Activate an user');
}

module.exports = {
  searchUsers,
  getUserById,
  createUser,
  registerUser,
  deleteUser,
  updateUser,
  activateUser
};
