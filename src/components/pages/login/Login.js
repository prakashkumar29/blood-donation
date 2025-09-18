import React, { useEffect, useState } from "react";
import {
  PageLayout,
  OuterContainer,
  InnerContainer,
  CustomSubmitButton,
  CustomLink,
  CustomLinkContainer,
  LoginHeading,
} from "../../../styles";
import { CustomPasswordField, CustomTextField } from "../../shared/index";
import { useFormik } from "formik";
import { getValidationSchema } from "../../../validations/login/logins";
import { useQuery } from "react-query";
import { getByIdApiServices, postApiServices } from "../../../api/api";
import { login, verifyWithMobile } from "../../../api/apiPaths";
import { getCookie, setCookie } from "../../../constants/globalConstants";
import { useLocation, useNavigate } from "react-router";
import {
  LAYOUT,
  SIGN_UP,
  VERIFY_OTP,
} from "../../../routes/routePaths";
import useNotify from "../../../utils/useNotify";
import RoleModal from "../../shared/RoleModal";
import WelcomeContent from "../../shared/WelcomeContent";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@emotion/react";

export default function Login() {
  const isMobile = useTheme().breakpoints.down("670");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { notifySuccess, notifyError } = useNotify();

  const handleLogin = () => {
    if (!visible) verifyUser();
    else loginUser();
  };

  const handleBack = () => {
    setVisible(false);
    setFieldValue("password", "");
    handleClose();
  };

  const handleSignup = () => {
    navigate(SIGN_UP);
  };

  const handleVerification = (data) => {
    const { roles = [], isApproved } = data;
    setCookie("roleId", roles[0]?.id);
    if(!Boolean(isApproved)){
      notifyError("You are not approved yet");
      return;
    }
    if (!data?.newUser) {
      setVisible(true);
      if (roles?.length > 1) handleOpen();
    } else {
      navigate(VERIFY_OTP, {
        state: { userId: data?.id, mobileNo: data?.mobileNo },
      });
    }
  };

  const formik = useFormik({
    initialValues: { mobileNo: "", password: "" },
    validationSchema: getValidationSchema(visible),
    onSubmit: handleLogin,
  });

  const {
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = formik;

  const { data: userInfo, refetch: verifyUser } = useQuery(
    "verify",
    () => getByIdApiServices(verifyWithMobile, values.mobileNo),
    {
      enabled: false,
      onSuccess: ({ data }) => handleVerification(data),
    }
  );

  const { refetch: loginUser } = useQuery(
    "login",
    () => postApiServices(login, { ...values, roleId: getCookie("roleId") }),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setCookie("token", data?.token);
        setCookie("refreshToken", data?.refreshToken);
        navigate(LAYOUT);
        notifySuccess("LoggedIn successfully");
      },
    }
  );

  const handleForgotPassword = () => {
    navigate(VERIFY_OTP, {
      state: {
        userId: userInfo?.data.id || state?.userId,
        forgot: true,
        mobileNo: userInfo?.data.mobileNo || state?.mobileNo,
      },
    });
  };

  useEffect(() => {
    if (getCookie("token")) navigate(LAYOUT);
    if (state?.mobileNo) setFieldValue("mobileNo", state?.mobileNo);
    if (state?.visible) setVisible(true);
  }, []); // eslint-disable-line

  return (
    <OuterContainer>
      <PageLayout>
        <WelcomeContent />
        <InnerContainer sx={{ gap: "15px" }}>
          <LoginHeading visible={visible}>
            {visible ? (
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <></>
            )}
            Login
          </LoginHeading>
          <CustomTextField
            variant="standard"
            type="number"
            label="Mobile Number *"
            name="mobileNo"
            value={values.mobileNo}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.mobileNo}
            touched={touched.mobileNo}
            maxLength={10}
            onkeydown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
            isViewMode={visible}
          />
          {visible && (
            <>
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
              <CustomLinkContainer>
                <CustomLink
                  onClick={handleForgotPassword}
                  sx={{ textDecoration: "underline" }}
                >
                  Forgot Password
                </CustomLink>
              </CustomLinkContainer>
            </>
          )}
          <CustomSubmitButton
            onClick={handleSubmit}
            sx={{ marginTop: !isMobile ? "20px" : "10px" }}
          >
            {visible ? "Login" : "Verify"}
          </CustomSubmitButton>
          {!visible ? (
            <CustomLink
              onClick={handleSignup}
              sx={{ textDecoration: "underline" }}
            >
              Register
            </CustomLink>
          ) : (
            <></>
          )}
        </InnerContainer>
      </PageLayout>
      <RoleModal
        open={open}
        handleClose={handleClose}
        roles={userInfo?.data?.roles}
        handleBack={handleBack}
      />
    </OuterContainer>
  );
}
