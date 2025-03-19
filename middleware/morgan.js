const { Logtail } = require("@logtail/node");
const config = require("../config/config");

const morgan = require("morgan");
const logtail = new Logtail(config.logtail.token, {
  endpoint: config.logtail.endpoint,
});

morgan.token("error-message", (req, res) => {
  return req.errorMessage || "No error message";
});

morgan.token("error-stack", (req, res) => {
  return req.errorStack || "No error stack";
});

morgan.token("message", (req, res) => {
  return res.data || "No message";
});

const morganLogger = morgan((tokens, req, res) => {
  const entry = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: parseInt(tokens.status(req, res), 10),
    response_time: tokens["response-time"](req, res),
    reqBody: req.body,
  };
  if (res.statusCode >= 400) {
    entry.error = {
      message: tokens["error-message"](req, res),
      stack: tokens["error-stack"](req, res),
    };
    logtail.error(tokens["error-message"](req, res), entry);
  } else {
    logtail.info(
      `${tokens["message"](req, res).user.email} logged in successfully`,
      entry
    );
  }

  return `Request: ${entry.method} ${entry.url} | Status: ${entry.status} | Response time: ${entry.response_time}`;
});

module.exports = morganLogger;
