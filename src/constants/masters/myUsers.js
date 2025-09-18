import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const columns = (id) => [
  {
    Header: "User Name",
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
              path: ROUTE_PATHS.MY_USERS_FORM,
            },
            {
              label: "View Details",
              id: props.row.original.id,
              path: ROUTE_PATHS.MY_USERS_FORM,
              view: true,
            },
          ]}
          disable={props.row.original.id === id}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Email", accessor: "emailId", minWidth: 230 },
  { Header: "Mobile No", accessor: "mobileNo", minWidth: 230 },
  { Header: "Status", accessor: "status", minWidth: 200 },
];
export const searchFields = ["name", "mobileNo", "emailId", "status"];

export const filterFields = [
  {
    id: 1,
    label: "User Name",
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
    label: "Status",
    queryName: "Status",
    fieldName: "status",
  },
];
export const filterInitialValues = {
  name: "",
  emailId: "",
  mobileNo: "",
};
export const mobileMenuDetails = (userId) => [
  {
    label: "Edit",
    Icon: EditIcon,
    path: ROUTE_PATHS.MY_USERS_FORM,
    accessor: "id",
    checkHide: (data) => data?.id === userId,
  },
  {
    label: "View",
    Icon: VisibilityIcon,
    path: ROUTE_PATHS.MY_USERS_FORM,
    view: true,
    accessor: "id",
  },
];
export const initialValues = {
  name: "",
  mobileNo: "",
  whatsAppNo: "",
  emailId: "",
  institution: "",
  address: "",
  areaName: "",
  stateId: "",
  pincodeId: "",
  googleMapName: "",
  statusId: "",
  rejectReason: "",
};

export const labels = {
  name: "User Name *",
  mobileNo: "Mobile No *",
  whatsAppNo: "WhatsApp No *",
  emailId: "Email *",
  profileImage: "Image",
  address: "Address *",
  areaName: "Area name",
  stateId: "State",
  pincodeId: "Pincode *",
  googleMapName: "Google map name",
  statusId: "Status",
  rejectReason: "Inactive Reason *",
};
