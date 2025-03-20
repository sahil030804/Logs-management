const { Logtail } = require("@logtail/node");
const morgan = require("morgan");
const logtail = new Logtail("FrmW3WipiMhQUiJhopT6YKYf", {
  endpoint: "https://s1238201.eu-nbg-2.betterstackdata.com",
});

morgan.token("error-message", (req, res) => {
  return req.errorMessage || "No error message";
});

morgan.token("error-stack", (req, res) => {
  return req.errorStack || "No error stack";
});

const morganLogger = morgan((tokens, req, res) => {
  const entry = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: parseInt(tokens.status(req, res), 10),
    response_time: tokens["response-time"](req, res),
    reqBody: req.body,
    error: {
      message: tokens["error-message"](req, res),
      stack: tokens["error-stack"](req, res),
    },
  };
  if (res.statusCode >= 400) {
    logtail.error(tokens["error-message"](req, res), entry);
  }

  return `Request: ${entry.method} ${entry.url} | Status: ${entry.status} | Response time: ${entry.response_time}`;
});

module.exports = morganLogger;
