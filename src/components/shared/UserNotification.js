import React from "react";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Stack } from "@mui/material";
import { notifyUser } from "../../redux/slice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UserNotification = () => {
  const dispatch = useDispatch();
  const toastMessageState = useSelector((state) => state.snackBar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notifyUser(null));
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={!!toastMessageState}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toastMessageState.severity}
          sx={{ width: "100%" }}
          vertical="top"
          horizontal="right"
        >
          {toastMessageState.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
