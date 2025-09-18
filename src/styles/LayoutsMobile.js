import { Drawer, Popover, styled } from "@mui/material";

export const SideMenuLayout = styled("div")({
  position: "absolute",
  left: 10,
  top: 0,
  marginTop: "3%",
  boxSizing: "border-box",
  padding: 0,
  zIndex: 1,
  "& .sideMenuIcon": {
    position: "fixed",
    top: "3vh",
    left: "2vw",
    zIndex: 1,
  },
  "& .active": {
    display: "flex",
  },
  display:'none'
});
export const SideMenuDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    position: "absolute",
    top: 0,
    backgroundColor: theme.palette.app.mobile.secondary,
    borderColor: "#fff",
    boxShadow: "none",
    borderRadius: "0 15px 15px 0",
    width: "47vw",
  },
}));
export const SideMenuPopover = styled(Popover)({
  position: "absolute",
  left: "-3.5vw",
  "& .MuiPaper-root": {
    backgroundColor: "#ffe2e2",
    boxShadow: "none",
  },
});
