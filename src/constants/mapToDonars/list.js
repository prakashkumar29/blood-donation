import { EditPopover, OptionsContainer } from "../../components/shared";
import CustomMobileTitle from "../../components/shared/CustomMobileTitle";
import { DONAR_DETAILS, MAP_TO_DONOR_FORM } from "../../routes/routePaths";
import { CustomTitle } from "../../styles";

export const searchFields = [
  "requestId",
  "dateOfNeed",
  "locationName",
  "requestStatus",
  "callStatus",
  "queueStatus",
  "assignedTo",
  "seekerName",
  "bloodGroup",
];

export const filterFields = [
  {
    id: 1,
    label: "Request Id",
    queryName: "Request Id",
    fieldName: "requestId",
  },
  {
    id: 9,
    label: "Blood group",
    queryName: "Bloodgroup",
    fieldName: "bloodGroup",
  },
  {
    id: 3,
    label: "Location",
    queryName: "Location",
    fieldName: "locationName",
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
  {
    id: 7,
    label: "Assinged to",
    queryName: "AssignedTo",
    fieldName: "assignedTo",
  },
  {
    id: 8,
    label: "Requested By",
    queryName: "Seeker name",
    fieldName: "seekerName",
  },
];

export const filterInitialValues = {
  requestId: "",
  pincode: "",
  requestStatusId: "",
  callStatusId: "",
  queueStatusId: "",
  assignedTo: "",
  seekerName: "",
  bloodGroup: "",
};

export const columns = [
  {
    Header: "Request Id",
    accessor: "requestId",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props?.value}
        <EditPopover
          inputValues={[
            {
              label: "Map Donors",
              id: props?.row?.original?.id,
              path: MAP_TO_DONOR_FORM,
              toHide:
                props?.row?.original?.requestStatus === "Donated" ||
                Boolean(props?.row?.original?.isCancelled) ||
                props?.row?.original?.queueStatus === "Force completed",
            },
            {
              label: "View Mapped Donors",
              id: props?.row?.original?.id,
              path: MAP_TO_DONOR_FORM,
              view: true,
            },
          ]}
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
  { Header: "Requested By", accessor: "seekerName", minWidth: 230 },
  { Header: "Blood group", accessor: "bloodGroup", minWidth: 230 },
  {
    Header: "Required Date",
    accessor: "dateOfNeed",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["dateOfNeed"]
        ? new Date(data?.["dateOfNeed"]).toLocaleDateString()
        : "-",
  },
  { Header: "Location", accessor: "locationName", minWidth: 230 },

  {
    Header: "Assigned To",
    accessor: "assignedTo",
    minWidth: 200,
    Cell: (props) => props?.value || "-",
  },
];

export const searchOptions = [
  { name: "Pincode", code: "pincode" },
  { name: "First Level Search", code: "firstLevelSearch" },
  { name: "Second Level Search", code: "secondLevelSearch" },
];

export const searchColumns = (
  requestId,
  searchOption,
  emergency,
  handleMapped
) => [
  {
    Header: "Donar Name",
    accessor: "name",
    minWidth: 250,
    sticky: "left",
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: "Call Details",
              id: props.row.original?.id,
              path: DONAR_DETAILS,
              search: { requestId },
              stateProps: { searchOption, emergency },
            },
            {
              customComp: (
                <CustomTitle
                  onClick={() => handleMapped(props.row.original?.id)}
                >
                  Map to Request
                </CustomTitle>
              ),
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 170 },
  { Header: "Mobile", accessor: "mobileNo", minWidth: 170 },
  { Header: "Email Id", accessor: "emailId", minWidth: 200 },
  { Header: "Area Name", accessor: "pincodeName", minWidth: 200 },
  { Header: "Pincode", accessor: "pincode", minWidth: 200 },
];

export const mobileMenuDetails = [
  {
    label: "Mark Donors",
    path: MAP_TO_DONOR_FORM,
    accessor: "id",
    checkHide: (data) =>
      data?.["requestStatus"] === "Donated" ||
      Boolean(data?.isCancelled) ||
      Boolean(data?.queueStatus === "Force completed"),
  },
  {
    label: "View Mapped Donors",
    path: MAP_TO_DONOR_FORM,
    accessor: "id",
    view: true,
  },
];
export const mobileCallMenuDetails = (
  requestId,
  searchOption,
  emergency,
  handleMapped
) => [
  {
    label: "Call Details",
    path: DONAR_DETAILS,
    accessor: "id",
    search: { requestId },
    navigateState: { searchOption, emergency },
  },
  {
    customComp: {
      Component: CustomMobileTitle,
      label: "Map to Request",
      handleClick: handleMapped,
      initialKeys: [["id", "id"]],
    },
  },
];
