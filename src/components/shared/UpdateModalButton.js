import { Box, Paper, styled, useMediaQuery } from "@mui/material";
import React from "react";
const CustomTitle = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "45%",
    fontSize: 12,
    padding: "6px 5px",
    textOverflow: "ellipsis",
  },
}));

function UpdateModalButton({
  onClick,
  handleOpen,
  title,
  id,
  updateFieldsIndex = -1,
  initialValues,
  seedType,
  updatePath = "",
  patchPath = "",
  propmptMessage = "",
  inititialValueKeys,
  data,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <CustomTitle
      onClick={() => {
        handleOpen();
        onClick({
          id,
          updateFieldsIndex,
          initialValues,
          seedType,
          updatePath,
          patchPath,
          propmptMessage,
        });
      }}
      component={isMobile ? Paper : ""}
    >
      {title}
    </CustomTitle>
  );
}

export default UpdateModalButton;
