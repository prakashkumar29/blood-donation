import React from "react";
import { BackNavigator, CustomTextField } from "../../shared/index";
import { USERS_LIST } from "../../../routes/routePaths";
import { FormLayout, StyledFormContainer } from "../../../styles/index";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { initialValues } from "../../../constants/users/institutionUsers";
import { validationSchema } from "../../../validations/users/users";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useNotify from "../../../utils/useNotify";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../api/api";
import { INSTITUTION_USER } from "../../../api/apiPaths";
import { getNeededValues, getTrimmedValues } from "../../../utils/common";
import FormActions from "../../shared/FormActions";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const { id: userId, institutionId } = useSelector((state) => state?.userInfo);
  const { notifySuccess } = useNotify();

  const handleOnReset = () => {
    navigate(USERS_LIST);
  };

  const { refetch: createUser } = useQuery(
    "create",
    () => {
      return postApiServices(INSTITUTION_USER, {
        ...getTrimmedValues(values),
        institutionId: institutionId,
      });
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(USERS_LIST);
        notifySuccess(data?.message);
      },
    }
  );
  const { refetch: updateUser } = useQuery(
    "create",
    () => {
      const neededValues = getNeededValues(values, initialValues);
      return updateApiServices(INSTITUTION_USER, editId, {
        ...getTrimmedValues(neededValues),
        institutionId: userId,
      });
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        navigate(USERS_LIST);
        notifySuccess(data?.message);
      },
    }
  );
  useQuery("user", () => getByIdApiServices(INSTITUTION_USER, editId), {
    enabled: !!editId,
    onSuccess: ({ data }) => {
      setValues(data);
    },
  });

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
    handleSubmit,
  } = formik;

  return (
    <>
      <BackNavigator title="USERS" navigateTo={USERS_LIST} />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item md={6} xs={12}>
              <CustomTextField
                name="name"
                label="User name *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                touched={touched.name}
                errors={errors.name}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                name="mobileNo"
                label="Mobile *"
                type="number"
                maxLength={10}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobileNo}
                touched={touched.mobileNo}
                errors={errors.mobileNo}
                isViewMode={isViewMode}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="address"
                label="Address *"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                touched={touched.address}
                errors={errors.address}
                isViewMode={isViewMode}
              />
            </Grid>
            <FormActions
              isViewMode={isViewMode}
              handleOnReset={handleOnReset}
              handleSubmit={handleSubmit}
              isUpdate={!!editId}
            />
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
};

export default Form;
