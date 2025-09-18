import { date, number, object, string } from "yup";
import { minMaxAge } from "../../utils/common";

export const validationSchema = object({
  reportType: number(),
  option: string(),
  dateValue: date()
    .typeError("Enter a valid Date")
    .required("Date is required")
    .label("Date"),
  monthValue: date()
    .typeError("Enter a valid month")
    .required("Month is required"),
  startDate: date()
    .typeError("Enter a valid start month")
    .min(minMaxAge().pastRange, "Start date should not be more than 5 years")
    .required("Start month is required"),
  endDate: date()
    .typeError("Enter a valid end month")
    .required("End month is required")
    // .max(nextMonthDate, "Cannot select future month")
    .test(
      "is-after-start",
      "End month must be after start month",
      function (endTime) {
        const startTime = this.parent.startDate;
        if (startTime && endTime) {
          return endTime > startTime;
        }
        return false;
      }
    ),
});
