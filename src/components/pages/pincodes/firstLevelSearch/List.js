import React from "react";
import { ListTopbar, ListingComponent } from "../../../shared/index";
import {
  FIRST_LEVEL_SEARCH_FORM,
  FIRST_LEVEL_SEARCH_LIST,
} from "../../../../routes/routePaths";
import {
  columns,
  filterFields,
  filterInitialValues,
  mobileMenuDetails,
  searchParams,
} from "../../../../constants/pincodes/firstLevelSearch";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import { firstLevelSearch } from "../../../../api/apiPaths";

const List = () => {
  const {
    onChangePageSize,
    onPageNumberChange,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(FIRST_LEVEL_SEARCH_LIST);
  const listParams = handleTableDatas(searchParams, columns, []);
  const { pageSize, currentPage } = tableReRenderActions();
  
  const { data, isLoading } = useQuery(["firstLevelSearch", listParams], () =>
    postApiServices(firstLevelSearch, listParams)
  );

  return (
    <>
      <ListTopbar
        label="First Level Search"
        newFormPath={FIRST_LEVEL_SEARCH_FORM}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data.rows || []}
        columns={columns}
        isLoading={isLoading}
        onChangePageSize={onChangePageSize}
        onPageNumberChange={onPageNumberChange}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        disableSort={true}
        topMenuDetails={mobileMenuDetails}
      />
    </>
  );
};

export default List;
