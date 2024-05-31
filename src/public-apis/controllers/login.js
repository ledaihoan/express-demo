const authService = require('../../services/auth');
async function login(req, res) {
  const token = await authService.loginUser(req);
  if (!token) {
    return res
      .status(400)
      .json({ message: 'Invalid combination of user and password' });
  }
  return res.json({ access_token: token });
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
