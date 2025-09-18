import React, { useEffect } from "react";
import {
  AuditInfo,
  BackNavigator,
  CustomRadioButton,
  CustomSelectField,
  CustomSwitch,
  CustomTextField,
  DividerLine,
} from "../../../shared";
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../../utils/useNotify";
import {
  FormLayout,
  FormTitles,
  StyledFormContainer,
} from "../../../../styles";
import { useFormik } from "formik";
import { validationSchema } from "../../../../validations/bloodSeekers/individuals";
import { CustomDatePicker } from "../../../shared/formFields/CustomDatePicker";
import { CustomTimePicker } from "../../../shared/formFields/CustomTimePicker";
import {
  acceptRejectInputs,
  codes,
} from "../../../../constants/globalConstants";
import {
  BLOOD_REQUEST,
  adminUsers,
  bloodGroup,
  bloodSeekerTypes,
  donationTypes,
  individualSeekers,
  pincodes,
  volunteers,
} from "../../../../api/apiPaths";
import { useQuery } from "react-query";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import { BLOOD_SEEKERS_INDIVIDUALS_LIST } from "../../../../routes/routePaths";
import {
  assignOptions,
  initialValues,
  labels,
} from "../../../../constants/bloodSeeker/individual";
import {
  getDateTime,
  getNeededValues,
  getSeedIdByName,
  getTrimmedValues,
  getValidValues,
} from "../../../../utils/common";
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
    individualUser: individualUsersList,
    volunteer: volunteerUsersList,
    adminUser: adminUsersList,
    donationType: donationTypeSeeds,
  } = useArraySeeds([
    pincodes,
    bloodSeekerTypes,
    bloodGroup,
    individualSeekers,
    volunteers,
    adminUsers,
    donationTypes,
  ]);
  const bloodSeekerTypeId = getSeedIdByName(seekerTypes, "Individual Seeker");
  const isVolunteerId = (id) =>
    volunteerUsersList.find((seed) => seed?.id === id);

  const handleOnReset = () => {
    navigate(BLOOD_SEEKERS_INDIVIDUALS_LIST);
  };

  const { data: requestDetails } = useQuery(
    "bloodRequestDetails",
    () => getByIdApiServices(BLOOD_REQUEST, editId),
    {
      enabled: !!editId && !!individualUsersList && !!volunteerUsersList,
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
      const acutalPayload = getValidValues({
        ...neededValues,
        assignedToId:
          code === codes.volunteer
            ? userId
            : values?.isAssigned
            ? values?.assignedToId
            : null,
        isAssigned: code === codes.volunteer ? true : values?.isAssigned,
        rejectOrCancelReason: values?.rejectReason,
      });
      const trimmedValues = getTrimmedValues(acutalPayload);
      return postApiServices(BLOOD_REQUEST, {
        ...trimmedValues,
        bloodSeekerTypeId,
        timeOfNeed: new Date(acutalPayload?.timeOfNeed).toLocaleTimeString(
          "it-IT"
        ),
      });
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(BLOOD_SEEKERS_INDIVIDUALS_LIST, {
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
        assignedToId: getFilteredValues.isAssigned
          ? getFilteredValues.assignedToId
          : null,
        noOfUnits: getFilteredValues.noOfUnits.toString(),
        timeOfNeed: new Date(getFilteredValues?.timeOfNeed).toLocaleTimeString(
          "it-IT"
        ),
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
        }
      );
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        navigate(BLOOD_SEEKERS_INDIVIDUALS_LIST);
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: editId ? updateBloodRequest : createBloodRequest,
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

  useEffect(() => {
    if (values.assignedTo === "") setFieldValue("assignedTo", "me");
    if (values.assignedTo === "me") setFieldValue("assignedToId", userId);
    if (!values?.isAssigned) setFieldValue("assignedToId", userId);
  }, [values]); // eslint-disable-line
  useEffect(() => {
    const isValidId = assignUsersList.some(
      (seed) => seed?.id === values?.assignedToId
    );
    values.assignedTo === "me"
      ? setFieldValue("assignedToId", userId)
      : setFieldValue("assignedToId", isValidId ? values?.assignedToId : "");
  }, [values?.assignedTo]); // eslint-disable-line

  const assignUsersList =
    values?.assignedTo === "me" || values?.assignedTo === ""
      ? []
      : values?.assignedTo === "admins"
      ? adminUsersList
      : volunteerUsersList;

  return (
    <>
      <BackNavigator
        title="INDIVIDUAL BLOOD REQUEST"
        navigateTo={BLOOD_SEEKERS_INDIVIDUALS_LIST}
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
                inputValues={individualUsersList || []}
                isViewMode={isViewMode}
                disabled={!!editId}
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
                isViewMode={isViewMode}
                inputValues={bloodGroupSeeds || []}
                disabled={!!state?.assignMode || state?.cancelMode}
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
                isViewMode={isViewMode}
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
                isViewMode={isViewMode}
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
                isViewMode={isViewMode}
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
                isViewMode={isViewMode}
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
                isViewMode={isViewMode}
                disabled={state?.cancelMode || !!state?.assignMode}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine />
            </Grid>
            <Grid item xs={12}>
              <FormTitles>DELIVERY LOCATION</FormTitles>
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
                isViewMode={isViewMode}
                disabled={!!state?.assignMode || state?.cancelMode}
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
                disabled={!!state?.assignMode || state?.cancelMode}
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
                disabled={!!state?.assignMode || state?.cancelMode}
              />
            </Grid>
            {code !== codes.volunteer && (
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
                    isViewMode={isViewMode || state?.cancelMode}
                  />
                </Grid>
              </>
            )}
            {(!!requestDetails?.data?.isAssigned && editId) ||
            code === codes.volunteer ? (
              <></>
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ color: "#00000080" }}>
                  <span style={{ fontWeight: 500, color: "#000" }}>Note :</span>{" "}
                  Once assigned, can only change assigned person
                </Typography>
              </Grid>
            )}
            {values?.isAssigned && code !== codes.volunteer && (
              <Grid item xs={12}>
                <CustomRadioButton
                  name="assignedTo"
                  label={labels.assignedTo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.assignedTo ? values.assignedTo : ""}
                  touched={touched.assignedTo}
                  errors={errors.assignedTo}
                  isViewMode={isViewMode || state?.cancelMode}
                  accessor="code"
                  inputValues={assignOptions}
                  defaultValue={"me"}
                />
              </Grid>
            )}
            {values?.assignedTo !== "me" &&
              values.isAssigned &&
              code !== codes.volunteer && (
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
                    isViewMode={isViewMode}
                    disabled={state?.cancelMode}
                  />
                </Grid>
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
                setFieldValue={setFieldValue}
                customLabel="Decision"
                customInputValues={acceptRejectInputs}
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
