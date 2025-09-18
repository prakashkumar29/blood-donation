import React, { useState } from "react";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import {
  BLOOD_SEEKERS_INDIVIDUALS_FORM,
  BLOOD_SEEKERS_INDIVIDUALS_LIST,
} from "../../../../routes/routePaths";
import { BLOOD_REQUESTS, roles } from "../../../../api/apiPaths";
import {
  columns,
  filterFields,
  filterInitialValues,
  mobileMenuDetails,
  searchFields,
  updateFields,
} from "../../../../constants/bloodSeeker/individual";
import { ListTopbar, ListingComponent } from "../../../shared";
import { useSelector } from "react-redux";
import { createFilter, getSeedIdByName } from "../../../../utils/common";
import useArraySeeds from "../../../../utils/useArraySeeds";
import { codes } from "../../../../constants/globalConstants";
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
  const individualRoleId = getSeedIdByName(roleSeeds, "Individual Seeker");
  const individualFilter = createFilter("bloodSeekerTypeId", individualRoleId);
  const volunteerFilter = createFilter("assignedToId", id);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(BLOOD_SEEKERS_INDIVIDUALS_LIST);
  const listParams = handleTableDatas(searchFields, columns());
  const updatedFilter =
    code === codes?.volunteer
      ? [...listParams.filters, { ...individualFilter }, { ...volunteerFilter }]
      : [...listParams.filters, { ...individualFilter }];
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading, refetch } = useQuery(
    ["bloodRequestsIndividual", listParams],
    () =>
      postApiServices(BLOOD_REQUESTS, {
        ...listParams,
        filters: updatedFilter,
      }),
    {
      enabled: !!individualRoleId && !!roleSeeds,
    }
  );

  return (
    <>
      <ListTopbar
        label="INDIVIDUAL BLOOD REQUESTS"
        newFormPath={BLOOD_SEEKERS_INDIVIDUALS_FORM}
        listPath={BLOOD_SEEKERS_INDIVIDUALS_LIST}
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
        topMenuDetails={mobileMenuDetails?.top}
        bottomMenuDetails={mobileMenuDetails?.bottom(
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
