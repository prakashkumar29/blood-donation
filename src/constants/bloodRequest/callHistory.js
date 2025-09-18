import { formatTime } from "../globalConstants";

export const searchFields = [];

export const columns = [
  {
    Header: "Call Status",
    accessor: "callStatus",
    sticky: "left",
    minWidth: 250,
  },
  {
    Header: "Called Date",
    accessor: "calledAt",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["calledAt"]
        ? new Date(data?.["calledAt"]).toLocaleDateString()
        : "-",
  },
  {
    Header: "Called Time",
    accessor: "called",
    minWidth: 230,
    Cell: (props) =>
      props?.row?.original?.calledAt
        ? formatTime(props?.row?.original?.calledAt)
        : "-",
    getDetail: (data) =>
      data?.["calledAt"]
        ? new Date(data?.["calledAt"]).toLocaleTimeString()
        : "-",
  },
];
