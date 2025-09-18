import { object, string } from "yup";

export const validationSchema = object({
  name: string()
    .trim()
    .required("Name is required")
    .max(255, "Characters not more than 255")
    .label("Name"),
  mobileNo: string()
    .trim()
    .length(10)
    .required("Mobile is required")
    .label("Mobile"),
  address: string()
    .trim()
    .required("Address is required")
    .max(255, "Characters not more than 255")
    .label("Address"),
});
