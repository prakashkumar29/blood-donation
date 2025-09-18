import { Grid, Modal, Typography, styled, useMediaQuery } from "@mui/material";
import React from "react";
import {
  CancelButton,
  FilterButtonModal,
  FilterContainerStyle,
  FilterTitle,
  SubmitButton,
} from "../../styles";
import CloseIcon from "@mui/icons-material/Close";
import { CANCEL, OKAY, UPDATE } from "../../constants/globalConstants";
import { CustomTextField } from "./formFields/CustomTextField";
import { useFormik } from "formik";
import { CustomSelectField } from "./formFields/CustomSelectField";
import { useSeeds } from "../../utils/useSeeds";
import { useQuery } from "react-query";
import { updateApiServices, updateByIdServices } from "../../api/api";
import useNotify from "../../utils/useNotify";

const ModalName = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  width: 100,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));
const GridContainer = styled(Grid)({
  display: "flex",
  alignItems: "center",
  margin: 0,
});
const PromptText = styled(Typography)(({ theme }) => ({
  margin: "2rem 5%",
  fontSize: 20,
  width: "90%",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "80%",
  },
}));

function UpdateModal({
  open,
  handleClose,
  id,
  updateFields,
  initialValues = {},
  seedType,
  seedValues = [],
  updatePath = "",
  patchPath = "",
  propmptMessage = "",
  refetch,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const seeds = useSeeds(seedType);
  const { notifySuccess } = useNotify();
  const { refetch: updateData } = useQuery(
    "update",
    () =>
      patchPath
        ? updateByIdServices(patchPath, id)
        : updateApiServices(updatePath, id, values),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        refetch && refetch();
        handleClose();
      },
    }
  );
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: updateData,
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilterContainerStyle>
          <FilterTitle>
            <ModalName id="modal-modal-title" sx={{ color: "#fff" }}>
              Update
            </ModalName>
            <CloseIcon
              onClick={handleClose}
              fontSize={isMobile ? "medium" : "large"}
              style={{ cursor: "pointer" }}
            />
          </FilterTitle>
          <GridContainer container columnSpacing={4} rowSpacing={3}>
            {propmptMessage ? <PromptText>{propmptMessage}</PromptText> : <></>}
            {updateFields &&
              updateFields.map((field, index) => {
                if (field?.fieldType === "select")
                  return (
                    <Grid item xs={isMobile ? 10 : field?.xs || 6} key={index}>
                      <CustomSelectField
                        variant="filled"
                        label={field?.label}
                        name={field.name}
                        onChange={handleChange}
                        value={values[field.name] || ""}
                        inputValues={seeds || []}
                      />
                    </Grid>
                  );
                return (
                  <Grid item xs={isMobile ? 12 : field?.xs || 6} key={index}>
                    <CustomTextField
                      label={field?.label}
                      name={field.name}
                      onChange={handleChange}
                      value={values[field.name] || ""}
                      variant="filled"
                    />
                  </Grid>
                );
              })}
          </GridContainer>
          <FilterButtonModal>
            <CancelButton
              sx={{ px: 3 }}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            >
              {CANCEL}
            </CancelButton>
            <SubmitButton
              variant="contained"
              type="submit"
              sx={{ px: 3 }}
              onClick={handleSubmit}
            >
              {propmptMessage ? OKAY : UPDATE}
            </SubmitButton>
          </FilterButtonModal>
        </FilterContainerStyle>
      </Modal>
    </>
  );
}

export default UpdateModal;
