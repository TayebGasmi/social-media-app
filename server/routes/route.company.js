var express = require("express");
var router = express.Router();
const { verifyDoc } = require("../middlewares/verfieDocument");
const validate = require("../middlewares/schemaValidation");
const Companies = require("../models/model.company");
const { fileValidator } = require("../validators/validators.file");
const { authorize, AUTH_ROLES } = require("../middlewares/auth");
const { COMPANY, USER } = AUTH_ROLES;
const fireBaseUpload = require("../middlewares/fireBase.upload");
const { changePassword } = require("../validators/validators.changePassword");
const {
  companyValidator,
  companyProfilValidator,
  phone,
} = require("../validators/validators.company");
const {
  updateCompany,
  deleteCompany,
  currentCompany,
  updatePassword,
  getCompanyByEmail,
} = require("../controller/controller.company");
const { updateFile } = require("../middlewares/updateFile");
const { upload } = require("../middlewares/upload");
router.delete("/:id", deleteCompany);
router.delete("/:id", authorize(COMPANY), deleteCompany);
router.put("/contact/add/:id", authorize(COMPANY), validate(phone), addContact);
router.put("/contact/delete/:id/:idC", deleteContact);
router.get("/email/:email", getCompanyByEmail);
router.get("/currentCompany", authorize(COMPANY), currentCompany);
router.put(
  "/profile",
  authorize(COMPANY),
  validate(companyProfilValidator),
  updateCompany
);
router.put(
  "/logo",
  upload("companies/logo/", "logo"),
  updateFile(Companies, "companies/logo/", "logo")
);
router.put(
  "/cover",
  upload("companies/cover/", "cover"),
  updateFile(Companies, "companies/cover", "coverPhoto")
);
router.put(
  "/contact/update/:id/:idC",
  authorize(COMPANY),
  validate(phone),
  updateContact
);
router.put("/contact/delete/:id/:idC", authorize(COMPANY), deleteContact);
router.get("/followers/:id", verifyDoc(Companies), getFollowers);
router.put(
  "/follow/:id",
  authorize(USER),
  verifyDoc(Companies, "id"),
  followCompany
);
router.put(
  "/unfollow/:id",
  authorize(USER),
  verifyDoc(Companies, "id"),
  unfollowCompany
);
router.put(
  "/update/:id",
  authorize(COMPANY),
  validate(companyProfilValidator),
  updateCompany
);
router.put(
  "/upload/logo",
  validate(fileValidator),
  authorize(Companies),
  fireBaseUpload(Companies, "logo")
);
router.put(
  "/upload/coverPhoto",
  validate(fileValidator),
  authorize(Companies),
  fireBaseUpload(Companies, "coverPhoto")
);
router.put(
  "/changePassword",
  authorize(COMPANY),
  validate(changePassword),
  updatePassword
);
module.exports = router;
