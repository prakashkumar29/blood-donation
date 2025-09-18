import styled from "@emotion/styled";

export const Container = styled("div")({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SignUpFormContainer = styled("div")(({ theme }) => {
  return {
    height: "90%",
    width: "37%",
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    borderRadius: "2%",
    padding: "0% 2%",
    paddingBottom: "2%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "5px",
      height: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#6E6E6E60",
      borderRadius: 5,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "90%",
      boxShadow: "none",
      padding: "0px 0px 30px 0px",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  };
});

export const FormHeading = styled("div")(({ theme }) => {
  return {
    width: "100%",
    display: "flex",
    fontSize: "24px",
    fontWeight: "500",
    gap: "28%",
    alignItems: "center",
    marginBottom: "20px",
    position: "sticky",
    top: "0",
    backgroundColor: "#fff",
    zIndex: "10",
    color: "#066BBd",
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      gap: "20%",
    },
  };
});
