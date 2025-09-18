import React from "react";
import { FormLayout, StyledFormContainer } from "../../../../styles";
import {
  AuditInfo,
  BackNavigator,
  CustomDatePicker,
  CustomFileUpload,
  CustomRadioButton,
  CustomSelectField,
  CustomTextField,
  CustomTimePicker,
} from "../../../shared";
import { Grid } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../../utils/useNotify";
import { MASTERS_DONORS_LIST, REFERALS } from "../../../../routes/routePaths";
import { initialValues, labels } from "../../../../constants/masters/donors";
import { useFormik } from "formik";
import { validationSchema } from "../../../../validations/masters/donors";
import { codes } from "../../../../constants/globalConstants";
import {
  status,
  pincodes,
  states,
  DONOR,
  roles,
  bloodGroup,
  genders,
  REFERRED_USER,
} from "../../../../api/apiPaths";
import { useQuery } from "react-query";
import { multiPartFormData } from "../../../../utils/multipartFormData";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import {
  getDateTime,
  getNeededValues,
  getSeedIdByCode,
  getSeedIdByName,
} from "../../../../utils/common";
import StatusFields from "../../../shared/StatusFields";
import useArraySeeds from "../../../../utils/useArraySeeds";
import FormActions from "../../../shared/FormActions";
import SingleAutoComplete from "../../../shared/SingleAutoComplete";

