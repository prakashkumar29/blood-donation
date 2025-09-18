import {
  BLOOD_REQUEST_CALL_STATUS,
  BLOOD_REQUEST_QUEUE_STATUS,
  BLOOD_REQUEST_REQUEST_STATUS,
} from "../../api/apiPaths";
import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import { isPastDate } from "../../utils/common";
import { Phone } from "@mui/icons-material";
import UpdateModalButton from "../../components/shared/UpdateModalButton";

export const updateFields = [
  [
    {
      id: 1,
      label: "Request Status",
      name: "requestStatusId",
      fieldType: "select",
      xs: 6,
    },
  ],
  [
    {
      id: 2,
      label: "Call Status",
      name: "callStatusId",
      fieldType: "select",
      xs: 6,
      maxLength: 10,
    },
  ],
  [
    {
      id: 3,
      label: "Queue Status",
      name: "queueStatusId",
      fieldType: "select",
      xs: 6,
    },
  ],
];

export const columns = (handleOpen, handleClick, isVolunteer) => [
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
              label: "Edit",
              id: props.row.original.id,
              path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
              toHide:
                props?.row?.original?.requestStatus !==
                  "Pending verification" ||
                isPastDate(props?.row?.original?.dateOfNeed),
            },
            {
              label: "Assign",
              id: props.row.original.id,
              path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
              toHide:
                !!isVolunteer ||
                props?.row?.original?.requestStatus === "Donated" ||
                isPastDate(props?.row?.original?.dateOfNeed) ||
                props?.row?.original?.queueStatus === "Force completed",
              stateProps: { assignMode: true },
            },
            {
              label: "Cancel Request",
              id: props.row.original.id,
              path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
              toHide:
                props?.row?.original?.requestStatus === "Donated" ||
                !!props?.row?.original?.isCancelled ||
                isPastDate(props?.row?.original?.dateOfNeed) ||
                props?.row?.original?.queueStatus === "Force completed",
              stateProps: { cancelMode: true },
            },
            {
              id: props.row.original.id,
              toHide:
                props?.row?.original?.callStatus !== "Call connected" ||
                !props?.row?.original?.assignedTo ||
                props?.row?.original?.requestStatus === "Donated" ||
                props?.row?.original?.queueStatus === "Force completed",
              customComp: (
                <UpdateModalButton
                  title="Update Request Status"
                  id={props.row.original.id}
                  updateFieldsIndex={0}
                  updateFields={updateFields[0]}
                  initialValues={{
                    requestStatusId:
                      props?.row?.original?.["requestStatusId"] || "",
                  }}
                  seedType="requestStatus"
                  updatePath={BLOOD_REQUEST_REQUEST_STATUS}
                  handleOpen={handleOpen}
                  onClick={handleClick}
                />
              ),
            },
            {
              id: props.row.original.id,
              toHide:
                props?.row?.original?.callStatus === "Call connected" ||
                props?.row?.original?.requestStatus === "Donated" ||
                props?.row?.original?.queueStatus === "Force completed",
              customComp: (
                <UpdateModalButton
                  title="Update Call Status"
                  id={props.row.original.id}
                  updateFieldsIndex={1}
                  initialValues={{
                    callStatusId: props?.row?.original?.["callStatusId"] || "",
                  }}
                  updateFields={updateFields[1]}
                  seedType="callStatus"
                  updatePath={BLOOD_REQUEST_CALL_STATUS}
                  handleOpen={handleOpen}
                  onClick={handleClick}
                />
              ),
            },
            {
              id: props.row.original.id,
              toHide:
                props?.row?.original?.requestStatus === "Donated" ||
                props?.row?.original?.queueStatus === "Force completed",
              customComp: (
                <UpdateModalButton
                  title="Update Queue Status"
                  id={props.row.original.id}
                  updateFieldsIndex={2}
                  updateFields={updateFields[2]}
                  seedType="queueStatus"
                  initialValues={{
                    queueStatusId:
                      props?.row?.original?.["queueStatusId"] || "",
                  }}
                  updatePath={BLOOD_REQUEST_QUEUE_STATUS}
                  handleOpen={handleOpen}
                  onClick={handleClick}
                />
              ),
            },
            {
              label: "View Mapped Donors",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS.INDIVIDUAL_MAPPED_DONORS,
              view: true,
              stateProps: {
                navigatePath: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_LIST,
              },
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
    Header: "Call Status",
    accessor: "callStatus",
    minWidth: 230,
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
  { Header: "Requested By", accessor: "seekerName", minWidth: 230 },
  { Header: "Blood group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "Location", accessor: "locationName", minWidth: 230 },
  {
    Header: "Assigned To",
    accessor: "assignedTo",
    minWidth: 200,
    Cell: (props) => props?.value || "-",
    getDetail: (data) => data?.assignedTo || "N/A",
  },
];
export const mobileMenuDetails = {
  top: [
    {
      label: "Edit",
      accessor: "id",
      path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
      Icon: EditIcon,
      checkHide: (data) =>
        data?.requestStatus !== "Pending verification" ||
        !!data?.["isCancelled"] ||
        data?.["queueStatus"] === "Force completed" ||
        isPastDate(data?.dateOfNeed),
    },
    {
      hasCall: true,
      Icon: Phone,
      checkHide: (data) =>
        data?.["callStatus"] === "Call connected" ||
        data?.["queueStatus"] === "Force completed",
    },
  ],
  bottom: (handleOpen, handleClick, isVolunteer) => [
    {
      label: "Assign",
      accessor: "id",
      path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
      navigateState: { assignMode: true },
      checkHide: (data) =>
        !!isVolunteer ||
        data?.requestStatus === "Donated" ||
        !!data?.["isCancelled"] ||
        isPastDate(data?.dateOfNeed) ||
        data?.["queueStatus"] === "Force completed",
    },
    {
      label: "Cancel Request",
      path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
      accessor: "id",
      checkHide: (data) =>
        data?.["isCancelled"] !== 0 ||
        data?.["requestStatus"] === "Donated" ||
        data?.["queueStatus"] === "Force completed" ||
        isPastDate(data?.dateOfNeed),
      navigateState: { cancelMode: true },
    },
    {
      accessor: "id",
      checkHide: (data) =>
        data?.["callStatus"] !== "Call connected" ||
        !!data?.["requestStatus"] === "Donated" ||
        data?.["isCancelled"] !== 0 ||
        data?.["queueStatus"] === "Force completed" ||
        !data?.["assignedTo"],
      customComp: {
        Component: UpdateModalButton,
        title: "Update Request Status",
        seedType: "requestStatus",
        updatePath: BLOOD_REQUEST_REQUEST_STATUS,
        initialKeys: [["id", "id"]],
        handleOpen: handleOpen,
        onClick: handleClick,
        updateFieldsIndex: 0,
      },
      inititialValueKeys: [["requestStatusId", "requestStatusId"]],
    },
    {
      accessor: "id",
      checkHide: (data) =>
        !!data?.["requestStatus"] === "Donated" ||
        data?.["isCancelled"] !== 0 ||
        data?.["callStatus"] === "Call connected" ||
        data?.["queueStatus"] === "Force completed",
      customComp: {
        Component: UpdateModalButton,
        title: "Update Call Status",
        seedType: "callStatus",
        updatePath: BLOOD_REQUEST_CALL_STATUS,
        initialKeys: [["id", "id"]],
        handleOpen: handleOpen,
        onClick: handleClick,
        updateFieldsIndex: 1,
      },
      inititialValueKeys: [["callStatusId", "callStatusId"]],
    },
    {
      accessor: "id",
      checkHide: (data) =>
        !!data?.["requestStatus"] === "Donated" ||
        data?.["isCancelled"] !== 0 ||
        data?.["queueStatus"] === "Force completed" ||
        data?.["queueStatus"] === "Force completed",
      customComp: {
        Component: UpdateModalButton,
        title: "Update Queue Status",
        seedType: "queueStatus",
        updatePath: BLOOD_REQUEST_QUEUE_STATUS,
        initialKeys: [["id", "id"]],
        handleOpen: handleOpen,
        onClick: handleClick,
        updateFieldsIndex: 2,
      },
      inititialValueKeys: [["queueStatusId", "queueStatusId"]],
    },
    {
      label: "View Mapped Donors",
      path: ROUTE_PATHS.INDIVIDUAL_MAPPED_DONORS,
      accessor: "id",
      view: true,
      navigateState: {
        navigatePath: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_LIST,
      },
      checkHide: (data) => !!data?.["isCancelled"],
    },
  ],
};

export const initialValues = {
  bloodSeekerId: "",
  bloodGroupId: "",
  donationTypeId: "",
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
  areaName: "Area",
  requestStatusId: "Request Status",
  callStatusId: "Call Status",
  queueStatusId: "Queue Status",
  isAssigned: "Assign Now",
  assignedTo: "Assign To",
  assignedToId: "Assign Person",
  statusId: "Status",
  rejectReason: "Reject Reason *",
};

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
export const assignOptions = [
  { name: "Me", code: "me" },
  { name: "Admins", code: "admins" },
  { name: "Volunteers", code: "volunteers" },
];
export const filterFields = [
  {
    id: 1,
    label: "Request Id",
    queryName: "Request Id",
    fieldName: "requestId",
  },
  {
    id: 3,
    label: "Location",
    queryName: "Location",
    fieldName: "locationName",
  },
  {
    id: 9,
    label: "Blood group",
    queryName: "Bloodgroup",
    fieldName: "bloodGroup",
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
  dateOfNeed: "",
  locationName: "",
  requestStatus: "",
  callStatus: "",
  queueStatus: "",
  assignedTo: "",
  seekerName: "",
  bloodGroup: "",
};
