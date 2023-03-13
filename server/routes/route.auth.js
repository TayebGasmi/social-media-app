const express = require("express");
const router = express.Router();
var userRouter = require("./route.auth.user");
var companyRouter = require("./route.auth.company");
router.use("/company", companyRouter);
router.use("/user", userRouter);
module.exports = router;
