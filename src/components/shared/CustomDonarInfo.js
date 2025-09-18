import { Button, Grid, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { RequestInfo, RequestTitle, RequestValue } from "../../styles";
const CallButton = styled(Button)({
  width: 50,
  backgroundColor: "#2e7d32",
  color: "#fff",
  position: "absolute",
  right: 0,
  marginTop: 8,
  "&:hover": {
    backgroundColor: "#2e7d32",
    color: "#fff",
  },
  "&.anchor": {
    color: "blue",
    textDecoration: "none",
  },
});

const getDonarInfo = (donarInfo) => [
  {
    label: "Donar Name : ",
    value: donarInfo?.name,
  },
  {
    label: "Mobile Number : ",
    value: donarInfo?.mobileNo,
  },
  {
    label: "Address : ",
    value: donarInfo?.address,
  },
  {
    label: "Blood Group : ",
    value: donarInfo?.bloodGroup,
  },
];

const CustomDonarInfo = ({ donarInfo }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      sx={{ marginBottom: "20px", position: "relative" }}
    >
      {getDonarInfo(donarInfo)?.map(({ label = "", value = "" }, index) => (
        <Grid item xs={12} key={index}>
          <RequestInfo>
            <RequestTitle>{label}</RequestTitle>
            <RequestValue>{value}</RequestValue>
          </RequestInfo>
        </Grid>
      ))}
      {isMobile ? (
        <CallButton>
          <a
            href={`tel:${donarInfo?.mobileNo}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Call
          </a>
        </CallButton>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default CustomDonarInfo;
