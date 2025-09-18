import { EditPopover, OptionsContainer } from "../../components/shared";
import { PINCODE_MASTERS_FORM } from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";

export const columns = [
  {
    Header: "Pincode",
    accessor: "code",
    minWidth: 230,
    sticky: "left",
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: "Edit",
              id: props.row.original.id,
              path: PINCODE_MASTERS_FORM,
            },
            {
              label: "View Details",
              id: props.row.original.id,
              path: PINCODE_MASTERS_FORM,
              view: true,
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Place", accessor: "name", minWidth: 230 },
];
export const mobileMenuDetails = [
  {
    label: "Edit",
    Icon: EditIcon,
    path: PINCODE_MASTERS_FORM,
    accessor: "id",
  },
];

export const searchParams = ["name", "code"];

export const filterFields = [
  {
    id: 1,
    label: "Place Name",
    queryName: "Place",
    fieldName: "name",
  },
  {
    id: 2,
    label: "Pincode",
    queryName: "Pincode",
    fieldName: "code",
  },
];

export const filterInitialValues = {
  name: "",
  code: "",
};
