import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditDeleteButtons from "../../components/shared/EditDeleteButtons";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DeleteIcon } from "../../styles";
import { APPROVE_INSTITUTION } from "../../api/apiPaths";
import UpdateModalButton from "../../components/shared/UpdateModalButton";

export const initialValues = {
  institutionTypeId: "",
  name: "",
  primaryContact: "",
  landlineNo: "",
  mobileNo: "",
  whatsAppNo: "",
  emailId: "",
  institution: "",
  institutionUsers: [],
  address: "",
  areaName: "",
  stateId: "",
  pincodeId: "",
  googleMapName: "",
  statusId: "active",
  rejectReason: "",
};

export const labels = {
  institutionTypeId: "Institution Type *",
  name: "Institution Name *",
  primaryContact: "Primary Contact person",
  landlineNo: "Landline Number",
  mobileNo: "Mobile No *",
  whatsAppNo: "WhatsApp No *",
  emailId: "Email *",
  institution: "Institution Images",
  address: "Address *",
  areaName: "Area name",
  stateId: "State",
  pincodeId: "Pincode *",
  googleMapName: "Google map name",
  statusId: "Status",
  rejectReason: "Inactive Reason *",
};
export const userInitialValues = {
  name: "",
  mobileNo: "",
  address: "",
};
export const userLabels = {
  name: "Name",
  mobileNo: "Mobile",
  address: "Address",
  Cell: (props) => props?.value.slice(0, 25) + "...",
};
export const MASTERS_INSTITUTIONS_COLUMN = (handleOpen, handleClick) => [
  {
    Header: "Institution Name",
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
              path: ROUTE_PATHS.MASTERS_INSTITUTION_FORM,
            },
            {
              label: "View Details",
              id: props.row.original.id,
              path: ROUTE_PATHS.MASTERS_INSTITUTION_FORM,
              view: true,
            },
            {
              toHide: !!props?.row?.original?.isApproved,
              customComp: (
                <UpdateModalButton
                  title="Approve"
                  id={props?.row?.original?.id}
                  patchPath={APPROVE_INSTITUTION}
                  propmptMessage="Are you sure want to approve this institution?"
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
  {
    Header: "Address",
    accessor: "address",
    minWidth: 230,
    Cell: (props) =>
      props?.value.length > 24
        ? props?.value.slice(0, 25) + "..."
        : props?.value,
    getDetail: (data) =>
      data?.address.length > 24
        ? data?.address.slice(0, 25) + "..."
        : data?.address,
  },
  { Header: "Pincode", accessor: "pincode", minWidth: 230 },
  { Header: "Loaction", accessor: "pincodeName", minWidth: 230 },
  { Header: "Status", accessor: "status", minWidth: 200 },
  {
    Header: "Approved status",
    accessor: "isApproved",
    minWidth: 200,
    Cell: (props) => (props?.value ? "Approved" : "Not approved"),
    getDetail: (data) => (data?.["isApproved"] ? "Approved" : "Not approved"),
  },
];

export const usersColumn = (handleDelete, handleEdit, isEditing) => {
  return [
    {
      Header: "Name",
      accessor: "name",
      sticky: "left",
      minWidth: 200,
    },
    {
      Header: "Mobile",
      accessor: "mobileNo",
      minWidth: 200,
    },
    {
      Header: "Address",
      accessor: "address",
      minWidth: 200,
      Cell: (props) =>
        props?.value?.length > 24
          ? props?.value?.slice(0, 25) + "..."
          : props?.value,
      getDetail: (data) =>
        data?.address.length > 24
          ? data?.address.slice(0, 25) + "..."
          : data?.address,
    },
    {
      Header: "Modify Users",
      sticky: "right",
      minWidth: 150,
      Cell: (props) => (
        <EditDeleteButtons
          menuDetails={[
            { label: "Remove", type: "delete", action: handleDelete },
            { label: "Edit", type: "edit", action: handleEdit },
          ]}
          isEditing={isEditing}
          props={props}
        />
      ),
    },
  ];
};
export const userSubMenus = (handleDelete, handleEdit, isEditing) => [
  { label: "Remove", action: handleDelete, isEditing, Icon: DeleteIcon },
  { label: "Edit", action: handleEdit, isEditing, Icon: EditIcon },
];

export const mobileMenuDetails = [
  {
    label: "Edit",
    Icon: EditIcon,
    path: ROUTE_PATHS.MASTERS_INSTITUTION_FORM,
    accessor: "id",
  },
  {
    label: "View",
    Icon: VisibilityIcon,
    path: ROUTE_PATHS.MASTERS_INSTITUTION_FORM,
    view: true,
    accessor: "id",
  },
];
export const bottomMenuDetails = (handleOpen, handleClick) => [
  {
    accessor: "id",
    checkHide: (data) => !!data?.["isApproved"],
    customComp: {
      Component: UpdateModalButton,
      title: "Approve",
      initialKeys: [["id", "id"]],
      patchPath: APPROVE_INSTITUTION,
      handleOpen: handleOpen,
      onClick: handleClick,
      propmptMessage: "Are you sure want to approve this institution?",
    },
  },
];

export const institutionSearch = [
  "name",
  "emailId",
  "mobileNo",
  "address",
  "pincode",
  "pincodeName",
  "status",
];

export const usersFields = [
  {
    id: 1,
    label: "Name *",
    name: "name",
    xs: 6,
  },
  {
    id: 2,
    label: "Mobile *",
    name: "mobileNo",
    type: "number",
    xs: 6,
    maxLength: 10,
  },
  {
    id: 3,
    label: "Address *",
    name: "address",
    xs: 12,
  },
];

export const filterFields = [
  {
    id: 1,
    label: "Institution Name",
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
    id: 4,
    label: "Address",
    queryName: "Address",
    fieldName: "address",
  },
  {
    id: 5,
    label: "Pincode",
    queryName: "Pincode",
    fieldName: "pincode",
  },
  {
    id: 6,
    label: "Location",
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
  address: "",
  pincode: "",
  pincodeName: "",
  status: "",
};
