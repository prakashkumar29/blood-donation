import { IconButton, useMediaQuery, styled } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 75,
  marginBottom: 16,
  backgroundColor: "inherit",
  marginLeft: "7%",
  position: "sticky",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "3%",
    marginBottom: 0,
    minHeight: 60,
  },
}));
const CustomHeader = styled("div")(({ theme }) => {
  return {
    fontSize: 22,
    marginLeft: 15,
    fontFamily: "lato",
    userSelect: "none",
    color: "#066BBd",
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
      fontSize: 19,
      marginLeft: 5,
    },
  };
});
const BackIcon = styled(IconButton)({
  color: "#066BBd",
  fontSize: 22,
});

export function BackNavigator({
  title,
  navigateTo,
  disableModes,
  handleNavigate,
  customTitle,
  disableBack,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const mode = editId ? (isViewMode ? "VIEW" : "EDIT") : "NEW";
  return (
    <Container>
      {disableBack ? (
        <></>
      ) : (
        <BackIcon
          onClick={() => {
            if (handleNavigate) handleNavigate();
            else navigate(navigateTo);
          }}
        >
          {isMobile ? (
            <ArrowBackIosIcon sx={{ fontSize: "19px" }} />
          ) : (
            <ArrowBackIcon />
          )}
        </BackIcon>
      )}
      {customTitle ? (
        <CustomHeader>{customTitle}</CustomHeader>
      ) : (
        <CustomHeader>{disableModes ? title : `${mode} ${title}`}</CustomHeader>
      )}
    </Container>
  );
}
