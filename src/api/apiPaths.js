// Login
export const verifyWithMobile = "/verifyUserWithMobile";
export const login = "/login";
export const setPassword = "/setPassword";
export const forgotPassword = "/resetPassword";
export const getUserDetailByToken = "/getUserDetailByToken";
export const refreshToken = "/refreshToken";
export const changePasswordApi = "/changePassword";

//Sign In
export const signUpIndividualSeeker = "/individualSeekerSignup";
export const signUpDonar = "/donorSignup";
export const signUpInstitution = "/institutionSignup";

// main
export const INSTITUTIONS = "/institutions";
export const INSTITUTION = "/institution";
export const DONORS = "/donors";
export const DONOR = "/donor";
export const VOLUNTEERS = "/volunteers";
export const VOLUNTEER = "/volunteer";
export const INDIVIDUAL_SEEKERS = "/individualSeekers";
export const INDIVIDUAL_SEEKER = "/individualSeeker";
export const AREA_GROUPS = "/areagroups";
export const AREA_GROUP = "/areagroup";
export const GET_SEED = "/getSeed";
export const SECOND_LEVEL_SEARCHES = "/secondLevelSearchs";
export const SECOND_LEVEL_SEARCH = "/secondLevelSearch";
export const GET_FIRST_LEVEL_PINCODES = "/getFirstLvlPincode";
export const BLOOD_REQUESTS = "/bloodRequests";
export const BLOOD_REQUEST = "/bloodRequest";
export const BLOOD_REQUEST_REQUEST_STATUS = "/bloodRequestStatus";
export const BLOOD_REQUEST_CALL_STATUS = "/bloodRequestStatus";
export const BLOOD_REQUEST_QUEUE_STATUS = "/bloodRequestStatus";
export const FEEDBACKS = "/feedbacks";
export const FEEDBACK = "/feedback";
export const DONOR_FEEDBACKS = "/getDonorForFeedback";
export const GET_DONORS_FOR_CERTIFICATE = "/getDonorForCertificate";
export const CERTIFICATE = "/certificate";
export const CERTIFICATES = "/certificates";
export const DONOR_REQUESTS = "/donorRequests";
export const DONOR_WITH_CALL_HISTORY = "/donorWithCallHistory";
export const INSTITUTION_USERS = "/institutionUsers";
export const INSTITUTION_USER = "/institutionUser";
export const USERS = "/users";
export const USER = "/user";

//seeds
export const role = "role";
export const states = "state";
export const pincodes = "pincode";
export const institutionTypes = "institutionType";
export const status = "status";
export const roles = "role";
export const bloodSeekerTypes = "bloodSeeker";
export const bloodGroup = "bloodGroup";
export const adminUsers = "adminUser";
export const institutionSeekers = "institutionSeeker";
// export const institutionUsers = "institutionUser";
export const individualSeekers = "individualUser";
export const volunteers = "volunteer";
export const callStatus = "callStatus";
export const requestStatus = "requestStatus";
export const queueStatus = "queueStatus";
export const genders = "gender";
export const donationTypes = "donationType";

//pincodes
export const pincodeMasters = "/pincodes";
export const pincode = "/pincode";

// first level search
export const firstLevelSearch = "/firstLevelSearchs";
export const createFirstLevelSearch = "/firstLevelSearch";
export const getFirstLevelSearch = "/firstLevelSearch";
export const updateFirstLevelSearch = "/firstLevelSearch";

// map to donars

export const searchDonars = "/searchDonors";
export const donarHistory = "/donorWithCallHistory";
export const updateCallHistory = "/donorCallStatus";
export const mapDonarRequest = "/mapDonorRequest";
export const getAllMappedDonors = "/mappedDonors";
export const updateDonatedStatus = "/donorDonated";
export const updateAcceptedStatus = "/mappedDonorStatus";
export const bloodRequestsToMap = "/bloodRequestsToBeMapped";

//common
export const ADD_AS_DONOR = "/assignAsDonor";
export const updateGeneralparams = "/update/generalParam";
export const getGeneralParam = "getSeed/generalParam";
export const createInstitutionType = "/param/create/institutionType";
export const updateInstitutionType = "/param/update/institutionType";
export const getAllinstitutionType = "param/getAllDetail/institutionType";
export const deleteParam = "/param/delete/institutionType";
//referal
export const REFER_USER = "/referUser";
export const REFERED_USERS = "/referredUsers";
export const REFERRED_USER = "/referredUser";
export const REFERRED_CALL_STATUS = "/referredUserCallStatus";
//dashboard
export const DONORS_REPORT = "/donorsReport";
export const BLOOD_REQUEST_REPORTS = "/bloodRequestsReport";
export const DROPPED_DONORS_REPORT = "/droppedOutDonorsReport";
//approve
export const APPROVE_USER = "/approveUser";
export const APPROVE_INSTITUTION = "/approveInstitution";
