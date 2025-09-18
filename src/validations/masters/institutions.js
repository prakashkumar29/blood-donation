import { object, string, mixed } from "yup";
import { EMAIL_REGEX } from "../../constants/globalConstants";

export const validationSchema = object({
  institutionTypeId: string()
    .required("Institution Type is required")
    .nullable()
    .label("Institution Type"),
  name: string()
    .trim()
    .required("Institution Name is required")
    .max(255, "Characters not more than 255")
    .label("Institution Name"),
  primaryContact: string()
    .max(255, "Characters not more than 255")
    .nullable()
    .label("Primary Contact"),
  landlineNo: string().trim().min(6).max(9).nullable().label("Landline Number"),
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
    .trim()
    .matches(EMAIL_REGEX, "Invalid Email")
    .required("Email is required"),
  institution: mixed().nullable().label("Institution Image"),
  address: string()
    .trim()
    .required("Address is required")
    .max(255, "Characters not more than 255")
    .nullable()
    .label("Address"),
  areaName: string()
    .trim()
    .max(255, "Characters not more than 255")
    .nullable()
    .label("Area Name"),
  stateId: string().nullable(),
  pincodeId: string()
    .required("Pincode is required")
    .nullable()
    .label("Pincode"),
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

export const usersValidation = object({
  name: string()
    .trim()
    .required("Name is required")
    .max(255, "Characters not more than 255")
    .label("Name"),
  mobileNo: string()
    .length(10)
    .trim()
    .required("Mobile is required")
    .label("Mobile"),
  address: string()
    .trim()
    .required("Address is required")
    .max(255, "Characters not more than 255")
    .label("Address"),
});
