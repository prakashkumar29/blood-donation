import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { codes, removeCookie } from "../../constants/globalConstants";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setUserInfo } from "../../redux/slice";
import { LOGIN, MY_USERS_LIST, PARAMETERS } from "../../routes/routePaths";
import { getSideMenus } from "../../utils/logins";
import AddAsDonorModal from "./AddAsDonorModal";

const SideMenuContainer = styled("div")({
  height: "100vh",
  width: "250px",
  backgroundColor: "#fff",
});

const MobileSideMenu = () => {
  const [state, setState] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const handleOpen = () => setState(true);
  const handleClose = () => {
    setState(false);
    setExpanded(null);
  };
  const handleChange = (panel) => (event, isExpanded) =>
    setExpanded(isExpanded ? panel : null);
  const navigate = useNavigate();
  const {
    code = "",
    isDonor,
    isInstitution,
  } = useSelector((state) => state?.userInfo);
  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
    setExpanded(null);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("roleId");
    removeCookie("refreshToken");
    dispatch(
      setUserInfo({
        code: "",
        roleId: "",
        name: "",
        id: "",
        profileImageUrl: "",
        emailId: "",
        mobileNo: "",
      })
    );
    navigate(LOGIN);
  };
  const menus = [
    ...getSideMenus(code, isInstitution),
    { label: "Logout", navigateTo: LOGIN, handleLogout },
  ];
  if (code === codes?.admin || code === codes?.super_admin) {
    menus.splice(2, 0, { label: "My User", navigateTo: MY_USERS_LIST });
    menus.splice(3, 0, { label: "Parameters", navigateTo: PARAMETERS });
  }

  return (
    <Box marginRight="5px">
      <IconButton onClick={handleOpen}>
        <MenuIcon sx={{ color: "#fff", fontSize: "28px" }} />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <SideMenuContainer>
          <List sx={{ color: "#23267A" }}>
            {menus?.map((menuItem, index) =>
              menuItem?.navigateTo && !menuItem?.options ? (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      menuItem.handleLogout
                        ? menuItem.handleLogout()
                        : handleNavigate(menuItem?.navigateTo)
                    }
                    sx={{ borderBottom: "1px solid #cacaca" }}
                  >
                    <ListItemText>
                      {menuItem?.label?.toUpperCase()}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ) : (
                <Accordion
                  key={index}
                  sx={{ color: "#23267A" }}
                  expanded={menuItem?.label === expanded}
                  onChange={handleChange(menuItem?.label)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#23267A" }} />}
                  >
                    {menuItem?.label.toUpperCase()}
                  </AccordionSummary>
                  <AccordionDetails>
                    {menuItem?.options?.map((innerMenu, innerIndex) =>
                      innerMenu.navigateTo ? (
                        <ListItem key={innerIndex} disablePadding>
                          <ListItemButton
                            onClick={() =>
                              handleNavigate(innerMenu?.navigateTo)
                            }
                          >
                            <ListItemText>
                              {innerMenu?.name?.toUpperCase()}
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      ) : (
                        <></>
                      )
                    )}
                  </AccordionDetails>
                </Accordion>
              )
            )}
            {code !== codes?.donor && !isDonor && <AddAsDonorModal />}
          </List>
        </SideMenuContainer>
      </SwipeableDrawer>
    </Box>
  );
};

export default MobileSideMenu;
