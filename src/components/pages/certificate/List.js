import React from "react";
import { useSelector } from "react-redux";
import {
  donorColumns,
  fetchPaths,
  filterFields,
  filterInitialValues,
  mobileDonorMenus,
  mobileMenuDetails,
  searchFields,
  secondaryColumns,
} from "../../../constants/certificate/certificate";
import { ListTopbar, ListingComponent } from "../../shared";
import { CERTIFICATE_LIST } from "../../../routes/routePaths";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import { columns } from "../../../constants/certificate/certificate";
import { GET_DONORS_FOR_CERTIFICATE } from "../../../api/apiPaths";
import { createFilter } from "../../../utils/common";
import { codes } from "../../../constants/globalConstants";

function List() {
  const {
    id: userId,
    code,
    institutionUserId,
  } = useSelector((state) => state?.userInfo);
  const fetchDetailsPath = fetchPaths?.[code] || GET_DONORS_FOR_CERTIFICATE;
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(CERTIFICATE_LIST);
  const volunteerFilter = createFilter("assignedToId", userId);
  const donorFilter = createFilter("donorId", userId);
  const institutionFilter = createFilter("bloodSeekerId", institutionUserId);
  const columnsData =
    code === codes?.donor
      ? donorColumns
      : code === codes?.admin || code === codes?.super_admin
      ? columns
      : secondaryColumns;
  const listParams = handleTableDatas(searchFields, columnsData);
  const customizedParams = {
    ...listParams,
    filters: [
      ...listParams.filters,
      code === codes?.donor
        ? donorFilter
        : code === codes?.volunteer
        ? volunteerFilter
        : institutionFilter,
    ],
  };
  const acutalPayload =
    code === codes?.admin || code === codes?.super_admin
      ? listParams
      : customizedParams;

  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery(["donorsCertificate", listParams], () =>
    postApiServices(fetchDetailsPath, {
      ...acutalPayload,
      sorting:
        acutalPayload?.sorting[0]?.column === "createdAt"
          ? []
          : acutalPayload?.sorting,
    })
  );

  return (
    <>
      <ListTopbar
        label="CERTIFICATES"
        disableNewForm
        listPath={CERTIFICATE_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data.rows || []}
        columns={columnsData}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        bottomMenuDetails={
          code === codes?.donor ? mobileDonorMenus : mobileMenuDetails
        }
      />
    </>
  );
}

export default List;
