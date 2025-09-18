import React from "react";
import { BackNavigator, CustomPasswordField } from "../../shared";
import {
  CancelButton,
  StyledButtonContainer,
  StyledFormContainer,
  SubmitButton,
} from "../../../styles";
import { Grid } from "@mui/material";
import { CANCEL, UPDATE, codes } from "../../../constants/globalConstants";
import { useFormik } from "formik";
import { initialValues } from "../../../constants/profile/changepassword";
import { validationSchema } from "../../../validations/profile/changepassword";
import { useQuery } from "react-query";
import { changePassword } from "../../../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROFILE } from "../../../routes/routePaths";
import useNotify from "../../../utils/useNotify";

function ChangePassword() {
  const { id: userId, code } = useSelector((state) => state?.userInfo);
  const navigate = useNavigate();
  const { notifySuccess } = useNotify();

  const { refetch: updatePassword } = useQuery(
    "changePassword",
    () => changePassword(userId, values),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        navigate(
          code === codes?.admin ? PROFILE : `${PROFILE}?viewDetails=true`
        );
      },
    }
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: updatePassword,
  });
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <>
      <BackNavigator
        title="CHANGE PASSWORD"
        disableModes
        navigateTo={
          code === codes?.admin || code === codes?.super_admin
            ? PROFILE
            : `${PROFILE}?viewDetails=true`
        }
      />
      <StyledFormContainer sx={{ width: "40%" }}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12}>
            <CustomPasswordField
              name="oldPassword"
              label={"Old Password*"}
              showEyeIcon
              autoComplete={"off"}
              value={values.oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.oldPassword}
              touched={touched?.oldPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomPasswordField
              name={"password"}
              label={"New Password*"}
              showEyeIcon
              autoComplete={"off"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.password}
              touched={touched?.password}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomPasswordField
              name={"confirmPassword"}
              label={"Confirm Password*"}
              showEyeIcon
              autoComplete={"off"}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.confirmPassword}
              touched={touched?.confirmPassword}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledButtonContainer>
              <>
                <CancelButton
                  onClick={() => {
                    navigate(
                      code === codes?.admin || code === codes?.super_admin
                        ? PROFILE
                        : `${PROFILE}?viewDetails=true`
                    );
                  }}
                >
                  {CANCEL}
                </CancelButton>
                <SubmitButton onClick={handleSubmit}>{UPDATE}</SubmitButton>
              </>
            </StyledButtonContainer>
          </Grid>
        </Grid>
      </StyledFormContainer>
    </>
  );
}

export default ChangePassword;
