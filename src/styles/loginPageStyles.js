import { Box, Button, styled } from "@mui/material";

export const OuterContainer = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffffff",
});

export const PageLayout = styled(Box)({
  height: "80%",
  width: "80%",
  backgroundColor: "#2f37a3",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: "5px",
});

export const InnerContainer = styled(Box)(({ theme }) => {
  return {
    height: "90%",
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
    padding: "3%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
  };
});

export const LoginPageHeading = styled(Box)({
  fontFamily: "Roboto",
  color: "#707070",
  fontSize: "24px",
  fontWeight: "500",
  textTransform: "uppercase",
  letterSpacing: "0.00938em",
});

export const CustomSubmitButton = styled(Button)(({ theme }) => ({
  height: "35px",
  width: "60%",
  backgroundColor: theme.palette.web.loginBtn,
  color: "#fff",
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: "500",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
  borderRadius: "20px",
  textTransform: "none",
  minWidth: "64px",
  "&:hover": {
    backgroundColor: theme.palette.web.loginBtn,
  },
}));

export const CustomLinkContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
});

export const CustomLink = styled(Box)({
  fontSize: "16px",
  fontFamily: "Rubik",
  color: "#2F37A3",
  cursor: "pointer",
});

export const SetPasswordHeading = styled(Box)(({ theme }) => {
  return {
    fontFamily: "Rubik",
    color: "#707070",
    fontSize: "24px",
    fontWeight: "500",
    letterSpacing: "0.00938em",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "40px",
    [theme.breakpoints.down("sm")]: {
      gap: "20px",
      fontSize: "22px",
    },
  };
});

export const LoginHeading = styled("div")(({ visible, theme }) => {
  return {
    width: "100%",
    fontFamily: "Roboto",
    color: "#707070",
    fontSize: "32px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.00938em",
    display: "flex",
    alignItems: "center",
    gap: "27%",
    justifyContent: visible ? "flex-start" : "center",
    [theme.breakpoints.down("sm")]: {
      gap:'12%'
    }
  };
});
