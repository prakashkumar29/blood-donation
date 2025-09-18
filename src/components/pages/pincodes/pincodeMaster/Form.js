import React from "react";
import {
  FormContainer,
  FormLayout,
  StyledFormContainer,
} from "../../../../styles/index";
import { BackNavigator, CustomTextField } from "../../../shared/index";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "../../../../validations/pincodes/pincodeMasters";
import { useQuery } from "react-query";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import { pincode, pincodes } from "../../../../api/apiPaths";
import useNotify from "../../../../utils/useNotify";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PINCODE_MASTERS_LIST } from "../../../../routes/routePaths";
import useArraySeeds from "../../../../utils/useArraySeeds";
import FormActions from "../../../shared/FormActions";

const Form = () => {
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const { updateSeed } = useArraySeeds();

  const { refetch: createPincode } = useQuery(
    "createPincode",
    () => {
      const payload = { name: values.name.trim(), code: values.code };
      return editId
        ? updateApiServices(pincode, editId, payload)
        : postApiServices(pincode, payload);
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        navigate(PINCODE_MASTERS_LIST);
        updateSeed(pincodes);
      },
    }
  );

  useQuery("getPincodeById", () => getByIdApiServices(pincode, editId), {
    enabled: !!editId,
    onSuccess: ({ data }) => {
      formik.setValues(data);
    },
  });

  const formik = useFormik({
    initialValues: { name: "", code: "" },
    validationSchema: validationSchema,
    onSubmit: () => createPincode(),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  const handleCancel = () => navigate(PINCODE_MASTERS_LIST);

  return (
    <FormContainer>
      <BackNavigator title="PINCODE MASTER" navigateTo={PINCODE_MASTERS_LIST} />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <CustomTextField
                label="Place Name *"
                name="name"
                value={values.name}
                errors={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isViewMode={state?.viewDetails}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Pincode *"
                name="code"
                type="number"
                value={values.code}
                errors={errors.code}
                touched={touched.code}
                onChange={handleChange}
                onBlur={handleBlur}
                isViewMode={state?.viewDetails}
                maxLength={6}
              />
            </Grid>
            {!state?.viewDetails && (
              <FormActions
                handleOnReset={handleCancel}
                handleSubmit={handleSubmit}
              />
            )}
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </FormContainer>
  );
};

export default Form;
