import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const RequestInfo = styled("div")({
  width: "100%",
  height: "auto",
  display: "flex",
  gap: "18px",
  alignItems: "center",
});

export const RequestTitle = styled("div")(({ theme }) => {
  return {
    fontSize: "18px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  };
});

export const RequestValue = styled("div")(({ theme }) => {
  return {
    fontSize: "16px",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  };
});

export const CallHistory = styled("div")({
  fontSize: "22px",
  fontWeight: "500",
  margin: "0px 0 10px 0px",
});

export const CustomTitle = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  fontSize: "16px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "45%",
    fontSize: 12,
    padding: "6px 5px",
    textOverflow: "ellipsis",
  },
}));
