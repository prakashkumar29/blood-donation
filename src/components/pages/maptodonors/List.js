import React from "react";
import { ListTopbar, ListingComponent } from "../../shared/index";
import { MAP_TO_DONOR_LIST } from "../../../routes/routePaths";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import {
  searchFields,
  filterFields,
  filterInitialValues,
  mobileMenuDetails,
} from "../../../constants/mapToDonars/list";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import { bloodRequestsToMap } from "../../../api/apiPaths";
import { columns } from "../../../constants/mapToDonars/list";
import { createFilter } from "../../../utils/common";
import { useSelector } from "react-redux";
import { codes } from "../../../constants/globalConstants";

function List() {
  const { id, code } = useSelector((state) => state?.userInfo);
  const volunteerFilter = createFilter("assignedToId", id);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(MAP_TO_DONOR_LIST);

  const listParams = handleTableDatas(searchFields, columns);
  const { pageSize, currentPage } = tableReRenderActions();
  const updatedFilter =
    code === codes?.volunteer
      ? [...listParams.filters, { ...volunteerFilter }]
      : listParams.filters;
  const { data = [], isLoading } = useQuery(
    ["mapToDonarInstitutions", listParams],
    () =>
      postApiServices(bloodRequestsToMap, {
        ...listParams,
        filters: updatedFilter,
      })
  );

  return (
    <>
      <ListTopbar
        label="Map To Donors"
        listPath={MAP_TO_DONOR_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
        disableNewForm
      />
      <ListingComponent
        data={data?.data?.rows || []}
        columns={columns}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        bottomMenuDetails={mobileMenuDetails}
      />
    </>
  );
}

export default List;
