import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { CustomSwitch, CustomTextField } from "../../shared";
import { getApiServices, updateWithoutIDApiServices } from "../../../api/api";
import { getGeneralParam, updateGeneralparams } from "../../../api/apiPaths";
import { SubmitButton } from "../../../styles";
import useNotify from "../../../utils/useNotify";
import { validationSchema } from "../../../constants/parameter";

export const Styledontainer = styled(Paper)((p) => ({
  width: `${p.formWidth ? p.formWidth : "70%"}`,
  margin: "30px auto",
  padding: "40px",
  borderRadius: "4px",
  boxSizing: "border-box",
  backgroundColor: `white`,
}));

const GlobalParametersSwitch = ({ data }) => {
  const formik = useFormik({
    initialValues: {
      CanWeApproveUserByDefault: true,
      dedicativeWhatsappNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => addParams(),
  });

  const { notifySuccess } = useNotify();

  const {
    values,
    handleSubmit,
    setFieldValue,
    setValues,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = formik;

  const { refetch: addParams } = useQuery(
    "add",
    () => {
      return updateWithoutIDApiServices(updateGeneralparams, {
        CanWeApproveUserByDefault: !!values?.CanWeApproveUserByDefault,
        dedicativeWhatsappNumber: values.dedicativeWhatsappNumber
      });
    },
    {
      onSuccess: ({ data }) => {
        notifySuccess("Updated Successfully");
      },
      enabled: false,
    }
  );
  useQuery(["getProd"], () => getApiServices(getGeneralParam), {
    onSuccess: ({ data }) => {
      setValues(data?.[0]);
    },
  });

  return (
    <Box>
      <Styledontainer>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12}>
            <CustomSwitch
              name="CanWeApproveUserByDefault"
              label={"Can we approve user by default"}
              onChange={(e) => {
                setFieldValue("CanWeApproveUserByDefault", e.target.checked);
              }}
              value={values.CanWeApproveUserByDefault}
              checked={Boolean(values.CanWeApproveUserByDefault)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Dedicative Mobile Number"
              name="dedicativeWhatsappNumber"
              type="number"
              value={values.dedicativeWhatsappNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.dedicativeWhatsappNumber}
              errors={errors.dedicativeWhatsappNumber}
              maxLength={10}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex ", justifyContent: "flex-end" }}
          >
            <SubmitButton variant="outlined" onClick={() => handleSubmit()}>
              {"SUBMIT"}
            </SubmitButton>
          </Grid>
        </Grid>
      </Styledontainer>
    </Box>
  );
};

export default GlobalParametersSwitch;
