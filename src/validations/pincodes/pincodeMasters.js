import { object, string } from "yup";
import { PINCODE_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  name: string()
    .trim()
    .required("Place name is required")
    .max(255, "Characters not more than 255"),
  code: string()
    .required("Pincode is required")
    .length(6, "Pincode should be 6 digits")
    .matches(PINCODE_REGEX, "Pincode must starts with 6"),
});
