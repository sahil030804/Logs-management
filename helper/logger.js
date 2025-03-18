const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, printf } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "10d",
  // zippedArchive: true,
});

const logger = winston.createLogger({
  level: "silly",
  format: combine(
    timestamp(),
    json(),
    printf(
      ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    fileRotateTransport,
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});

// fired when a log file is created
fileRotateTransport.on("new", (filename) => {
  console.log("New log file created:", filename);
});
// fired when a log file is rotated
fileRotateTransport.on("rotate", (oldFilename, newFilename) => {
  console.log("Log file rotated:", oldFilename, newFilename);
});
// fired when a log file is archived
fileRotateTransport.on("archive", (zipFilename) => {
  console.log("Log file archived:", zipFilename);
});
// fired when a log file is deleted
fileRotateTransport.on("logRemoved", (removedFilename) => {
  console.log("Log file removed:", removedFilename);
});

module.exports = logger;
