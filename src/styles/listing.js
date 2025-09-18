import { Box, styled } from "@mui/material";

export const ListingContainer = styled(Box)(({ theme }) => {
  return {
    width: "90%",
    margin: "auto 5% auto 5%",
    height: "calc(100vh - 150px)",
    overflow: "scoll",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 5% auto",
      width: "100%",
      height: "80%",
      overflow: "scroll",
      "&::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
      },
    },
  };
});

export const RadioContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});
