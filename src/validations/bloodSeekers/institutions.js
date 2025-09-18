import { boolean, date, object, string } from "yup";
import { yesterday } from "../../constants/globalConstants";

export const validationSchema = object({
  bloodSeekerId: string().required("Blood seeker is required"),
  bloodGroupId: string().required("Blood Group is required"),
  donationTypeId: string().nullable(),
  noOfUnits: string()
    .trim()
    .required("Number of units is required")
    .test(
      "is-number",
      "No of units should be greater than or equal to 1",
      (value) => {
        return parseInt(value) > 0;
      }
    ),
  dateOfNeed: date()
    .typeError("Invalid date format")
    .required("Date of need is required")
    .min(yesterday, "Date of need should not be in past"),
  timeOfNeed: date()
    .typeError("Invalid time format")
    .required("Time of need is required"),
  patientName: string().trim().required("Patient name is required"),
  patientContactNumber: string()
    .trim()
    .required("Patient contact number is required")
    .length(10)
    .label("Patient contact number"),
  ailmentAndTreatment: string()
    .max(255, "Characters not more than 255")
    .nullable(),
  isInstitutionAddress: boolean().notRequired(),
  address: string()
    .trim()
    .required("Address is required")
    .max(255, "Characters not more than 255"),
  pincodeId: string().required("Pincode is required"),
  areaName: string().trim().max(255, "Characters not more than 255").nullable(),
  isAssigned: boolean(),
  assignedTo: string(),
  assignedToId: string().when("isAssigned", {
    is: true,
    then: (schema) => schema.required("Assignment is required"),
  }),
  statusId: string(),
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
