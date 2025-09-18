import { object, string, ref } from "yup";

export const validationSchema = object({
  password: string().trim().required("Password is required"),
  confirmPassword: string().trim().required("Confirm password is required").oneOf([ref('password')],'Confirm password should be same'),
});
