const express = require("express");
const router = express.Router();
const validate = require("../middlewares/schemaValidation");
const Companies = require("../models/model.company");
const { verifyDoc } = require("../middlewares/verfieDocument");
const { companyValidator } = require("../validators/validators.company");
const {
  changePassword,
  loginValidator,
} = require("../validators/validators.auth");
const {
  signUp,
  signIn,
  confirmAccount,
  restPasswordMail,
  restPasswordToken,
} = require("../controller/controller.auth");
const Users = require("../models/model.user");
router.post("/", validate(companyValidator), signUp(Companies, Users));
router.post("/login", validate(loginValidator), signIn(Companies));
router.put("/confirm/:id", confirmAccount(Companies, "id"));
router.get("/restPasswordMail/:email", restPasswordMail(Companies, "email"));
router.put("/restPasswordToken/:token", restPasswordToken(Companies, "token"));
router.put(
  "/confirm/:id",
  verifyDoc(Companies, "id"),
  confirmAccount(Companies, "id")
);
module.exports = router;
