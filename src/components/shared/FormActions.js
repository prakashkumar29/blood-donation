import { Grid } from "@mui/material";
import React from "react";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "../../styles";
import { CANCEL, SUBMIT, UPDATE } from "../../constants/globalConstants";

function FormActions({
  isViewMode,
  disableCancel,
  handleOnReset,
  disableSubmit,
  handleSubmit,
  submitLabel = SUBMIT,
  resetLabel = CANCEL,
  isUpdate,
}) {
  return (
    <Grid item xs={12}>
      {isViewMode ? (
        <></>
      ) : (
        <StyledButtonContainer>
          {!disableCancel && (
            <CancelButton variant="outlined" onClick={handleOnReset}>
              {resetLabel}
            </CancelButton>
          )}
          {disableSubmit ? (
            <></>
          ) : (
            <SubmitButton
              variant="outlined"
              disableElevation
              onClick={handleSubmit}
            >
              {isUpdate ? UPDATE : submitLabel}
            </SubmitButton>
          )}
        </StyledButtonContainer>
      )}
    </Grid>
  );
}

export default FormActions;
