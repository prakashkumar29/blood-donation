import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { loginRoutes } from "../routes/routes";
import { theme } from "../styles";
import { ThemeProvider } from "@emotion/react";
import {
  LAYOUT,
  LOGIN,
  NOT_FOUND,
  SET_PASSWORD,
  VERIFY_OTP,
} from "../routes/routePaths";
import { QueryClientProvider, QueryClient, QueryCache } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import useNotify from "../utils/useNotify";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { UserNotification } from "./shared/UserNotification";
import { routeMapping } from "../routes/routeMapping";
import { getApiServices } from "../api/api";
import { getUserDetailByToken } from "../api/apiPaths";
import { setUserInfo } from "../redux/slice";
import { getCookie, removeCookie } from "../constants/globalConstants";
import { CustomLoader } from "./shared";
import { getRoutes } from "../utils/logins";
import NotFound from "./shared/NotFound";

function Root() {
  const { notifyError } = useNotify();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userInfo = useSelector((state) => state?.userInfo);
  const snackBar = useSelector((state) => state?.snackBar);
  const isLoading = useSelector((state) => state.isLoading);
  const { code, isInstitution } = userInfo;

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (typeof error?.response?.data?.error === "string") {
          notifyError(error?.response?.data?.error);
        } else {
          notifyError("Something went wrong. Please try again!");
        }
      },
    }),
  });
  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  const getUserInfo = async () => {
    try {
      const userInfo = await getApiServices(getUserDetailByToken);
      if (userInfo.status === 401) {
        removeCookie("token");
        removeCookie("roleId");
        removeCookie("refreshToken");
        navigate(LOGIN);
      }
      const { data = null } = userInfo;
      dispatch(
        setUserInfo({
          name: data?.name,
          id: data?.id,
          role: data?.roleName,
          roleId: data?.roleId,
          code: data?.roleCode,
          profileImageUrl: data?.profileImageUrl,
          emailId: data?.emailId,
          mobileNo: data?.mobileNo,
          isInstitution: Boolean(data?.isInstitution),
          institutionId: data?.institutionId,
          institutionUserId: data?.institutionUserId,
          isDonor: data?.isDonor,
        })
      );
    } catch {}
  };

  const handleBrowserBack = () => {
    if (pathname === VERIFY_OTP || pathname === SET_PASSWORD) navigate(LOGIN);
    if (!getCookie("token")) navigate(LOGIN);
  };

  const checkPaths = () => {
    return loginRoutes.find(({ path }) => path === pathname);
  };

  useEffect(() => {
    if (!getCookie("token") && !checkPaths()) navigate(LOGIN);
    if (getCookie("token")) getUserInfo();
    window.addEventListener("popstate", handleBrowserBack);
    return () => {
      window.removeEventListener("popstate", handleBrowserBack);
    };
  }, []); // eslint-disable-line

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {isLoading ? <CustomLoader /> : null}
        <Routes>
          {loginRoutes.map(({ path, element, children }, index) =>
            routeMapping(path, element, children, index)
          )}
          {
            <Route path={LAYOUT} element={<ProtectedRoute />}>
              {code &&
                getRoutes(code, isInstitution).map(
                  ({ path, element, children }, index) =>
                    routeMapping(path, element, children, index)
                )}
            </Route>
          }
          {code && <Route path={NOT_FOUND} element={<NotFound />} />}
        </Routes>
        {snackBar && <UserNotification />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Root;
