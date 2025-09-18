import { date, object, string } from "yup";
import { EMAIL_REGEX } from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

export const validationSchema = object({
  name: string().required("Name is required"),
  mobileNo: string().trim().required("Mobile No is required").length(10),
  emailId: string()
    .trim()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Invalid Email")
    .label("Email"),
  dateOfBirth: date()
    .typeError("Enter a valid Date of birth")
    .nullable()
    .min(minMaxAge().max, "Date of birth should be less than 100 years old")
    .max(minMaxAge().min, "Date of birth should be greater than 18 years old")
    .label("Date of birth"),
});
