import { useState } from "react";

import {
  FormContainer,
  LayoutContainer,
  StepperBox,
  StepperLabelText,
  StepperParameterContainer,
  StyledStep,
  StyledStepper,
} from "../../../styles/parameters";
import { PARAMETERS, globalParamStepper } from "../../../constants/parameter";
import { ListTopbar } from "../../shared";
import GlobalParametersSwitch from "./globalparamsSwitch";
import GlobalParameters from "./globalParams";
import { Box, styled } from "@mui/material";

const ParameterContainer = styled(Box)(({ theme }) => {
  return {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      overflowY: "scroll",
    },
  };
});

const Layout = () => {

  const [activeStep, setActiveStep] = useState(0);

  const handleOnClick = (value) => {
    setActiveStep(value);
  };

  const formViewer = () => {
    if (activeStep === 1) {
      return <GlobalParametersSwitch />;
    } else {
      return <GlobalParameters />;
    }
  };
  
  return (
    <ParameterContainer>
      <ListTopbar
        disableFilter
        disableSearchField
        disableNewForm
        label={PARAMETERS}
        hideIcon
      />
      <LayoutContainer>
        <StepperParameterContainer>
          <StepperBox>
            <StyledStepper
              activeStep={activeStep}
              orientation="vertical"
              nonLinear
            >
              {globalParamStepper.map((step, index) => (
                <StyledStep key={step.label} activeStep={activeStep === index}>
                  <StepperLabelText
                    key={step.label}
                    onClick={() => {
                      handleOnClick(step.value);
                    }}
                    editParam
                  >
                    {step.label}
                  </StepperLabelText>
                </StyledStep>
              ))}
            </StyledStepper>
          </StepperBox>
        </StepperParameterContainer>
        <FormContainer>{formViewer()}</FormContainer>
      </LayoutContainer>
    </ParameterContainer>
  );
};

export default Layout;
