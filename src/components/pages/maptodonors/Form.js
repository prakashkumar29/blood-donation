import { useEffect, useState } from "react";
import {
  BackNavigator,
  CustomRadioButton,
  CustomSwitch,
  ListingComponent,
} from "../../shared/index";
import {
  FormLayout,
  ListingContainer,
  RadioContainer,
  StyledFormContainer,
} from "../../../styles/index";
import { MAP_TO_DONOR_LIST } from "../../../routes/routePaths";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  BLOOD_REQUEST,
  queueStatus,
  searchDonars,
} from "../../../api/apiPaths";
import { getByIdApiServices, postApiServices } from "../../../api/api";
import CustomRequestInfo from "../../shared/CustomRequestInfo";
import { getAllMappedDonors } from "../../../api/apiPaths";
import {
  columns,
  search,
  mobileMenuDetails,
} from "../../../constants/mapToDonars/mapToDonars";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import { MAPPED_DONARS } from "../../../routes/routePaths";

import {
  mobileCallMenuDetails,
  searchColumns,
  searchOptions,
} from "../../../constants/mapToDonars/list";
import { Grid, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { useTheme } from "@emotion/react";
import CustomAcceptModal from "../../shared/CustomAcceptModal";
import CustomDonatedModal from "../../shared/CustomDonatedModal";
import ConfirmationModal from "../../shared/ConfirmationModal";
import useArraySeeds from "../../../utils/useArraySeeds";
import { getSeedIdByCode } from "../../../utils/common";

function Form() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  const { state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId") || "";
  const { queueStatus: queueSeeds } = useArraySeeds([queueStatus]);
  const [acceptedProps, setAcceptedProps] = useState({
    open: false,
    handleClose: () => setAcceptedProps((prev) => ({ ...prev, open: false })),
    id: "",
    handleClick: (id) => {
      setAcceptedProps((prev) => ({ ...prev, open: true, id }));
    },
  });

  const [donatedProps, setDonatedProps] = useState({
    open: false,
    handleClose: () => setDonatedProps((prev) => ({ ...prev, open: false })),
    id: "",
    handleClick: (id) => {
      setDonatedProps((prev) => ({ ...prev, open: true, id }));
    },
  });

  const [mapToDonorProps, setMapToDonorProps] = useState({
    open: false,
    handleClose: () => setMapToDonorProps((prev) => ({ ...prev, open: false })),
    id: "",
    handleClick: (id) => {
      setMapToDonorProps((prev) => ({ ...prev, open: true, id }));
    },
  });

  const formik = useFormik({
    initialValues: { searchOption: "pincode", emergency: false },
  });
  const { values, handleChange, setFieldValue } = formik;

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(MAPPED_DONARS);
  const listParams = handleTableDatas(search, columns());
  const { pageSize, currentPage } = tableReRenderActions();

  const {
    data,
    isLoading,
    refetch: getMappedDonars,
  } = useQuery(
    ["mappeDonarsList", listParams],
    () => {
      return postApiServices(getAllMappedDonors, {
        ...listParams,
        sorting:
          listParams?.sorting[0]?.column === "createdAt"
            ? []
            : listParams?.sorting,
        filters: [
          {
            type: "eq",
            field: "bloodRequestId",
            value: editId,
          },
        ],
      });
    },
    {
      enabled: state?.viewDetails,
    }
  );
  const { data: requestInfo } = useQuery(
    "getRequestInfoById",
    () => getByIdApiServices(BLOOD_REQUEST, editId),
    {
      enabled: true,
    }
  );

  const { data: searches, refetch: getSearches } = useQuery(
    ["getSearches", values],
    () => {
      return postApiServices(
        `${searchDonars}/${editId}/${values?.emergency}?searchKey=${values?.searchOption}`
      );
    },
    {
      enabled: !state?.viewDetails,
    }
  );

  useEffect(() => {
    if (state?.searchOption) setFieldValue("searchOption", state?.searchOption);
    if (state?.emergency) setFieldValue("emergency", state?.emergency);
  }, []); // eslint-disable-line

  const isForceCompleted =
    getSeedIdByCode(queueSeeds, "force completed") ===
    requestInfo?.data?.queueStatusId;

  return (
    <>
      <BackNavigator
        title="MAP TO REQUEST"
        navigateTo={
          state?.navigatePath ? state?.navigatePath : MAP_TO_DONOR_LIST
        }
        disableModes
      />
      <FormLayout>
        <StyledFormContainer sx={{ padding: "30px", minWidth: "400px" }}>
          {requestInfo ? (
            <CustomRequestInfo requestInfo={requestInfo?.data} />
          ) : (
            <></>
          )}
        </StyledFormContainer>
        {!state?.viewDetails ? (
          <>
            <Grid container paddingBottom="10px" justifyContent="center">
              <Grid item xs={12}>
                <RadioContainer>
                  <CustomRadioButton
                    label="Search Option"
                    name="searchOption"
                    inputValues={searchOptions}
                    value={values?.searchOption}
                    onChange={handleChange}
                    accessor="code"
                    rowBreak={true}
                  />
                </RadioContainer>
              </Grid>
              <Grid item xs={8} display="flex" justifyContent="center">
                <CustomSwitch
                  name="emergency"
                  label="Emergency (Donor's availability time not considered)"
                  onChange={(e) => {
                    setFieldValue("emergency", e?.target?.checked);
                  }}
                  checked={Boolean(values?.emergency)}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
        <ListingContainer
          sx={{
            flexDirection: isMobile ? "column" : "row",
            marginTop: "20px",
            marginBottom: "20px",
            height: "auto",
          }}
        >
          {!state?.viewDetails && searches ? (
            <ListingComponent
              data={searches?.data?.rows}
              columns={searchColumns(
                editId,
                values?.searchOption,
                values?.emergency,
                mapToDonorProps.handleClick
              )}
              manualSort={true}
              pagination={true}
              bottomMenuDetails={mobileCallMenuDetails(
                editId,
                values?.searchOption,
                values?.emergency,
                mapToDonorProps.handleClick
              )}
              disableLayout
            />
          ) : (
            <ListingComponent
              data={data?.data?.rows || []}
              columns={columns(
                requestInfo?.data?.isCancelled,
                isForceCompleted,
                acceptedProps.handleClick,
                donatedProps.handleClick
              )}
              isLoading={isLoading}
              onPageNumberChange={onPageNumberChange}
              onChangePageSize={onChangePageSize}
              pageSize={pageSize}
              currentPage={currentPage}
              count={data?.data?.count || 1}
              bottomMenuDetails={mobileMenuDetails(
                requestInfo?.data?.isCancelled,
                isForceCompleted,
                acceptedProps.handleClick,
                donatedProps.handleClick
              )}
              disableLayout
            />
          )}
        </ListingContainer>
      </FormLayout>
      {acceptedProps.open ? (
        <CustomAcceptModal
          modalTitle="Update Reject Status"
          open={acceptedProps.open}
          handleClose={acceptedProps.handleClose}
          id={acceptedProps?.id}
          handleRefetch={getMappedDonars}
        />
      ) : (
        <></>
      )}
      {donatedProps.open ? (
        <CustomDonatedModal
          modalTitle="Update donated status"
          open={donatedProps.open}
          handleClose={donatedProps.handleClose}
          id={donatedProps?.id}
          handleRefetch={getMappedDonars}
        />
      ) : (
        <></>
      )}
      {mapToDonorProps.open ? (
        <ConfirmationModal
          open={mapToDonorProps?.open}
          handleClose={mapToDonorProps.handleClose}
          donorId={mapToDonorProps?.id}
          bloodRequestId={editId}
          handleRefetch={getSearches}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Form;
