const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./component/auth/auth.router");
// const morgan = require("morgan");
const morganLogger = require("./middleware/morgan");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morganLogger);
app.use(express.json());
app.use("/api", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
