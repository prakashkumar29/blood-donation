import React, { useEffect, useState } from "react";
import {
  AuditInfo,
  BackNavigator,
  CustomCheckBox,
  CustomRadioButton,
  CustomSelectField,
  CustomSwitch,
  CustomTextField,
  DividerLine,
} from "../../../shared";
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../../utils/useNotify";
import { BLOOD_SEEKERS_INSTITUTIONS_LIST } from "../../../../routes/routePaths";
import {
  FormLayout,
  FormTitles,
  StyledFormContainer,
} from "../../../../styles";
import {
  assignOptions,
  initialValues,
  labels,
} from "../../../../constants/bloodSeeker/institution";
import { useFormik } from "formik";
import { validationSchema } from "../../../../validations/bloodSeekers/institutions";
import { CustomDatePicker } from "../../../shared/formFields/CustomDatePicker";
import {
  getDateTime,
  getNeededValues,
  getSeedIdByName,
  getTrimmedValues,
  getValidValues,
} from "../../../../utils/common";
import { CustomTimePicker } from "../../../shared/formFields/CustomTimePicker";
import {
  acceptRejectInputs,
  codes,
} from "../../../../constants/globalConstants";
import {
  BLOOD_REQUEST,
  USER,
  adminUsers,
  bloodGroup,
  bloodSeekerTypes,
  donationTypes,
  institutionSeekers,
  pincodes,
  volunteers,
} from "../../../../api/apiPaths";
import { useQuery } from "react-query";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import StatusFields from "../../../shared/StatusFields";
import { useSelector } from "react-redux";
import useArraySeeds from "../../../../utils/useArraySeeds";
import FormActions from "../../../shared/FormActions";
import SingleAutoComplete from "../../../shared/SingleAutoComplete";

