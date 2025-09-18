import React from "react";
import { Grid } from "@mui/material";
import {
  genders,
  pincodes,
  signUpIndividualSeeker,
  states,
} from "../../../api/apiPaths";
import { labels } from "../../../constants/masters/individualSeekers";
import {
  CustomRadioButton,
  CustomSelectField,
  CustomTextField,
} from "../../shared";
import { useFormik } from "formik";
import { validationSchema } from "../../../validations/signUp/individual";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "../../../styles";
import { CANCEL, SUBMIT } from "../../../constants/globalConstants";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import useNotify from "../../../utils/useNotify";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../../routes/routePaths";
import useArraySeeds from "../../../utils/useArraySeeds";
import { getSeedIdByName, getTrimmedValues } from "../../../utils/common";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

const Individual = () => {
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    gender: genderSeeds,
  } = useArraySeeds([states, pincodes, genders]);
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();
  const handleBack = () => navigate(LOGIN);

  const { refetch: signUpIndividual } = useQuery(
    "signUpIndividual",
    () => {
      const trimmedValues = getTrimmedValues({
        ...values,
        stateId: defaultStateValue,
        genderId:
          genderSeeds?.find((seed) => seed?.code === values?.genderId)?.id ||
          "",
      });
      return postApiServices(signUpIndividualSeeker, trimmedValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        navigate(LOGIN, { state: { mobileNo: values.mobileNo } });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      mobileNo: "",
      genderId: "male",
      whatsAppNo: "",
      pincodeId: "",
      stateId: "",
    },
    validationSchema: validationSchema,
    onSubmit: signUpIndividual,
  });

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <Grid container rowSpacing={3} marginTop="0px">
      <Grid item xs={12}>
        <CustomTextField
          label={labels.name}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.name}
          errors={errors.name}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={labels.mobileNo}
          type="number"
          maxLength={10}
          name="mobileNo"
          value={values.mobileNo}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.mobileNo}
          errors={errors.mobileNo}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={labels.whatsAppNo}
          type="number"
          maxLength={10}
          name="whatsAppNo"
          value={values.whatsAppNo}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.whatsAppNo}
          errors={errors.whatsAppNo}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioButton
          name="genderId"
          label={labels.genderId}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.genderId}
          errors={errors.genderId}
          value={values.genderId}
          accessor="code"
          defaultValue={"male"}
          inputValues={genderSeeds}
        />
      </Grid>
      <Grid item xs={12}>
        <SingleAutoComplete
          name="pincodeId"
          label={labels.pincodeId}
          onChange={(e, v) => {
            setFieldValue("pincodeId", v?.id || "");
          }}
          onBlur={handleBlur}
          value={values.pincodeId}
          touched={touched.pincodeId}
          errors={errors.pincodeId}
          inputValues={pincodeSeeds}
          getOptionLabel={(option) => `${option?.code} - ${option?.name}`}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomSelectField
          label={labels.stateId}
          name="stateId"
          inputValues={stateSeeds || []}
          value={defaultStateValue}
          isViewMode={true}
        />
      </Grid>
      <StyledButtonContainer
        sx={{ justifyContent: "flex-end", marginTop: "20px" }}
      >
        <CancelButton onClick={handleBack}>{CANCEL}</CancelButton>
        <SubmitButton onClick={handleSubmit}>{SUBMIT}</SubmitButton>
      </StyledButtonContainer>
    </Grid>
  );
};

export default Individual;
