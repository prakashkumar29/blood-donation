import { object, string } from "yup";

export const validationSchema = object({
  name: string()
    .trim()
    .required("Donor Name is required")
    .max(255, "Characters not more than 255")
    .label("Donor Name Name"),
  mobileNo: string()
    .trim()
    .required("Mobile Number is required")
    .length(10)
    .label("Mobile Number"),
  whatsAppNo: string()
    .trim()
    .required("WhatsApp is required")
    .length(10)
    .label("WhatsApp No"),
  stateId: string().nullable(),
  pincodeId: string().required("Pincode is required").label("Pincode"),
});
