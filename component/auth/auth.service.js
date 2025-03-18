const logger = require("../../helper/logger");
const loginUser = async (req) => {
  const { email, password } = req.body;
  try {
    // Mock user data - replace with your database query
    const user = {
      email: "test@getnada.com",
      password: "Test@123",
    };

    if (user.email !== email) {
      logger.error(`Login failed: User ${email} not found`);
      throw new Error("USER_NOT_FOUND");
    }

    const isValidPassword = password === user.password;

    if (!isValidPassword) {
      logger.error(`Login failed: Invalid password for user ${email}`);
      throw new Error("INVALID_CREDENTIALS");
    }

    logger.info(`User ${email} logged in successfully`);
    return { message: "Login successful", user };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  loginUser,
};
