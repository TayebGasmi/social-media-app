import * as yup from "yup";
export const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required().max(300),
});
