import React from "react";
import {
  BackNavigator,
  CardDetails,
  CardTitles,
  CustomFileUpload,
} from "../../shared";
import { Grid, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CERTIFICATE_LIST } from "../../../routes/routePaths";
import { FormLayout, FormTitles, StyledFormContainer } from "../../../styles";
import { useFormik } from "formik";
import { initialValues } from "../../../constants/certificate/certificate";
import { mixed, object } from "yup";
import { useSelector } from "react-redux";
import DownloadIcon from "@mui/icons-material/Download";
import { useQuery } from "react-query";
import {
  getByIdApiServices,
  postUpdateApiServices,
  updateApiServices,
} from "../../../api/api";
import { CERTIFICATE } from "../../../api/apiPaths";
import { codes } from "../../../constants/globalConstants";
import { multiPartFormData } from "../../../utils/multipartFormData";
import useNotify from "../../../utils/useNotify";
import FormActions from "../../shared/FormActions";

function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const code = useSelector((state) => state?.userInfo?.code);
  const { notifySuccess } = useNotify();
  const { hospitalName, dateOfDonation, certificateId, donorName } =
    location.state;

  useQuery(
    "getCertificateDetails",
    () => {
      return getByIdApiServices(CERTIFICATE, certificateId || editId);
    },
    {
      enabled: code === codes?.donor || !!certificateId,
      onSuccess: ({ data }) => {
        setValues({ ...data, certificate: data?.certificateUrl });
      },
    }
  );
  const { refetch: uploadCertificate } = useQuery(
    "create",
    () => {
      const payLoad = {
        hospitalName,
        dateOfDonation,
        certificate: values?.certificate,
      };
      return postUpdateApiServices(
        CERTIFICATE,
        editId,
        multiPartFormData(payLoad)
      );
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(CERTIFICATE_LIST);
        notifySuccess(data?.message);
      },
    }
  );
  const { refetch: updateCertificate } = useQuery(
    "create",
    () => {
      const payLoad = {
        hospitalName,
        dateOfDonation,
        certificate: values?.certificate,
      };
      return updateApiServices(
        CERTIFICATE,
        certificateId,
        multiPartFormData(payLoad)
      );
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(CERTIFICATE_LIST);
        notifySuccess(data?.message);
      },
    }
  );

  const downloadCertificate = () => {
    const anchor = document.createElement("a");
    anchor.href = values?.certificateUrl;
    anchor.download = "downloaded-certificate.jpg";
    anchor.click();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object({
      certificate: mixed().required("Certificate is required"),
    }),
    onSubmit: certificateId ? updateCertificate : uploadCertificate,
  });
  const { values, errors, touched, setFieldValue, handleSubmit, setValues } =
    formik;

  const handleOnReset = () => {
    navigate(CERTIFICATE_LIST);
  };

  const certificateDetails = [
    { Header: "Donated To", value: hospitalName },
    {
      Header: "Donated Date",
      value: new Date(dateOfDonation).toLocaleDateString(),
    },
    { Header: "Donor name", value: donorName || "" },
  ];

  return (
    <>
      <BackNavigator
        title={
          code === codes?.donor ? "VIEW CERTIFICATE" : "UPLOAD CERTIFICATE"
        }
        navigateTo={CERTIFICATE_LIST}
        disableModes={true}
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {certificateDetails.map((data) => (
                <CardDetails key={data?.donorId} sx={{ margin: "0.5rem 0" }}>
                  <CardTitles>{data?.Header}</CardTitles>
                  <Typography sx={{ marginInline: "5px" }}>-</Typography>
                  {data?.value}
                </CardDetails>
              ))}
            </Grid>
            <Grid item xs={12}>
              <FormTitles>
                {code === codes?.donor
                  ? "Download Certificate"
                  : "Upload Certificate"}
              </FormTitles>
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={3}>
                <Grid item xs={12} md={6}>
                  <CustomFileUpload
                    accept={"image/*"}
                    url={values?.certificateUrl || ""}
                    defaultLabel={values?.certificateName || "Upload Image"}
                    name={"certificate"}
                    type={"Image"}
                    setFieldValue={setFieldValue}
                    errors={errors?.certificate}
                    touched={touched?.certificate}
                    value={values.certificate}
                    disabled={isViewMode || code === codes?.donor}
                    onChange={(e) => {
                      setFieldValue("certificate", e.target.files[0]);
                    }}
                  />
                </Grid>
                {code === codes?.donor ? (
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: 2,
                    }}
                  >
                    <IconButton onClick={downloadCertificate}>
                      <DownloadIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
            <FormActions
              isViewMode={code === codes?.donor}
              handleOnReset={handleOnReset}
              handleSubmit={handleSubmit}
              isUpdate={!!certificateId}
            />
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Form;
