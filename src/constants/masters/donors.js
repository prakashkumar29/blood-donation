import { Phone } from "@mui/icons-material";
import {
  APPROVE_USER,
  callStatus,
  updateCallHistory,
} from "../../api/apiPaths";
import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateModalButton from "../../components/shared/UpdateModalButton";

export const updateFields = [
  [
    {
      id: 1,
      label: "Call Status",
      name: "callStatusId",
      fieldType: "select",
      xs: 6,
      maxLength: 10,
    },
  ],
];

export const MASTERS_DONORS_COLUMN = (handleOpen, handleClick) => [
  {
    Header: "Donors Name",
    accessor: "name",
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
              path: ROUTE_PATHS.MASTERS_DONORS_FORM,
            },
            {
              label: "View Details",
              id: props.row.original.id,
              path: ROUTE_PATHS.MASTERS_DONORS_FORM,
              view: true,
            },
            {
              toHide: !!props?.row?.original?.isApproved,
              customComp: (
                <UpdateModalButton
                  title="Approve"
                  id={props?.row?.original?.id}
                  patchPath={APPROVE_USER}
                  propmptMessage="Are you sure want to approve this donor?"
                  handleOpen={handleOpen}
                  onClick={handleClick}
                />
              ),
            },
            {
              id: props.row.original.id,
              toHide: props?.row?.original?.callStatus !== "Never Call Again",
              customComp: (
                <UpdateModalButton
                  title="Update Call Status"
                  id={props.row.original.id}
                  initialValues={{
                    callStatusId: props?.row?.original?.["callStatusId"] || "",
                  }}
                  updateFieldsIndex={0}
                  seedType="callStatus"
                  updatePath={updateCallHistory}
                  handleOpen={handleOpen}
                  onClick={handleClick}
                />
              ),
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  {
    Header: "Email",
    accessor: "emailId",
    minWidth: 230,
    Cell: (props) => props?.value || "-",
    getDetail: (data) => data?.emailId || "N/A",
  },
  { Header: "Mobile No", accessor: "mobileNo", minWidth: 230 },
  {
    Header: "Blood group",
    accessor: "bloodGroup",
    minWidth: 200,
    Cell: (props) => props?.value || "-",
    getDetail: (data) => data?.bloodGroup || "N/A",
  },
  { Header: "Status", accessor: "status", minWidth: 200 },
  {
    Header: "Area Name",
    accessor: "pincodeName",
    minWidth: 200,
    Cell: (props) => props?.value || "-",
    getDetail: (data) => data?.pincodeName || "N/A",
  },
  {
    Header: "Pincode",
    accessor: "pincode",
    minWidth: 200,
    Cell: (props) => props?.value || "-",
    getDetail: (data) => data?.pincode || "N/A",
  },
  {
    Header: "Call status",
    accessor: "callStatus",
    minWidth: 200,
    Cell: (props) => props?.value || "N/A",
    getDetail: (data) => data?.["callStatus"] || "N/A",
  },
  {
    Header: "Approved status",
    accessor: "isApproved",
    minWidth: 200,
    Cell: (props) => (props?.value ? "Approved" : "Not approved"),
    getDetail: (data) => (data?.["isApproved"] ? "Approved" : "Not approved"),
  },
];

export const mobileMenuDetails = [
  {
    label: "Edit",
    Icon: EditIcon,
    path: ROUTE_PATHS.MASTERS_DONORS_FORM,
    accessor: "id",
  },
  {
    label: "View",
    Icon: VisibilityIcon,
    path: ROUTE_PATHS.MASTERS_DONORS_FORM,
    view: true,
    accessor: "id",
  },
  {
    label: "Call",
    Icon: Phone,
    hasCall: true,
    checkHide: (data) => data?.["callStatus"] !== "Never Call Again",
  },
];
export const bottomMenuDetails = (handleOpen, handleClick) => [
  {
    accessor: "id",
    checkHide: (data) => data?.["callStatus"] !== "Never Call Again",
    customComp: {
      Component: UpdateModalButton,
      title: "Update Call Status",
      seedType: callStatus,
      updatePath: updateCallHistory,
      handleOpen: handleOpen,
      onClick: handleClick,
      initialKeys: [["id", "id"]],
      updateFieldsIndex: 0,
    },
    inititialValueKeys: [["callStatusId", "callStatusId"]],
  },
  {
    accessor: "id",
    checkHide: (data) => !!data?.isApproved,
    customComp: {
      Component: UpdateModalButton,
      title: "Approve",
      initialKeys: [["id", "id"]],
      handleOpen: handleOpen,
      onClick: handleClick,
      patchPath: APPROVE_USER,
      propmptMessage: "Are you sure want to approve this donor?",
    },
  },
];

export const donorSearch = [
  "name",
  "mobileNo",
  "emailId",
  "pincode",
  "pincodeName",
  "status",
];

const getTime = (hours = 1) => {
  const date = new Date();
  date.setHours(hours, 0, 0);
  date.setHours(hours, 0, 0);
  return date;
};

export const initialValues = {
  name: "",
  mobileNo: "",
  whatsAppNo: "",
  emailId: "",
  genderId: "male",
  dateOfBirth: null,
  profileImage: "",
  address: "",
  areaName: "",
  frequency: "",
  availableTimeStart: getTime(7),
  availableTimeEnd: getTime(22),
  donatedBefore: "NO",
  lastDonatedDate: null,
  bloodGroupId: "",
  stateId: "",
  pincodeId: "",
  googleMapName: "",
  statusId: "",
  rejectReason: "",
};

export const labels = {
  name: "Donor Name *",
  mobileNo: "Mobile No *",
  whatsAppNo: "WhatsApp No *",
  emailId: "Email *",
  genderId: "Gender",
  dateOfBirth: "Date of birth *",
  profileImage: "Donor Image",
  address: "Address",
  areaName: "Area name",
  frequency: "Frequency(in months) *",
  availableTimeStart: "Available start time *",
  availableTimeEnd: "Available end time *",
  donatedBefore: "Have you donated before ?",
  lastDonatedDate: "Last donated date *",
  bloodGroupId: "Blood Group *",
  stateId: "State",
  pincodeId: "Pincode *",
  googleMapName: "Google map name",
  statusId: "Status",
  rejectReason: "Inactive Reason *",
};
export const filterFields = [
  {
    id: 1,
    label: "Donor Name",
    queryName: "Name",
    fieldName: "name",
  },
  {
    id: 2,
    label: "Email",
    queryName: "Email",
    fieldName: "emailId",
  },
  {
    id: 3,
    label: "Mobile No",
    queryName: "mobile No",
    fieldName: "mobileNo",
  },
  {
    id: 5,
    label: "Pincode",
    queryName: "Pincode",
    fieldName: "pincode",
  },
  {
    id: 6,
    label: "Area name",
    queryName: "Pincode Name",
    fieldName: "pincodeName",
  },
  {
    id: 7,
    label: "Status",
    queryName: "Status",
    fieldName: "status",
  },
];
export const filterInitialValues = {
  name: "",
  emailId: "",
  mobileNo: "",
  pincode: "",
  pincodeName: "",
  status: "",
};
