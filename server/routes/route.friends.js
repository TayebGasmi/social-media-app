const express = require("express");
const router = express.Router();
const {
  acceptInvitation,
  removeFriend,
  getFriends,
  sendInvitation,
  removeInvitation,
} = require("../controller/controller.friend");
const { authorize, AUTH_ROLES } = require("../middlewares/auth");
const { USER } = AUTH_ROLES;
const Users = require("../models/model.user");
const { verifyDoc } = require("../middlewares/verfieDocument");
router.put(
  "/sentInvitation/:friendId",
  authorize(USER),
  verifyDoc(Users, "friendId"),
  sendInvitation("friendId")
);
router.put(
  "/acceptInvitation/:friendId",
  authorize(USER),
  verifyDoc(Users, "friendId"),
  acceptInvitation("friendId")
);
router.put(
  "/removeFriend/:friendId",
  authorize(USER),
  verifyDoc(Users, "friendId"),
  removeFriend("friendId")
);
router.put(
  "/removeInvitation/:friendId",
  authorize(USER),
  verifyDoc(Users, "friendId"),
  removeInvitation("friendId")
);
router.get("/", authorize(USER), getFriends);

module.exports = router;
