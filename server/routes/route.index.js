const express = require("express");
var usersRouter = require("./route.user");
var adminRouter = require("./route.admin");
const authRouter = require("./route.auth");
const friendRouter = require("./route.friends");
var router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json("Backend server working properly! 🙌 ");
});
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/admins", adminRouter);
router.use("/friends", friendRouter);


module.exports = router;
