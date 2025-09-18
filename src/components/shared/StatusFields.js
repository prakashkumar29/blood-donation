import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { DividerLine } from "./DividerLine";
import { CustomRadioButton } from "./formFields/CustomRadioButton";
import { CustomTextField } from "./formFields/CustomTextField";
import useArraySeeds from "../../utils/useArraySeeds";
import { status } from "../../api/apiPaths";

function StatusFields({
  editId,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isViewMode,
  labels,
  customInputValues,
  customLabel = "Status",
  setFieldValue,
}) {
  const { status: statusSeeds } = useArraySeeds([status]);
  useEffect(() => {
    values?.statusId === "active" &&
      setFieldValue &&
      setFieldValue("rejectReason", "");
  }, [values?.statusId]); // eslint-disable-line

  return (
    <>
      {editId && (
        <>
          <Grid item xs={12}>
            <DividerLine />
          </Grid>
          <Grid item xs={12}>
            <CustomRadioButton
              name="statusId"
              label={customLabel}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.statusId ? values.statusId : ""}
              touched={touched.statusId}
              errors={errors.statusId}
              isViewMode={isViewMode}
              accessor="code"
              defaultValue={"active"}
              inputValues={customInputValues || statusSeeds}
            />
          </Grid>
        </>
      )}
      {editId && values.statusId === "inActive" ? (
        <Grid item xs={12}>
          <CustomTextField
            name="rejectReason"
            label={labels.rejectReason}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.rejectReason ? values.rejectReason : ""}
            touched={touched.rejectReason}
            errors={errors.rejectReason}
            isViewMode={isViewMode}
          />
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}

export default StatusFields;
