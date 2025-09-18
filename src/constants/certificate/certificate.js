import { EditPopover, OptionsContainer } from "../../components/shared";
import * as ROUTE_PATHS from "../../routes/routePaths";
import { getDateFormat } from "../../utils/common";
import { CERTIFICATES, GET_DONORS_FOR_CERTIFICATE } from "../../api/apiPaths";
import { Download } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const fetchPaths = {
  donor: CERTIFICATES,
  volunteer: GET_DONORS_FOR_CERTIFICATE,
  admin: GET_DONORS_FOR_CERTIFICATE,
  super_admin: GET_DONORS_FOR_CERTIFICATE,
};
export const searchFields = ["name", "bloodGroup", "donorName", "noOfUnits"];

export const initialValues = {
  certificate: "",
};
export const labels = {
  certificate: "Upload Certificate",
};

export const columns = [
  {
    Header: "Requested By",
    accessor: "name",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: props.row?.original?.certificateId
                ? "Update Certificate"
                : "Upload Certificate",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS.CERTIFICATE_FORM,
              stateProps: {
                bloodRequestId: props?.row?.original?.bloodRequestId,
                donorId: props?.row?.original?.donorId,
                hospitalName: props?.row?.original?.name,
                dateOfDonation: props?.row?.original?.donatedDate,
                certificateId: props?.row?.original?.certificateId,
                donorName: props?.row?.original?.donorName,
              },
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Donor name", accessor: "donorName", minWidth: 230 },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "No of units", accessor: "noOfUnits", minWidth: 230 },
  {
    Header: "Donated Date",
    accessor: "donatedDate",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["donatedDate"]
        ? new Date(data?.["donatedDate"]).toLocaleDateString()
        : "-",
  },
  {
    Header: "Certificate Uploaded",
    accessor: "isCertificateUploaded",
    minWidth: 250,
    Cell: (props) =>
      props?.row?.original?.isCertificateUploaded ? "Yes" : "No",
    getDetail: (data) => (data?.["isCertificateUploaded"] ? "Yes" : "No"),
  },
];
export const secondaryColumns = [
  {
    Header: "Donor name",
    accessor: "donorName",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => (
      <OptionsContainer>
        {props.value}
        <EditPopover
          inputValues={[
            {
              label: props.row?.original?.certificateId
                ? "Update Certificate"
                : "Upload Certificate",
              id: props?.row?.original?.id,
              path: ROUTE_PATHS.CERTIFICATE_FORM,
              stateProps: {
                bloodRequestId: props?.row?.original?.bloodRequestId,
                donorId: props?.row?.original?.donorId,
                hospitalName: props?.row?.original?.name,
                dateOfDonation: props?.row?.original?.donatedDate,
                certificateId: props?.row?.original?.certificateId,
                donorName: props?.row?.original?.donorName,
              },
            },
          ]}
        />
      </OptionsContainer>
    ),
  },
  { Header: "Blood Group", accessor: "bloodGroup", minWidth: 230 },
  { Header: "No of units", accessor: "noOfUnits", minWidth: 230 },
  {
    Header: "Donated Date",
    accessor: "donatedDate",
    minWidth: 230,
    Cell: (props) =>
      props?.value ? new Date(props?.value).toLocaleDateString() : "-",
    getDetail: (data) =>
      data?.["donatedDate"]
        ? new Date(data?.["donatedDate"]).toLocaleDateString()
        : "-",
  },
  {
    Header: "Certificate Uploaded",
    accessor: "isCertificateUploaded",
    minWidth: 250,
    Cell: (props) =>
      props?.row?.original?.isCertificateUploaded ? "Yes" : "No",
    getDetail: (data) => (data?.["isCertificateUploaded"] ? "Yes" : "No"),
  },
];
export const mobileMenuDetails = [
  {
    label: "Upload Ceritificate",
    getLabel: (data) =>
      data?.["isCertificateUploaded"]
        ? "Update Certificate"
        : "Upload Ceritificate",
    path: ROUTE_PATHS.CERTIFICATE_FORM,
    accessor: "id",
    stateProps: [
      ["bloodRequestId", "bloodRequestId"],
      ["donorId", "donorId"],
      ["hospitalName", "name"],
      ["dateOfDonation", "donatedDate"],
      ["certificateId", "certificateId"],
      ["donorName", "donorName"],
    ],
  },
];
export const mobileDonorMenus = [
  {
    label: "Download certificate",
    accessor: "id",
    action: (data) => {
      const anchor = document.createElement("a");
      anchor.href = data?.["certificateUrl"];
      anchor.download = "downloaded-certificate.jpg";
      anchor.click();
    },
  },
];

export const donorColumns = [
  {
    Header: "Donated To",
    accessor: "hospitalName",
    sticky: "left",
    minWidth: 250,
    Cell: (props) => <OptionsContainer>{props.value}</OptionsContainer>,
  },
  {
    Header: "Donated Date",
    accessor: "dateOfDonation",
    minWidth: 230,
    Cell: (props) => getDateFormat(props?.value),
    getDetail: (data) =>
      data?.["dateOfDonation"]
        ? new Date(data?.["dateOfDonation"]).toLocaleDateString()
        : "-",
  },
  {
    Header: "Download",
    Cell: (props) => (
      <IconButton
        onClick={() => {
          const anchor = document.createElement("a");
          anchor.href = props?.row?.original?.certificateUrl;
          anchor.download = "downloaded-certificate.jpg";
          anchor.click();
        }}
      >
        <Download />
      </IconButton>
    ),
  },
];
export const filterFields = [
  {
    id: 1,
    label: "Requested By",
    queryName: "RequestedBy",
    fieldName: "name",
  },
  {
    id: 2,
    label: "Donor name",
    queryName: "Name",
    fieldName: "donorName",
  },
  {
    id: 2,
    label: "Blood Group",
    queryName: "BloodGroup",
    fieldName: "bloodGroup",
  },
  {
    id: 3,
    label: "No of units",
    queryName: "Noofunits",
    fieldName: "noOfUnits",
  },
];
export const filterInitialValues = {
  name: "",
  bloodGroup: "",
  noOfUnits: "",
};