function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const referalId = location?.state?.referalId;
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    status: statusSeeds,
    role: roleSeeds,
    bloodGroup: bloodGroupSeeds,
    gender: genderSeeds,
  } = useArraySeeds([states, pincodes, status, roles, bloodGroup, genders]);
  const seedsLoaded = Boolean(
    stateSeeds &&
      pincodeSeeds &&
      statusSeeds &&
      roleSeeds &&
      bloodGroupSeeds &&
      genderSeeds
  );
  const { notifySuccess } = useNotify();
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");
  const donorRoleId = getSeedIdByCode(roleSeeds, codes?.donor);

  const handleOnReset = () => {
    navigate(referalId ? REFERALS : MASTERS_DONORS_LIST);
  };

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
      if (referalId) neededValues.referalId = referalId;
      const formValues = multiPartFormData({
        ...neededValues,
        roleId: donorRoleId,
        stateId: defaultStateValue,
        genderId: getSeedIdByCode(genderSeeds, values?.genderId),
        dateOfBirth: new Date(values?.dateOfBirth).toISOString(),
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
            values?.donatedBefore === "YES" ? lastDonatedDate : null,
        }),
      });
      return postApiServices(
        referalId ? `${DONOR}?referrId=${referalId}` : DONOR,
        formValues
      );
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(referalId ? REFERALS : MASTERS_DONORS_LIST, {
          state: data?.id,
        });
        notifySuccess(data?.message);
      },
    }
  );

  const { refetch: updateDonor } = useQuery(
    "update",
    () => {
      const neededValues = getNeededValues(values, initialValues);
      const {
        frequency,
        availableTimeStart,
        availableTimeEnd,
        lastDonatedDate,
        bloodGroupId,
        donatedBefore,
        ...fractionedValues
      } = neededValues;
      const donorParameter = {
        frequency: frequency.toString() || "",
        availableTimeStart: new Date(availableTimeStart).toLocaleTimeString(
          "it-IT"
        ),
        availableTimeEnd: new Date(availableTimeEnd).toLocaleTimeString(
          "it-IT"
        ),
        lastDonatedDate:
          values?.donatedBefore === "YES" ? lastDonatedDate : null,
        bloodGroupId,
        id: values?.donorParameter?.id,
        donorId: editId,
      };
      let formValues = multiPartFormData({
        ...fractionedValues,
        statusId: getSeedIdByCode(statusSeeds, values?.statusId),
        genderId: getSeedIdByCode(genderSeeds, values?.genderId),
        roleId: donorRoleId,
        dateOfBirth: new Date(values?.dateOfBirth).toISOString(),
        profileImage:
          typeof values?.profileImage === "string" ? "" : values.profileImage,
        donorParameter: JSON.stringify(donorParameter),
      });
      return updateApiServices(DONOR, editId, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        navigate(referalId ? REFERALS : MASTERS_DONORS_LIST);
      },
    }
  );

  const { data: userData } = useQuery(
    "donor",
    () => getByIdApiServices(DONOR, editId),
    {
      enabled: !!editId && seedsLoaded && !referalId,
      retry: false,
      onSuccess: ({ data }) => {
        setValues({
          ...data,
          ...data?.donorParameter,
          availableTimeStart: getDateTime(
            data?.donorParameter?.availableTimeStart
          ),
          availableTimeEnd: getDateTime(data?.donorParameter?.availableTimeEnd),
          frequency: data?.donorParameter?.frequency || "",
          donatedBefore: data?.donorParameter?.lastDonatedDate ? "YES" : "NO",
          lastDonatedDate: data?.donorParameter?.lastDonatedDate || "",
          bloodGroupId: data?.donorParameter?.bloodGroupId || "",
          profileImage: data?.profileImageUrl || "",
          genderId: data?.gender?.length ? data?.gender?.[0].code || "" : "",
          statusId: data?.status?.code,
          rejectReason: data?.rejectReason || "",
          stateId: data?.stateId || defaultStateValue,
        });
      },
    }
  );
  useQuery(
    "referalDetails",
    () => getByIdApiServices(REFERRED_USER, referalId),
    {
      enabled: !!referalId,
      onSuccess: ({ data }) => {
        const neededValues = getNeededValues(data, initialValues);
        setValues(neededValues);
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: !!editId && !referalId ? updateDonor : createDonor,
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

  return (
    <>
      <BackNavigator
        title={!!referalId ? "ADD DONOR" : "DONOR"}
        navigateTo={referalId ? REFERALS : MASTERS_DONORS_LIST}
        disableModes={!!referalId}
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
                disabled={!!referalId}
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
                value={values.genderId}
                isViewMode={isViewMode}
                accessor="code"
                defaultValue={"male"}
                inputValues={genderSeeds}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                isViewMode={isViewMode}
                maxDate={new Date()}
                fullWidth
                errors={errors.dateOfBirth}
                onBlur={handleBlur}
                setTouced={setFieldTouched}
                touched={touched.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFileUpload
                accept={"image/*"}
                url={values?.profileImageUrl || ""}
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
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTimePicker
                label={labels.availableTimeStart}
                name="availableTimeStart"
                value={values?.availableTimeStart || ""}
                onChange={(value) => {
                  setFieldValue("availableTimeStart", value);
                }}
                isViewMode={isViewMode}
                onBlur={handleBlur}
                errors={errors.availableTimeStart}
                touched={touched.availableTimeStart}
                setTouced={setFieldTouched}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTimePicker
                label={labels.availableTimeEnd}
                name="availableTimeEnd"
                value={values?.availableTimeEnd || ""}
                onChange={(value) => {
                  setFieldValue("availableTimeEnd", value);
                }}
                isViewMode={isViewMode}
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
                isViewMode={isViewMode}
                accessor="code"
                defaultValue={"NO"}
                disabled={
                  !!editId && !!userData?.data?.donorParameter?.lastDonatedDate
                }
                inputValues={[
                  { name: "Yes", code: "YES" },
                  { name: "No", code: "NO" },
                ]}
              />
            </Grid>
            {values?.donatedBefore === "YES" ? (
              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  name="lastDonatedDate"
                  label={labels?.lastDonatedDate}
                  value={values.lastDonatedDate}
                  onChange={(value) => {
                    setFieldValue(
                      "lastDonatedDate",
                      value?.$d ? new Date(value?.$d) : null
                    );
                  }}
                  isViewMode={isViewMode}
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
            <Grid item xs={12} md={6}>
              <CustomSelectField
                name="bloodGroupId"
                label={labels.bloodGroupId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bloodGroupId}
                touched={touched.bloodGroupId}
                errors={errors.bloodGroupId}
                inputValues={bloodGroupSeeds || []}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <StatusFields
              editId={editId && !referalId}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
              isViewMode={isViewMode}
              labels={labels}
              setFieldValue={setFieldValue}
            />
            <FormActions
              isViewMode={isViewMode}
              handleOnReset={handleOnReset}
              handleSubmit={handleSubmit}
              isUpdate={editId && !referalId}
            />
          </Grid>
          {editId && !referalId ? <AuditInfo details={values} /> : <></>}
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
