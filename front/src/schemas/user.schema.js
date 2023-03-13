import * as yup from "yup";
const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  phone: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
const restPasswordSchema = yup.object().shape({
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const sendResetPasswordEmailSchema = yup
  .object()
  .shape({ email: yup.string().email().required() });
export {
  registerSchema,
  loginSchema,
  restPasswordSchema,
  sendResetPasswordEmailSchema,
};
