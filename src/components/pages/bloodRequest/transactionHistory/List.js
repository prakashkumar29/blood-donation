import React from "react";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import { ListTopbar, ListingComponent } from "../../../shared";
import { DONOR_CURRENT_REQUEST_LIST } from "../../../../routes/routePaths";
import { searchFields } from "../../../../constants/bloodRequest/transactionHistory";
import { DONOR_REQUESTS } from "../../../../api/apiPaths";
import { columns } from "../../../../constants/bloodRequest/transactionHistory";

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
    postApiServices(`${DONOR_REQUESTS}/false`, {
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
        label="TRANSACTION HISTORY"
        disableNewForm
        disableFilter
        listPath={DONOR_CURRENT_REQUEST_LIST}
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
      />
    </>
  );
}

export default List;
