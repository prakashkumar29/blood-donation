import { Box, Button, Modal, Typography, styled } from "@mui/material";
import React from "react";
import useNotify from "../../utils/useNotify";
import { useQuery } from "react-query";
import { postApiServices } from "../../api/api";
import { mapDonarRequest } from "../../api/apiPaths";
import queryString from "query-string";

const CustomModal = styled(Modal)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Content = styled(Box)(({ theme }) => {
  return {
    height: "25%",
    width: "32%",
    maxHeight: "160px",
    maxWidth: "350px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    gap: "22px",
    padding: "20px",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    fontSize: "18px",
    fontWeight: "500",
    color: "#006BBD",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  };
});

const ButtonContainer = styled(Box)({
  width: "100%",
  display: "flex",
  gap: "30px",
  justifyContent: "center",
});

const ConfirmationModal = ({
  open,
  handleClose,
  donorId,
  bloodRequestId,
  handleRefetch,
}) => {
  const { notifySuccess } = useNotify();
  const { refetch: handleMapping } = useQuery(
    "handleMapToDonar",
    () => postApiServices(mapDonarRequest, { donorId, bloodRequestId }),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data?.message);
        const text = data?.messageTemplate;
        const mobile = data?.donorMobile;
        const query = queryString.stringify({ text });
        if (mobile) window.open(`https://wa.me/91${mobile}?${query}`, "_blank");
        if(handleRefetch) handleRefetch();
        handleClose();
      },
      onError: () => {
        handleClose();
      },
    }
  );
  return (
    <CustomModal open={open} onClose={handleClose}>
      <Content>
        <Title>Are you sure to map this donor to request ?</Title>
        <ButtonContainer>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" disableElevation onClick={handleMapping}>
            Ok
          </Button>
        </ButtonContainer>
      </Content>
    </CustomModal>
  );
};

export default ConfirmationModal;
