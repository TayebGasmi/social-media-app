const express = require("express");
const { verifyDoc } = require("../middlewares/verfieDocument");
const router = express.Router();
const validate = require("../middlewares/schemaValidation");
const Users = require("../models/model.user");
const {
  changePassword,
  loginValidator,
} = require("../validators/validators.auth");
const { userValidator } = require("../validators/validators.user");
const {
  signUp,
  signIn,
  confirmAccount,
  restPasswordMail,
  restPasswordToken,
  signInWithGoogle,
} = require("../controller/controller.auth");
const Companies = require("../models/model.company");
router.post("/", validate(userValidator), signUp(Users, Companies));
router.post("/login", validate(loginValidator), signIn(Users));
router.post("/loginWithGoogle", signInWithGoogle);
router.get("/restPasswordMail/:email", restPasswordMail(Users, "email"));
router.put("/restPasswordToken/:token", restPasswordToken(Users, "token"));
router.put("/confirm/:id", verifyDoc(Users, "id"), confirmAccount(Users, "id"));
module.exports = router;
