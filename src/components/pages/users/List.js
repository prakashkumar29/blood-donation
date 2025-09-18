import React from "react";
import { ListTopbar, ListingComponent } from "../../shared/index";
import { USERS_FORM, USERS_LIST } from "../../../routes/routePaths";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import {
  columns,
  mobileMenuDetails,
  searchFields,
} from "../../../constants/users/institutionUsers";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import { INSTITUTION_USERS } from "../../../api/apiPaths";
import { useSelector } from "react-redux";
import {
  filterFields,
  initialValues,
} from "../../../constants/users/institutionUsers";

const Users = () => {

  const { institutionId } = useSelector((state) => state?.userInfo);
  const userFilter = {
    type: "eq",
    field: "institutionId",
    value: institutionId,
  };
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(USERS_LIST);
  const listParams = handleTableDatas(searchFields, columns);
  const usersParams = {
    ...listParams,
    filters: [...listParams?.filters, userFilter],
  };
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery(["institutions", listParams], () =>
    postApiServices(INSTITUTION_USERS, {
      ...usersParams,
      sorting:
        usersParams?.sorting[0]?.column === "createdAt"
          ? []
          : usersParams?.sorting,
    })
  );
  
  return (
    <>
      <ListTopbar
        label="Users"
        newFormPath={USERS_FORM}
        listPath={USERS_LIST}
        filterFields={filterFields}
        filterFieldInitial={initialValues}
      />
      <ListingComponent
        data={data?.data.rows || []}
        columns={columns}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        topMenuDetails={mobileMenuDetails}
      />
    </>
  );
};

export default Users;
