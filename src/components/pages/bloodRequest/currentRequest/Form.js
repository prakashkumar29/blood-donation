import React, { useEffect } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  BLOOD_REQUEST,
  adminUsers,
  bloodGroup,
  donationTypes,
  pincodes,
  volunteers,
} from "../../../../api/apiPaths";
import { getByIdApiServices } from "../../../../api/api";
import { getDateTime } from "../../../../utils/common";
import { OKAY } from "../../../../constants/globalConstants";
import {
  BackNavigator,
  CustomDatePicker,
  CustomSelectField,
  CustomTextField,
  CustomTimePicker,
  DividerLine,
} from "../../../shared";
import { DONOR_CURRENT_REQUEST_LIST } from "../../../../routes/routePaths";
import {
  CancelButton,
  FormLayout,
  FormTitles,
  StyledButtonContainer,
  StyledFormContainer,
} from "../../../../styles";
import {
  initialValues,
  labels,
} from "../../../../constants/bloodRequest/currentRequests";
import { useTheme } from "@emotion/react";
import useArraySeeds from "../../../../utils/useArraySeeds";

function Form() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = true;
  const adminId = useSelector((state) => state?.userInfo?.id);

  const {
    pincode: pincodeSeeds,
    bloodGroup: bloodGroupSeeds,
    adminUser: adminUsersList,
    volunteer: volunteerUsersList,
    donationType: donationTypeSeeds,
  } = useArraySeeds([
    pincodes,
    bloodGroup,
    adminUsers,
    volunteers,
    donationTypes,
  ]);

  useQuery("currentRequest", () => getByIdApiServices(BLOOD_REQUEST, editId), {
    enabled: !!(
      editId &&
      adminUsersList &&
      volunteerUsersList &&
      donationTypeSeeds
    ),
    onSuccess: ({ data }) => {
      setValues({
        ...data,
        timeOfNeed: getDateTime(data?.timeOfNeed),
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
  });
  const {
    values,
    setValues,
    setFieldValue,
  } = formik;
  const handleOnReset = () => {
    navigate(DONOR_CURRENT_REQUEST_LIST);
  };

  useEffect(() => {
    if (values.assignedTo === "") setFieldValue("assignedTo", "me");
    if (!values?.isAssigned) setFieldValue("assignedToId", adminId);
  }, [values]); // eslint-disable-line
  useEffect(() => {
    const isValidId = assignUsersList.some(
      (seed) => seed?.id === values?.assignedToId
    );
    values.assignedTo === "me"
      ? setFieldValue("assignedToId", adminId)
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
        title="VIEW REQUEST DETAILS"
        navigateTo={DONOR_CURRENT_REQUEST_LIST}
        disableModes={true}
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <FormTitles>REQUEST</FormTitles>
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <CustomSelectField
                name="bloodGroupId"
                label={labels.bloodGroupId}
                value={values.bloodGroupId}
                isViewMode={isViewMode}
                inputValues={bloodGroupSeeds || []}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectField
                name="donationTypeId"
                label={labels.donationTypeId}
                value={values.donationTypeId}
                inputValues={donationTypeSeeds || []}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <CustomTextField
                name="noOfUnits"
                label={labels.noOfUnits}
                value={values.noOfUnits}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6}>
              <CustomDatePicker
                name="dateOfNeed"
                label={labels.dateOfNeed}
                value={values.dateOfNeed}
                isViewMode={isViewMode}
                setTouced={() => {}}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTimePicker
                label={labels.timeOfNeed}
                name="timeOfNeed"
                value={values?.timeOfNeed || ""}
                isViewMode={isViewMode}
                setTouced={() => {}}
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
                value={values.patientName}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="patientContactNumber"
                maxLength={10}
                label={labels.patientContactNumber}
                value={values.patientContactNumber}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="ailmentAndTreatment"
                label={labels.ailmentAndTreatment}
                value={values.ailmentAndTreatment}
                isViewMode={isViewMode}
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
                value={values.address}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelectField
                name="pincodeId"
                accessor="code"
                label={labels.pincodeId}
                value={values.pincodeId}
                inputValues={pincodeSeeds}
                isViewMode={isViewMode}
                getOptionLabel={(option) => `${option?.code} - ${option?.name}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="areaName"
                label={"Area"}
                value={values.areaName}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButtonContainer>
                <CancelButton variant="outlined" onClick={handleOnReset}>
                  {OKAY}
                </CancelButton>
              </StyledButtonContainer>
            </Grid>
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
