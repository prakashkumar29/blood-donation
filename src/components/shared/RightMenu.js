import React from "react";
import { Popover as MuiPopper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { RIGHT_SIDE_NAVS } from "../../constants/rightSideMenu";
import { useSelector } from "react-redux";

const PopoverComponent = styled(MuiPopper)({
  "& .MuiPaper-root": {
    minWidth: "150px",
    width: "200px"
  },
});
const Titles = styled(Typography)({
  padding: "14px !important",
  cursor: "pointer !important",
  font: "normal normal normal 16px/19px sans-serif !important",
  color: "#000000 !important",
});

export const RightMenu = ({ open, anchorEl, handleClose, redirect }) => {
  const { code } = useSelector((state) => state?.userInfo);
  return (
    <PopoverComponent
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      {RIGHT_SIDE_NAVS?.map(({ id, label, routePath, type, render }, index) => {
        if (!render)
          return (
            <Titles
              id={id}
              key={index}
              onClick={() => redirect(routePath, type)}
            >
              {label}
            </Titles>
          );
        return (
          render(code) && (
            <Titles
              id={id}
              key={index}
              onClick={() => redirect(routePath, type)}
            >
              {label}
            </Titles>
          )
        );
      })}
    </PopoverComponent>
  );
};
