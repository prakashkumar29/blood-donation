import { object, string } from "yup";

export const getValidationSchema = (visible) =>
  object({
    mobileNo: string()
      .trim()
      .required("Mobile number is required")
      .length(10, "Mobile Number should be 10 digits"),
    ...(visible && { password: string().required("Password is required *") }),
  });
