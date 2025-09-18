import React from "react";
import { Grid } from "@mui/material";
import { formatTime } from "../../constants/globalConstants";
import { RequestInfo, RequestTitle, RequestValue } from "../../styles";

const getRequestInformation = (requestInfo) => {
  return [
    {
      label: "Requested By : ",
      value: requestInfo.seekerName,
    },
    {
      label: "Blood Group : ",
      value: requestInfo.bloodGroup.name,
    },
    {
      label: "Required Unit : ",
      value: requestInfo.noOfUnits,
    },
    {
      label: "Required Date : ",
      value: new Date(requestInfo.dateOfNeed).toDateString(),
    },
    {
      label: "Required Time : ",
      value: formatTime(requestInfo.timeOfNeed),
    },
    {
      label: "Patient Name : ",
      value: requestInfo.patientName,
    },
    {
      label: "Patient Contact : ",
      value: requestInfo.patientContactNumber,
    },
    {
      label: "Pincode : ",
      value: requestInfo.pincode,
    },
    {
      label: "Area Name : ",
      value: requestInfo.pincodeName,
    },
  ];
};

const CustomRequestInfo = ({ requestInfo }) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {getRequestInformation(requestInfo)?.map(
        ({ label = "", value = "" }, index) => (
          <Grid item xs={12} key={index}>
            <RequestInfo>
              <RequestTitle>{label}</RequestTitle>
              <RequestValue>{value}</RequestValue>
            </RequestInfo>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default CustomRequestInfo;
