import React from "react";
import { styled, useMediaQuery } from "@mui/material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FilterModal } from "./FilterModal";
import { NewFormButton, StyledTooltip } from "../../styles";
import { CustomSearchField } from "./CustomSearchField";
import { NEW } from "../../constants/globalConstants";

const Container = styled(Box)(({ theme }) => ({
  height: 80,
  width: "89.8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginLeft: "5%",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
    height: 50,
    paddingInline: "3%",
    position: "sticky",
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 0,
  },
}));
const ContianerAlign = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const Title = styled(Typography)({
  color: "#006BBD",
  textTransform: "uppercase",
  fontFamily: "Lato",
  fontWeight: "700",
});
const IconsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const NewButton = styled(Button)(({ theme }) => ({
  padding: "7px 15px",
  minWidth: 0,
  marginLeft: "8px",
  background: theme.palette.web.new,
  color: "#fff",
  "&:hover": {
    background: theme.palette.success.main,
  },
}));
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

export function ListTopbar(props) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const {
    label,
    disableSearchField,
    disableFilter,
    disableNewForm,
    newFormPath,
    listPath,
    additionalCompontent,
    filterFields,
    filterFieldInitial,
    newButtonLabel,
  } = { ...props };

  return (
    <Container>
      {isMobile ? (
        <>
          <CustomHeader>{label}</CustomHeader>
          {!disableNewForm && (
            <NewFormButton
              disableElevation
              onClick={() => navigate(newFormPath)}
            >
              {newButtonLabel ? newButtonLabel : NEW}
            </NewFormButton>
          )}
        </>
      ) : (
        <ContianerAlign>
          <Title variant="h6">{label}</Title>
          <IconsContainer>
            {!disableSearchField && <CustomSearchField />}
            {additionalCompontent ? additionalCompontent : <></>}
            {!disableFilter && (
              <FilterModal
                listPath={listPath}
                filterFields={filterFields}
                filterFieldInitial={filterFieldInitial}
              />
            )}
            {!disableNewForm && (
              <StyledTooltip title="New Form" arrow>
                {newFormPath ? (
                  <NewButton
                    disableElevation
                    onClick={() => navigate(newFormPath)}
                  >
                    {newButtonLabel ? newButtonLabel : NEW}
                  </NewButton>
                ) : (
                  <></>
                )}
              </StyledTooltip>
            )}
          </IconsContainer>
        </ContianerAlign>
      )}
    </Container>
  );
}
