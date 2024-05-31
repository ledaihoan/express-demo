async function login(req, res) {
  res.send('Login API');
}

async function register(req, res) {
  res.send('Register API');
}

async function forgotPassword(req, res) {
  res.send('Forgot password API');
}

async function resetPassword(req, res) {
  res.send('Reset password API');
}

async function activateUser(req, res) {
  res.send('Activate user');
}

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  activateUser
};
