import { styled, Paper } from "@mui/material";

export const StyledFormContainer = styled(Paper)(({ theme }) => {
  return {
    width: "60%",
    margin: "0px auto 30px",
    padding: "40px",
    height: "fit-content",
    borderRadius: 10,
    border: "1px solid #00000090",
    boxSizing: "border-box",
    backgroundColor: `white`,
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      padding: "10px",
      border: "none",
      minWidth: "0px"
    },
  };
});
