import Cookies from "universal-cookie";
import { DeleteIcon, EditIcon } from "../styles";
import * as ROUTE_PATHS from "../routes/routePaths";

export const DASHBOARD = "dashboard";
export const BLOOD_SEEKERS = "bloodseekers";
export const MASTERS = "masters";
export const MAP_TO_DONOR = "maptodonors";
export const FEEDBACK = "feedback";
export const SAVE = "SAVE";
export const CANCEL = "CANCEL";
export const SUBMIT = "SUBMIT";
export const APPLY = "APPLY";
export const OKAY = "OKAY";
export const CLEAR = "CLEAR";
export const CLEARFILTER = "CLEAR FILTER";
export const NEW = "NEW";
export const ADD = "ADD";
export const UPDATE = "UPDATE";
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PINCODE_REGEX = /^6\d{5}$/;
export const dateFormatOption = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

// cookie settings

const cookies = new Cookies();

export const setCookie = (name, value) => {
  cookies.set(name, value, { path: "/" });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name, { path: "/" });
};

export const sideBarMenus = {
  admin: [
    {
      label: "dashboard",
      navigateTo: ROUTE_PATHS.DASHBOARD,
      value: "dashboard",
    },
    {
      label: "My Profile",
      value: "profile",
      navigateTo: ROUTE_PATHS.PROFILE,
    },
    {
      label: "masters",
      options: [
        {
          name: "Institution",
          navigateTo: ROUTE_PATHS.MASTERS_INSTITUTION_LIST,
        },
        {
          name: "Donor",
          navigateTo: ROUTE_PATHS.MASTERS_DONORS_LIST,
        },
        {
          name: "Volunteer",
          navigateTo: ROUTE_PATHS.MASTERS_VOLUNTEERS_LIST,
        },
        {
          name: "Individual Seekers",
          navigateTo: ROUTE_PATHS.INDIVIDUAL_SEEKERS_LIST,
        },
      ],
      value: "masters",
    },
    {
      label: "pincodes",
      options: [
        {
          name: "Pincode Master",
          navigateTo: ROUTE_PATHS.PINCODE_MASTERS_LIST,
        },
        {
          name: "First Level Search",
          navigateTo: ROUTE_PATHS.FIRST_LEVEL_SEARCH_LIST,
        },
        {
          name: "Second Level Search",
          navigateTo: ROUTE_PATHS.SECOND_LEVEL_SEARCH_LIST,
        },
      ],
      value: "pincodes",
    },
    {
      label: "Blood Requests",
      options: [
        {
          name: "Institutions",
          navigateTo: ROUTE_PATHS.BLOOD_SEEKERS_INSTITUTIONS_LIST,
        },
        {
          name: "Individual",
          navigateTo: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_LIST,
        },
      ],
      value: "bloodseekers",
    },
    {
      label: "Map To Donor",
      navigateTo: ROUTE_PATHS.MAP_TO_DONOR_LIST,
      value: "maptodonors",
    },
    {
      label: "Referal Requests",
      navigateTo: ROUTE_PATHS.REFERALS,
      value: "refer",
    },
    {
      label: "Feedback",
      navigateTo: ROUTE_PATHS.FEEDBACK_LIST,
      value: "feedback",
    },
    {
      label: "Certificate",
      navigateTo: ROUTE_PATHS.CERTIFICATE_LIST,
      value: "certificate",
    },
  ],
  institution: [
    {
      label: "Profile",
      navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
      value: "profile",
      options: [
        {
          name: "Edit",
          navigateTo: ROUTE_PATHS.PROFILE,
        },
        {
          name: "View",
          navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
        },
        {
          name: "Change password",
          navigateTo: ROUTE_PATHS.CHANGE_PASSWORD,
        },
      ],
    },
    {
      label: "Users",
      navigateTo: ROUTE_PATHS.USERS_LIST,
      value: "users",
    },
    {
      label: "Blood Requests",
      navigateTo: ROUTE_PATHS.CREATE_REQUEST_LIST,
      value: "createRequest",
    },
    {
      label: "Feedback",
      navigateTo: ROUTE_PATHS.FEEDBACK_LIST,
      value: "feedback",
    },
    {
      label: "Certificate",
      navigateTo: ROUTE_PATHS.CERTIFICATE_LIST,
      value: "certificate",
    },
  ],
  institutionUser: [
    {
      label: "Profile",
      navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
      value: "profile",
      options: [
        {
          name: "Edit",
          navigateTo: ROUTE_PATHS.PROFILE,
        },
        {
          name: "View",
          navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
        },
        {
          name: "Change password",
          navigateTo: ROUTE_PATHS.CHANGE_PASSWORD,
        },
      ],
    },
    {
      label: "Blood Requests",
      navigateTo: ROUTE_PATHS.CREATE_REQUEST_LIST,
      value: "createRequest",
    },
    {
      label: "Feedback",
      navigateTo: ROUTE_PATHS.FEEDBACK_LIST,
      value: "feedback",
    },
    {
      label: "Certificate",
      navigateTo: ROUTE_PATHS.CERTIFICATE_LIST,
      value: "certificate",
    },
    {
      label: "Refer a donor",
      navigateTo: ROUTE_PATHS.REFERALS,
      value: "refer",
    },
  ],
  individual: [
    {
      label: "Profile",
      navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
      value: "profile",
      options: [
        {
          name: "Edit",
          navigateTo: ROUTE_PATHS.PROFILE,
        },
        {
          name: "View",
          navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
        },
        {
          name: "Change password",
          navigateTo: ROUTE_PATHS.CHANGE_PASSWORD,
        },
      ],
    },
    {
      label: "Blood Requests",
      navigateTo: ROUTE_PATHS.CREATE_REQUEST_LIST,
      value: "createRequest",
    },
    {
      label: "Feedback",
      navigateTo: ROUTE_PATHS.FEEDBACK_LIST,
      value: "feedback",
    },
    {
      label: "Refer a donor",
      navigateTo: ROUTE_PATHS.REFERALS,
      value: "refer",
    },
  ],
  donar: [
    {
      label: "My Profile",
      value: "profile",
      navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
      options: [
        {
          name: "Edit",
          navigateTo: ROUTE_PATHS.PROFILE,
        },
        {
          name: "View",
          navigateTo: {
            pathname: ROUTE_PATHS.PROFILE,
            search: "viewDetails=true",
          },
        },
        {
          name: "Change password",
          navigateTo: ROUTE_PATHS.CHANGE_PASSWORD,
        },
      ],
    },
    {
      label: "Blood Request",
      value: "bloodRequest",
      options: [
        {
          name: "Current Request",
          navigateTo: ROUTE_PATHS.DONOR_CURRENT_REQUEST_LIST,
        },
        {
          name: "Transaction History",
          navigateTo: ROUTE_PATHS.TRANSACTION_HISTORY,
        },
        {
          name: "Call History",
          navigateTo: ROUTE_PATHS.CALL_HISTORY,
        },
      ],
    },
    {
      label: "Feedbacks",
      navigateTo: ROUTE_PATHS.FEEDBACK_LIST,
      value: "feedback",
    },
    {
      label: "Certificate",
      navigateTo: ROUTE_PATHS.CERTIFICATE_LIST,
      value: "certificate",
    },
    {
      label: "Refer a donor",
      navigateTo: ROUTE_PATHS.REFERALS,
      value: "refer",
    },
  ],
  volunteer: [
    {
      label: "My Profile",
      value: "profile",
      navigateTo: `${ROUTE_PATHS.PROFILE}?viewDetails=true`,
      options: [
        {
          name: "Edit",
          navigateTo: ROUTE_PATHS.PROFILE,
        },
        {
          name: "View",
          navigateTo: {
            pathname: ROUTE_PATHS.PROFILE,
            search: "viewDetails=true",
          },
        },
        {
          name: "Change password",
          navigateTo: ROUTE_PATHS.CHANGE_PASSWORD,
        },
      ],
    },
    {
      label: "masters",
      options: [
        {
          name: "Donor",
          navigateTo: ROUTE_PATHS.MASTERS_DONORS_LIST,
        },
        {
          name: "Volunteer",
          navigateTo: ROUTE_PATHS.MASTERS_VOLUNTEERS_LIST,
        },
        {
          name: "Individual Seekers",
          navigateTo: ROUTE_PATHS.INDIVIDUAL_SEEKERS_LIST,
        },
      ],
      value: "masters",
    },
    {
      label: "Blood Requests",
      options: [
        {
          name: "Institutions",
          navigateTo: ROUTE_PATHS.BLOOD_SEEKERS_INSTITUTIONS_LIST,
        },
        {
          name: "Individual",
          navigateTo: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_LIST,
        },
      ],
      value: "bloodseekers",
    },
    {
      label: "Map To Donar",
      navigateTo: ROUTE_PATHS.MAP_TO_DONOR_LIST,
      value: "maptodonors",
    },
    {
      label: "feedback",
      navigateTo: ROUTE_PATHS.FEEDBACK_LIST,
      value: "feedback",
    },
    {
      label: "Certificate",
      navigateTo: ROUTE_PATHS.CERTIFICATE_LIST,
      value: "certificate",
    },
    {
      label: "Refer a donor",
      navigateTo: ROUTE_PATHS.REFERALS,
      value: "refer",
    },
  ],
};

export const globalIcons = {
  delete: <DeleteIcon />,
  edit: <EditIcon />,
};
const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
export const timeFormatter = new Intl.DateTimeFormat(
  navigator.language,
  options
);
export const acceptRejectInputs = [
  {
    id: "acceptId",
    name: "Accept",
    code: "active",
  },
  {
    id: "rejectId",
    name: "Reject",
    code: "inActive",
  },
];
export const auditDetails = [
  { title: "Created By", detail: "createdBy" },
  { title: "Last Updated By", detail: "updatedBy" },
  { title: "Created Date", detail: "updatedAt" },
  { title: "Last Updated date", detail: "createdAt" },
];
const currentDate = new Date();
export const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 1);

export function formatTime(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}

export const codes = {
  admin: "admin",
  individual_seeker: "individual_seeker",
  donor: "donor",
  institution_seeker: "institution_seeker",
  super_admin: "super_admin",
  volunteer: "volunteer",
};