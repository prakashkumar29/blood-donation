import { Modal, Typography, styled, useMediaQuery } from "@mui/material";
import React from "react";
import {
  CancelButton,
  FilterButtonModal,
  FilterContainerStyle,
  FilterTitle,
  SubmitButton,
} from "../../styles";
import CloseIcon from "@mui/icons-material/Close";
import { CANCEL } from "../../constants/globalConstants";
import { useQuery } from "react-query";
import { updateApiServices } from "../../api/api";
import { updateAcceptedStatus } from "../../api/apiPaths";
import useNotify from "../../utils/useNotify";
import { useTheme } from "@emotion/react";

const Content = styled("div")(({ theme }) => {
  return {
    fontSize: "1.25rem",
    padding: "2%",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      padding: "10px 20px",
    },
  };
});

const CustomAcceptModal = ({ modalTitle, id, open, handleClose, handleRefetch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  const { notifySuccess } = useNotify();

  const { refetch: handleSubmit } = useQuery(
    "updatedAcceptedStatus",
    () => {
      return updateApiServices(updateAcceptedStatus, id, {
        accepted: false,
      });
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        if(handleRefetch) handleRefetch();
        handleClose();
      },
    }
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <FilterContainerStyle>
        <FilterTitle>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#fff", fontSize: isMobile && "16px" }}
          >
            {modalTitle}
          </Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </FilterTitle>
        <Content>Are you sure you want to reject ?</Content>
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
            REJECT
          </SubmitButton>
        </FilterButtonModal>
      </FilterContainerStyle>
    </Modal>
  );
};

export default CustomAcceptModal;
