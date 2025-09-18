import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const columns = [
  {
    Header: "Requested From",
    accessor: "seekerName",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        {!props?.row?.original?.isFeedbackUpdated ? (
          <EditPopover
            inputValues={[
              {
                label: "View",
                id: props.row.original?.id,
                path: ROUTE_PATHS.DONOR_CURRENT_REQUEST_FORM,
              },
            ]}
          />
        ) : (
          <></>
        )}
      </OptionsContainer>
    ),
  },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "No of units", accessor: "noOfUnits", minWidth: 230 },
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
];
export const mobileMenuDetails = [
  {
    label: "View",
    Icon: VisibilityIcon,
    path: ROUTE_PATHS.DONOR_CURRENT_REQUEST_FORM,
    view: true,
    accessor: "id",
  },
];
export const initialValues = {
  bloodSeekerId: "",
  bloodGroupId: "",
  noOfUnits: "",
  dateOfNeed: "",
  timeOfNeed: "",
  patientName: "",
  patientContactNumber: "",
  ailmentAndTreatment: "",
  address: "",
  pincodeId: "",
  areaName: "",
  requestStatusId: "",
  callStatusId: "",
  queueStatusId: "",
  isAssigned: false,
  assignedTo: "",
  assignedToId: "",
  statusId: "active",
  rejectReason: "",
};

export const labels = {
  bloodSeekerId: "Seeker *",
  bloodGroupId: "Blood group *",
  donationTypeId: "Donation Type",
  noOfUnits: "Number of units *",
  dateOfNeed: "Date of Need *",
  timeOfNeed: "Time of need *",
  patientName: "Patient name *",
  patientContactNumber: "Patient contact number *",
  ailmentAndTreatment: "Ailment & treatment",
  address: "Address *",
  pincodeId: "Pincode *",
  areaName: "Area *",
  requestStatusId: "Request Status",
  callStatusId: "Call Status",
  queueStatusId: "Queue Status",
  isAssigned: "Assign Now",
  assignedTo: "Assign To",
  assignedToId: "Assign Person",
  statusId: "Status",
  rejectReason: "Reject Reason",
};

export const searchFields = [
  "name",
  "bloodGroup",
  "dateOfNeed",
  "timeOfNeed",
  "noOfUnits",
];
export const filterFields = [
  {
    id: 1,
    label: "Seeker Name",
    queryName: "Name",
    fieldName: "seekerName",
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
];
export const filterInitialValues = {
  name: "",
  bloodGroup: "",
  noOfUnits: "",
};
