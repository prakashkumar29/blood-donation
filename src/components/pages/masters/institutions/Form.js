import { FormLayout, StyledFormContainer } from "../../../../styles";
import {
  CustomSelectField,
  BackNavigator,
  CustomFileUpload,
  CustomTextField,
  AuditInfo,
} from "../../../shared";
import { MASTERS_INSTITUTION_LIST } from "../../../../routes/routePaths";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import {
  usersColumn,
  initialValues,
  labels,
  userInitialValues,
  usersFields,
  userSubMenus,
} from "../../../../constants/masters/institutions";
import {
  usersValidation,
  validationSchema,
} from "../../../../validations/masters/institutions";
import { useQuery } from "react-query";
import { multiPartFormData } from "../../../../utils/multipartFormData";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import {
  INSTITUTION,
  institutionTypes,
  states,
  pincodes,
  status,
  institutionSeekers,
} from "../../../../api/apiPaths";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../../utils/useNotify";
import SubForm from "../../SubForm";
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
  const { notifySuccess } = useNotify();
  const {
    state: stateSeeds,
    pincode: pincodeSeeds,
    status: statusSeeds,
    institutionType: institutionTypeSeeds,
    updateSeed,
  } = useArraySeeds([states, pincodes, status, institutionTypes]);
  const seedsLoaded = Boolean(
    stateSeeds && pincodeSeeds && statusSeeds && institutionTypeSeeds
  );
  //getting tamilnadu as a default value
  const defaultStateValue = getSeedIdByName(stateSeeds, "Tamil Nadu");

  const handleOnReset = () => {
    navigate(MASTERS_INSTITUTION_LIST);
  };

  const { refetch: createInstitution } = useQuery(
    "create",
    () => {
      const formValues = multiPartFormData({
        ...values,
        stateId: defaultStateValue,
        institutionUsers: JSON.stringify(values?.institutionUsers),
      });
      return postApiServices(INSTITUTION, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        updateSeed(institutionSeekers);
        navigate(MASTERS_INSTITUTION_LIST, {
          state: data?.id,
        });
        notifySuccess(data?.message);
      },
    }
  );

  const { refetch: updateInstitution } = useQuery(
    "update",
    () => {
      const neededValues = getNeededValues(values, initialValues);
      let formValues = multiPartFormData({
        ...neededValues,
        statusId: getSeedIdByCode(statusSeeds, values?.statusId),
        institution:
          typeof values?.institution === "string" ? "" : values.institution,
        institutionUsers: JSON.stringify(values?.institutionUsers),
        userId: values?.userId,
      });
      return updateApiServices(INSTITUTION, editId, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        updateSeed(institutionSeekers);
        notifySuccess(data?.message);
        navigate(MASTERS_INSTITUTION_LIST);
      },
    }
  );

  useQuery("institution", () => getByIdApiServices(INSTITUTION, editId), {
    enabled: !!editId && seedsLoaded,
    onSuccess: ({ data }) => {
      setValues({
        ...data,
        institution: data?.institutionUrl || "",
        statusId: data?.status?.code,
        rejectReason: data?.rejectReason || "",
        stateId: data?.stateId || defaultStateValue,
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: editId ? updateInstitution : createInstitution,
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

  const modifyUsers = (usersList) => {
    setFieldValue("institutionUsers", usersList);
  };

  return (
    <>
      <BackNavigator
        title="INSTITUTION"
        navigateTo={MASTERS_INSTITUTION_LIST}
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <CustomSelectField
                name="institutionTypeId"
                label={labels.institutionTypeId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.institutionTypeId}
                touched={touched.institutionTypeId}
                errors={errors.institutionTypeId}
                inputValues={institutionTypeSeeds}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12}>
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
                name="primaryContact"
                label={labels.primaryContact}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.primaryContact}
                touched={touched.primaryContact}
                errors={errors.primaryContact}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="landlineNo"
                type="number"
                maxLength={9}
                label={labels.landlineNo}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.landlineNo}
                touched={touched.landlineNo}
                errors={errors.landlineNo}
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
                value={defaultStateValue || values?.stateId}
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
              <SubForm
                list={values?.institutionUsers || []}
                onModifyList={modifyUsers}
                fields={usersFields}
                initialValues={userInitialValues}
                validationSchema={usersValidation}
                columns={usersColumn}
                title="Users"
                uniqueId="mobileNo"
                isViewMode={isViewMode}
                duplicateMessage="Mobile Number"
                mobileMenuDetails={userSubMenus}
                mobileAccessor="name"
                parentId={values?.mobileNo}
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
