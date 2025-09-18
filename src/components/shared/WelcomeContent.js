import React from "react";
import { InnerContainer, LoginPageHeading } from "../../styles";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const WelcomeContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  return (
    <InnerContainer sx={{ display: isMobile ? "none" : "flex" }}>
      <LoginPageHeading>Welcome to</LoginPageHeading>
      <LoginPageHeading>Blood Donation Camp</LoginPageHeading>
    </InnerContainer>
  );
};

export default WelcomeContent;
