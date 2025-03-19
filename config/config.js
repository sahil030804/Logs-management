const dotenvSafe = require("dotenv-safe");

dotenvSafe.config({ path: "./.env", sample: "./.env.example" });

module.exports = {
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
  logtail: {
    token: process.env.LOGTAIL_TOKEN,
    endpoint: process.env.LOGTAIL_ENDPOINT,
  },
  dailyRotateFile: {
    filename: process.env.LOGTAIL_FILENAME,
    datePattern: process.env.LOGTAIL_DATE_PATTERN,
    maxSize: process.env.LOGTAIL_MAX_SIZE,
    maxFiles: process.env.LOGTAIL_MAX_FILES,
    zippedArchive: process.env.LOGTAIL_ZIPPED_ARCHIVE,
  },
};
