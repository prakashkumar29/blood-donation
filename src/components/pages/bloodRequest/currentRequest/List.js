import React from "react";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import { ListTopbar, ListingComponent } from "../../../shared";
import { DONOR_CURRENT_REQUEST_LIST } from "../../../../routes/routePaths";
import {
  mobileMenuDetails,
  searchFields,
} from "../../../../constants/bloodRequest/currentRequests";
import { DONOR_REQUESTS } from "../../../../api/apiPaths";
import { columns } from "../../../../constants/bloodRequest/currentRequests";

function List() {

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(DONOR_CURRENT_REQUEST_LIST);
  const listParams = handleTableDatas(searchFields, columns);
  const { pageSize, currentPage } = tableReRenderActions();
  
  const { data, isLoading } = useQuery(["currentRequests", listParams], () =>
    postApiServices(`${DONOR_REQUESTS}/true`, {
      ...listParams,
      sorting:
        listParams?.sorting[0]?.column === "createdAt"
          ? []
          : listParams?.sorting,
    })
  );

  return (
    <>
      <ListTopbar
        label="CURRENT REQUEST"
        disableNewForm
        disableFilter
        disableSearchField
        disableDownload
      />
      <ListingComponent
        data={data?.data?.rows || []}
        columns={columns || []}
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
}

export default List;
