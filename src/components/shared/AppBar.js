import React, { useState } from "react";
import { AppBarLayout, AppLogo, AppProfile, CommonAvatar } from "../../styles";
import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { RightMenu } from "./RightMenu";
import { codes, removeCookie } from "../../constants/globalConstants";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/slice";
import { useTheme } from "@emotion/react";
import MobileSideMenu from "./MobileSideMenu";
import AddAsDonorModal from "./AddAsDonorModal";
const CustomTypography = styled(Typography)({
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
});

const StyledLogo = styled("img")(({ theme }) => {
  return {
    height: "50px",
    width: "50px",
    [theme.breakpoints.down("sm")]: {
      height: "35px",
      width: "35px",
    },
  };
});

const StyledTitle = styled("div")(({ theme }) => {
  return {
    fontFamily: "Roboto",
    fontSize: "24px",
    color: "#fff",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  };
});

export function AppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const dispatch = useDispatch();
  const { profileImageUrl, code, isDonor, role, name, isInstitution } =
    useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const handleClose = () => setAnchorEl(null);
  const redirect = (routePath, type) => {
    if (type === "logout") {
      removeCookie("token");
      removeCookie("roleId");
      removeCookie("refreshToken");
      dispatch(
        setUserInfo({
          role: "",
          roleId: "",
          name: "",
          id: "",
          code: "",
          profileImageUrl: "",
          emailId: "",
          mobileNo: "",
          institutionId: "",
          isInstitution: "",
          institutionUserId: "",
        })
      );
    }
    navigate(routePath);
    handleClose();
  };
  return (
    <AppBarLayout>
      <AppLogo>
        <StyledLogo src={logo} />
        <StyledTitle>Blood Donation Camp</StyledTitle>
      </AppLogo>
      {!isMobile &&
        code !== codes?.donor &&
        !isDonor &&
        !(code === codes?.institution_seeker && isInstitution) && (
          <AddAsDonorModal />
        )}
      {isMobile ? (
        <MobileSideMenu />
      ) : (
        <AppProfile onClick={handleClick}>
          <Box className="appProfileDetails">
            <CustomTypography fontSize={18} fontWeight={500}>
              {name}
            </CustomTypography>
            <CustomTypography fontSize={14}>{role}</CustomTypography>
          </Box>
          <CommonAvatar src={profileImageUrl} alt="IMG" />
        </AppProfile>
      )}
      <RightMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={Boolean(anchorEl)}
        redirect={redirect}
      />
    </AppBarLayout>
  );
}
