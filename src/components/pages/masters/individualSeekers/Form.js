import { FormLayout, StyledFormContainer } from "../../../../styles";
import {
  AuditInfo,
  BackNavigator,
  CustomFileUpload,
  CustomRadioButton,
  CustomSelectField,
  CustomTextField,
} from "../../../shared";
import { Grid } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../../utils/useNotify";
import { INDIVIDUAL_SEEKERS_LIST } from "../../../../routes/routePaths";
import {
  initialValues,
  labels,
} from "../../../../constants/masters/individualSeekers";
import { useFormik } from "formik";
import { validationSchema } from "../../../../validations/masters/individualSeekers";
import {
  status,
  pincodes,
  states,
  INDIVIDUAL_SEEKER,
  genders,
  individualSeekers,
} from "../../../../api/apiPaths";
import { useQuery } from "react-query";
import { multiPartFormData } from "../../../../utils/multipartFormData";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import {
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
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    status: statusSeeds,
    gender: genderSeeds,
    updateSeed,
  } = useArraySeeds([states, pincodes, status, genders]);
  const { notifySuccess } = useNotify();
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");

  const handleOnReset = () => {
    navigate(INDIVIDUAL_SEEKERS_LIST);
  };

  const { refetch: createUser } = useQuery(
    "create",
    () => {
      const formValues = multiPartFormData({
        ...values,
        stateId: defaultStateValue,
        genderId: getSeedIdByCode(genderSeeds, values?.genderId),
      });
      return postApiServices(INDIVIDUAL_SEEKER, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        updateSeed(individualSeekers);
        navigate(INDIVIDUAL_SEEKERS_LIST, {
          state: data?.id,
        });
        notifySuccess(data?.message);
      },
    }
  );

  const { refetch: updateUser } = useQuery(
    "update",
    () => {
      const neededValues = getNeededValues(values, initialValues);
      let formValues = multiPartFormData({
        ...neededValues,
        statusId: getSeedIdByCode(statusSeeds, values?.statusId),
        profileImage:
          typeof values?.profileImage === "string" ? "" : values.profileImage,
        genderId: getSeedIdByCode(genderSeeds, values?.genderId),
      });
      return updateApiServices(INDIVIDUAL_SEEKER, editId, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        updateSeed(individualSeekers);
        notifySuccess(data?.message);
        navigate(INDIVIDUAL_SEEKERS_LIST);
      },
    }
  );

  useQuery(
    "individualUser",
    () => getByIdApiServices(INDIVIDUAL_SEEKER, editId),
    {
      enabled: !!editId && !!genderSeeds,
      onSuccess: ({ data }) => {
        setValues({
          ...data,
          profileImage: data?.profileImageUrl || "",
          statusId: data?.status?.code,
          rejectReason: data?.rejectReason || "",
          stateId: data?.stateId || defaultStateValue,
          genderId: data?.gender?.length ? data?.gender?.[0].code || "" : "",
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: !!editId ? updateUser : createUser,
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
        title="INDIVIDUAL SEEKER"
        navigateTo={INDIVIDUAL_SEEKERS_LIST}
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
              editId={editId}
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
              isUpdate={!!editId}
            />
          </Grid>
          {editId ? <AuditInfo details={values} /> : <></>}
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
