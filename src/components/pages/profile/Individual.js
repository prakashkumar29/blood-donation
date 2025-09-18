import React from "react";
import {
  CancelButton,
  FormLayout,
  StyledButtonContainer,
  StyledFormContainer,
  SubmitButton,
} from "../../../styles";
import {
  BackNavigator,
  CustomFileUpload,
  CustomRadioButton,
  CustomSelectField,
  CustomTextField,
} from "../../shared";
import { Grid } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../utils/useNotify";
import {
  initialValues,
  labels,
} from "../../../constants/masters/individualSeekers";
import { useFormik } from "formik";
import { validationSchema } from "../../../validations/masters/individualSeekers";
import { CANCEL, SUBMIT, UPDATE } from "../../../constants/globalConstants";
import {
  status,
  pincodes,
  states,
  getUserDetailByToken,
  USER,
  genders,
} from "../../../api/apiPaths";
import { useQuery } from "react-query";
import { multiPartFormData } from "../../../utils/multipartFormData";
import {
  getApiServices,
  getByIdApiServices,
  updateApiServices,
} from "../../../api/api";
import {
  getNeededValues,
  getSeedIdByCode,
  getSeedIdByName,
} from "../../../utils/common";
import { PROFILE } from "../../../routes/routePaths";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/slice";
import useArraySeeds from "../../../utils/useArraySeeds";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

function Form() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = params.get("viewDetails");
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    status: statusSeeds,
    gender: genderSeeds,
  } = useArraySeeds([states, pincodes, status, genders]);
  const userId = useSelector((state) => state?.userInfo?.id);
  const { notifySuccess } = useNotify();
  const dispatch = useDispatch();
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");

  const handleOnReset = () => {
    navigate(`${PROFILE}?viewDetails=true`);
  };

  const { refetch: getUpdatedDetails } = useQuery(
    "getUpdatedIndividualDetails",
    () => getApiServices(getUserDetailByToken),
    {
      enabled: false,
      onSuccess: ({ data }) =>
        dispatch(
          setUserInfo({
            profileImageUrl: data?.profileImageUrl,
            name: data?.name,
          })
        ),
    }
  );
  const { refetch: updateUser } = useQuery(
    "update",
    () => {
      const neededValues = getNeededValues(values, initialValues);
      let formValues = multiPartFormData({
        ...neededValues,
        statusId: getSeedIdByCode(statusSeeds, values?.statusId),
        genderId: getSeedIdByCode(genderSeeds, values?.genderId),
        profileImage:
          typeof values?.profileImage === "string" ? "" : values.profileImage,
      });
      return updateApiServices(USER, userId, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        getUpdatedDetails();
        navigate(`${PROFILE}?viewDetails=true`);
      },
    }
  );

  useQuery("individual", () => getByIdApiServices(USER, userId), {
    enabled: !!userId,
    onSuccess: ({ data }) => {
      setValues({
        ...data,
        profileImage: data?.profileImageUrl || "",
        statusId: data?.status?.code,
        genderId: data?.gender?.length ? data?.gender?.[0].code || "" : "",
        stateId: data?.stateId || defaultStateValue,
        rejectReason: data?.rejectReason || "",
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: updateUser,
  });
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setValues,
    setFieldValue,
    handleSubmit,
  } = formik;

  return (
    <>
      <BackNavigator
        title={isViewMode ? "VIEW PROFILE" : "EDIT PROFILE"}
        navigateTo={`${PROFILE}?viewDetails=true`}
        disableModes
        disableBack
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="name"
                label={labels.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                touched={touched.name}
                errors={errors.name}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                isViewMode={isViewMode}
                disabled={!isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="emailId"
                fieldType="email"
                label={labels.emailId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailId}
                touched={touched.emailId}
                errors={errors.emailId}
                isViewMode={isViewMode}
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
                value={values.genderId ? values.genderId : ""}
                isViewMode={isViewMode}
                accessor="code"
                defaultValue="male"
                inputValues={genderSeeds || []}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFileUpload
                accept={"image/*"}
                url={values?.profileImageUrl}
                defaultLabel={values?.profileImageName || "Upload Image"}
                name={"profileImage"}
                setFieldValue={setFieldValue}
                type={"Image"}
                errors={errors?.profileImage}
                touched={touched?.profileImage}
                value={values.profileImage}
                disabled={isViewMode}
                onChange={(e) => {
                  setFieldValue("profileImage", e.target.files[0]);
                }}
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
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="areaName"
                label={labels.areaName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.areaName}
                touched={touched.areaName}
                errors={errors.areaName}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectField
                name="stateId"
                label={labels.stateId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.stateId}
                touched={touched.stateId}
                errors={errors.stateId}
                inputValues={stateSeeds || []}
                isViewMode={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                isViewMode={isViewMode}
                getOptionLabel={(option) => `${option?.code} - ${option?.name}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="googleMapName"
                label={labels.googleMapName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.googleMapName}
                touched={touched.googleMapName}
                errors={errors.googleMapName}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12}>
              {isViewMode ? (
                <></>
              ) : (
                <StyledButtonContainer>
                  <CancelButton variant="outlined" onClick={handleOnReset}>
                    {CANCEL}
                  </CancelButton>
                  <SubmitButton
                    variant="outlined"
                    onClick={handleSubmit}
                    disabled={isViewMode}
                  >
                    {editId ? UPDATE : SUBMIT}
                  </SubmitButton>
                </StyledButtonContainer>
              )}
            </Grid>
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
