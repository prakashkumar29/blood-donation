import { Avatar, Box, Grid, styled } from "@mui/material";

export const AppContainerLayout = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  backgroundColor: "#fff",
  flexDirection: "column",
  "& .appMainContainer": {
    display: "flex",
    height: "calc(100vh - 58px)",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
    },
  },
  [theme.breakpoints.down("sm")]: {
    height: "100vh",
  },
}));
export const AppMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "calc(100vh - 70px)",
  [theme.breakpoints.down("sm")]: {
    height: "100vh",
  },
}));

export const AppBarLayout = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "70px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  backgroundColor: "#006BBD",
  color: "#fff",
  [theme.breakpoints.down("sm")]: {
    minHeight: "60px",
  },
}));

export const AppLogo = styled("div")({
  height: "100%",
  width: "auto",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  cursor: "pointer",
  gap: "15px",
  marginLeft: "20px",
});

export const CommonAvatar = styled(Avatar)({
  width: 45,
  height: 45,
});

export const AppProfile = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "auto",
  height: "100%",
  cursor: "pointer",
  "& .appProfileDetails": {
    marginRight: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  marginRight: "15px",
});

export const AppMainLayout = styled("div")({
  width: "100%",
  overflow: "scroll",
  height: "calc(100vh - 70px)",
  "&::-webkit-scrollBar": {
    width: 0,
    height: 0,
  },
});
export const FormContainer = styled(Box)({
  width: "100%",
  maxHeight: "100%",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
});

export const FormLayout = styled(Box)(({ theme }) => ({
  maxHeight: `calc(100% - 92px)`,
  width: "100%",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
    [theme.breakpoints.down("sm")]: {
      width: 2,
    },
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#6E6E6E60",
    borderRadius: 5,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
}));
export const FileDownloadLayout = styled(Grid)({
  display: "flex",
  alignItems: "center",
  paddingTop: 16,
});
