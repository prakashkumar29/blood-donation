import { Grid } from "@mui/material";
import React from "react";
import { CustomSelectField, CustomTextField } from "../../shared";
import {
  institutionTypes,
  pincodes,
  signUpInstitution,
  states,
} from "../../../api/apiPaths";
import { labels } from "../../../constants/masters/institutions";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "../../../styles";
import { useNavigate } from "react-router-dom";
import { CANCEL, SUBMIT } from "../../../constants/globalConstants";
import { useFormik } from "formik";
import { postApiServices } from "../../../api/api";
import { useQuery } from "react-query";
import { LOGIN } from "../../../routes/routePaths";
import useNotify from "../../../utils/useNotify";
import { validationSchema } from "../../../validations/signUp/institution";
import useArraySeeds from "../../../utils/useArraySeeds";
import { getSeedIdByName, getTrimmedValues } from "../../../utils/common";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

const Institution = () => {
  const {
    state: stateSeeds,
    institutionType: institutionTypeSeeds,
    pincode: pincodeSeeds,
  } = useArraySeeds([states, institutionTypes, pincodes]);
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();

  const handleBack = () => navigate(LOGIN);

  const { refetch: signUpInstitutionUser } = useQuery(
    "signUpIndividual",
    () => {
      const trimmedValues = getTrimmedValues({
        ...values,
        stateId: defaultStateValue,
      });
      return postApiServices(signUpInstitution, trimmedValues);
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
      institutionTypeId: "",
      name: "",
      landlineNo: "",
      mobileNo: "",
      address: "",
      pincodeId: "",
      stateId: "",
    },
    validationSchema: validationSchema,
    onSubmit: signUpInstitutionUser,
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
        <CustomSelectField
          label={labels.institutionTypeId}
          inputValues={institutionTypeSeeds || []}
          name="institutionTypeId"
          value={values.institutionTypeId}
          touched={touched.institutionTypeId}
          errors={errors.institutionTypeId}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={labels.name}
          name="name"
          value={values.name}
          touched={touched.name}
          errors={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={labels.landlineNo}
          type="number"
          maxLength={9}
          name="landlineNo"
          value={values.landlineNo}
          touched={touched.landlineNo}
          errors={errors.landlineNo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={labels.mobileNo}
          type="number"
          maxLength={10}
          name="mobileNo"
          value={values.mobileNo}
          touched={touched.mobileNo}
          errors={errors.mobileNo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          label={labels.address}
          name="address"
          value={values.address}
          touched={touched.address}
          errors={errors.address}
          onChange={handleChange}
          onBlur={handleBlur}
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
        <CancelButton variant="outlined" onClick={handleBack}>
          {CANCEL}
        </CancelButton>
        <SubmitButton variant="outlined" onClick={handleSubmit}>
          {SUBMIT}
        </SubmitButton>
      </StyledButtonContainer>
    </Grid>
  );
};

export default Institution;
