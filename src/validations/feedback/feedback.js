import { mixed, object, string } from "yup";

export const validationSchema = object({
  providerName: string()
    .required("Provider name is required")
    .max(255, "Characters not more than 255"),
  isPatient: string(),
  relationship: string()
    .trim()
    .max(255, "Characters not more than 255")
    .when("isPatient", {
      is: "NO",
      then: (schema) => schema.required("Relationship is required"),
    })
    .label("Relatiionship"),
  feedbackText: string()
    .required("Feedback text is required")
    .max(255, "Characters not more than 255"),
  audio: mixed(),
  video: mixed(),
});
