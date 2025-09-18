import { object, string } from "yup";

export const validationSchema = object({
  institutionTypeId: string()
    .required("Institution Type is required")
    .label("Institution Type"),
  name: string()
    .trim()
    .required("Institution Name is required")
    .max(255, "Characters not more than 255")
    .label("Institution Name"),
  landlineNo: string().trim().min(6).max(9).label("Landline Number"),
  mobileNo: string()
    .trim()
    .required("Mobile Number is required")
    .length(10)
    .label("Mobile Number"),
  address: string().required("Address is required"),
  stateId: string().nullable(),
  pincodeId: string().required("Pincode is required").label("Pincode"),
});
