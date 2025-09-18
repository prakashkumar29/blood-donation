import { dateFormatOption, yesterday } from "../constants/globalConstants";

export const sortedValues = (column, value) => {
  const getObj = column?.find((item) => item?.accessor === value?.[0]?.id);
  let output = [];
  output.push({
    column: getObj?.accessor || "",
    order: value?.[0]?.desc ? "desc" : "asc",
  });
  return output;
};
export const getTrimmedValues = (data) => {
  return Object.keys(data).reduce(
    (resultObj, key) => ({
      ...resultObj,
      [key]: typeof data[key] === "string" ? data?.[key].trim() : data?.[key],
    }),
    {}
  );
};
export const getNeededValues = (values, initialValues) => {
  return Object.keys(initialValues).reduce((formatted, key) => {
    return {
      ...formatted,
      [key]: values[key] ? values[key] : initialValues[key],
    };
  }, {});
};
export const getValidValues = (values) => {
  const entries = Object.keys(values) || [];
  const validData = entries.reduce((validated, key) => {
    if (typeof values[key] === "boolean" || !!values[key])
      return { ...validated, [key]: values[key] };
    return validated;
  }, {});
  return validData;
};
export const getFilter = (name, value) => ({
  type: "eq",
  field: name,
  value: value,
});

export const getTimeFormat = (timeValue) => {
  const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const timeFormatter = new Intl.DateTimeFormat(navigator.language, options);
  const formattedTime = timeFormatter.format(timeValue);
  return formattedTime;
};

export const getDateTime = (timeValue = "") => {
  const currentDate = new Date();
  const [hours, minutes, seconds] = timeValue.split(":").map(Number);
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(seconds);
  return currentDate;
};
export const getDateFormat = (dateValue = "") => {
  return dateValue
    ? new Intl.DateTimeFormat(["ban", "id"], dateFormatOption).format(
        new Date(dateValue)
      )
    : "N/A";
};
export const getMonthFirstDate = (dateValue = new Date()) => {
  return new Date(dateValue).setDate(1);
};
export const getMonthLastDate = (dateValue = new Date()) => {
  const lastDay = new Date(dateValue);
  lastDay.setDate(1); // Set day to 1 to get the last day of the previous month
  lastDay.setMonth(lastDay.getMonth() + 1); // Move to the next month
  lastDay.setDate(0); // Set day to 0 to get the last day of the current month
  return lastDay;
};

export const getObjectValues = (keys, data) =>
  keys && keys?.length
    ? keys.reduce(
        (result, key) => ({ ...result, [key]: data?.[key] || "" }),
        {}
      )
    : {};

export const getObjectByAccessor = (keys, data) =>
  keys && keys?.length
    ? keys.reduce(
        (result, [key, accessor]) => ({
          ...result,
          [key]: data?.[accessor] || "",
        }),
        {}
      )
    : {};
export const createFilter = (field, value) => ({
  type: "eq",
  field,
  value,
});
export const isPastDate = (dateValue) => new Date(dateValue) < yesterday;

export const minMaxAge = () => {
  const minDate = new Date().setFullYear(new Date().getFullYear() - 18);
  const maxDate = new Date().setFullYear(new Date().getFullYear() - 100);
  const pastRange = new Date().setFullYear(new Date().getFullYear() - 5);
  return {
    min: new Date(minDate),
    max: new Date(maxDate),
    pastRange: new Date(pastRange),
  };
};

export const getSeedIdByName = (seeds = [], name = "") =>
  seeds?.find((seed) => seed?.name === name)?.id;

export const getSeedIdByCode = (seeds = [], code = "") =>
  seeds?.find((seed) => seed?.code === code)?.id || "";

export const capitalize = (value = "") => {
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  let result = "";
  for (let i = 0; i < capitalized.length; i++) {
    const currentChar = capitalized[i];
    if (/[A-Z]/.test(currentChar)) {
      result += " " + currentChar;
    } else {
      result += currentChar;
    }
  }
  if (result.charAt(0) === " ") result = result.slice(1);
  return result;
};
const currentDate = new Date();

const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const nextMonth = (currentMonth + 1) % 12;
const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
export const nextMonthDate = new Date(nextYear, nextMonth, 1);
