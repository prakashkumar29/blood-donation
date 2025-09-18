import { object, string, mixed } from "yup";
import { EMAIL_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  roleId: string(),
  name: string()
    .trim()
    .required("Volunteer name is required")
    .max(255, "Characters not more than 255")
    .label("Volunteer Name"),
  mobileNo: string()
    .trim()
    .required("Mobile Number is required")
    .length(10)
    .label("Mobile Number"),
  whatsAppNo: string()
    .trim()
    .required("WhatsApp No is required")
    .length(10)
    .label("WhatsApp No"),
  emailId: string()
    .matches(EMAIL_REGEX, "Invalid Email")
    .required("Email is required")
    .label("Email"),
  profileImage: mixed().nullable().label("Institution Image"),
  address: string()
    .trim()
    .required("Address is required")
    .max(255, "Characters not more than 255")
    .label("Address"),
  areaName: string()
    .trim()
    .required("Area Name is required")
    .max(255, "Characters not more than 255")
    .label("Area Name"),
  googleMapName: string()
    .trim()
    .required("Google map name is required")
    .max(255, "Characters not more than 255")
    .label("Google map name"),
});
