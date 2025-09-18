import React, { useEffect } from "react";
import {
  InnerContainer,
  PageLayout,
  OuterContainer,
  CustomSubmitButton,
  SetPasswordHeading,
} from "../../../styles";
import { CustomPasswordField } from "../../shared";
import { useFormik } from "formik";
import { validationSchema } from "../../../validations/login/setPassword";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LOGIN } from "../../../routes/routePaths";
import { useQuery } from "react-query";
import { updateApiServices } from "../../../api/api";
import { forgotPassword, setPassword } from "../../../api/apiPaths";
import useNotify from "../../../utils/useNotify";
import WelcomeContent from "../../shared/WelcomeContent";

const SetPassword = () => {
  const { state } = useLocation();
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();

  const { refetch: setNewPassword } = useQuery(
    "setPassword",
    () => {
      return updateApiServices(setPassword, state?.userId, formik.values);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(LOGIN, {
          state: { mobileNo: state?.mobileNo, visible: true },
        });
        notifySuccess(data?.message);
      },
    }
  );

  const { refetch: resetPassword } = useQuery(
    "resetPassword",
    () => {
      return updateApiServices(forgotPassword, state?.userId, formik.values);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(LOGIN, {
          state: { mobileNo: state?.mobileNo, visible: true },
        });
        notifySuccess(data?.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: state?.forgot ? resetPassword : setNewPassword,
  });

  const { values, touched, handleBlur, handleChange, handleSubmit, errors } =
    formik;

  const handleBack = () => {
    navigate(LOGIN, { state: { mobileNo: state.mobileNo } });
  };

  const handleBrowserBack = (e) => {
    navigate(LOGIN);
  };

  useEffect(() => {
    window.addEventListener("popstate", handleBrowserBack);
    return () => {
      window.removeEventListener("popstate", handleBrowserBack);
    };
  }, []); // eslint-disable-line

  return (
    <OuterContainer>
      <PageLayout>
        <WelcomeContent />
        <InnerContainer sx={{ gap: "15px" }}>
          <SetPasswordHeading>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            {state?.forgot ? "Reset" : "Create"} Password
          </SetPasswordHeading>
          <CustomPasswordField
            variant="standard"
            label="Password *"
            name="password"
            showEyeIcon={true}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.password}
            touched={touched.password}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
          />
          <CustomPasswordField
            variant="standard"
            label="Confirm Password *"
            name="confirmPassword"
            showEyeIcon={true}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.confirmPassword}
            touched={touched.confirmPassword}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
          />
          <CustomSubmitButton onClick={handleSubmit}>Submit</CustomSubmitButton>
        </InnerContainer>
      </PageLayout>
    </OuterContainer>
  );
};

export default SetPassword;
