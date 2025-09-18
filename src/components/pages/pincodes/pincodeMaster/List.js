import React from "react";
import { ListTopbar, ListingComponent } from "../../../shared/index";
import {
  PINCODE_MASTERS_FORM,
  PINCODE_MASTERS_LIST,
} from "../../../../routes/routePaths";
import {
  columns,
  filterFields,
  filterInitialValues,
  mobileMenuDetails,
  searchParams,
} from "../../../../constants/pincodes/pincodeMasters";
import { useQuery } from "react-query";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { postApiServices } from "../../../../api/api";
import { pincodeMasters } from "../../../../api/apiPaths";

const List = () => {
  
  const {
    onChangePageSize,
    onPageNumberChange,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(PINCODE_MASTERS_LIST);
  const listParams = handleTableDatas(searchParams, columns, []);
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery(["pincodeMasters", listParams], () =>
    postApiServices(pincodeMasters, listParams)
  );

  return (
    <>
      <ListTopbar
        label="Pincode Master"
        newFormPath={PINCODE_MASTERS_FORM}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data?.rows || []}
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
