const express = require("express");
const router = express.Router();
const validate = require("../middlewares/schemaValidation");
const {
  updatePassword,
  getUserByEmail,
  updateProfil,
  currentUser,
  getAllUsers,
} = require("../controller/controller.user");
const { authorize, AUTH_ROLES } = require("../middlewares/auth");
const { USER } = AUTH_ROLES;
const { userProfile } = require("../validators/validators.user");
const { changePassword } = require("../validators/validators.changePassword");
const { verifyDoc } = require("../middlewares/verfieDocument");
const Users = require("../models/model.user");
/* GET users listing. */
router.get("/email/:email", getUserByEmail);
router.put("/profile", authorize(USER), validate(userProfile), updateProfil);
router.get("/currentUser", authorize(USER), currentUser);
router.get("/all", getAllUsers);
router.put(
  "/changePassword",
  authorize(USER),
  validate(changePassword),
  updatePassword
);
router.get("/usersList", async (req, res, next) => {
  try {
    const users = await Users.find({}).lean();
    return res.status(200).send(users);
  } catch (ex) {
    next(ex);
  }
});
router.get("/selectedUser/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const selectedUser = await Users.find({ _id: userId }).lean();
    return res.status(200).send(selectedUser);
  } catch (ex) {
    next(ex);
  }
});
router.get("/", getAllUsers);
module.exports = router;
