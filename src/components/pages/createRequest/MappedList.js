import React, { useState } from "react";
import { ListTopbar, ListingComponent } from "../../shared/index";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import { getAllMappedDonors } from "../../../api/apiPaths";
import {
  search,
  filterFields,
  filterInitialValues,
} from "../../../constants/mapToDonars/mapToDonars";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import { MAPPED_LIST } from "../../../routes/routePaths";
import {
  secondaryBottomMenuDetails,
  secondaryColumns,
} from "../../../constants/createRequest/createRequest";
import { useLocation, useSearchParams } from "react-router-dom";
import CustomDonatedModal from "../../shared/CustomDonatedModal";

const MappedDonars = () => {
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const location = useLocation();
  const isCancelled = location.state?.isCancelled;
  const [donatedProps, setDonatedProps] = useState({
    open: false,
    handleClose: () => setDonatedProps((prev) => ({ ...prev, open: false })),
    id: "",
    handleClick: (id) => {
      setDonatedProps((prev) => ({ ...prev, open: true, id }));
    },
  });
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(MAPPED_LIST);
  const listParams = handleTableDatas(search, secondaryColumns());
  const { pageSize, currentPage } = tableReRenderActions();

  const {
    data,
    isLoading,
    refetch: mappedList,
  } = useQuery(["mappedDonarsList", listParams], () =>
    postApiServices(getAllMappedDonors, {
      ...listParams,
      sorting:
        listParams?.sorting[0]?.column === "createdAt"
          ? []
          : listParams?.sorting,
      filters: [
        {
          type: "eq",
          field: "bloodRequestId",
          value: editId,
        },
      ],
    })
  );

  return (
    <>
      <ListTopbar
        label="Mapped Donars"
        listPath={MAPPED_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
        disableFilter={true}
        disableNewForm
      />
      <ListingComponent
        data={data?.data?.rows || []}
        columns={secondaryColumns(isCancelled, donatedProps.handleClick)}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        bottomMenuDetails={secondaryBottomMenuDetails(
          isCancelled,
          donatedProps.handleClick
        )}
      />
      {donatedProps.open ? (
        <CustomDonatedModal
          modalTitle="Update donated status"
          open={donatedProps.open}
          handleClose={donatedProps.handleClose}
          id={donatedProps.id}
          handleRefetch={mappedList}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default MappedDonars;
