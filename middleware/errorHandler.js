const errorCodes = require("../errorCodes");

const errorHandler = (err, req, res, next) => {
  const errorNames = Object.keys(errorCodes);
  const errorMessage = err.message;

  if (errorNames.includes(errorMessage)) {
    const message = errorCodes[errorMessage].body.message;
    const code = errorCodes[errorMessage].body.code;
    const status = errorCodes[errorMessage].httpStatusCode;
    req.errorMessage = message;
    req.errorStack = err.stack;
    res.status(status).json({ code, message });
  } else {
    req.errorMessage = err.message;
    req.errorStack = err.stack;
    res.status(err.status || 500).json({
      code: err.code || "server_error",
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