function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const { notifySuccess } = useNotify();
  const { state } = location;
  const { id: userId, code } = useSelector((state) => state?.userInfo);

  const {
    pincode: pincodeSeeds,
    bloodSeeker: seekerTypes,
    bloodGroup: bloodGroupSeeds,
    institutionSeeker: bloodSeekersList,
    volunteer: volunteerUsersList,
    adminUser: adminUsersList = [],
    donationType: donationTypeSeeds,
  } = useArraySeeds([
    pincodes,
    bloodSeekerTypes,
    bloodGroup,
    institutionSeekers,
    volunteers,
    adminUsers,
    donationTypes,
  ]);
  const [addressDetails, setAddressDetails] = useState({
    address: "",
    pincodeId: "",
    areaName: "",
  });
  const bloodSeekerTypeId = getSeedIdByName(seekerTypes, "Institution Seeker");
  const isVolunteerId = (id) =>
    volunteerUsersList.find((seed) => seed?.id === id);
  const admins = adminUsersList.filter((seed) => seed?.id !== userId);

  const { data: requestDetails } = useQuery(
    "bloodRequestDetails",
    () => getByIdApiServices(BLOOD_REQUEST, editId),
    {
      enabled: !!editId && !!adminUsersList && !!volunteerUsersList,
      onSuccess: ({ data }) => {
        setValues({
          ...data,
          isAssigned: Boolean(data?.isAssigned),
          assignedTo:
            data?.assignedToId === userId
              ? "me"
              : !!isVolunteerId(data?.assignedToId)
              ? "volunteers"
              : "admins",
          assignedToId: data?.assignedToId || "",
          statusId: Boolean(data?.rejectOrCancelReason) ? "inActive" : "active",
          timeOfNeed: getDateTime(data?.timeOfNeed),
          rejectReason: data?.rejectOrCancelReason || "",
        });
        setAddressDetails({
          address: data?.address,
          pincodeId: data?.pincodeId,
          areaName: data?.areaName,
        });
      },
    }
  );
  const { refetch: createBloodRequest } = useQuery(
    "create",
    () => {
      const {
        requestStatusId,
        callStatusId,
        queueStatusId,
        assignedTo,
        statusId,
        ...neededValues
      } = values;
      const actualPayload = getValidValues({
        ...neededValues,
        assignedToId:
          code === codes?.volunteer
            ? userId
            : values?.isAssigned
            ? values?.assignedToId
            : null,
        isAssigned: code === codes?.volunteer ? true : values?.isAssigned,
        rejectOrCancelReason: values?.rejectReason,
      });
      const trimmedValues = getTrimmedValues(actualPayload);
      return postApiServices(BLOOD_REQUEST, {
        ...trimmedValues,
        bloodSeekerTypeId,
        timeOfNeed: new Date(neededValues?.timeOfNeed).toLocaleTimeString(
          "it-IT"
        ),
      });
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(BLOOD_SEEKERS_INSTITUTIONS_LIST, {
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
        assignedToId: getFilteredValues.isAssigned
          ? getFilteredValues.assignedToId
          : null,
      };
      const { assignedTo, statusId, rejectReason, ...formValues } =
        formattedValues;
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
        navigate(BLOOD_SEEKERS_INSTITUTIONS_LIST);
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: Boolean(editId) ? updateBloodRequest : createBloodRequest,
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
  useQuery(
    ["institutionDetailss", values?.bloodSeekerId],
    () => getByIdApiServices(USER, values?.bloodSeekerId),
    {
      enabled: !!values?.bloodSeekerId,
      onSuccess: ({ data: institutionData }) => {
        setAddressDetails(getNeededValues(institutionData, addressDetails));
      },
    }
  );

  const handleOnReset = () => {
    navigate(BLOOD_SEEKERS_INSTITUTIONS_LIST);
  };

  useEffect(() => {
    if (!values?.isAssigned) {
      setFieldValue("assignedToId", "");
      setFieldValue("assignedTo", "me");
    }
  }, [values?.isAssigned]); // eslint-disable-line
  useEffect(() => {
    const isValidId = assignUsersList.some(
      (seed) => seed?.id === values?.assignedToId
    );
    if (values.assignedTo === "") setFieldValue("assignedTo", "me");
    values.assignedTo === "me"
      ? setFieldValue("assignedToId", userId)
      : setFieldValue("assignedToId", isValidId ? values?.assignedToId : "");
  }, [values?.assignedTo]); // eslint-disable-line
  useEffect(() => {
    if (values?.isInstitutionAddress && !!values?.bloodSeekerId) {
      setFieldValue("address", addressDetails?.address);
      setFieldValue("pincodeId", addressDetails?.pincodeId);
      setFieldValue("areaName", addressDetails?.areaName);
    }
  }, [values?.isInstitutionAddress, addressDetails]); // eslint-disable-line

  const assignUsersList =
    values?.assignedTo === "me" || values?.assignedTo === ""
      ? []
      : values?.assignedTo === "admins"
      ? admins
      : volunteerUsersList;

  return (
    <>
      <BackNavigator
        title="INSTITUTION BLOOD REQUEST"
        navigateTo={BLOOD_SEEKERS_INSTITUTIONS_LIST}
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <CustomSelectField
                name="bloodSeekerId"
                label={labels.bloodSeekerId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bloodSeekerId}
                touched={touched.bloodSeekerId}
                errors={errors.bloodSeekerId}
                inputValues={bloodSeekersList || []}
                isViewMode={isViewMode || editId || state?.cancelMode}
                disabled={!!editId || state?.cancelMode}
              />
            </Grid>
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
                isViewMode={isViewMode || state?.cancelMode}
                disabled={!!state?.assignMode || state?.cancelMode}
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
                disabled={!!state?.assignMode || state?.cancelMode}
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
                disabled={!!state?.assignMode || state?.cancelMode}
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
                isViewMode={isViewMode || state?.cancelMode}
                minDate={new Date()}
                fullWidth
                errors={errors.dateOfNeed}
                onBlur={handleBlur}
                touched={touched.dateOfNeed}
                setTouced={setFieldTouched}
                disabled={!!state?.assignMode || state?.cancelMode}
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
                isViewMode={isViewMode || state?.cancelMode}
                onBlur={handleBlur}
                errors={errors.timeOfNeed}
                touched={touched.timeOfNeed}
                setTouced={setFieldTouched}
                disabled={!!state?.assignMode || state?.cancelMode}
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
                isViewMode={isViewMode || state?.cancelMode}
                disabled={!!state?.assignMode || state?.cancelMode}
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
                isViewMode={isViewMode || state?.cancelMode}
                disabled={!!state?.assignMode || state?.cancelMode}
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
                isViewMode={isViewMode || state?.cancelMode}
                disabled={state?.cancelMode || !!state?.assignMode}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine />
            </Grid>
            <Grid item xs={12}>
              <FormTitles>DELIVERY LOCATION</FormTitles>
            </Grid>
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
                disabled={!!state?.assignMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="address"
                label={labels.address}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                touched={touched.address}
                errors={errors.address}
                isViewMode={isViewMode || state?.cancelMode}
                disabled={
                  !!state?.assignMode ||
                  state?.cancelMode ||
                  values?.isInstitutionAddress
                }
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
                disabled={
                  !!state?.assignMode ||
                  state?.cancelMode ||
                  values?.isInstitutionAddress
                }
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
                isViewMode={isViewMode || state?.cancelMode}
                disabled={
                  !!state?.assignMode ||
                  state?.cancelMode ||
                  values?.isInstitutionAddress
                }
              />
            </Grid>
            {code !== codes?.volunteer && (
              <>
                <Grid item xs={12}>
                  <FormTitles>ASSIGNMENT</FormTitles>
                </Grid>
                <Grid item xs={12}>
                  <CustomSwitch
                    name="isAssigned"
                    label={labels.isAssigned}
                    onChange={(e) => {
                      setFieldValue("isAssigned", e.target.checked);
                    }}
                    onBlur={handleBlur}
                    value={values.isAssigned}
                    checked={Boolean(values.isAssigned)}
                    isViewMode={
                      isViewMode ||
                      (!!requestDetails?.data?.isAssigned && editId) ||
                      state?.cancelMode
                    }
                  />
                </Grid>
              </>
            )}
            {(!!requestDetails?.data?.isAssigned && editId) ||
            code === codes?.volunteer ? (
              <></>
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ color: "#00000080" }}>
                  <span style={{ fontWeight: 500, color: "#000" }}>Note :</span>{" "}
                  Once assigned, can only change assigned person
                </Typography>
              </Grid>
            )}
            {values?.isAssigned && code !== codes?.volunteer ? (
              <Grid item xs={12}>
                <CustomRadioButton
                  name="assignedTo"
                  label={labels.assignedTo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.assignedTo}
                  touched={touched.assignedTo}
                  errors={errors.assignedTo}
                  isViewMode={isViewMode || state?.cancelMode}
                  accessor="code"
                  inputValues={assignOptions}
                  defaultValue={"me"}
                />
              </Grid>
            ) : (
              <></>
            )}
            {values?.assignedTo !== "me" &&
            values.isAssigned &&
            code !== codes.volunteer ? (
              <Grid item xs={12}>
                <CustomSelectField
                  name="assignedToId"
                  label={labels.assignedToId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.assignedToId}
                  touched={touched.assignedToId}
                  errors={errors.assignedToId}
                  inputValues={assignUsersList || []}
                  isViewMode={isViewMode || state?.cancelMode}
                />
              </Grid>
            ) : (
              <></>
            )}
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
