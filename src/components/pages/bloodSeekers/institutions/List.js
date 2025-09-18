import React, { useState } from "react";
import { ListTopbar, ListingComponent } from "../../../shared";
import {
  BLOOD_SEEKERS_INSTITUTIONS_FORM,
  BLOOD_SEEKERS_INSTITUTIONS_LIST,
} from "../../../../routes/routePaths";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import {
  columns,
  filterFields,
  filterInitialValues,
  mobileMenuDetails,
  searchFields,
  updateFields,
} from "../../../../constants/bloodSeeker/institution";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import {
  BLOOD_REQUESTS,
  bloodSeekerTypes,
  roles,
} from "../../../../api/apiPaths";
import { useSelector } from "react-redux";
import { createFilter, getSeedIdByName } from "../../../../utils/common";
import { codes } from "../../../../constants/globalConstants";
import useArraySeeds from "../../../../utils/useArraySeeds";
import UpdateModal from "../../../shared/UpdateModal";

function List() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const initialState = {
    id: "",
    updateFieldsIndex: -1,
    initialValues: {},
    seedType: "",
    updatePath: "",
    patchPath: "",
    propmptMessage: "",
  };
  const [updateProps, setUpdateProps] = useState(initialState);
  const handleClose = () => {
    setOpen((prev) => false);
    setUpdateProps(initialState);
  };
  const handleModalClick = ({
    id,
    updateFieldsIndex,
    initialValues,
    seedType,
    updatePath,
    patchPath,
    propmptMessage,
  }) => {
    setUpdateProps((prev) => ({
      ...prev,
      initialValues,
      updateFieldsIndex,
      id,
      seedType,
      updatePath,
      patchPath,
      propmptMessage,
    }));
  };
  const { id, code } = useSelector((state) => state?.userInfo);
  const { role: roleSeeds } = useArraySeeds([roles]);
  const institutionRoleId = getSeedIdByName(roleSeeds, "Institution Seeker");
  const institutionFilter = createFilter(
    "bloodSeekerTypeId",
    institutionRoleId
  );
  const volunteerFilter = createFilter("assignedToId", id);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(BLOOD_SEEKERS_INSTITUTIONS_LIST);
  const listParams = handleTableDatas(searchFields, columns());
  const updatedFilter =
    code === codes?.volunteer
      ? [
          ...listParams.filters,
          { ...institutionFilter },
          { ...volunteerFilter },
        ]
      : [...listParams.filters, { ...institutionFilter }];
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading, refetch } = useQuery(
    ["bloodRequestsInstitution", listParams],
    () =>
      postApiServices(BLOOD_REQUESTS, {
        ...listParams,
        filters: updatedFilter,
      }),
    {
      enabled: !!institutionRoleId && !!bloodSeekerTypes,
    }
  );

  return (
    <>
      <ListTopbar
        label="INSTITUTION BLOOD REQUESTS"
        newFormPath={BLOOD_SEEKERS_INSTITUTIONS_FORM}
        listPath={BLOOD_SEEKERS_INSTITUTIONS_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data?.rows || []}
        columns={columns(
          handleOpen,
          handleModalClick,
          code === codes?.volunteer
        )}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        topMenuDetails={mobileMenuDetails.top}
        bottomMenuDetails={mobileMenuDetails.bottom(
          handleOpen,
          handleModalClick,
          code === codes?.volunteer
        )}
      />
      <UpdateModal
        open={open}
        handleClose={handleClose}
        id={updateProps?.id}
        updateFieldsIndex={updateProps?.updateFieldsIndex}
        updateFields={updateFields[updateProps?.updateFieldsIndex]}
        initialValues={updateProps?.initialValues}
        seedType={updateProps?.seedType}
        updatePath={updateProps?.updatePath}
        patchPath={updateProps?.patchPath}
        propmptMessage={updateProps?.propmptMessage}
        refetch={refetch}
      />
    </>
  );
}

export default List;
