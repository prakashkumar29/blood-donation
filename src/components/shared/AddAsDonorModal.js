import {
  Box,
  Grid,
  Modal,
  Paper,
  Typography,
  createTheme,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import {
  CancelButton,
  FilterButtonModal,
  FilterContainerStyle,
  FilterTitle,
  SubmitButton,
} from "../../styles";
import CloseIcon from "@mui/icons-material/Close";
import { CANCEL, OKAY } from "../../constants/globalConstants";
import useNotify from "../../utils/useNotify";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { setUserInfo } from "../../redux/slice";
import { appApi } from "../../api/config";
import { ADD_AS_DONOR } from "../../api/apiPaths";

const CustomTitle = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  marginRight: 20,
  cursor: "pointer",
  border: "1px solid #fff",
  padding: "8px 10px",
  backgroundColor: "#fff",
  borderRadius: 3,
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
    padding: "5px 10px",
  },
}));
const ModalName = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  width: 100,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));
const PromptText = styled(Typography)(({ theme }) => ({
  margin: "2rem 0",
  fontSize: 20,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "80%",
  },
}));
const theme = createTheme();
function AddAsDonorModal() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { notifySuccess } = useNotify();
  const dispatch = useDispatch();
  const { refetch: addAsDonor } = useQuery(
    "assAsDonor",
    () => appApi.put(ADD_AS_DONOR),
    {
      enabled: false,
      onSuccess: (data) => {
        notifySuccess(data?.data?.message);
        dispatch(setUserInfo({ isDonor: true }));
        handleClose();
      },
    }
  );
  return (
    <>
      <CustomTitle onClick={handleOpen} component={isMobile ? Paper : ""}>
        Add me as donor
      </CustomTitle>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilterContainerStyle>
          <FilterTitle>
            <ModalName
              id="modal-modal-title"
              sx={{ color: "#fff", width: "auto" }}
            >
              Add as donor
            </ModalName>
            <CloseIcon
              onClick={handleClose}
              fontSize={isMobile ? "medium" : "large"}
              style={{ cursor: "pointer" }}
            />
          </FilterTitle>
          <Grid
            container
            columnSpacing={4}
            rowSpacing={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: 0,
              [theme.breakpoints.down("sm")]: {
                maxWidth: "80%",
              },
            }}
          >
            <PromptText>Are you sure want to be as a donor ?</PromptText>
          </Grid>
          <FilterButtonModal sx={{ justifyContent: "center" }}>
            <CancelButton
              sx={{ px: 3 }}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            >
              {CANCEL}
            </CancelButton>
            <SubmitButton
              variant="contained"
              type="submit"
              sx={{ px: 3 }}
              onClick={addAsDonor}
            >
              {OKAY}
            </SubmitButton>
          </FilterButtonModal>
        </FilterContainerStyle>
      </Modal>
    </>
  );
}

export default AddAsDonorModal;
