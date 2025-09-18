import React from "react";
import {
  BackNavigator,
  CustomFileUpload,
  CustomRadioButton,
  CustomTextField,
} from "../../shared";
import { Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import { FEEDBACK_LIST } from "../../../routes/routePaths";
import { FormLayout, StyledFormContainer } from "../../../styles";
import { useFormik } from "formik";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { initialValues, labels } from "../../../constants/feedback/feedback";
import { useQuery } from "react-query";
import { getByIdApiServices, postApiServices } from "../../../api/api";
import { FEEDBACK } from "../../../api/apiPaths";
import { codes } from "../../../constants/globalConstants";
import { multiPartFormData } from "../../../utils/multipartFormData";
import useNotify from "../../../utils/useNotify";
import { useSelector } from "react-redux";
import { validationSchema } from "../../../validations/feedback/feedback";
import { useTheme } from "@emotion/react";
import { Download } from "@mui/icons-material";
import FormActions from "../../shared/FormActions";

function Form() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  const isSmallSize = useMediaQuery(theme.breakpoints.down("350"));
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const { notifySuccess } = useNotify();
  const { code } = useSelector((state) => state?.userInfo);

  const { refetch: createFeedBack } = useQuery(
    "create",
    () => {
      const formValues = multiPartFormData({
        ...values,
        isPatient: values?.isPatient === "YES",
        bloodrequestId: editId,
      });
      return postApiServices(FEEDBACK, formValues);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(FEEDBACK_LIST, {
          state: data?.id,
        });
        notifySuccess(data?.message);
      },
    }
  );
  useQuery("feedBackDetails", () => getByIdApiServices(FEEDBACK, editId), {
    enabled: !!editId && code === codes?.donor,
    onSuccess: ({ data }) => {
      setValues({
        ...data,
        isPatient: data?.isPatient ? "YES" : "NO",
        audio: data?.audioUrl || "",
        video: data?.videoUrl || "",
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: createFeedBack,
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    setValues,
  } = formik;

  const handleOnReset = () => {
    navigate(FEEDBACK_LIST);
  };

  const downloadFile =
    (url = "") =>
    () => {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "downloaded-certificate.jpg";
      anchor.click();
    };

  return (
    <>
      <BackNavigator title="FEEDBACK" navigateTo={FEEDBACK_LIST} />
      <FormLayout>
        <StyledFormContainer
          sx={{
            border: code === codes?.donor ? "none" : "1px solid",
            boxShadow: theme.shadows[5],
          }}
        >
          {code === codes?.donor ? (
            <Grid container rowSpacing={3} columnSpacing={3} direction="row">
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontWeight={500} fontSize={18} sx={{ mr: 1 }}>
                  Provider name :
                </Typography>
                <Typography>{values?.providerName}</Typography>
              </Grid>
              {values?.relationship ? (
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography fontWeight={500} fontSize={18} sx={{ mr: 1 }}>
                    Relationship :
                  </Typography>
                  <Typography>{values?.relationship}</Typography>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontWeight={500} fontSize={18} sx={{ mr: 1 }}>
                  Feedback :
                </Typography>
                <Typography>{values?.feedbackText}</Typography>
              </Grid>
              <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                {values?.audioUrl ? (
                  <>
                    <audio controls width="90%">
                      <source src={values?.audioUrl} type="audio/mpeg" />
                      <source src={values?.audioUrl} type="audio/ogg" />
                      <source src={values?.audioUrl} type="audio/wav" />
                    </audio>
                    <IconButton
                      onClick={downloadFile(values?.audio)}
                      sx={{ height: 50, width: 50 }}
                    >
                      <Download />
                    </IconButton>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={12}>
                {values?.videoUrl ? (
                  <>
                    <video
                      controls
                      width={isSmallSize ? "230px" : "300px"}
                      height="200"
                      autoPlay
                    >
                      <source src={values?.videoUrl} type="video/mp4" />
                      <source src={values?.videoUrl} type="video/webm" />
                      <source src={values?.videoUrl} type="video/ogg" />
                    </video>
                    <IconButton
                      onClick={downloadFile(values?.video)}
                      sx={{ height: 50, width: 50 }}
                    >
                      <Download />
                    </IconButton>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <CustomTextField
                  name="providerName"
                  label={labels.providerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.providerName}
                  touched={touched.providerName}
                  errors={errors.providerName}
                  isViewMode={isViewMode}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomRadioButton
                  name="isPatient"
                  label={labels.isPatient}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.isPatient ? values.isPatient : ""}
                  touched={touched.isPatient}
                  errors={errors.isPatient}
                  isViewMode={isViewMode}
                  accessor="code"
                  defaultValue={"YES"}
                  inputValues={[
                    { name: "isPatient", code: "YES" },
                    { name: "Others", code: "NO" },
                  ]}
                />
              </Grid>
              {values?.isPatient === "NO" ? (
                <Grid item xs={12}>
                  <CustomTextField
                    name="relationship"
                    label={labels.relationship}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.relationship ? values.relationship : ""}
                    touched={touched.relationship}
                    errors={errors.relationship}
                    isViewMode={isViewMode}
                  />
                </Grid>
              ) : (
                <></>
              )}
              <Grid item xs={12}>
                <CustomTextField
                  name="feedbackText"
                  label={labels.feedbackText}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.feedbackText ? values.feedbackText : ""}
                  touched={touched.feedbackText}
                  errors={errors.feedbackText}
                  isViewMode={isViewMode}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={12} md={6}>
                    <CustomFileUpload
                      accept={"audio/*"}
                      url={values?.audioUrl}
                      label={values?.audio}
                      defaultLabel={"Audio Feedback"}
                      name={"audio"}
                      setFieldValue={setFieldValue}
                      type={"Audio"}
                      errors={errors?.audio}
                      touched={touched?.audio}
                      value={values.audio}
                      disabled={isViewMode}
                      onChange={(e) => {
                        setFieldValue("audio", e.target.files[0]);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={isMobile ? 12 : 9}>
                    <CustomFileUpload
                      accept={"video/*"}
                      setFieldValue={setFieldValue}
                      label={values?.videoName}
                      defaultLabel={"Upload Video"}
                      url={values?.videoUrl}
                      name={"video"}
                      type={"Video"}
                      disabled={isViewMode}
                      errors={errors?.video}
                      touched={touched?.video}
                      value={values.video}
                      onChange={(e) => {
                        setFieldValue("video", e.target.files[0]);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <FormActions
                handleOnReset={handleOnReset}
                handleSubmit={handleSubmit}
              />
            </Grid>
          )}
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
