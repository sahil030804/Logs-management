const winston = require("winston");
const config = require("../config/config");
require("winston-daily-rotate-file");
const { combine, timestamp, json, printf } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: config.dailyRotateFile.filename,
  datePattern: config.dailyRotateFile.datePattern,
  maxSize: config.dailyRotateFile.maxSize,
  maxFiles: config.dailyRotateFile.maxFiles,
  zippedArchive: config.dailyRotateFile.zippedArchive,
});

const logger = winston.createLogger({
  level: config.logger.level,
  format: combine(
    timestamp(),
    json(),
    printf(
      ({ level, message, timestamp }) => `${timestamp} | ${level}:  ${message}`
    )
  ),
  transports: [fileRotateTransport, new winston.transports.Console()],
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
