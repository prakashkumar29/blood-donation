import React from "react";
import { FormLayout, StyledFormContainer } from "../../../styles";
import { Box, Grid, Typography, createTheme, styled } from "@mui/material";
import defaultUrl from "../../../assets/user.png";
import { useSelector } from "react-redux";
import { BackNavigator } from "../../shared";
import EditIcon from "@mui/icons-material/Edit";
import { createSearchParams, useNavigate } from "react-router-dom";
import * as ROUTE_PATHS from "../../../routes/routePaths";

const Image = styled("img")({
  height: "130px",
  width: "130px",
  borderRadius: "50%",
});

const ProfileDetails = styled("div")(({ theme }) => ({
  "& .profileName": {
    color: "#000",
    font: "normal normal normal 24px/24px Roboto",
    margin: "6px 0",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  "& .email,.phNo": {
    font: "normal normal normal 16px/24px Roboto",
    color: "#0000008A",
    margin: "4px 0",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  "& .role": {
    // backgroundColor: ,
    padding: "6px 8px",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
}));

const GeneralContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    alignItems: "center",
  },
}));

const RoleContainer = styled("div")(({ theme }) => ({
  marginTop: "10px",
  //   background: theme.palette.secondaryAppColor.main,
  borderRadius: "2px",
  width: "max-content",
  padding: "5px 10px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
    textAlign: "center",
  },
}));
const IconContainer = styled(Box)(({ theme }) => ({
  width: "22px ",
  height: "22px ",
  borderRadius: "2px",
  marginRight: "15px",
  padding: "12px ",
  cursor: "pointer",
  // backgroundColor: `${theme.palette.secondaryAppColor.main}`,
  [theme.breakpoints.down("md")]: {
    // margin: "20px 15px 0 0",
    marginBottom: 16,
  },
}));
const theme = createTheme();
const actionsStyle = {
  marginLeft: "auto",
  marginBottom: "auto",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    margin: 0,
  },
};

function Admin() {

  const { role, mobileNo, emailId, name, profileImageUrl, id } = useSelector(
    (state) => state?.userInfo
  );
  const navigate = useNavigate();

  const passwordNavigation = () => {
    navigate({
      pathname: ROUTE_PATHS.CHANGE_PASSWORD,
      search: `?${createSearchParams({
        editId: id,
      })}`,
    });
  };

  const editNavigation = () => {
    navigate(
      {
        pathname: ROUTE_PATHS?.PROFILE_FORM,
        search: `?${createSearchParams({
          editId: id,
        })}`,
      },
      { state: { isUser: true, previousPath: ROUTE_PATHS.PROFILE } }
    );
  };
  
  return (
    <>
      <BackNavigator title={"MY PROFILE"} disableModes disableBack />
      <FormLayout sx={{ m: 0 }}>
        <StyledFormContainer
          sx={{
            border: "none",
            boxShadow: theme.shadows[5],
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            ml: 13,
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              ml: "auto",
            },
          }}
        >
          <GeneralContainer item xs={12} md={3}>
            <Image src={profileImageUrl || defaultUrl} alt="User"></Image>
          </GeneralContainer>
          <GeneralContainer item xs={12} md={7}>
            <ProfileDetails>
              <Typography className="profileName">{name || "User"}</Typography>
              <Typography className="email">{emailId || "--"}</Typography>
              <Typography className="phNo">{mobileNo || "--"}</Typography>
              <RoleContainer>{role}</RoleContainer>
            </ProfileDetails>
          </GeneralContainer>
          <GeneralContainer item xs={12} md={2} sx={actionsStyle}>
            <Box sx={{ display: "flex" }}>
              <Box
                onClick={() => passwordNavigation()}
                sx={{
                  backgroundColor: "#f3f3f3",
                  p: "5px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                  maxHeight: 50,
                }}
              >
                <p style={{ p: 0, m: 0, height: 18, fontSize: 14 }}>Change</p>
                <p style={{ p: 0, m: 0, height: 18, fontSize: 14 }}>password</p>
              </Box>
              <IconContainer
                onClick={() => editNavigation()}
                sx={{
                  height: 50,
                  width: 50,
                  backgroundColor: "#f3f3f3",
                  ml: 2,
                }}
              >
                <EditIcon />
              </IconContainer>
            </Box>
          </GeneralContainer>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
}

export default Admin;
