import { lazy } from "react";
import * as ROUTE_PATHS from "./routePaths";
import Login from "../components/pages/login/Login";
import SetPassword from "../components/pages/login/SetPassword";
import VerifyOtp from "../components/pages/login/VerifyOtp";
import SignUpForm from "../components/pages/login/SignUpForm";

const DashBoard = lazy(() => import("../components/pages/dashboard/DashBoard"));
const Parameters = lazy(() =>
  import("../components/pages/parameters/Parameters")
);
const MastersInstitutionsList = lazy(() =>
  import("../components/pages/masters/institutions/List")
);
const MastersInstitutionsForm = lazy(() =>
  import("../components/pages/masters/institutions/Form")
);
const MastersDonorsList = lazy(() =>
  import("../components/pages/masters/donors/List")
);
const MastersDonarsForm = lazy(() =>
  import("../components/pages/masters/donors/Form")
);
const MastersVolunteersList = lazy(() =>
  import("../components/pages/masters/volunteers/List")
);
const MastersVolunteersForm = lazy(() =>
  import("../components/pages/masters/volunteers/Form")
);
const IndividualSeekersList = lazy(() =>
  import("../components/pages/masters/individualSeekers/List")
);
const IndividualSeekersForm = lazy(() =>
  import("../components/pages/masters/individualSeekers/Form")
);
const BloodSeekersInstitutionsList = lazy(() =>
  import("../components/pages/bloodSeekers/institutions/List")
);
const BloodSeekersInstitutionsForm = lazy(() =>
  import("../components/pages/bloodSeekers/institutions/Form")
);
const BloodSeekersIndividualsList = lazy(() =>
  import("../components/pages/bloodSeekers/individuals/List")
);
const BloodSeekersIndividualsForm = lazy(() =>
  import("../components/pages/bloodSeekers/individuals/Form")
);
const MyUsersList = lazy(() =>
  import("../components/pages/masters/myUsers/List")
);
const MyUsersForm = lazy(() =>
  import("../components/pages/masters/myUsers/Form")
);
const MapToDonarList = lazy(() =>
  import("../components/pages/maptodonors/List")
);
const MapToDonarForm = lazy(() =>
  import("../components/pages/maptodonors/Form")
);
const DonarDetails = lazy(() =>
  import("../components/pages/maptodonors/DonarDetails")
);
const FeedBackList = lazy(() => import("../components/pages/feedback/List"));
const FeedBackForm = lazy(() => import("../components/pages/feedback/Form"));

const PinCodeMasters = lazy(() =>
  import("../components/pages/pincodes/pincodeMaster/List")
);
const PinCodeMastersForm = lazy(() =>
  import("../components/pages/pincodes/pincodeMaster/Form")
);

const FirstLevelSearch = lazy(() =>
  import("../components/pages/pincodes/firstLevelSearch/List")
);
const FirstLevelSearchForm = lazy(() =>
  import("../components/pages/pincodes/firstLevelSearch/Form")
);

const SecondLevelSearch = lazy(() =>
  import("../components/pages/pincodes/secondLevelSearch/List")
);
const SecondLevelSearchForm = lazy(() =>
  import("../components/pages/pincodes/secondLevelSearch/Form")
);

const DonorProfile = lazy(() => import("../components/pages/profile/Donor"));
const InstitutionProfile = lazy(() =>
  import("../components/pages/profile/Institution")
);
const IndividualProfile = lazy(() =>
  import("../components/pages/profile/Individual")
);
const VolunteerProfile = lazy(() =>
  import("../components/pages/profile/Volunteer")
);
const AdminProfile = lazy(() => import("../components/pages/profile/Admin"));
const ChangePassword = lazy(() =>
  import("../components/pages/profile/ChangePassword")
);
const UsersForm = lazy(() => import("../components/pages/users/Form"));
const UsersList = lazy(() => import("../components/pages/users/List"));
const CreateRequestForm = lazy(() =>
  import("../components/pages/createRequest/Form")
);
const CreateRequestList = lazy(() =>
  import("../components/pages/createRequest/List")
);
const MappedList = lazy(() =>
  import("../components/pages/createRequest/MappedList")
);

