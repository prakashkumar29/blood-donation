import { useFormik } from "formik";
import React from "react";
import { initialValues } from "../../../constants/referal/referals";
import { validationSchema } from "../../../validations/referal/referal";
import { BackNavigator, CustomDatePicker, CustomTextField } from "../../shared";
import { FormLayout, StyledFormContainer } from "../../../styles";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { REFERALS } from "../../../routes/routePaths";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../api/api";
import { REFERRED_USER, REFER_USER } from "../../../api/apiPaths";
import {
  getNeededValues,
  getTrimmedValues,
  getValidValues,
} from "../../../utils/common";
import useNotify from "../../../utils/useNotify";
import FormActions from "../../shared/FormActions";

function Form() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const { notifySuccess } = useNotify();

  const { refetch: submitReferal } = useQuery(
    "createReferal",
    () => {
      const formattedValues = getNeededValues(values, initialValues);
      const validDetails = getValidValues(formattedValues);
      const trimmedValues = getTrimmedValues(validDetails);
      return editId
        ? updateApiServices(REFERRED_USER, editId, trimmedValues)
        : postApiServices(REFER_USER, trimmedValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        navigate(REFERALS);
      },
    }
  );
  useQuery(
    "referalDetails",
    () => {
      return getByIdApiServices(REFERRED_USER, editId);
    },
    {
      enabled: !!editId,
      onSuccess: ({ data }) => {
        setValues(data);
      },
    }
  );

  const handleOnReset = () => {
    navigate(REFERALS);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: submitReferal,
  });
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    setValues,
  } = formik;

  return (
    <>
      <BackNavigator title="REFER A DONOR" disableModes navigateTo={REFERALS} />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="name"
                label={"Name *"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                touched={touched.name}
                errors={errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="mobileNo"
                type="number"
                maxLength={10}
                label={"Mobile No *"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobileNo}
                touched={touched.mobileNo}
                errors={errors.mobileNo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="emailId"
                fieldType="email"
                label={"Email *"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailId}
                touched={touched.emailId}
                errors={errors.emailId}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomDatePicker
                name="dateOfBirth"
                label={"Date of birth"}
                value={values.dateOfBirth}
                onChange={(value) => {
                  setFieldValue(
                    "dateOfBirth",
                    value?.$d ? new Date(value?.$d) : null
                  );
                }}
                maxDate={new Date()}
                fullWidth
                errors={errors.dateOfBirth}
                onBlur={handleBlur}
                setTouced={setFieldTouched}
                touched={touched.dateOfBirth}
              />
            </Grid>
            <FormActions
              handleOnReset={handleOnReset}
              handleSubmit={handleSubmit}
              isUpdate={!!editId}
            />
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
