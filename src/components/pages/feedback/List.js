import React from "react";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import { ListTopbar, ListingComponent } from "../../shared";
import { FEEDBACK_LIST } from "../../../routes/routePaths";
import { DONOR_FEEDBACKS, FEEDBACKS } from "../../../api/apiPaths";
import {
  columns,
  donorColumns,
  fetchPaths,
  filterFields,
  filterInitialValues,
  mobileDonorMenus,
  mobileMenuDetails,
  searchFields,
  secondaryColumns,
} from "../../../constants/feedback/feedback";
import { useSelector } from "react-redux";
import { createFilter } from "../../../utils/common";
import { codes } from "../../../constants/globalConstants";

function List() {
  const {
    id: userId,
    code,
    institutionUserId,
  } = useSelector((state) => state?.userInfo);
  const fetchDetailsPath = fetchPaths?.[code] || DONOR_FEEDBACKS;

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(FEEDBACK_LIST);
  const donorFilter = createFilter("donorId", userId);
  const seekerId = createFilter(
    "bloodSeekerId",
    code === codes?.institution_seeker ? institutionUserId : userId
  );
  const volunteerFilter = createFilter("assignedToId", userId);
  const isAdmin = code === codes?.admin || code === codes?.super_admin;
  const columnsData =
    code === codes?.donor ? donorColumns : isAdmin ? columns : secondaryColumns;
  const listParams = handleTableDatas(searchFields, columnsData);
  const customizedParams = {
    ...listParams,
    filters: [
      ...listParams.filters,
      code === codes?.donor
        ? donorFilter
        : code === codes?.volunteer
        ? volunteerFilter
        : seekerId,
    ],
  };
  const acutalPayload =
    code === codes?.admin || code === codes?.super_admin
      ? listParams
      : customizedParams;
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading } = useQuery(["donorsFeedback", listParams], () =>
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
        label="FEEDBACK"
        disableNewForm
        listPath={FEEDBACKS}
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
        bottomMenuDetails={code !== codes?.donor && mobileMenuDetails}
        topMenuDetails={code === codes?.donor && mobileDonorMenus}
      />
    </>
  );
}

export default List;
