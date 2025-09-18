import { Box, Button, IconButton, styled } from "@mui/material";
import MuiDeleteIcon from "@mui/icons-material/Delete";
import MuiEditIcon from "@mui/icons-material/Edit";

export const StyledButtonContainer = styled(Box)((props) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  ...props?.style,
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: "0 8px",
  marginRight: "20px !important",
  fontWeight: "bold",
  border: `1px solid ${theme.palette.primary.main}`,
  height: "36px",
  "&:hover": {
    background: "#fff",
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "white",
  margin: "0 8px",
  height: "36px",
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  marginLeft: 15,
  height: 40,
  backgroundColor: theme.palette.success.main,
  color: "#fff",
  float: "right",
  cursor: "pointer",
  "&:hover": {
    color: "#fff",
    backgroundColor: theme.palette.success.main,
  },
}));
export const AddIconButton = styled(IconButton)({
  width: 40,
  height: 40,
  backgroundColor: "red",
  borderRadius: "50%",
  color: "#fff",
  marginInline: "auto",
});

export const DeleteIcon = styled(MuiDeleteIcon)({
  width: 30,
  height: 30,
  color: "red",
});
export const EditIcon = styled(MuiEditIcon)({
  width: 30,
  height: 30,
  color: "orange",
});
export const NewFormButton = styled(Button)(({ theme, disable = false }) => ({
  backgroundColor: JSON.parse(disable) ? "#dddddd" : theme.palette.primary.main,
  borderRadius: "4px",
  color: "#FFFFFF",
  fontFamily: "'Roboto', sans-serif",
  fontSize: "16px",
  boxShadow: "0px 2px 4px #00000033",
  height: "42px",
  margin: "0px 10px",
  ":hover": {
    backgroundColor: JSON.parse(disable)
      ? "#dddddd"
      : theme.palette.primary.main,
  },
  [theme.breakpoints.down("sm")]: {
    height: "32px",
    marginRight: 16,
  },
}));
