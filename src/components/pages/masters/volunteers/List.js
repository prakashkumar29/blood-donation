import React from "react";
import { ListTopbar, ListingComponent } from "../../../shared";
import {
  MASTERS_VOLUNTEERS_FORM,
  MASTERS_VOLUNTEERS_LIST,
} from "../../../../routes/routePaths";
import {
  MASTERS_VOLUNTEERS_COLUMN,
  filterFields,
  filterInitialValues,
  mobileMenuDetails,
  searchFields,
} from "../../../../constants/masters/volunteers";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import { VOLUNTEERS } from "../../../../api/apiPaths";
import { useSelector } from "react-redux";

function List() {

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(MASTERS_VOLUNTEERS_LIST);
  const listParams = handleTableDatas(
    searchFields,
    MASTERS_VOLUNTEERS_COLUMN()
  );
  const { pageSize, currentPage } = tableReRenderActions();
  const { id, code } = useSelector((state) => state?.userInfo);

  const { data, isLoading } = useQuery(["institutions", listParams], () =>
    postApiServices(VOLUNTEERS, listParams)
  );
  
  return (
    <>
      <ListTopbar
        label="Volunteers"
        newFormPath={MASTERS_VOLUNTEERS_FORM}
        listPath={MASTERS_VOLUNTEERS_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data.rows || []}
        columns={MASTERS_VOLUNTEERS_COLUMN(id, code)}
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
