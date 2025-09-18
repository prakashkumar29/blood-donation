import { Box, Step, StepLabel, Stepper, styled } from "@mui/material";

export const StepperContainer = styled("div")({
  width: "max-content",
  "& > div": {
    position: "sticky",
    top: "80px",
    minWidth: "245px",
    width: "max-content",
  },
});
export const StepperParameterContainer = styled("div")({
  width: "max-content",
  "& > div": {
    position: "sticky",
    top: "64px",
    minWidth: "245px",
    width: "max-content",
  },
});

export const FormContainer = styled("div")(({theme})=>{
  return {
    width: "calc(100% - 200px)",
    [theme.breakpoints.down("sm")]: {
      width:'90%',
      margin:'30px 0px 30px 0px'
    }
  }
});

export const LayoutContainer = styled("div")(({ theme }) => {
  return {
    display: "flex",
    width: "100%",
    padding: "0px 30px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      width:'100vw',
      flexDirection: "column",
      padding:"0px",
      alignItems: "center"
    }
  };
});

export const StepperBox = styled(Box)(({ theme }) => ({
  boxShadow: "0px 1px 3px #00000029",
  backgroundColor: "#fff",
  borderRadius: "4px",
  padding: "12px",
  boxSizing: "border-box",
}));

export const StepperLabelText = styled(StepLabel)(({ theme }) => ({
  padding: "12px 10px",
  ".MuiStepLabel-label": {
    color: "#707070",
    cursor: "pointer",
  },
  ".MuiStepLabel-label.Mui-active": {
    color: `${theme.palette.primary.main}`,
    marginLeft: "2px",
  },
  ".MuiSvgIcon-root.MuiStepIcon-root.Mui-active": {
    color: `${theme.palette.primary.main}`,
    border: `0`,
  },
}));

export const StyledStep = styled(Step)(({ activeStep, theme }) => ({
  backgroundColor: activeStep ? "#E8EDFF" : "#fff",
  boxSizing: "border-box",
  borderRadius: "3px",
  zIndex: activeStep && 999,
}));

export const StyledStepper = styled(Stepper)({
  ".MuiStepConnector-line": {
    borderColor: `#BBDEFB `,
    transform: "translate(39%,-1%) scale(1.7)",
    minHeight: "35px",
    zIndex: 1,
  },
});
