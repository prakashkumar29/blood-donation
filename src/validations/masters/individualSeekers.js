import { object, string, mixed } from "yup";
import { EMAIL_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  name: string()
    .trim()
    .required("Donor Name is required")
    .max(255, "Characters not more than 255")
    .nullable()
    .label("Donor Name Name"),
  mobileNo: string()
    .trim()
    .required("Mobile Number is required")
    .length(10)
    .nullable()
    .label("Mobile Number"),
  whatsAppNo: string()
    .trim()
    .required("WhatsApp is requried")
    .length(10)
    .label("WhatsApp No"),
  emailId: string()
    .trim()
    .matches(EMAIL_REGEX, "Invalid Email")
    .required("Email is required")
    .label("Email"),
  genderId: string().required("Gender is required"),
  profileImage: mixed().nullable().label("Institution Image"),
  address: string()
    .trim()
    .max(255, "Characters not more than 255")
    .label("Address")
    .nullable(),
  areaName: string()
    .trim()
    .max(255, "Characters not more than 255")
    .nullable()
    .label("Area Name"),
  stateId: string().nullable(),
  pincodeId: string().required("Pincode is required").label("Pincode"),
  googleMapName: string()
    .trim()
    .max(255, "Characters not more than 255")
    .nullable()
    .label("Google map name"),
  statusId: string().nullable(),
  rejectReason: string()
    .trim()
    .when("statusId", {
      is: "inActive",
      then: (schema) => schema.required("Inactive Reason is required"),
    })
    .max(255, "Characters not more than 255")
    .nullable()
    .label("Inactive Reason"),
});
