import { Box, IconButton, styled } from "@mui/material";
import React from "react";
import { globalIcons } from "../../constants/globalConstants";

const StyledIconButton = styled(IconButton)(({ disabled }) =>
  disabled
    ? {
        "&.MuiButtonBase-root .MuiSvgIcon-root": {
          color: "inherit",
        },
      }
    : {}
);
function EditDeleteButtons({ menuDetails, props, isEditing }) {
  return (
    <Box style={{ display: "flex" }}>
      {menuDetails &&
        menuDetails?.map((menu) => (
          <StyledIconButton
            disabled={isEditing}
            key={menu?.label}
            onClick={() => {
              menu?.action && menu?.action(props?.row?.index);
            }}
            sx={{ color: "grey" }}
          >
            {menu?.type ? globalIcons?.[menu?.type] : menu?.label}
          </StyledIconButton>
        ))}
    </Box>
  );
}

export default EditDeleteButtons;
