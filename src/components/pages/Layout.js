import React, { Suspense, useEffect } from "react";
import { AppBar } from "../shared";
import { SideBarNavigations } from "../shared";
import { Outlet } from "react-router-dom";
import { CustomLoader } from "../shared";
import {
  AppContainerLayout,
  AppMainContainer,
  AppMainLayout,
} from "../../styles";
import { useLocation, useNavigate } from "react-router-dom";
import { LAYOUT } from "../../routes/routePaths";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getApiServices } from "../../api/api";
import { getUserDetailByToken } from "../../api/apiPaths";
import { setUserInfo } from "../../redux/slice";
import { getSideMenus } from "../../utils/logins";

export function Layout() {
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { code = "", isInstitution = "" } = useSelector(
    (state) => state?.userInfo
  );

  useQuery("getUserInfoByToken", () => getApiServices(getUserDetailByToken), {
    enabled: !code,
    onSuccess: ({ data }) => {
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
    },
  });

  const sideMenus = getSideMenus(code, isInstitution);
  useEffect(() => {
    if (pathname === LAYOUT && sideMenus) navigate(sideMenus[0]?.navigateTo);
  }, [sideMenus, pathname]); // eslint-disable-line

  return (
    <AppContainerLayout>
      <AppBar />
      <AppMainContainer>
        {sideMenus ? <SideBarNavigations menuList={sideMenus} /> : <></>}
        <Suspense fallback={<CustomLoader />}>
          <AppMainLayout>
            <Outlet />
          </AppMainLayout>
        </Suspense>
      </AppMainContainer>
    </AppContainerLayout>
  );
}
