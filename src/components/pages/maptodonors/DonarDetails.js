import React, { useState } from "react";
import {
  BackNavigator,
  CustomSelectField,
  DividerLine,
} from "../../shared/index";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getByIdApiServices, updateApiServices } from "../../../api/api";
import {
  callStatus,
  donarHistory,
  updateCallHistory,
} from "../../../api/apiPaths";
import {
  CallHistory,
  FormLayout,
  RequestTitle,
  RequestValue,
  StyledButtonContainer,
  StyledFormContainer,
  SubmitButton,
} from "../../../styles/index";
import CustomDonarInfo from "../../shared/CustomDonarInfo";
import { useFormik } from "formik";
import { object, string } from "yup";
import { SUBMIT } from "../../../constants/globalConstants";
import useNotify from "../../../utils/useNotify";
import { Grid } from "@mui/material";
import { MAP_TO_DONOR_FORM } from "../../../routes/routePaths";
import useArraySeeds from "../../../utils/useArraySeeds";

const DonarDetails = () => {
  const [params] = useSearchParams();
  const { state } = useLocation();
  const donarId = params.get("editId");
  const requestId = params.get("requestId");
  const { callStatus: callStatusSeeds } = useArraySeeds([callStatus]);
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();
  const [donarInfo, setDonarInfo] = useState({
    name: "",
    mobileNo: "",
    address: "",
    callHistory: [],
  });

  const { refetch: changeCallStatus } = useQuery(
    "changeCallStatus",
    () =>
      updateApiServices(updateCallHistory, donarId, {
        callStatusId: values.callStatus,
        bloodRequestId: requestId,
      }),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data.message);
        navigate(`${MAP_TO_DONOR_FORM}?editId=${requestId}`, {
          state: { ...state },
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: { callStatus: "" },
    validationSchema: object({
      callStatus: string().required("Call Status is required *"),
    }),
    onSubmit: changeCallStatus,
  });

  const { values, touched, errors, handleBlur, handleSubmit, handleChange } =
    formik;

  useQuery("getDonarHistory", () => getByIdApiServices(donarHistory, donarId), {
    enabled: true,
    onSuccess: ({ data }) => {
      const { name, mobileNo, address } = data;
      setDonarInfo({
        name,
        mobileNo,
        address,
        callHistory: data?.donorParameter?.callHistory,
        bloodGroup: data?.donorParameter?.bloodGroup,
      });
    },
  });

  const handleNavigate = () =>
    navigate(`${MAP_TO_DONOR_FORM}?editId=${requestId}`, {
      state: { ...state },
    });

  return (
    <>
      <BackNavigator
        customTitle="Edit Call Status"
        handleNavigate={handleNavigate}
      />
      <FormLayout>
        <StyledFormContainer>
          <CustomDonarInfo donarInfo={donarInfo} />
          <DividerLine gap />
          <CustomSelectField
            label="Call Status *"
            inputValues={callStatusSeeds}
            name="callStatus"
            value={values.callStatus}
            touched={touched.callStatus}
            errors={errors.callStatus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <StyledButtonContainer sx={{ marginTop: "20px" }}>
            <SubmitButton onClick={handleSubmit}>{SUBMIT}</SubmitButton>
          </StyledButtonContainer>
          {donarInfo?.callHistory?.length ? (
            <>
              <DividerLine gap />
              <CallHistory>Call History</CallHistory>
            </>
          ) : (
            <></>
          )}
          <Grid container rowSpacing={2}>
            {donarInfo?.callHistory.map((history, index) => (
              <Grid item xs={12} key={index}>
                <RequestTitle>
                  Called At :{" "}
                  <RequestValue>
                    {new Date(history.calledAt).toDateString() +
                      new Date(history.calledAt).toLocaleTimeString("en-US")}
                  </RequestValue>
                </RequestTitle>
                <RequestTitle>
                  Called Status :{" "}
                  <RequestValue>{history.callStatus}</RequestValue>
                </RequestTitle>
              </Grid>
            ))}
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
};

export default DonarDetails;
