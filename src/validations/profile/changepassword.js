import { object, ref, string } from "yup";

export const passwordValidation = (label = "Password") =>
  string()
    .min(8, `${label} must contain 8 or more characters`)
    .matches(/[0-9]/, `${label} must contain numbers`)
    .matches(/[a-z]/, `${label} must contain lowercase`)
    .matches(/[A-Z]/, `${label} must contain uppercase`)
    .matches(/[^\w]/, `${label} must contain special charectors`);

export const validationSchema = object({
  oldPassword: string()
    .required("Old Password is required")
    .label("Old Password"),
  password: string()
    .required("Password is required")
    .notOneOf(
      [ref("oldPassword")],
      "Password must not have the same value as Old password"
    )
    .label("Password"),
  confirmPassword: string()
    .oneOf(
      [ref("password")],
      "Confirm Password should be match with New password"
    )
    .required("Confirm Password is requried")
    .label("Confirm Password"),
});
