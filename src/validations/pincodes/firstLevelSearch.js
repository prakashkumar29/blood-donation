import { array, object, string } from "yup";

export const validationSchema = object({
  id: string().required("First level pincode is required"),
  firstLevelSearch: array(),
});
export const secondaryValidationSchema = object({
  mappingPincodeId: string().required("First level pincode is required"),
});
