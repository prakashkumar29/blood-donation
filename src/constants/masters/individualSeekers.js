import { APPROVE_USER } from "../../api/apiPaths";
import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateModalButton from "../../components/shared/UpdateModalButton";

export const columns = (handleOpen, handleClick) => [
  {
    Header: "Individual Seeker Name",
    accessor: "name",
    sticky: "left",
    minWidth: 280,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: "Edit",
              id: props.row.original.id,
              path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_FORM,
            },
            {
              label: "View Details",
              id: props.row.original.id,
              path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_FORM,
              view: true,
            },
            {
              toHide: !!props?.row?.original?.isApproved,
              customComp: (
                <UpdateModalButton
                  title="Approve"
                  id={props?.row?.original?.id}
                  patchPath={APPROVE_USER}
                  propmptMessage="Are you sure want to approve this user?"
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
    getDetail: (data) => data?.["emailId"] || "N/A",
  },
  { Header: "Mobile No", accessor: "mobileNo", minWidth: 230 },
  { Header: "Status", accessor: "status", minWidth: 200 },
  { Header: "Area Name", accessor: "pincodeName", minWidth: 200 },
  { Header: "Pincode", accessor: "pincode", minWidth: 200 },
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
    path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_FORM,
    accessor: "id",
  },
  {
    label: "View",
    Icon: VisibilityIcon,
    path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_FORM,
    view: true,
    accessor: "id",
  },
];
export const bottomMenuDetails = (handleOpen, handleClick) => [
  {
    accessor: "id",
    checkHide: (data) => !!data?.isApproved,
    customComp: {
      Component: UpdateModalButton,
      title: "Approve",
      initialKeys: [["id", "id"]],
      patchPath: APPROVE_USER,
      handleOpen: handleOpen,
      onClick: handleClick,
      propmptMessage: "Are you sure want to approve this user?",
    },
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
  name: "",
  mobileNo: "",
  whatsAppNo: "",
  emailId: "",
  genderId: "male",
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
  name: "User Name *",
  mobileNo: "Mobile No *",
  whatsAppNo: "WhatsApp No *",
  emailId: "Email *",
  genderId: "Gender",
  profileImage: "Image",
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
