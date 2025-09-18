import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import { isPastDate } from "../../utils/common";
import EditIcon from "@mui/icons-material/Edit";
import { CustomTitle } from "../../styles";
import CustomMobileTitle from "../../components/shared/CustomMobileTitle";

export const searchFields = [
  "patientName",
  "bloodGroup",
  "noOfUnits",
  "requestStatus",
  "callStatus",
  "queueStatus",
  "dateOfNeed",
  "timeOfNeed",
];
export const columns = [
  {
    Header: "Patient Name",
    accessor: "patientName",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: "Edit",
              id: props.row.original.id,
              path: ROUTE_PATHS.CREATE_REQUEST_FORM,
              toHide:
                props?.row?.original?.requestStatus !==
                  "Pending verification" ||
                isPastDate(props?.row?.original?.dateOfNeed) ||
                props?.row?.original?.requestStatus === "Donated",
            },
            {
              label: "Cancel Request",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS.CREATE_REQUEST_FORM,
              toHide:
                isPastDate(props?.row?.original?.dateOfNeed) ||
                props?.row?.original?.requestStatus === "Donated" ||
                !!props?.row?.original?.isCancelled ||
                props?.row?.original?.queueStatus === "Force completed",
              stateProps: { cancelMode: true },
            },
            {
              label: "Mapped Donors",
              id: props.row.original.id,
              path: ROUTE_PATHS.MAPPED_LIST,
              view: true,
              stateProps: { isCancelled: props?.row?.original?.isCancelled },
            },
          ]}
          disable={!!props?.row?.original?.isCancelled}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "Request Status",
    accessor: "requestStatus",
    minWidth: 230,
    Cell: (props) => props?.value || "-",
  },
  {
    Header: "Call status",
    accessor: "callStatus",
    minWidth: 200,
    Cell: (props) => props?.value || "-",
  },
  {
    Header: "Queue status",
    accessor: "queueStatus",
    minWidth: 200,
    Cell: (props) => props?.value || "-",
  },
  {
    Header: "Cancelled",
    accessor: "isCancelled",
    minWidth: 200,
    Cell: (props) => (props?.value ? "Yes" : "No"),
    getDetail: (data) => (data?.["isCancelled"] ? "Yes" : "No"),
  },
  { Header: "Blood group", accessor: "bloodGroup", minWidth: 230 },
  {
    Header: "Date of need",
    accessor: "dateOfNeed",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["dateOfNeed"]
        ? new Date(data?.["dateOfNeed"]).toLocaleDateString()
        : "-",
  },
  { Header: "Time of need", accessor: "timeOfNeed", minWidth: 230 },
  { Header: "No of units", accessor: "noOfUnits", minWidth: 200 },
];
export const mobileMenuDetails = [
  {
    label: "Edit",
    accessor: "id",
    path: ROUTE_PATHS.CREATE_REQUEST_FORM,
    Icon: EditIcon,
    checkHide: (data) =>
      data?.requestStatus !== "Pending verification" ||
      !!data?.["isCancelled"] ||
      isPastDate(data?.dateOfNeed) ||
      data?.["queueStatus"] === "Force completed",
  },
];
export const bottomMenuDetails = [
  {
    label: "Cancel Request",
    path: ROUTE_PATHS.CREATE_REQUEST_FORM,
    accessor: "id",
    checkHide: (data) =>
      data?.["isCancelled"] !== 0 ||
      data?.["requestStatus"] === "Donated" ||
      isPastDate(data?.dateOfNeed) ||
      data?.["queueStatus"] === "Force completed",
    navigateState: { cancelMode: true },
  },
  {
    label: "Mapped Donors",
    path: ROUTE_PATHS.MAPPED_LIST,
    accessor: "id",
    view: true,
    stateProps: [["isCancelled", "isCancelled"]],
  },
];

export const initialValues = {
  bloodGroupId: "",
  donationTypeId: "",
  noOfUnits: "",
  dateOfNeed: "",
  timeOfNeed: "",
  patientName: "",
  patientContactNumber: "",
  ailmentAndTreatment: "",
  isInstitutionAddress: false,
  address: "",
  pincodeId: "",
  areaName: "",
  statusId: "active",
  rejectReason: "",
};

export const labels = {
  bloodGroupId: "Blood group *",
  donationTypeId: "Donation Type",
  noOfUnits: "Number of units *",
  dateOfNeed: "Date of Need *",
  timeOfNeed: "Time of need *",
  patientName: "Patient name *",
  patientContactNumber: "Patient contact number *",
  ailmentAndTreatment: "Ailment & treatment",
  isInstitutionAddress: "Same as institution address",
  address: "Address *",
  pincodeId: "Pincode *",
  areaName: "Area",
  statusId: "Status",
  rejectReason: "Reject Reason *",
};
export const filterFields = [
  {
    id: 1,
    label: "Patient Name",
    queryName: "Name",
    fieldName: "patientName",
  },
  {
    id: 2,
    label: "Blood Group",
    queryName: "bloodgroup",
    fieldName: "bloodGroup",
  },
  {
    id: 3,
    label: "No of units",
    queryName: "noofunits",
    fieldName: "noOfUnits",
  },
  {
    id: 4,
    label: "Request Status",
    queryName: "Request Status",
    fieldName: "requestStatus",
  },
  {
    id: 5,
    label: "Call Status",
    queryName: "Call Status",
    fieldName: "callStatus",
  },
  {
    id: 6,
    label: "Queue Status",
    queryName: "Queue Status",
    fieldName: "queueStatus",
  },
];
export const filterInitialValues = {
  name: "",
  bloodGroupId: "",
  noOfUnits: "",
  requestStatus: "",
  callStatus: "",
  queueStatus: "",
};

export const secondaryColumns = (isCancelled, handleClick) => [
  {
    Header: "Blood Request Id",
    accessor: "requestId",
    minWidth: 230,
    sticky: "left",
    Cell: (props) => (
      <OptionsContainer>
        {props?.value}
        <EditPopover
          inputValues={[
            {
              customComp: (
                <CustomTitle
                  onClick={() => handleClick(props.row.original?.id)}
                >
                  Mark as donated
                </CustomTitle>
              ),
              toHide: !Boolean(props.row.original?.accepted),
            },
          ]}
          disable={Boolean(isCancelled) || Boolean(props.row.original?.donated)}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "Donor Name", accessor: "donorName", minWidth: 230 },
  { Header: "Donor Mobile", accessor: "donorMobile", minWidth: 230 },
  {
    Header: "Donated",
    accessor: "donated",
    width: 230,
    Cell: (props) => <>{props.row.original?.donated === 0 ? "No" : "Yes"}</>,
    getDetail: (data) => (data?.["donated"] ? "Yes" : "No"),
  },
];
export const secondaryBottomMenuDetails = (isCancelled, handleClick) => [
  {
    checkHide: (data) =>
      !!isCancelled || !Boolean(data?.accepted) || Boolean(data?.donated),
    customComp: {
      Component: CustomMobileTitle,
      label: "Mark as donated",
      handleClick: handleClick,
      initialKeys: [["id", "id"]],
    },
  },
];
