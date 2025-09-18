import { EditPopover, OptionsContainer } from "../../components/shared";
import { CustomTitle } from "../../styles";
import CustomMobileTitle from "../../components/shared/CustomMobileTitle";

export const columns = (
  isCancelled,
  isForceCompleted,
  handleReject,
  handleDonated
) => [
  {
    Header: "Blood Request Id",
    accessor: "requestId",
    minWidth: 230,
    sticky: "left",
    Cell: (props) => (
      <OptionsContainer>
        {props?.value}
        <EditPopover
          inputValues={[
            {
              customComp: (
                <CustomTitle
                  onClick={() => handleReject(props.row.original?.id)}
                >
                  Reject
                </CustomTitle>
              ),
            },
            {
              customComp: (
                <CustomTitle
                  onClick={() => handleDonated(props.row.original?.id)}
                >
                  Mark as donated
                </CustomTitle>
              ),
              toHide:
                !Boolean(props.row.original?.accepted) ||
                Boolean(isForceCompleted),
            },
          ]}
          disable={
            Boolean(isCancelled) ||
            Boolean(props.row.original?.donated) ||
            !Boolean(props.row.original?.accepted)
          }
        />
      </OptionsContainer>
    ),
  },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "Donor Name", accessor: "donorName", minWidth: 230 },
  { Header: "Donor Mobile", accessor: "donorMobile", minWidth: 230 },
  {
    Header: "Accepted",
    accessor: "accepted",
    width: 150,
    Cell: (props) => <>{props.row.original?.accepted === 0 ? "No" : "Yes"}</>,
    getDetail: (data) => (data?.accepted === 0 ? "No" : "Yes"),
  },
  {
    Header: "Donated",
    accessor: "donated",
    width: 150,
    Cell: (props) => <>{props.row.original?.donated === 0 ? "No" : "Yes"}</>,
    getDetail: (data) => (data?.donated === 0 ? "No" : "Yes"),
  },
  {
    Header: "Donated Date",
    accessor: "donatedDate",
    width: 200,
    Cell: (props) => (
      <>
        {props.row.original?.donatedDate
          ? new Date(props.row.original?.donatedDate).toLocaleDateString()
          : "N/A"}
      </>
    ),
    getDetail: (data) =>
      data?.["donatedDate"]
        ? new Date(data?.["donatedDate"]).toLocaleDateString()
        : "N/A",
  },
];

export const search = [
  "id",
  "requestId",
  "bloodGroup",
  "donorName",
  "donorMobile",
];

export const filterFields = [
  {
    id: 1,
    label: "Blood Request Id",
    queryName: "request Id",
    fieldName: "requestId",
  },
  {
    id: 2,
    label: "Blood Group",
    queryName: "blood Group",
    fieldName: "bloodGroup",
  },
  {
    id: 3,
    label: "Donor Name",
    queryName: "donor Name",
    fieldName: "donorName",
  },
  {
    id: 4,
    label: "Donor Mobile",
    queryName: "donorMobile",
    fieldName: "donorMobile",
  },
];
export const filterInitialValues = {
  requestId: "",
  bloodGroup: "",
  donorName: "",
  donorMobile: "",
};
export const mobileMenuDetails = (
  isCancelled,
  isForceCompleted,
  handleReject,
  handleDonated,
) => [
  {
    checkHide: (data) =>
      !Boolean(data?.accepted) ||
      Boolean(data?.donated) ||
      Boolean(isCancelled) ||
      Boolean(isForceCompleted),
    customComp: {
      Component: CustomMobileTitle,
      label: "Mark as donated",
      handleClick: handleDonated,
      initialKeys: [["id", "id"]],
    },
  },
  {
    checkHide: (data) =>
      Boolean(data?.donated) ||
      !Boolean(data.accepted) ||
      Boolean(isCancelled),
    customComp: {
      Component: CustomMobileTitle,
      label: "Reject",
      handleClick: handleReject,
      initialKeys: [["id", "id"]],
    },
  },
];
