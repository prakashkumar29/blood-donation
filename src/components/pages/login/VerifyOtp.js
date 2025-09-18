import React, { useEffect, useState } from "react";
import {
  CustomLink,
  CustomLinkContainer,
  CustomSubmitButton,
  InnerContainer,
  OuterContainer,
  PageLayout,
  SetPasswordHeading,
} from "../../../styles/index";
import { CustomTextField } from "../../shared";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import firebase from "../../../firebase/firebase";
import { useFormik } from "formik";
import { object, string } from "yup";
import { LOGIN, SET_PASSWORD } from "../../../routes/routePaths";
import useNotify from "../../../utils/useNotify";
import WelcomeContent from "../../shared/WelcomeContent";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../../redux/slice";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(30);
  const [captchaTrigger, setCaptchaTrigger] = useState(true);
  const auth = getAuth(firebase);
  const { notifyError, notifySuccess } = useNotify();
  const dispatch = useDispatch();

  const captchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
        defaultCountry: "IN",
      },
      auth
    );
  };

  const onSignInSubmit = () => {
    if (captchaTrigger) {
      captchaVerify(auth);
    }
    const phoneNumber = `+91${state?.mobileNo}`;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        notifySuccess("OTP Send Succesfuly");
      })
      .catch((error) => {
        notifyError("Can't Send OTP Something went wrong");
      });
    setCaptchaTrigger(false);
  };

  const verifyCode = () => {
    dispatch(setIsLoading(true));
    window.confirmationResult
      .confirm(values.otp)
      .then((result) => {
        notifySuccess("Successfully verified");
        dispatch(setIsLoading(false));
        navigate(SET_PASSWORD, { state });
      })
      .catch((error) => {
        notifyError("Invalid OTP");
        dispatch(setIsLoading(false));
      });
  };
  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: object({
      otp: string()
        .length(6, "OTP should be 6 digits")
        .required("OTP is Required *"),
    }),
    onSubmit: verifyCode,
  });

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    formik;

  useEffect(() => {
    setTimeout(onSignInSubmit, 1000);
  }, []); // eslint-disable-line

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleBack = () => {
    navigate(LOGIN, { state: { ...state, visible: true } });
  };

  const handleResend = () => {
    setSeconds(30);
    onSignInSubmit();
  };

  return (
    <OuterContainer>
      <PageLayout>
        <WelcomeContent />
        <InnerContainer sx={{ gap: "20px" }}>
          <SetPasswordHeading>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            OTP Verification
          </SetPasswordHeading>
          <CustomTextField
            variant="standard"
            type="number"
            name="otp"
            label="Enter OTP"
            value={values.otp}
            errors={errors.otp}
            touched={touched.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            onkeydown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
            maxLength={6}
          />
          <CustomLinkContainer>
            {seconds === 0 ? (
              <CustomLink onClick={handleResend}>Resend Code</CustomLink>
            ) : (
              <CustomLink>
                00 : {seconds < 10 ? "0" + seconds : seconds}
              </CustomLink>
            )}
          </CustomLinkContainer>
          <CustomSubmitButton onClick={handleSubmit}>Submit</CustomSubmitButton>
          <div id="recaptcha-container" style={{ display: "none" }}></div>
        </InnerContainer>
      </PageLayout>
    </OuterContainer>
  );
};

export default VerifyOtp;