const DonorBloodRequests = lazy(() =>
  import("../components/pages/bloodRequest/currentRequest/List")
);
const DonorBloodRequestForm = lazy(() =>
  import("../components/pages/bloodRequest/currentRequest/Form")
);
const TransactionHistory = lazy(() =>
  import("../components/pages/bloodRequest/transactionHistory/List")
);
const CallHistory = lazy(() =>
  import("../components/pages/bloodRequest/callHistory/List")
);
const CertificateList = lazy(() =>
  import("../components/pages/certificate/List")
);
const CertificateForm = lazy(() =>
  import("../components/pages/certificate/Form")
);
const ReferalForm = lazy(() => import("../components/pages/referal/Form"));
const Referals = lazy(() => import("../components/pages/referal/Referals"));

export const loginRoutes = [
  {
    path: ROUTE_PATHS.LOGIN,
    element: Login,
  },
  {
    path: ROUTE_PATHS.SET_PASSWORD,
    element: SetPassword,
  },
  {
    path: ROUTE_PATHS.VERIFY_OTP,
    element: VerifyOtp,
  },
  {
    path: ROUTE_PATHS.SIGN_UP,
    element: SignUpForm,
  },
];

export const adminRoutes = [
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: DashBoard,
  },
  {
    path: ROUTE_PATHS.PROFILE,
    element: AdminProfile,
  },
  {
    path: ROUTE_PATHS.CHANGE_PASSWORD,
    element: ChangePassword,
  },
  {
    path: ROUTE_PATHS.PROFILE_FORM,
    element: MyUsersForm,
  },
  {
    path: ROUTE_PATHS.MASTERS_INSTITUTION_LIST,
    element: MastersInstitutionsList,
  },
  {
    path: ROUTE_PATHS.PARAMETERS,
    element: Parameters,
  },
  {
    path: ROUTE_PATHS.MASTERS_INSTITUTION_FORM,
    element: MastersInstitutionsForm,
  },
  {
    path: ROUTE_PATHS.MASTERS_DONORS_LIST,
    element: MastersDonorsList,
  },
  {
    path: ROUTE_PATHS.MASTERS_DONORS_FORM,
    element: MastersDonarsForm,
  },
  {
    path: ROUTE_PATHS.MASTERS_DONORS_FORM,
    element: MastersDonarsForm,
  },
  {
    path: ROUTE_PATHS.MASTERS_VOLUNTEERS_LIST,
    element: MastersVolunteersList,
  },
  {
    path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_LIST,
    element: IndividualSeekersList,
  },
  {
    path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_FORM,
    element: IndividualSeekersForm,
  },
  {
    path: ROUTE_PATHS.MASTERS_VOLUNTEERS_FORM,
    element: MastersVolunteersForm,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INSTITUTIONS_LIST,
    element: BloodSeekersInstitutionsList,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INSTITUTIONS_FORM,
    element: BloodSeekersInstitutionsForm,
  },
  {
    path: ROUTE_PATHS.INSTITUTION_MAPPED_DONORS,
    element: MapToDonarForm,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_LIST,
    element: BloodSeekersIndividualsList,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
    element: BloodSeekersIndividualsForm,
  },
  {
    path: ROUTE_PATHS.INDIVIDUAL_MAPPED_DONORS,
    element: MapToDonarForm,
  },
  {
    path: ROUTE_PATHS.MAP_TO_DONOR_LIST,
    element: MapToDonarList,
  },
  {
    path: ROUTE_PATHS.MAP_TO_DONOR_FORM,
    element: MapToDonarForm,
  },
  {
    path: ROUTE_PATHS.DONAR_DETAILS,
    element: DonarDetails,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_LIST,
    element: FeedBackList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_FORM,
    element: FeedBackForm,
  },
  {
    path: ROUTE_PATHS.PINCODE_MASTERS_LIST,
    element: PinCodeMasters,
  },
  {
    path: ROUTE_PATHS.PINCODE_MASTERS_FORM,
    element: PinCodeMastersForm,
  },
  {
    path: ROUTE_PATHS.FIRST_LEVEL_SEARCH_LIST,
    element: FirstLevelSearch,
  },
  {
    path: ROUTE_PATHS.FIRST_LEVEL_SEARCH_FORM,
    element: FirstLevelSearchForm,
  },
  {
    path: ROUTE_PATHS.SECOND_LEVEL_SEARCH_LIST,
    element: SecondLevelSearch,
  },
  {
    path: ROUTE_PATHS.SECOND_LEVEL_SEARCH_FORM,
    element: SecondLevelSearchForm,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_LIST,
    element: CertificateList,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_FORM,
    element: CertificateForm,
  },
  {
    path: ROUTE_PATHS.MY_USERS_LIST,
    element: MyUsersList,
  },
  {
    path: ROUTE_PATHS.MY_USERS_FORM,
    element: MyUsersForm,
  },
  {
    path: ROUTE_PATHS.REFERALS,
    element: Referals,
  },
  {
    path: ROUTE_PATHS.ADD_DONOR,
    element: MastersDonarsForm,
  },
];

