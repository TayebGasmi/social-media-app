yup = require("yup");
const phone = yup.object().shape({
  code: yup
    .number()
    .positive()
    .integer()
    .required()
    .test("phone", "invalid phone number", (val) => {
      if (!val) return false;
      return val.toString().length === 2 || val.toString().length === 3;
    }),
  number: yup
    .number()
    .positive()
    .integer()
    .required()
    .test("phone", "invalid phone number", (val) => {
      if (!val) return false;
      return val.toString().length === 8;
    }),
});
const companyValidator = yup.object().shape({
  name: yup.string().required().max(50).min(2),
  country: yup.string().required().max(50).min(2),
  category: yup.string().required().oneOf(["pe", "pme", "ge", "mega"]),
  fields: yup.array().of(yup.string().nullable()).required().min(1),
  password: yup.string().required().max(1024).min(8),
  email: yup.string().email().required(),
});
const companyProfilValidator = yup.object().shape({
  name: yup.string().required().max(50).min(2),
  country: yup.string().required().max(50).min(2),
  category: yup.string().required().oneOf(["pe", "pme", "ge", "mega"]),
  websiteUrl: yup.string().url(),
  fields: yup.array().of(yup.string()).required(),
});
const changePassword = yup.object().shape({
  password: yup.string().required().max(1024).min(8),
  newPassword: yup.string().required().max(1024).min(8),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "password doesn't match"),
});

module.exports = {
  companyValidator,
  phone,
  companyProfilValidator,
  changePassword,
};
