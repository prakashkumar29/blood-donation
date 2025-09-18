import React, { useEffect, useState } from "react";
import {
  AuditInfo,
  BackNavigator,
  CustomCheckBox,
  CustomSelectField,
  CustomTextField,
  DividerLine,
} from "../../shared";
import { Grid } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  getDateTime,
  getNeededValues,
  getTrimmedValues,
  getValidValues,
} from "../../../utils/common";
import { CustomTimePicker } from "../../shared/formFields/CustomTimePicker";
import {
  BLOOD_REQUEST,
  USER,
  bloodGroup,
  donationTypes,
  pincodes,
} from "../../../api/apiPaths";
import { useQuery } from "react-query";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../api/api";
import { useSelector } from "react-redux";
import { CREATE_REQUEST_LIST } from "../../../routes/routePaths";
import useNotify from "../../../utils/useNotify";
import { acceptRejectInputs, codes } from "../../../constants/globalConstants";
import { FormLayout, FormTitles, StyledFormContainer } from "../../../styles";
import { CustomDatePicker } from "../../shared";
import {
  initialValues,
  labels,
} from "../../../constants/createRequest/createRequest";
import { validationSchema } from "../../../validations/createRequest/createRequest";
import StatusFields from "../../shared/StatusFields";
import useArraySeeds from "../../../utils/useArraySeeds";
import FormActions from "../../shared/FormActions";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const {
    pincode: pincodeSeeds,
    bloodGroup: bloodGroupSeeds,
    donationType: donationTypeSeeds,
  } = useArraySeeds([pincodes, bloodGroup, donationTypes]);
  const { notifySuccess } = useNotify();
  const { state } = location;
  const {
    id: userId,
    roleId,
    code,
    institutionUserId,
  } = useSelector((state) => state?.userInfo);
  const [addressDetails, setAddressDetails] = useState({
    address: "",
    pincodeId: "",
    areaName: "",
  });

  useQuery(
    "bloodRequestDetails",
    () => getByIdApiServices(BLOOD_REQUEST, editId),
    {
      enabled: !!editId,
      onSuccess: ({ data }) => {
        setValues({
          ...data,
          timeOfNeed: getDateTime(data?.timeOfNeed),
          statusId: Boolean(data?.rejectOrCancelReason) ? "inActive" : "active",
          rejectReason: data?.rejectOrCancelReason || "",
        });
        setAddressDetails({
          address: data?.address,
          pincodeId: data?.pincodeId,
          areaName: values?.areaName,
        });
      },
    }
  );
  useQuery(
    "institutionDetails",
    () => getByIdApiServices(USER, institutionUserId),
    {
      enabled: code === codes?.institution_seeker,
      onSuccess: ({ data: institutionData }) => {
        setAddressDetails(getNeededValues(institutionData, addressDetails));
      },
    }
  );
  const { refetch: createBloodRequest } = useQuery(
    "create",
    () => {
      const trimmedValues = getTrimmedValues({
        bloodSeekerId:
          code === codes?.institution_seeker ? institutionUserId : userId,
        ...getValidValues(values),
        bloodSeekerTypeId: roleId,
        timeOfNeed: new Date(values?.timeOfNeed).toLocaleTimeString("it-IT"),
      });
      return postApiServices(BLOOD_REQUEST, trimmedValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(CREATE_REQUEST_LIST, {
          state: data?.id,
        });
        notifySuccess(data?.message);
      },
    }
  );
  const { refetch: updateBloodRequest } = useQuery(
    "update",
    () => {
      const getFilteredValues = getNeededValues(values, initialValues);
      const formattedValues = {
        ...getFilteredValues,
        noOfUnits: getFilteredValues.noOfUnits.toString(),
        timeOfNeed: new Date(getFilteredValues?.timeOfNeed).toLocaleTimeString(
          "it-IT"
        ),
      };
      const { statusId, rejectReason, ...formValues } = formattedValues;
      const neededValues = getValidValues(formValues);
      const trimmedValues = getTrimmedValues(neededValues);
      return updateApiServices(
        state?.cancelMode ? "cancelRequest" : BLOOD_REQUEST,
        editId,
        {
          ...trimmedValues,
          rejectOrCancelReason: values?.rejectReason,
          isCancelled: statusId === "inActive",
          isInstitutionAddress: Boolean(values?.isInstitutionAddress),
        }
      );
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        navigate(CREATE_REQUEST_LIST);
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: !!editId ? updateBloodRequest : createBloodRequest,
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
    setFieldTouched,
  } = formik;

  const handleOnReset = () => {
    navigate(CREATE_REQUEST_LIST);
  };

  useEffect(() => {
    if (values?.isInstitutionAddress) {
      setFieldValue("address", addressDetails?.address);
      setFieldValue("pincodeId", addressDetails?.pincodeId);
      setFieldValue("areaName", addressDetails?.areaName);
    }
  }, [values?.isInstitutionAddress]); // eslint-disable-line

  return (
    <>
      <BackNavigator title="BLOOD REQUEST" navigateTo={CREATE_REQUEST_LIST} />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <FormTitles>BLOOD REQUIREMENT</FormTitles>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectField
                name="bloodGroupId"
                label={labels.bloodGroupId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bloodGroupId}
                touched={touched.bloodGroupId}
                errors={errors.bloodGroupId}
                isViewMode={isViewMode}
                disabled={state?.cancelMode}
                inputValues={bloodGroupSeeds || []}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectField
                name="donationTypeId"
                label={labels.donationTypeId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.donationTypeId}
                touched={touched.donationTypeId}
                errors={errors.donationTypeId}
                inputValues={donationTypeSeeds || []}
                isViewMode={isViewMode || state?.cancelMode}
                disabled={state?.cancelMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="noOfUnits"
                type="number"
                maxLength={2}
                label={labels.noOfUnits}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.noOfUnits}
                touched={touched.noOfUnits}
                errors={errors.noOfUnits}
                isViewMode={isViewMode}
                disabled={state?.cancelMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomDatePicker
                name="dateOfNeed"
                label={labels.dateOfNeed}
                value={values.dateOfNeed}
                onChange={(value) => {
                  setFieldValue(
                    "dateOfNeed",
                    value?.$d ? new Date(value?.$d) : null
                  );
                }}
                isViewMode={isViewMode}
                minDate={new Date()}
                fullWidth
                errors={errors.dateOfNeed}
                onBlur={handleBlur}
                touched={touched.dateOfNeed}
                setTouced={setFieldTouched}
                disabled={state?.cancelMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTimePicker
                label={labels.timeOfNeed}
                name="timeOfNeed"
                value={values?.timeOfNeed || ""}
                onChange={(value) => {
                  setFieldValue("timeOfNeed", value);
                }}
                isViewMode={isViewMode}
                onBlur={handleBlur}
                errors={errors.timeOfNeed}
                touched={touched.timeOfNeed}
                setTouced={setFieldTouched}
                disabled={state?.cancelMode}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine />
            </Grid>
            <Grid item xs={12}>
              <FormTitles>PATIENT DETAILS</FormTitles>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="patientName"
                label={labels.patientName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.patientName}
                touched={touched.patientName}
                errors={errors.patientName}
                isViewMode={isViewMode}
                disabled={state?.cancelMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="patientContactNumber"
                type="number"
                maxLength={10}
                label={labels.patientContactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.patientContactNumber}
                touched={touched.patientContactNumber}
                errors={errors.patientContactNumber}
                isViewMode={isViewMode}
                disabled={state?.cancelMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="ailmentAndTreatment"
                label={labels.ailmentAndTreatment}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ailmentAndTreatment}
                touched={touched.ailmentAndTreatment}
                errors={errors.ailmentAndTreatment}
                isViewMode={isViewMode}
                disabled={state?.cancelMode}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine />
            </Grid>
            <Grid item xs={12}>
              <FormTitles>DELIVERY LOCATION</FormTitles>
            </Grid>
            {code === codes?.institution_seeker ? (
              <Grid item xs={12}>
                <CustomCheckBox
                  name="isInstitutionAddress"
                  label={labels?.isInstitutionAddress}
                  onChange={(e) => {
                    setFieldValue("isInstitutionAddress", e.target.checked);
                  }}
                  onBlur={handleBlur}
                  value={values.isInstitutionAddress}
                  checked={Boolean(values.isInstitutionAddress)}
                  isViewMode={isViewMode || state?.cancelMode}
                  disabled={!!state?.cancelMode}
                />
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="address"
                label={labels.address}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                touched={touched.address}
                errors={errors.address}
                isViewMode={isViewMode}
                disabled={state?.cancelMode || values?.isInstitutionAddress}
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
                disabled={state?.cancelMode || values?.isInstitutionAddress}
                getOptionLabel={(option) => `${option?.code} - ${option?.name}`}
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
                disabled={state?.cancelMode || values?.isInstitutionAddress}
              />
            </Grid>
            {editId && state?.cancelMode ? (
              <StatusFields
                editId={editId}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                touched={touched}
                errors={errors}
                isViewMode={isViewMode}
                labels={labels}
                customInputValues={acceptRejectInputs}
                customLabel="Decision"
                setFieldValue={setFieldValue}
              />
            ) : (
              <></>
            )}
            <FormActions
              isViewMode={isViewMode}
              handleOnReset={handleOnReset}
              handleSubmit={handleSubmit}
              isUpdate={!!editId}
              disableSubmit={state?.cancelMode && values?.statusId === "active"}
            />
          </Grid>
          {editId ? <AuditInfo details={values} /> : <></>}
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
