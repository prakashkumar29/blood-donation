import { object, string, mixed, date } from "yup";
import { EMAIL_REGEX } from "../../constants/globalConstants";
import { minMaxAge } from "../../utils/common";

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
    .required("WhatsApp No is required")
    .length(10)
    .label("WhatsApp No"),
  emailId: string()
    .trim()
    .matches(EMAIL_REGEX, "Invalid Email")
    .required("Email is required")
    .label("Email")
    .nullable(),
  genderId: string().required("Gender is required"),
  dateOfBirth: date()
    .typeError("Enter a valid Date of birth")
    .required("Date of birth is requied")
    .min(minMaxAge().max, "Date of birth should be less than 100 years old")
    .max(minMaxAge().min, "Date of birth should be greater than 18 years old")
    .label("Date of birth"),
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
  frequency: string()
    .trim()
    .required("Frequency is required")
    .test(
      "is-valid",
      "Frequency should be greater than or equal to 3",
      (value) => {
        return parseInt(value) >= 3;
      }
    ),
  availableTimeStart: date()
    .typeError("Invalid Time")
    .required("Start time is required"),
  availableTimeEnd: date()
    .typeError("Invalid time")
    .required("Available end time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (endTime) {
        const startTime = this.parent.availableTimeStart;
        if (startTime && endTime) {
          return endTime > startTime;
        }
        return false;
      }
    ),
  donatedBefore: string(),
  lastDonatedDate: date()
    .nullable()
    .when("donatedBefore", {
      is: "YES",
      then: (schema) =>
        schema
          .required("Last donated date is required")
          .nonNullable("Last donated date is required"),
    })
    .typeError("Invalid date")
    .max(new Date(), "Date of need should be in past"),
  bloodGroupId: string().required("Blood group is required").nullable(),
  stateId: string().nullable(),
  pincodeId: string()
    .required("Pincode is required")
    .label("Pincode")
    .nullable(),
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
