import styled from "@emotion/styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { setCookie } from "../../constants/globalConstants";

const StyledModal = styled(Modal)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Content = styled("div")(({ theme }) => {
  return {
    height: "auto",
    width: "30%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "8px",
    padding: "20px",
    gap: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  };
});

// const StyledTitle = styled(Typography)({
//   width: "100%",
//   fontSize: "24px",
//   letterSpacing: "1px",
//   fontWeight: "500",
//   display: "flex",
//   justifyContent: "flex-start",
// });

const StyledDescription = styled(Typography)(({ theme }) => {
  return {
    width: "100%",
    fontSize: "18px",
    paddingLeft: "7%",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
  };
});

const RolesContainer = styled(Box)({
  width: "100%",
  height: "auto",
  gap: "20px",
  justifyContent: "center",
  paddingTop: "5px",
  display: "flex",
  flexWrap: "wrap",
});

const RoleModal = ({ open, handleClose, roles, handleBack }) => {
  const setRole = (id) => {
    setCookie("roleId", id);
    handleClose();
  };

  return (
    <StyledModal open={open} onClose={handleBack}>
      <Content>
        <StyledDescription>
          Choose any one of your role
        </StyledDescription>
        <RolesContainer>
          {roles?.map(({ id, role }, index) => (
            <Button key={index} onClick={() => setRole(id)} variant="outlined">
              {role}
            </Button>
          ))}
        </RolesContainer>
      </Content>
    </StyledModal>
  );
};

export default RoleModal;
