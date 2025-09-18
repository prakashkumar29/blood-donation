import React from "react";
import { FormLayout, StyledFormContainer } from "../../../styles";
import {
  CustomSelectField,
  BackNavigator,
  CustomFileUpload,
  CustomTextField,
} from "../../shared";
import { PROFILE } from "../../../routes/routePaths";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, labels } from "../../../constants/masters/institutions";
import { validationSchema } from "../../../validations/masters/myUsers";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "../../../styles";
import { CANCEL, UPDATE } from "../../../constants/globalConstants";
import { useQuery } from "react-query";
import { multiPartFormData } from "../../../utils/multipartFormData";
import {
  getApiServices,
  getByIdApiServices,
  updateApiServices,
} from "../../../api/api";
import {
  states,
  pincodes,
  getUserDetailByToken,
  status,
  INSTITUTION,
} from "../../../api/apiPaths";
import { useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../utils/useNotify";
import {
  getNeededValues,
  getSeedIdByCode,
  getSeedIdByName,
} from "../../../utils/common";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/slice";
import useArraySeeds from "../../../utils/useArraySeeds";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

function Institution() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isViewMode = params.get("viewDetails");
  const { notifySuccess } = useNotify();
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    status: statusSeeds,
  } = useArraySeeds([states, pincodes, status]);
  const seedsLoaded = Boolean(stateSeeds && pincodeSeeds && statusSeeds);
  const { institutionId, institutionUserId } = useSelector(
    (state) => state?.userInfo
  );
  const dispatch = useDispatch();
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");

  const { refetch: getUpdatedDetails } = useQuery(
    "getUpdatedInstitutionDetails",
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

  const handleOnReset = () => {
    navigate(`${PROFILE}?viewDetails=true`);
  };

  const { refetch: updateInstitution } = useQuery(
    "update",
    () => {
      const neededValues = getNeededValues(values, initialValues);
      const { institutionUsers, ...filteredValues } = neededValues;
      let formValues = multiPartFormData({
        ...filteredValues,
        statusId: getSeedIdByCode(statusSeeds, values?.statusId),
        institution:
          typeof values?.institution === "string" ? "" : values.institution,
        userId: institutionUserId,
      });
      return updateApiServices(INSTITUTION, institutionId, formValues);
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
  useQuery(
    "institution",
    () => getByIdApiServices(INSTITUTION, institutionId),
    {
      enabled: !!institutionId && seedsLoaded,
      onSuccess: ({ data }) => {
        setValues({
          ...data,
          institution: data?.institutionUrl || "",
          statusId: data?.status?.code,
          stateId: data?.stateId || defaultStateValue,
          rejectReason: data?.rejectReason || "",
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: updateInstitution,
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
            <Grid item xs={12}>
              <CustomTextField
                name="name"
                label={"Institution Name *"}
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
            <Grid item xs={12} md={6}>
              <CustomFileUpload
                accept={"image/*"}
                url={values?.institution}
                label={values?.institution}
                defaultLabel={"Profile Image"}
                name={"institution"}
                setFieldValue={setFieldValue}
                type={"Image"}
                errors={errors?.institution}
                touched={touched?.institution}
                value={values.institution}
                disabled={isViewMode}
                onChange={(e) => {
                  setFieldValue("institution", e.target.files[0]);
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
                value={values?.stateId}
                touched={touched.stateId}
                errors={errors.stateId}
                inputValues={stateSeeds || []}
                isViewMode={true}
                disabled={!isViewMode}
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

export default Institution;
