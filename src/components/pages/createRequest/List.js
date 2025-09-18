import React from "react";
import { ListTopbar, ListingComponent } from "../../shared/index";
import {
  CREATE_REQUEST_FORM,
  CREATE_REQUEST_LIST,
} from "../../../routes/routePaths";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import {
  columns,
  filterFields,
  searchFields,
  filterInitialValues,
  mobileMenuDetails,
  bottomMenuDetails,
} from "../../../constants/createRequest/createRequest";
import { BLOOD_REQUESTS } from "../../../api/apiPaths";
import { useSelector } from "react-redux";
import { codes } from "../../../constants/globalConstants";

const List = () => {
  const {
    id: userId,
    code,
    institutionUserId,
  } = useSelector((state) => state?.userInfo);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(CREATE_REQUEST_LIST);
  const userFilter = {
    type: "eq",
    field: "bloodSeekerId",
    value: code === codes?.institution_seeker ? institutionUserId : userId,
  };
  const listParams = handleTableDatas(searchFields, columns);
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery(
    ["bloodSeekersList", listParams],
    () =>
      postApiServices(BLOOD_REQUESTS, {
        ...listParams,
        filters: [...listParams.filters, userFilter],
      }),
    { enabled: !!userId }
  );

  return (
    <>
      <ListTopbar
        label="BLOOD REQUESTS"
        listPath={CREATE_REQUEST_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
        newFormPath={CREATE_REQUEST_FORM}
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
        topMenuDetails={mobileMenuDetails}
        bottomMenuDetails={bottomMenuDetails}
      />
    </>
  );
};

export default List;
