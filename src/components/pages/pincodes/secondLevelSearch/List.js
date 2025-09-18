import React from "react";
import { ListTopbar, ListingComponent } from "../../../shared";
import {
  SECOND_LEVEL_SEARCH_FORM,
  SECOND_LEVEL_SEARCH_LIST,
} from "../../../../routes/routePaths";
import { useQuery } from "react-query";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { SECOND_LEVEL_SEARCHES } from "../../../../api/apiPaths";
import { postApiServices } from "../../../../api/api";
import {
  columns,
  filterFields,
  filterIntialValues,
  mobileMenuDetails,
  searchFields,
} from "../../../../constants/pincodes/secondLevelSearches";

const List = () => {
  
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(SECOND_LEVEL_SEARCH_LIST);
  const listParams = handleTableDatas(searchFields, columns, []);
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery(["pincodes", listParams], () =>
    postApiServices(SECOND_LEVEL_SEARCHES, listParams)
  );

  return (
    <>
      <ListTopbar
        label="Second Level Search"
        newFormPath={SECOND_LEVEL_SEARCH_FORM}
        listPath={SECOND_LEVEL_SEARCH_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterIntialValues}
      />
      <ListingComponent
        data={data?.data.rows || []}
        columns={columns}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        disableSort={true}
        count={data?.data?.count || 1}
        topMenuDetails={mobileMenuDetails}
      />
    </>
  );
};

export default List;
