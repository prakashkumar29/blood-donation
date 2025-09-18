import { IconButton } from "@mui/material";
import { DeleteIcon, EditIcon } from "../styles";
import { object, string } from "yup";

export const PARAMETERS = "PARAMETERS";

export const globalParamStepper = [
  {
    label: "InstitutionType",
    value: 0,
    initVal: "institutionType",
  },
  {
    label: "General Parameter",
    value: 1,
    initVal: "generalParam",
  },
];

export const ParametersFormList = (handleEditList,handleDelete ,editId) => {
  return [
    {
      Header: "Institution Type",
      accessor: "name",
      id: 1,
      width: 180,
      sticky: "left",
    },
    {
      Header: "Edit",
      width: 100,
      Cell: (props) => (
        <div>
          <IconButton
            onClick={() => handleEditList(props.row.original)}
            disabled={editId ? true : false}
          >
            <EditIcon sx={{fontSize:'16px'}} />
          </IconButton>
        </div>
      ),
    },
    {
      Header: "Delete",
      width: 100,
      Cell: (props) => (
        <div>
          <IconButton
            onClick={() => handleDelete(props.row.original?.id)}
            disabled={editId ? true : false}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
};

export const validationSchema = object({
  dedicativeWhatsappNumber: string()
    .required("Mobile number is required")
    .length(10, "Mobile Number should be 10 digits")
})