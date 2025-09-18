import { EditPopover, OptionsContainer } from "../../components/shared";
import EditDeleteButtons from "../../components/shared/EditDeleteButtons";
import { SECOND_LEVEL_SEARCH_FORM } from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DeleteIcon } from "../../styles";

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
              path: SECOND_LEVEL_SEARCH_FORM,
            },
            {
              label: "View Details",
              id: props.row.original.id,
              path: SECOND_LEVEL_SEARCH_FORM,
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
    path: SECOND_LEVEL_SEARCH_FORM,
    accessor: "id",
  },
  {
    label: "View",
    Icon: VisibilityIcon,
    path: SECOND_LEVEL_SEARCH_FORM,
    view: true,
    accessor: "id",
  },
];

export const pincodeFields = [
  {
    id: 1,
    label: "Search Pincodes *",
    name: "mappingPincodeId",
    accessor: "code",
    xs: 12,
    fieldType: "autocomplete",
  },
];
export const initialValues = {
  mappingPincodeId: "",
};

export const secondaryColumns = (handleDelete, handleEdit, isEditing) => {
  return [
    {
      Header: "Pincode",
      accessor: "code",
      sticky: "left",
      minWidth: 200,
    },
    {
      Header: "Area",
      accessor: "name",
    },
    {
      Header: "Remove",
      minWidth: 150,
      Cell: (props) => (
        <EditDeleteButtons
          menuDetails={[
            { label: "Remove", type: "delete", action: handleDelete },
          ]}
          isEditing={isEditing}
          props={props}
        />
      ),
    },
  ];
};
export const secondaryMobileMenus = (handleDelete, handleEdit, isEditing) => [
  { label: "Remove", action: handleDelete, isEditing, Icon: DeleteIcon },
];

export const searchFields = ["name", "code"];
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
export const filterIntialValues = {
  name: "",
  code: "",
};
