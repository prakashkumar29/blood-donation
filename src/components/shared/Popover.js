import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Popover as MuiPopover } from "@mui/material";

export function Popover({
  menuItems,
  anchorEl,
  onClose,
  open,
  menuAction,
  anchorOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "left",
  },
  popoverStyle = {},
  popoverItemStyle = {},
}) {
  const navigate = useNavigate();
  const handleMenuClick = (menu) => () => {
    menu?.navigateTo && navigate(menu?.navigateTo);
    menuAction && menuAction();
    onClose();
  };
  return (
    <MuiPopover
      component={"div"}
      onClose={onClose}
      anchorEl={anchorEl}
      open={open}
      style={popoverStyle}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {menuItems.map((item) => (
        <Typography
          key={item?.name}
          style={popoverItemStyle}
          onClick={handleMenuClick(item)}
        >
          {item?.name}
        </Typography>
      ))}
    </MuiPopover>
  );
}
