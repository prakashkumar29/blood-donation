import { Grid } from "@mui/material";
import React from "react";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomSelectField,
  CustomTextField,
  CustomTimePicker,
} from "../../shared";
import {
  bloodGroup,
  genders,
  pincodes,
  roles,
  signUpDonar,
  states,
} from "../../../api/apiPaths";
import { labels, initialValues } from "../../../constants/masters/donors";
import { useFormik } from "formik";
import { validationSchema } from "../../../validations/signUp/donor";
import { multiPartFormData } from "../../../utils/multipartFormData";
import { LOGIN } from "../../../routes/routePaths";
import { useNavigate } from "react-router-dom";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "../../../styles";
import { CANCEL, SUBMIT, codes } from "../../../constants/globalConstants";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import useNotify from "../../../utils/useNotify";
import useArraySeeds from "../../../utils/useArraySeeds";
import { getSeedIdByCode, getSeedIdByName } from "../../../utils/common";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

const Donar = () => {
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    bloodGroup: bloodGroupSeeds,
    role: roleSeeds,
    gender: genderSeeds,
  } = useArraySeeds([states, pincodes, bloodGroup, roles, genders]);
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");
  const donorSeedValue = getSeedIdByCode(roleSeeds, codes?.donor);
  const navigate = useNavigate();
  const { notifySuccess } = useNotify();
  const handleBack = () => navigate(LOGIN);

  const { refetch: createDonor } = useQuery(
    "create",
    () => {
      const {
        frequency,
        availableTimeStart,
        availableTimeEnd,
        lastDonatedDate,
        bloodGroupId,
        donatedBefore,
        ...neededValues
      } = values;
      const formValues = multiPartFormData({
        ...neededValues,
        roleId: donorSeedValue,
        stateId: defaultStateValue,
        dateOfBirth: new Date(values?.dateOfBirth).toISOString(),
        genderId: getSeedIdByCode(genderSeeds, values?.genderId) || "",
        donorParameter: JSON.stringify({
          frequency: frequency.toString() || "",
          bloodGroupId,
          availableTimeStart: new Date(availableTimeStart).toLocaleTimeString(
            "it-IT"
          ),
          availableTimeEnd: new Date(availableTimeEnd).toLocaleTimeString(
            "it-IT"
          ),
          lastDonatedDate:
            values?.donatedBefore === "YES"
              ? values?.lastDonatedDate || ""
              : null,
        }),
      });
      return postApiServices(signUpDonar, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(LOGIN, { state: { mobileNo: values.mobileNo } });
        notifySuccess(data?.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: createDonor,
  });
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldTouched,
  } = formik;

  return (
    <Grid container rowSpacing={3} marginTop="0px">
      <Grid item xs={12}>
        <CustomTextField
          name="name"
          label={labels.name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          touched={touched.name}
          errors={errors.name}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          name="mobileNo"
          type="number"
          maxLength={10}
          label={labels.mobileNo}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mobileNo}
          touched={touched.mobileNo}
          errors={errors.mobileNo}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          name="whatsAppNo"
          type="number"
          maxLength={10}
          label={labels.whatsAppNo}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.whatsAppNo}
          touched={touched.whatsAppNo}
          errors={errors.whatsAppNo}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          name="emailId"
          fieldType="email"
          label={labels.emailId}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.emailId}
          touched={touched.emailId}
          errors={errors.emailId}
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
        <CustomDatePicker
          name="dateOfBirth"
          label={labels.dateOfBirth}
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
      <Grid item xs={12}>
        <CustomTextField
          name="address"
          label={labels.address}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address}
          touched={touched.address}
          errors={errors.address}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          name="areaName"
          label={labels.areaName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.areaName}
          touched={touched.areaName}
          errors={errors.areaName}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          name="frequency"
          type="number"
          maxLength={2}
          label={labels.frequency}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.frequency}
          touched={touched.frequency}
          errors={errors.frequency}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTimePicker
          label={labels.availableTimeStart}
          name="availableTimeStart"
          value={values?.availableTimeStart || ""}
          onChange={(value) => {
            setFieldValue("availableTimeStart", value);
          }}
          onBlur={handleBlur}
          errors={errors.availableTimeStart}
          touched={touched.availableTimeStart}
          setTouced={setFieldTouched}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTimePicker
          label={labels.availableTimeEnd}
          name="availableTimeEnd"
          value={values?.availableTimeEnd || ""}
          onChange={(value) => {
            setFieldValue("availableTimeEnd", value);
          }}
          onBlur={handleBlur}
          errors={errors.availableTimeEnd}
          touched={touched.availableTimeEnd}
          setTouced={setFieldTouched}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioButton
          name="donatedBefore"
          label={labels.donatedBefore}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.donatedBefore}
          errors={errors.donatedBefore}
          value={values.donatedBefore}
          accessor="code"
          defaultValue={"NO"}
          inputValues={[
            { name: "Yes", code: "YES" },
            { name: "No", code: "NO" },
          ]}
        />
      </Grid>
      {values?.donatedBefore === "YES" ? (
        <Grid item xs={12}>
          <CustomDatePicker
            name="lastDonatedDate"
            label={labels.lastDonatedDate}
            value={values.lastDonatedDate}
            onChange={(value) => {
              setFieldValue(
                "lastDonatedDate",
                value?.$d ? new Date(value?.$d) : null
              );
            }}
            maxDate={new Date()}
            fullWidth
            errors={errors.lastDonatedDate}
            onBlur={handleBlur}
            setTouced={setFieldTouched}
            touched={touched.lastDonatedDate}
          />
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <CustomSelectField
          name="bloodGroupId"
          label={labels.bloodGroupId}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.bloodGroupId}
          touched={touched.bloodGroupId}
          errors={errors.bloodGroupId}
          inputValues={bloodGroupSeeds || []}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomSelectField
          name="stateId"
          label={labels.stateId}
          onChange={handleChange}
          onBlur={handleBlur}
          value={defaultStateValue || values.stateId}
          touched={touched.stateId}
          errors={errors.stateId}
          inputValues={stateSeeds || []}
          isViewMode={true}
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
      <StyledButtonContainer
        sx={{ justifyContent: "flex-end", marginTop: "20px" }}
      >
        <CancelButton onClick={handleBack}>{CANCEL}</CancelButton>
        <SubmitButton onClick={handleSubmit}>{SUBMIT}</SubmitButton>
      </StyledButtonContainer>
    </Grid>
  );
};

export default Donar;
