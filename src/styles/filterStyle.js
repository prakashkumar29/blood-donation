import { Box, Modal } from "@mui/material";
import { styled } from "@mui/material";
import { theme } from "./theme";

export const FilterModalLayout = styled(Modal)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: "25%",
  overflow: "scroll",
  width: "55%",
  height: "100%",
  backgroundColor: "transparent",
  display: "block",
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
  [theme.breakpoints.down("sm")]: {
    top: "10%",
    width: "80%",
    left: "10%",
  },
}));
export const FilterContainerStyle = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "800px",
  backgroundColor: "white",
  boxShadow: 24,
  outline: 0,
  [theme.breakpoints.down("sm")]: {
    width: "80% !important",
  },
}));

export const FilterFormStyle = styled(Box)({
  maxHeight: 450,
  overflow: "scroll",
  overflowX: "hidden",
  margin: 0,
  padding: 0,
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#6E6E6E60",
    borderRadius: 5,
  },
  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

export const FilterTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  background: `${theme?.palette.primary.main}`,
  color: "white",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 12px",
  },
}));

export const FilterIconButton = styled("span")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#e2e2e2",
  padding: "9px  8px",
  fontSize: 14,
  borderRadius: 4,
  marginRight: "10px",
  cursor: "pointer",
  color: "black",
});

export const FilterButtonModal = styled(Box)({
  margin: 0,
  marginTop: 20,
  padding: "16px",
  boxShadow: "-2px 0px 6px #00000029",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 16px",
  },
});
