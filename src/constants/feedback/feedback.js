import { Visibility } from "@mui/icons-material";
import { DONOR_FEEDBACKS, FEEDBACKS } from "../../api/apiPaths";
import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";

export const columns = [
  {
    Header: "Requested By",
    accessor: "name",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: "Give feedback",
              id: props.row.original?.bloodRequestId,
              path: ROUTE_PATHS.FEEDBACK_FORM,
            },
          ]}
          disable={props?.row?.original?.isFeedbackUpdated}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "No of units", accessor: "noOfUnits", minWidth: 230 },
  {
    Header: "Donated Date",
    accessor: "donatedDate",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["donatedDate"]
        ? new Date(data?.["donatedDate"]).toLocaleDateString()
        : "-",
  },
];
export const secondaryColumns = [
  {
    Header: "Request Id",
    accessor: "requestId",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: "Give feedback",
              id: props.row.original?.bloodRequestId,
              path: ROUTE_PATHS.FEEDBACK_FORM,
            },
          ]}
          disable={props?.row?.original?.isFeedbackUpdated}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "No of units", accessor: "noOfUnits", minWidth: 230 },
  {
    Header: "Donated Date",
    accessor: "donatedDate",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["donatedDate"]
        ? new Date(data?.["donatedDate"]).toLocaleDateString()
        : "-",
  },
];

export const mobileMenuDetails = [
  {
    label: "Give feedback",
    path: ROUTE_PATHS.FEEDBACK_FORM,
    accessor: "bloodRequestId",
    checkHide: (data) => !!data?.["isFeedbackUpdated"],
  },
];
export const mobileDonorMenus = [
  {
    label: "View feedback",
    path: ROUTE_PATHS.FEEDBACK_FORM,
    accessor: "id",
    Icon: Visibility,
    view: true,
  },
];
export const donorColumns = [
  {
    Header: "Provider Name",
    accessor: "providerName",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: "View feedback",
              id: props.row.original?.id,
              path: ROUTE_PATHS.FEEDBACK_FORM,
              view: true,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
];
export const searchFields = ["name", "bloodGroup", "donorName", "noOfUnits"];

export const labels = {
  providerName: "Provider Name *",
  isPatient: "",
  relationship: "Relationship *",
  feedbackText: "Feedback Text *",
  audio: "Audio Feedback",
  video: "Video Feedback",
};
export const initialValues = {
  providerName: "",
  isPatient: "YES",
  relationship: "",
  feedbackText: "",
  audio: "",
  video: "",
};
export const fetchPaths = {
  donor: FEEDBACKS,
  volunteer: DONOR_FEEDBACKS,
  admin: DONOR_FEEDBACKS,
  super_admin: DONOR_FEEDBACKS,
};
export const filterFields = [
  {
    id: 1,
    label: "Requested By",
    queryName: "Name",
    fieldName: "name",
  },
  {
    id: 2,
    label: "Blood Group",
    queryName: "BloodGroup",
    fieldName: "bloodGroup",
  },
  {
    id: 3,
    label: "No of units",
    queryName: "Noofunits",
    fieldName: "noOfUnits",
  },
  // {
  //   id: 4,
  //   label: "Donated date",
  //   queryName: "DonatedDate",
  //   fieldName: "donatedDate",
  // },
];
export const filterInitialValues = {
  name: "",
  bloodGroup: "",
  noOfUnits: "",
};