export const institutionRoutes = [
  {
    path: ROUTE_PATHS.PROFILE,
    element: InstitutionProfile,
  },
  {
    path: ROUTE_PATHS.CHANGE_PASSWORD,
    element: ChangePassword,
  },
  {
    path: ROUTE_PATHS.USERS_FORM,
    element: UsersForm,
  },
  {
    path: ROUTE_PATHS.USERS_LIST,
    element: UsersList,
  },
  {
    path: ROUTE_PATHS.CREATE_REQUEST_FORM,
    element: CreateRequestForm,
  },
  {
    path: ROUTE_PATHS.CREATE_REQUEST_LIST,
    element: CreateRequestList,
  },
  {
    path: ROUTE_PATHS.MAPPED_LIST,
    element: MappedList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_LIST,
    element: FeedBackList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_FORM,
    element: FeedBackForm,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_LIST,
    element: CertificateList,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_FORM,
    element: CertificateForm,
  },
];
export const institutionUserRoutes = [
  {
    path: ROUTE_PATHS.PROFILE,
    element: VolunteerProfile,
  },
  {
    path: ROUTE_PATHS.CHANGE_PASSWORD,
    element: ChangePassword,
  },
  {
    path: ROUTE_PATHS.CREATE_REQUEST_FORM,
    element: CreateRequestForm,
  },
  {
    path: ROUTE_PATHS.CREATE_REQUEST_LIST,
    element: CreateRequestList,
  },
  {
    path: ROUTE_PATHS.MAPPED_LIST,
    element: MappedList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_LIST,
    element: FeedBackList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_FORM,
    element: FeedBackForm,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_LIST,
    element: CertificateList,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_FORM,
    element: CertificateForm,
  },
  {
    path: ROUTE_PATHS.REFERALS,
    element: Referals,
  },
  {
    path: ROUTE_PATHS.REFERAL_FORM,
    element: ReferalForm,
  },
];

export const donarRoutes = [
  {
    path: ROUTE_PATHS.PROFILE,
    element: DonorProfile,
  },
  {
    path: ROUTE_PATHS.CHANGE_PASSWORD,
    element: ChangePassword,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_LIST,
    element: FeedBackList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_FORM,
    element: FeedBackForm,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_LIST,
    element: CertificateList,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_FORM,
    element: CertificateForm,
  },
  {
    path: ROUTE_PATHS.DONOR_CURRENT_REQUEST_LIST,
    element: DonorBloodRequests,
  },
  {
    path: ROUTE_PATHS.DONOR_CURRENT_REQUEST_FORM,
    element: DonorBloodRequestForm,
  },
  {
    path: ROUTE_PATHS.TRANSACTION_HISTORY,
    element: TransactionHistory,
  },
  {
    path: ROUTE_PATHS.CALL_HISTORY,
    element: CallHistory,
  },
  {
    path: ROUTE_PATHS.REFERALS,
    element: Referals,
  },
  {
    path: ROUTE_PATHS.REFERAL_FORM,
    element: ReferalForm,
  },
];

