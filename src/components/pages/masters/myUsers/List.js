import React from "react";
import { ListTopbar, ListingComponent } from "../../../shared";
import { MY_USERS_FORM, MY_USERS_LIST } from "../../../../routes/routePaths";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import { USERS, roles } from "../../../../api/apiPaths";
import {
  searchFields,
  filterFields,
  filterInitialValues,
  columns,
  mobileMenuDetails,
} from "../../../../constants/masters/myUsers";
import { createFilter, getSeedIdByCode } from "../../../../utils/common";
import { useSelector } from "react-redux";
import useArraySeeds from "../../../../utils/useArraySeeds";
import { codes } from "../../../../constants/globalConstants";

function List() {
  const { role: roleSeeds } = useArraySeeds([roles]);
  const adminRoleId = getSeedIdByCode(roleSeeds, codes?.admin);
  const adminFilter = createFilter("roleId", adminRoleId);
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(MY_USERS_LIST);
  const listParams = handleTableDatas(searchFields, columns());
  const { pageSize, currentPage } = tableReRenderActions();
  const { id } = useSelector((state) => state?.userInfo);

  const { data, isLoading } = useQuery(
    ["users", listParams],
    () =>
      postApiServices(USERS, {
        ...listParams,
        filters: [...listParams.filters, adminFilter],
      }),
    {
      enabled: !!adminRoleId,
    }
  );

  return (
    <>
      <ListTopbar
        label="MY USERS"
        newFormPath={MY_USERS_FORM}
        listPath={MY_USERS_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data?.rows || []}
        columns={columns(id)}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        topMenuDetails={mobileMenuDetails(id)}
      />
    </>
  );
}

export default List;
