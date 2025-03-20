const express = require("express");
const authController = require("../auth/auth.controller");
const router = express.Router();

router.post("/auth/login", authController.loginUser);

module.exports = router;
