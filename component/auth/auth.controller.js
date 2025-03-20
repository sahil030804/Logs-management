const authService = require("../auth/auth.service");

const loginUser = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
};