export const volunteerRoutes = [
  {
    path: ROUTE_PATHS.PROFILE,
    element: VolunteerProfile,
  },
  {
    path: ROUTE_PATHS.CHANGE_PASSWORD,
    element: ChangePassword,
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: DashBoard,
  },
  {
    path: ROUTE_PATHS.MASTERS_DONORS_LIST,
    element: MastersDonorsList,
  },
  {
    path: ROUTE_PATHS.MASTERS_DONORS_FORM,
    element: MastersDonarsForm,
  },
  {
    path: ROUTE_PATHS.MASTERS_VOLUNTEERS_LIST,
    element: MastersVolunteersList,
  },
  {
    path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_LIST,
    element: IndividualSeekersList,
  },
  {
    path: ROUTE_PATHS.INDIVIDUAL_SEEKERS_FORM,
    element: IndividualSeekersForm,
  },
  {
    path: ROUTE_PATHS.MASTERS_VOLUNTEERS_FORM,
    element: MastersVolunteersForm,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INSTITUTIONS_LIST,
    element: BloodSeekersInstitutionsList,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INSTITUTIONS_FORM,
    element: BloodSeekersInstitutionsForm,
  },
  {
    path: ROUTE_PATHS.INSTITUTION_MAPPED_DONORS,
    element: MapToDonarForm,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_LIST,
    element: BloodSeekersIndividualsList,
  },
  {
    path: ROUTE_PATHS.BLOOD_SEEKERS_INDIVIDUALS_FORM,
    element: BloodSeekersIndividualsForm,
  },
  {
    path: ROUTE_PATHS.INDIVIDUAL_MAPPED_DONORS,
    element: MapToDonarForm,
  },
  {
    path: ROUTE_PATHS.MAP_TO_DONOR_LIST,
    element: MapToDonarList,
  },
  {
    path: ROUTE_PATHS.MAP_TO_DONOR_FORM,
    element: MapToDonarForm,
  },
  {
    path: ROUTE_PATHS.DONAR_DETAILS,
    element: DonarDetails,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_LIST,
    element: FeedBackList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_FORM,
    element: FeedBackForm,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_LIST,
    element: CertificateList,
  },
  {
    path: ROUTE_PATHS.CERTIFICATE_FORM,
    element: CertificateForm,
  },
  {
    path: ROUTE_PATHS.REFERALS,
    element: Referals,
  },
  {
    path: ROUTE_PATHS.REFERAL_FORM,
    element: ReferalForm,
  },
];
export const individualSeekerRoutes = [
  {
    path: ROUTE_PATHS.PROFILE,
    element: IndividualProfile,
  },
  {
    path: ROUTE_PATHS.CHANGE_PASSWORD,
    element: ChangePassword,
  },
  {
    path: ROUTE_PATHS.CREATE_REQUEST_FORM,
    element: CreateRequestForm,
  },
  {
    path: ROUTE_PATHS.CREATE_REQUEST_LIST,
    element: CreateRequestList,
  },
  {
    path: ROUTE_PATHS.MAPPED_LIST,
    element: MappedList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_LIST,
    element: FeedBackList,
  },
  {
    path: ROUTE_PATHS.FEEDBACK_FORM,
    element: FeedBackForm,
  },
  {
    path: ROUTE_PATHS.REFERALS,
    element: Referals,
  },
  {
    path: ROUTE_PATHS.REFERAL_FORM,
    element: ReferalForm,
  },
];
