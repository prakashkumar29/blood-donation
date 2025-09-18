import { codes, sideBarMenus } from "../constants/globalConstants";
import {
  adminRoutes,
  donarRoutes,
  individualSeekerRoutes,
  institutionRoutes,
  institutionUserRoutes,
  volunteerRoutes,
} from "../routes/routes";

export const getRoutes = (code, isInstitution) => {
  if (code === codes.admin || code === codes.super_admin) return adminRoutes;
  if (code === codes.institution_seeker) {
    return isInstitution ? institutionRoutes : institutionUserRoutes;
  }
  if (code === codes.donor) return donarRoutes;
  if (code === codes.volunteer) return volunteerRoutes;
  if (code === codes.individual_seeker) return individualSeekerRoutes;
  return [];
};

export const getSideMenus = (code, isInstitution) => {
  if (code === codes.admin || code === codes.super_admin) return sideBarMenus.admin;
  if (code === codes.institution_seeker) {
    return isInstitution
      ? sideBarMenus.institution
      : sideBarMenus.institutionUser;
  }
  if (code === codes.donor) return sideBarMenus.donar;
  if (code === codes.volunteer) return sideBarMenus.volunteer;
  if (code === codes.individual_seeker) return sideBarMenus.individual;
  return [];
};
