var express = require("express");
var router = express.Router();
const Users = require("../models/model.user");
const Companies = require("../models/model.company");
const { authorize, AUTH_ROLES } = require("../middlewares/auth");
const { COMPANY } = AUTH_ROLES;
const {
  blockUser,
  unblockUser,
  verfieCompany,
  unverfieCompany,
  getBlokcedUser,
} = require("../controller/controller.admin");
const { verifyDoc } = require("../middlewares/verfieDocument");
/* GET users listing. */
router.get("/blocked", authorize(COMPANY), getBlokcedUser);
router.put("/block/:id", authorize(COMPANY), verifyDoc(Users), blockUser);
router.put("/unblock/:id", authorize(COMPANY), verifyDoc(Users), unblockUser);
router.put(
  "/company/verfiy/:id/",
  authorize(COMPANY),
  verifyDoc(Companies),
  verfieCompany
);
router.put(
  "/company/unverfiy/:id/",
  authorize(COMPANY),
  verifyDoc(Companies),
  unverfieCompany
);

module.exports = router;
