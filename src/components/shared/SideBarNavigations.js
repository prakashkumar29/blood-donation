import React, { useEffect, useState } from "react";
import { Tab, Tabs, styled, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Popover } from "./Popover";
import { SideMenuMobile } from "./SideMenuMobile";

export const CustomTabs = styled(Tabs)({
  minWidth: "17vw",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #9e9e9e",
  borderTop: "none",
  paddingTop: 10,
  padddingBottom: "auto"
});

export const CustomTab = styled(Tab)({
  margin: "5px auto",
  padding: "auto",
  border: "1px solid #006BBD",
  width: "88%",
  height: 40,
  fontSize: 15,
  paddingTop: 12,
  textAlign: "start",
  borderRadius: 3,
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  color: "#006BBD",
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: "#006BBD",
  },
});
const popoverStyle = {
  width: 200,
  marginLeft: 18,
};
export const popoverItemStyle = {
  width: 180,
  height: 50,
  display: "flex",
  alignItems: "center",
  padding: "0.3rem 0.8rem",
  borderBottom: "1px solid #eeeeee",
  cursor: "pointer",
};

export function SideBarNavigations({ menuList }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(menuList[0]);
  const [value, setValue] = useState(menuList[0]?.value);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/")[1];
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (menu) => (event) => {
    menu?.navigateTo && !menu?.options && navigate(menu?.navigateTo);
    if (menu?.options && !isMobile) {
      setAnchorEl(event.currentTarget);
      setActiveMenu(menu);
    }
  };
  const handleTab = (event, value) => {
    if (!pathname.includes(value)) return;
    setValue(value);
  };
  useEffect(() => {
    const currentMenu = menuList.find((menu) => menu?.value === currentPage);
    setValue(currentMenu?.value || false);
  }, [pathname, activeMenu]); // eslint-disable-line
  return isMobile ? (
    <SideMenuMobile menuList={menuList} />
  ) : (
    <CustomTabs orientation="vertical" value={value} onChange={handleTab}>
      {menuList.map((menu) => (
        <CustomTab
          label={menu?.label}
          id={menu?.value}
          value={menu?.value}
          key={menu?.label}
          onClick={handleMenuClick(menu)}
        />
      ))}
      {anchorEl && (
        <Popover
          popoverStyle={popoverStyle}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          menuItems={activeMenu?.options}
          popoverItemStyle={popoverItemStyle}
          onClose={handleClosePopover}
        />
      )}
    </CustomTabs>
  );
}
