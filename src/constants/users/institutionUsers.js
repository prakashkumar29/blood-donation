import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const columns = [
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
              path: ROUTE_PATHS.USERS_FORM,
            },
            {
              label: "View Details",
              id: props.row.original.id,
              path: ROUTE_PATHS.USERS_FORM,
              view: true,
            },
          ]}
        />
      </OptionsContainer>
    ),
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
  },
];
export const mobileMenuDetails = [
  {
    label: "Edit",
    Icon: EditIcon,
    path: ROUTE_PATHS.USERS_FORM,
    accessor: "id",
  },
  {
    label: "View",
    Icon: VisibilityIcon,
    path: ROUTE_PATHS.USERS_FORM,
    view: true,
    accessor: "id",
  },
];

export const searchFields = ["name", "mobileNo", "address"];
export const filterFields = [
  {
    id: 1,
    label: "User Name",
    queryName: "Name",
    fieldName: "name",
  },
  {
    id: 2,
    label: "Mobile",
    queryName: "Mobile",
    fieldName: "mobileNo",
  },
  {
    id: 3,
    label: "Address",
    queryName: "Address",
    fieldName: "address",
  },
];
export const initialValues = {
  name: "",
  mobileNo: "",
  address: "",
};
