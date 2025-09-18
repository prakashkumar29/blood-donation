import { Grid, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  CancelButton,
  FilterButtonModal,
  FilterContainerStyle,
  FilterTitle,
  SubmitButton,
} from "../../styles";
import CloseIcon from "@mui/icons-material/Close";
import { CANCEL, UPDATE } from "../../constants/globalConstants";
import { useQuery } from "react-query";
import { updateApiServices } from "../../api/api";
import useNotify from "../../utils/useNotify";
import { updateDonatedStatus } from "../../api/apiPaths";
import { CustomDatePicker } from "./formFields/CustomDatePicker";
import { useFormik } from "formik";

export const getCurrentDate = (donateDate) => {
  const date = !donateDate ? new Date() : new Date(donateDate);
  return `${date.getFullYear()}-${
    date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
  }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
};

const CustomDonatedModal = ({
  open,
  handleClose,
  modalTitle,
  id,
  donatedDate,
  handleRefetch
}) => {
  
  const { notifySuccess } = useNotify();
  const { refetch: updateStatus } = useQuery(
    "updateDonatedStatus",
    () =>
      updateApiServices(updateDonatedStatus, id, {
        donatedDate: getCurrentDate(values?.donatedDate),
        donated: true,
      }),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        if(handleRefetch) handleRefetch();
        handleClose();
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      donated: true,
      donatedDate: !donatedDate ? new Date() : donatedDate,
    },
    onSubmit: updateStatus,
  });
  const { values, handleSubmit, setValues, setFieldValue } = formik;
  useEffect(() => {
    setValues({
      donatedDate: !donatedDate ? new Date() : donatedDate,
    });
  }, [open]); // eslint-disable-line
  return (
    <Modal open={open} onClose={handleClose}>
      <FilterContainerStyle>
        <FilterTitle>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#fff" }}
          >
            {modalTitle}
          </Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </FilterTitle>
        <Grid
          container
          columnSpacing={4}
          rowSpacing={3}
          style={{
            display: "flex",
            alignItems: "center",
            margin: 0,
          }}
        >
          <Grid item xs={8} md={4}>
            <CustomDatePicker
              label="Donated Date"
              setTouced={() => {}}
              onChange={(value) => {
                setFieldValue(
                  "donatedDate",
                  value?.$d ? new Date(value?.$d) : null
                );
              }}
              value={values.donatedDate}
              maxDate={new Date()}
            />
          </Grid>
        </Grid>
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
            {UPDATE}
          </SubmitButton>
        </FilterButtonModal>
      </FilterContainerStyle>
    </Modal>
  );
};

export default CustomDonatedModal;
