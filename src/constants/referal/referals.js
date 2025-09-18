import { Phone } from "@mui/icons-material";
import { REFERRED_CALL_STATUS, callStatus } from "../../api/apiPaths";
import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import EditIcon from "@mui/icons-material/Edit";
import UpdateModalButton from "../../components/shared/UpdateModalButton";

export const initialValues = {
  name: "",
  mobileNo: "",
  emailId: "",
  dateOfBirth: "",
};
export const searchFields = ["name", "mobileNo", "emailId", "callStatus"];
export const referredSearchFields = [
  "name",
  "mobileNo",
  "emailId",
  "callStatus",
  "referredBy",
];
export const updateFields = [
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
];
export const columns = [
  {
    Header: "Refered name",
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
              path: ROUTE_PATHS.REFERAL_FORM,
              toHide: !!props?.row?.original?.isAddedAsDonor,
            },
          ]}
          disable={!!props?.row?.original?.isAddedAsDonor}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Mobile No", accessor: "mobileNo", minWidth: 230 },
  { Header: "Email", accessor: "emailId", minWidth: 230 },
  { Header: "Call status", accessor: "callStatus", minWidth: 200 },
  {
    Header: "Added as donor",
    accessor: "isAddedAsDonor",
    minWidth: 200,
    Cell: (props) => (props?.value ? "Added" : "No"),
    getDetail: (data) => (data?.["isAddedAsDonor"] ? "Added" : "No"),
  },
];
export const mobileMenuDetails = [
  {
    label: "Assign/Edit",
    accessor: "id",
    path: ROUTE_PATHS.REFERAL_FORM,
    Icon: EditIcon,
    checkHide: (data) => !!data?.isAddedAsDonor,
  },
];

export const referredColumns = (handleOpen, handleClick) => [
  {
    Header: "Refered name",
    accessor: "name",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          disable={!!props?.row?.original?.isAddedAsDonor}
          inputValues={[
            {
              id: props.row.original.id,
              toHide: props?.row?.original?.callStatus === "Call connected",
              customComp: (
                <UpdateModalButton
                  title="Update Call Status"
                  id={props.row.original.id}
                  initialValues={{
                    callStatusId: props?.row?.original?.["callStatusId"] || "",
                  }}
                  updateFieldsIndex={0}
                  seedType="callStatus"
                  updatePath={REFERRED_CALL_STATUS}
                  handleOpen={handleOpen}
                  onClick={handleClick}
                />
              ),
            },
            {
              label: "Add as donor",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS.ADD_DONOR,
              toHide:
                props?.row?.original?.callStatus !== "Call connected" ||
                !!props?.row?.original?.isAddedAsDonor,
              stateProps: { referalId: props?.row?.original?.id },
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Mobile No", accessor: "mobileNo", minWidth: 230 },
  { Header: "Email", accessor: "emailId", minWidth: 230 },
  { Header: "Call status", accessor: "callStatus", minWidth: 200 },
  {
    Header: "Added as donor",
    accessor: "isAddedAsDonor",
    minWidth: 200,
    Cell: (props) => (props?.value ? "Added" : "No"),
    getDetail: (data) => (data?.["isAddedAsDonor"] ? "Added" : "No"),
  },
  { Header: "Referred by", accessor: "referredBy", minWidth: 200 },
];
export const topMenuDetails = [
  {
    hasCall: true,
    Icon: Phone,
    checkHide: (data) => data?.["callStatus"] === "Call connected",
  },
];
export const mobileReferredColumns = (handleOpen, handleClick) => [
  {
    accessor: "id",
    checkHide: (data) =>
      data?.["callStatus"] === "Call connected" || !!data?.isAddedAsDonor,
    customComp: {
      Component: UpdateModalButton,
      title: "Update Call Status",
      handleOpen: handleOpen,
      onClick: handleClick,
      seedType: callStatus,
      updatePath: REFERRED_CALL_STATUS,
      initialKeys: [["id", "id"]],
      updateFieldsIndex: 0,
    },
    inititialValueKeys: [["callStatusId", "callStatusId"]],
  },
  {
    label: "Add as Donor",
    accessor: "id",
    path: ROUTE_PATHS.ADD_DONOR,
    stateProps: [["referalId", "id"]],
    checkHide: (data) =>
      !!data?.isAddedAsDonor || data?.["callStatus"] !== "Call connected",
  },
];
export const filterFields = [
  {
    id: 1,
    label: "Refered name",
    queryName: "Name",
    fieldName: "name",
  },
  {
    id: 2,
    label: "Mobile No",
    queryName: "MobileNo",
    fieldName: "mobileNo",
  },
  {
    id: 3,
    label: "Email",
    queryName: "E-mail",
    fieldName: "emailId",
  },
  {
    id: 4,
    label: "Call status",
    queryName: "CallStatus",
    fieldName: "callStatus",
  },
  {
    id: 5,
    label: "Referred by",
    queryName: "ReferredBy",
    fieldName: "referredBy",
  },
];
export const filterInitialValues = {
  name: "",
  mobileNo: "",
  emailId: "",
  callStatus: "",
  referredBy: "",
};
