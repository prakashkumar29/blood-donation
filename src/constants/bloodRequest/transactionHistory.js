export const columns = [
  {
    Header: "Requested From",
    accessor: "seekerName",
    sticky: "left",
    minWidth: 250,
  },
  {
    Header: "Date of need",
    accessor: "dateOfNeed",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["dateOfNeed"]
        ? new Date(data?.["dateOfNeed"]).toLocaleDateString()
        : "-",
  },
];

export const searchFields = ["seekerName", "dateOfNeed"];
