import {
  CancelButton,
  FormLayout,
  StyledButtonContainer,
  StyledFormContainer,
  SubmitButton,
} from "../../../styles";
import {
  BackNavigator,
  CustomDatePicker,
  CustomFileUpload,
  CustomRadioButton,
  CustomSelectField,
  CustomTextField,
  CustomTimePicker,
} from "../../shared";
import { Grid } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../utils/useNotify";
import { PROFILE } from "../../../routes/routePaths";
import { initialValues, labels } from "../../../constants/masters/donors";
import { useFormik } from "formik";
import { validationSchema } from "../../../validations/masters/donors";
import { CANCEL, UPDATE } from "../../../constants/globalConstants";
import {
  status,
  pincodes,
  states,
  DONOR,
  bloodGroup,
  getUserDetailByToken,
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
  getDateTime,
  getNeededValues,
  getSeedIdByCode,
  getSeedIdByName,
} from "../../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../redux/slice";
import useArraySeeds from "../../../utils/useArraySeeds";
import SingleAutoComplete from "../../shared/SingleAutoComplete";

function Donor() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isViewMode = params.get("viewDetails");
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    status: statusSeeds,
    gender: genderSeeds,
    bloodGroup: bloodGroupSeeds,
  } = useArraySeeds([states, pincodes, status, genders, bloodGroup]);
  const { notifySuccess } = useNotify();
  const dispatch = useDispatch();
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");
  const { id: userId, roleId } = useSelector((state) => state?.userInfo);

  const handleOnReset = () => {
    navigate(`${PROFILE}?viewDetails=true`);
  };

  const { refetch: getUpdatedDetails } = useQuery(
    "getUpdatedDonarDetails",
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
  const { refetch: updateDonorDetails } = useQuery(
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
        donorId: userId,
      };
      let formValues = multiPartFormData({
        ...fractionedValues,
        statusId: getSeedIdByCode(statusSeeds, values?.statusId),
        genderId: getSeedIdByCode(genderSeeds, values?.genderId),
        dateOfBirth: new Date(values?.dateOfBirth).toISOString(),
        roleId: roleId,
        profileImage:
          typeof values?.profileImage === "string" ? "" : values.profileImage,
        donorParameter: JSON.stringify(donorParameter),
      });
      return updateApiServices(DONOR, userId, formValues);
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
  const { data: userData } = useQuery(
    "donor",
    () => getByIdApiServices(DONOR, userId),
    {
      enabled: !!userId || !!genderSeeds,
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
          statusId: data?.status?.code,
          stateId: data?.stateId || defaultStateValue,
          rejectReason: data?.rejectReason || "",
          genderId: data?.gender?.length ? data?.gender?.[0].code || "" : "",
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: updateDonorDetails,
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
    setFieldTouched,
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
                isViewMode={true}
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
                defaultValue={"male"}
                inputValues={genderSeeds || []}
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
                url={values?.profileImageUrl}
                defaultLabel={values?.profileImageName || "Upload Image"}
                name={"profileImage"}
                setFieldValue={setFieldValue}
                type={"Image"}
                errors={errors?.profileImage}
                touched={touched?.profileImage}
                value={values.profileImage}
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
                  !!userData?.data?.donorParameter?.lastDonatedDate &&
                  !!isViewMode
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
                  label={labels.lastDonatedDate}
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
                  touched={touched.lastDonatedDate}
                  setTouced={setFieldTouched}
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

export default Donor;
