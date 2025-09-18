import { styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NewFormButton } from "../../styles";
import { NEW } from "../../constants/globalConstants";

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  minHeight: 75,
  marginBottom: 16,
  backgroundColor: "inherit",
  paddingInline: "3%",
  position: "sticky",
  justifyContent: "space-between",
});
const CustomHeader = styled("div")({
  fontSize: 18,
  marginLeft: 15,
  fontFamily: "lato",
  userSelect: "none",
  color: "#00000090",
  fontWeight: "700",
  textTransform: "uppercase",
  marginRight: "auto",
});

function MobileListTopBar({
  title = "Institutions",
  disableNewForm,
  newFormPath = "",
  newButtonLabel = "",
}) {
  const navigate = useNavigate();
  return (
    <Container>
      <CustomHeader>{title}</CustomHeader>
      {!disableNewForm && (
        <NewFormButton disableElevation onClick={() => navigate(newFormPath)}>
          {newButtonLabel ? newButtonLabel : NEW}
        </NewFormButton>
      )}
    </Container>
  );
}

export default MobileListTopBar;
