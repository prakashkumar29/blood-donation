import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { codes } from "../globalConstants";

export const MASTERS_VOLUNTEERS_COLUMN = (id, code) => {
  return [
    {
      Header: "Volunteer Name",
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
                path: ROUTE_PATHS.MASTERS_VOLUNTEERS_FORM,
              },
              {
                label: "View Details",
                id: props.row.original.id,
                path: ROUTE_PATHS.MASTERS_VOLUNTEERS_FORM,
                view: true,
              },
            ]}
            disable={code === codes.volunteer && id === props.row?.original?.id}
          />
        </OptionsContainer>
      ),
    },
    { Header: "Email", accessor: "emailId", minWidth: 230 },
    { Header: "Mobile No", accessor: "mobileNo", minWidth: 230 },
    { Header: "Status", accessor: "status", minWidth: 200 },
    { Header: "Area Name", accessor: "pincodeName", minWidth: 200 },
    { Header: "Pincode", accessor: "pincode", minWidth: 200 },
  ];
};
export const mobileMenuDetails = (userId) => [
  {
    label: "Edit",
    Icon: EditIcon,
    path: ROUTE_PATHS.MASTERS_VOLUNTEERS_FORM,
    accessor: "id",
    checkHide: (data) => data?.id === userId,
  },
  {
    label: "View",
    Icon: VisibilityIcon,
    path: ROUTE_PATHS.MASTERS_VOLUNTEERS_FORM,
    view: true,
    accessor: "id",
  },
];

export const searchFields = [
  "name",
  "mobileNo",
  "emailId",
  "pincode",
  "pincodeName",
  "status",
];

export const initialValues = {
  roleId: "",
  name: "",
  mobileNo: "",
  whatsAppNo: "",
  emailId: "",
  profileImage: "",
  address: "",
  areaName: "",
  stateId: "",
  pincodeId: "",
  googleMapName: "",
  statusId: "",
  rejectReason: "",
};

export const labels = {
  roleId: "Role",
  name: "Volunteer Name *",
  mobileNo: "Mobile No *",
  whatsAppNo: "WhatsApp No *",
  emailId: "Email *",
  profileImage: "Volunteer Image",
  address: "Address",
  areaName: "Area name",
  stateId: "State",
  pincodeId: "Pincode *",
  googleMapName: "Google map name",
  statusId: "Status",
  rejectReason: "Inactive Reason *",
};
export const filterFields = [
  {
    id: 1,
    label: "Volunteer Name",
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
