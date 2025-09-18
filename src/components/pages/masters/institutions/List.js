import React, { useEffect, useState } from "react";
import { ListTopbar, ListingComponent } from "../../../shared";
import {
  MASTERS_INSTITUTION_FORM,
  MASTERS_INSTITUTION_LIST,
} from "../../../../routes/routePaths";
import {
  MASTERS_INSTITUTIONS_COLUMN,
  bottomMenuDetails,
  filterFields,
  filterInitialValues,
  institutionSearch,
  mobileMenuDetails,
} from "../../../../constants/masters/institutions";
import { useQuery } from "react-query";
import { postApiServices } from "../../../../api/api";
import { INSTITUTIONS } from "../../../../api/apiPaths";
import useTableCustomHooks from "../../../../utils/useTableCustomHooks";
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
  } = useTableCustomHooks(MASTERS_INSTITUTION_LIST);

  const listParams = handleTableDatas(
    institutionSearch,
    MASTERS_INSTITUTIONS_COLUMN()
  );
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading, refetch } = useQuery(
    ["institutions", listParams],
    () => postApiServices(INSTITUTIONS, listParams)
  );

  useEffect(() => {
    snackBar?.message && refetch();
  }, [snackBar?.message]); // eslint-disable-line

  return (
    <>
      <ListTopbar
        label="Institutions"
        newFormPath={MASTERS_INSTITUTION_FORM}
        listPath={MASTERS_INSTITUTION_LIST}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data.rows || []}
        columns={MASTERS_INSTITUTIONS_COLUMN(handleOpen, handleModalClick)}
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
        updateFields={[]}
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
