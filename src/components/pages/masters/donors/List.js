import React, { useEffect, useState } from "react";
import { ListTopbar, ListingComponent } from "../../../shared";
import {
  MASTERS_DONORS_FORM,
  MASTERS_DONORS_LIST,
} from "../../../../routes/routePaths";
import {
  MASTERS_DONORS_COLUMN,
  bottomMenuDetails,
  donorSearch,
  filterFields,
  filterInitialValues,
  mobileMenuDetails,
  updateFields,
} from "../../../../constants/masters/donors";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import { DONORS } from "../../../../api/apiPaths";
import { useSelector } from "react-redux";
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

  const snackBar = useSelector((state) => state?.snackBar);
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(MASTERS_DONORS_LIST);
  const listParams = handleTableDatas(donorSearch, MASTERS_DONORS_COLUMN());
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading, refetch } = useQuery(
    ["donorsList", listParams],
    () => postApiServices(DONORS, listParams)
  );

  useEffect(() => {
    snackBar?.message && refetch();
  }, [snackBar?.message]); // eslint-disable-line

  return (
    <>
      <ListTopbar
        label="Donors"
        newFormPath={MASTERS_DONORS_FORM}
        listPath={MASTERS_DONORS_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data?.rows || []}
        columns={MASTERS_DONORS_COLUMN(handleOpen, handleModalClick)}
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        topMenuDetails={mobileMenuDetails}
        bottomMenuDetails={bottomMenuDetails(handleOpen, handleModalClick)}
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
      />
    </>
  );
}

export default List;
