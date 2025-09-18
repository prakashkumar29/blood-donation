import { useEffect } from "react";
import { CustomRadioButton } from "../../shared/formFields/CustomRadioButton";
import { useFormik } from "formik";
import { CustomDatePicker } from "../../shared/formFields/CustomDatePicker";
import { Box, styled } from "@mui/material";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import {
  BLOOD_REQUEST_REPORTS,
  DONORS_REPORT,
  DROPPED_DONORS_REPORT,
} from "../../../api/apiPaths";
import { CustomSelectField } from "../../shared";
import { getCurrentDate } from "../../shared/CustomDonatedModal";
import { getMonthFirstDate, getMonthLastDate } from "../../../utils/common";
import { validationSchema } from "../../../validations/dashboard/dashboard";
import {
  bars,
  fills,
  initialValues,
  names,
  reportTypes,
  timeOptions,
} from "../../../constants/dashboard/dashboard";
import BarChart from "./BarChart";
import {
  fillDataGapsForMonths,
  isInvalidDate,
  validateDataForMonth,
} from "../../../utils/dashboard";

const DashboardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "90%",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: "8%",
  },
}));
const PickersContainer = styled(Box)({
  margin: "0.5rem auto 1.5rem 12%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
});

function DashBoard() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
  });
  const {
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    setFieldTouched,
    errors,
    touched,
  } = formik;
  const { data = [], refetch } = useQuery(
    "chartData",
    () => {
      return postApiServices(
        values?.reportType === "donor"
          ? DONORS_REPORT
          : values?.reportType === "dropped"
          ? DROPPED_DONORS_REPORT
          : BLOOD_REQUEST_REPORTS,
        getPayLoad()
      );
    },
    {
      enabled: false,
    }
  );
  const invalidGap = Boolean(
    isInvalidDate(values?.startDate) ||
      isInvalidDate(values?.endDate) ||
      errors?.startDate ||
      errors?.endDate
  );
  //updating chart on valid date pickers
  useEffect(() => {
    if (
      values?.option === "dateWise" &&
      (isInvalidDate(values?.dateValue) || !!errors?.dateValue)
    )
      return;
    if (values?.option === "month" && isInvalidDate(values?.monthValue)) return;
    if (invalidGap && values?.option === "isMonthly") return;
    refetch();
  }, [values]); // eslint-disable-line

  //getting label which is showing in X-axis
  const dataKeys = {
    dateWise: () =>
      values?.dateValue
        ? new Date(values?.dateValue).toLocaleDateString()
        : new Date().toLocaleDateString(),
    month: "date",
    isMonthly: (data) => `${data?.month}-${data?.year}`,
    isYearly: "year",
  };

  //getting payload for api according to selected option
  const getPayLoad = () => {
    switch (values?.option) {
      case "dateWise":
        return { isDate: true, date: getCurrentDate(values?.dateValue) };
      case "month":
        return {
          isMonthToDate: true,
          month: values?.monthValue.getMonth() + 1,
          year: values?.monthValue.getFullYear(),
        };
      case "isMonthly":
        return {
          isMonthly: true,
          startDate: getCurrentDate(getMonthFirstDate(values?.startDate)),
          endDate: getCurrentDate(getMonthLastDate(values?.endDate)),
        };
      case "isYearly":
        return { isYearly: true };
      default:
        return {};
    }
  };

  //renders pickers according to selected option
  const renderPickers = (name) => {
    switch (name) {
      case "dateWise":
        return (
          <CustomDatePicker
            name="dateValue"
            label="Date"
            value={values?.dateValue}
            onBlur={handleBlur}
            errors={errors?.dateValue}
            touched={touched?.dateValue}
            onChange={(value) => {
              setFieldValue(
                "dateValue",
                value?.$d ? new Date(value?.$d) : null
              );
            }}
            setTouced={setFieldTouched}
          />
        );
      case "month":
        return (
          <CustomDatePicker
            name={"monthValue"}
            label={"Month"}
            value={values?.monthValue}
            views={["year", "month"]}
            onBlur={handleBlur}
            errors={errors?.monthValue}
            touched={touched?.monthValue}
            onChange={(value) => {
              setFieldValue(
                "monthValue",
                value?.$d ? new Date(value?.$d) : null
              );
            }}
            setTouced={setFieldTouched}
          />
        );
      case "isMonthly":
        return (
          <>
            <CustomDatePicker
              name="startDate"
              label="Start month"
              value={values?.startDate}
              views={["month", "year"]}
              setTouced={setFieldTouched}
              onBlur={handleBlur}
              errors={errors?.startDate}
              touched={touched?.startDate}
              onChange={(value) => {
                setFieldValue(
                  "startDate",
                  value?.$d ? new Date(value?.$d) : null
                );
              }}
            />
            <CustomDatePicker
              name="endDate"
              label="End month"
              value={values.endDate}
              views={["month", "year"]}
              onBlur={handleBlur}
              errors={errors?.endDate}
              touched={touched?.endDate}
              setTouced={setFieldTouched}
              onChange={(value) => {
                setFieldValue(
                  "endDate",
                  value?.$d ? new Date(value?.$d) : null
                );
              }}
            />
          </>
        );
      default:
        return <></>;
    }
  };

  const getFinalizedData = {
    dateWise: data?.data || [],
    month:
      validateDataForMonth(
        bars?.[values?.reportType],
        values?.monthValue,
        data?.data
      ) || [],
    isMonthly: invalidGap
      ? []
      : fillDataGapsForMonths(
          data?.data || [],
          values?.startDate,
          values?.endDate,
          bars?.[values?.reportType]
        ),
    isYearly: data?.data || [],
  };

  return (
    <DashboardWrapper>
      <CustomSelectField
        name="reportType"
        label="Select report"
        inputValues={reportTypes}
        value={values?.reportType}
        onChange={handleChange}
        style={{ width: "40%", margin: "0.5rem auto 0.5rem 12%" }}
      />
      <CustomRadioButton
        name="option"
        label="Choose option"
        style={{ margin: "0.5rem auto 0.5rem 12%" }}
        inputValues={timeOptions}
        accessor={"code"}
        value={values?.option}
        onChange={handleChange}
      />
      <PickersContainer>{renderPickers(values?.option)}</PickersContainer>
      <BarChart
        data={getFinalizedData?.[values?.option]}
        bars={bars?.[values?.reportType]}
        names={names?.[values?.reportType]}
        fills={fills?.[values?.reportType]}
        dataKey={dataKeys?.[values?.option]}
        barSize={values?.reportType === "dropped" ? 100 : 80}
      />
    </DashboardWrapper>
  );
}

export default DashBoard;
