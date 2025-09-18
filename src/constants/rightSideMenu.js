import { LOGIN, MY_USERS_LIST, PARAMETERS } from "../routes/routePaths";
import { codes } from "./globalConstants";

export const RIGHT_SIDE_NAVS = [
  {
    id: 1,
    routePath: MY_USERS_LIST,
    label: "My Users",
    render: (code) => code === codes?.admin || code === codes?.super_admin,
  },
  {
    id: 2,
    routePath: PARAMETERS,
    label: "Parameters",
    render: (code) => code === codes?.admin || code === codes?.super_admin,
  },
  {
    id: 3,
    routePath: LOGIN,
    label: "Logout",
    type: "logout",
  },
];
