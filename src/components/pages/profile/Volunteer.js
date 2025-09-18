import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  USER,
  getUserDetailByToken,
  pincodes,
  states,
} from "../../../api/apiPaths";
import useNotify from "../../../utils/useNotify";
import { PROFILE } from "../../../routes/routePaths";
import { useQuery } from "react-query";
import { getNeededValues, getSeedIdByName } from "../../../utils/common";
import { initialValues, labels } from "../../../constants/masters/volunteers";
import { multiPartFormData } from "../../../utils/multipartFormData";
import {
  getApiServices,
  getByIdApiServices,
  updateApiServices,
} from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { validationSchema } from "../../../validations/masters/volunteers";
import {
  BackNavigator,
  CustomFileUpload,
  CustomSelectField,
  CustomTextField,
} from "../../shared";
import {
  CancelButton,
  FormLayout,
  StyledButtonContainer,
  StyledFormContainer,
  SubmitButton,
} from "../../../styles";
import { CANCEL, UPDATE } from "../../../constants/globalConstants";
import { setUserInfo } from "../../../redux/slice";
import useArraySeeds from "../../../utils/useArraySeeds";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

function Volunteer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isViewMode = params.get("viewDetails");
  const { state: stateSeeds, pincode: pincodeSeeds } = useArraySeeds([
    states,
    pincodes,
  ]);
  const { id: userId } = useSelector((state) => state?.userInfo);
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");
  const { notifySuccess } = useNotify();
  const dispatch = useDispatch();

  const handleOnReset = () => {
    navigate(`${PROFILE}?viewDetails=true`);
  };

  const { refetch: getUpdatedDetails } = useQuery(
    "getUpdatedVolunteerDetails",
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

  const { refetch: updateVolunteer } = useQuery(
    "update",
    () => {
      const neededValues = getNeededValues(values, initialValues);
      const { statusId, ...filteredValues } = neededValues;
      let formValues = multiPartFormData({
        ...filteredValues,
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

  useQuery("volunteer", () => getByIdApiServices(USER, userId), {
    enabled: !!userId,
    onSuccess: ({ data }) => {
      setValues({
        ...data,
        profileImage: data?.profileImageUrl || "",
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: updateVolunteer,
    validateOnBlur: !isViewMode,
    validateOnChange: !isViewMode,
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
        disableModes={true}
        disableBack
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={isMobile ? 12 : 6}>
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
            <Grid item xs={isMobile ? 12 : 6}>
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
            <Grid item xs={isMobile ? 12 : 6}>
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
            <Grid item xs={isMobile ? 12 : 6}>
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
            <Grid item xs={isMobile ? 12 : 6}>
              <CustomFileUpload
                accept={"image/*"}
                url={values?.profileImage}
                label={values?.profileImage}
                defaultLabel={"Upload Image"}
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
            <Grid item xs={isMobile ? 12 : 6}>
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
            <Grid item xs={isMobile ? 12 : 6}>
              <CustomSelectField
                name="stateId"
                label={labels.stateId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={defaultStateValue || values.stateId}
                touched={touched.stateId}
                errors={errors.stateId}
                inputValues={stateSeeds}
                isViewMode={true}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
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
            <Grid item xs={isMobile ? 12 : 6}>
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
                    {UPDATE}
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

export default Volunteer;
