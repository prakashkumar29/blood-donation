import { array, object, string } from "yup";

export const validationSchema = object({
  id: string().required("First level pincode is required"),
  secondLevelSearch: array(),
});
export const secondaryValidationSchema = object({
  mappingPincodeId: string().required("Second level pincode is required"),
});
