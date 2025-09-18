import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import * as Yup from "yup";
import {
  createInstitutionType,
  deleteParam,
  getAllinstitutionType,
  institutionTypes,
  updateInstitutionType,
} from "../../../api/apiPaths";
import {
  deleteApiServices,
  postApiServices,
  updateApiServices,
} from "../../../api/api";
import { CustomTextField, ListingComponent } from "../../shared";
import { DeleteIcon, EditIcon, SubmitButton } from "../../../styles";
import { ParametersFormList } from "../../../constants/parameter";
import useNotify from "../../../utils/useNotify";
import useArraySeeds from "../../../utils/useArraySeeds";

export const Styledontainer = styled(Box)(({ theme }) => {
  return {
    width: "50%",
    height: "auto",
    padding: "30px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    marginLeft: "35px",
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0px",
    },
  };
});

const ListContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  marginLeft: "35px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    margin: 0,
  },
}));
const PaperList = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem 1rem",
  margin: "1rem 0",
});

const GlobalParameters = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  const [id, setId] = useState("");
  const productParamValidation = Yup.object().shape({
    name: Yup.string().trim().required(`Institution type is required`),
  });
  const { notifySuccess, notifyError } = useNotify();
  const { updateSeed } = useArraySeeds();

  const formik = useFormik({
    initialValues: { name: "" },
    onSubmit: () => addParams(),
    validationSchema: productParamValidation,
  });

  const {
    values,
    handleSubmit,
    setFieldValue,
    setValues,
    errors,
    resetForm,
    handleChange,
    touched,
  } = formik;

  const { refetch: addParams } = useQuery(
    "add",
    () => {
      const workData = {
        name: values["name"].replace(/\s+/g, " ").trim(),
        code: values["name"].replace(/\s+/g, "").trim().toLowerCase(),
      };
      return !id
        ? postApiServices(createInstitutionType, workData)
        : updateApiServices(updateInstitutionType, id, workData);
    },
    {
      onSuccess: ({ data }) => {
        updateSeed(institutionTypes);
        !id
          ? notifySuccess(`Institution added successfully`)
          : notifySuccess(`Institution updated successfully`);
        setId("");
        getAllParams();
        setValues({ name: "" });
        resetForm();
      },
      enabled: false,
    }
  );

  const { data: tableData, refetch: getAllParams } = useQuery(
    ["listApiCall"],
    () => postApiServices(getAllinstitutionType)
  );

  const handleEditList = (data) => {
    setId(data.id);
    setFieldValue(`name`, data.name);
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteApiServices(`${deleteParam}/${id}`);
      updateSeed(institutionTypes);
      notifySuccess(data?.data?.message);
      getAllParams();
    } catch (err) {
      notifyError("This parameter is already used");
    }
  };

  return (
    <Box>
      <Styledontainer>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              name={"name"}
              label={`Institution Type*`}
              value={values?.name}
              onChange={handleChange}
              touched={touched?.name}
              errors={errors?.name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex ", justifyContent: "flex-end" }}
          >
            <SubmitButton onClick={() => handleSubmit()}>
              {id !== "" ? "Update" : "Add"}
            </SubmitButton>
          </Grid>
        </Grid>
      </Styledontainer>
      <ListContainer>
        {tableData?.data?.rows?.length ? (
          isMobile ? (
            tableData?.data?.rows.length &&
            tableData?.data?.rows.map((listItem, listIndex) => (
              <PaperList sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Typography fontWeight={500}>
                    {ParametersFormList()[0]?.["Header"]}
                  </Typography>
                  <Typography sx={{ marginInline: "3px" }}>-</Typography>
                  <Typography>
                    {listItem?.[ParametersFormList()[0]?.["accessor"]]}
                  </Typography>
                </Box>
                <Box display="flex" gap="10px">
                  <IconButton
                    onClick={() => handleEditList(listItem)}
                    disabled={!!id}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(listItem?.id)}
                    disabled={!!id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </PaperList>
            ))
          ) : (
            <ListingComponent
              columns={ParametersFormList(handleEditList, handleDelete, id)}
              data={tableData?.data?.rows}
              disableColumnHiding
              disableSort
              disablePagination
              disableLayout
              maxHeight={"200px"}
            />
          )
        ) : (
          <></>
        )}
      </ListContainer>
    </Box>
  );
};

export default GlobalParameters;
