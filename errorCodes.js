module.exports = {
  USER_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: "not_found",
      message: "User not found",
    },
  },
  INVALID_CREDENTIALS: {
    httpStatusCode: 401,
    body: {
      code: "invalid",
      message: "Invalid credentials",
    },
  },
};
