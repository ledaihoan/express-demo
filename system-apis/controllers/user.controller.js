function searchUsers(req, res) {
  res.send('Return list of users base on search criteria');
}

function getUserById(req, res) {
  res.send('Return an user data');
}

function createUser(req, res) {
  res.send('Return created user');
}

function registerUser(req, res) {
  res.send(
    'Return OK and send email registration-confirm with activation token url'
  );
}

function deleteUser(req, res) {
  res.send('Delete an user');
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
