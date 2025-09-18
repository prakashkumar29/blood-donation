import React, { useState } from "react";
import { SideMenuDrawer, SideMenuLayout } from "../../styles";
import { IconButton, Typography, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDropDown, ArrowDropUp, Close } from "@mui/icons-material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Popover } from "./Popover";
import {DASHBOARD} from "../../routes/routePaths"

const popoverStyle = {
  position: "absolute",
  left: "-0.5vw",
  "& .MuiPaper-root": {
    backgroundColor: "#ffe2e2",
    boxShadow: "none",
  },
};
const popoverItemStyle = {
  backgroundColor: "#ffe2e2",
  height: 30,
  padding: "5px 10px",
  width: "39.3vw",
};
const SideMenuItems = styled(Typography)({
  backgroundColor: "#ffe2e2",
  height: 30,
  paddingInline: "5%",
  margin: "1% 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export function SideMenuMobile({ menuList }) {
  const [openedMenu, setOpenedMenu] = useState(null);
  const [isMenuOpened, setIsMenuOpened] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuClick = (event) => {
    isMenuOpened ? setIsMenuOpened(null) : setIsMenuOpened(event.currentTarget);
  };
  const handleMenuItemClick = (menu) => (event) => {
    setOpenedMenu(menu);
    if (menu?.navigateTo) {
      navigate(menu?.navigateTo);
      setOpenedMenu(null);
      setIsMenuOpened(null);
    }
    if (menu?.options) setAnchorEl(event.currentTarget);
  };
  const isHomePage = location.pathname === DASHBOARD;
  return (
    isHomePage && (
      <SideMenuLayout>
        <IconButton sx={{ zIndex: 2 }} onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        {isMenuOpened && (
          <SideMenuDrawer
            component={"div"}
            open={!!isMenuOpened}
            onClose={() => {
              setIsMenuOpened(null);
            }}
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
          >
            <SideMenuItems style={{ display: "block" }}>
              <IconButton
                sx={{ float: "right" }}
                onClick={() => {
                  setIsMenuOpened(false);
                }}
              >
                <Close />
              </IconButton>
            </SideMenuItems>
            {menuList &&
              menuList.map((option) => (
                <SideMenuItems
                  key={option?.name}
                  onClick={handleMenuItemClick(option)}
                >
                  {option?.label}
                  {option?.options && (
                    <IconButton>
                      {anchorEl && openedMenu?.page === option?.page ? (
                        <ArrowDropUp />
                      ) : (
                        <ArrowDropDown />
                      )}
                    </IconButton>
                  )}
                </SideMenuItems>
              ))}
          </SideMenuDrawer>
        )}
        {anchorEl && (
          <Popover
            style={popoverStyle}
            anchorEl={anchorEl}
            menuItems={openedMenu?.options || []}
            open={!!anchorEl}
            popoverItemStyle={popoverItemStyle}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            menuAction={() => {
              setIsMenuOpened(null);
            }}
          />
        )}
      </SideMenuLayout>
    )
  );
}
