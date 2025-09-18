import { ListTopbar, ListingComponent } from "../../shared";
import useTableCustomHooks from "../../../utils/useTableCustomHooks";
import {
  searchFields,
  columns,
  referredColumns,
  mobileMenuDetails,
  mobileReferredColumns,
  referredSearchFields,
  filterFields,
  filterInitialValues,
  topMenuDetails,
  updateFields,
} from "../../../constants/referal/referals";
import { REFERALS, REFERAL_FORM } from "../../../routes/routePaths";
import { useQuery } from "react-query";
import { postApiServices } from "../../../api/api";
import { REFERED_USERS } from "../../../api/apiPaths";
import { useSelector } from "react-redux";
import { codes } from "../../../constants/globalConstants";
import { useEffect, useState } from "react";
import UpdateModal from "../../shared/UpdateModal";

function Referals() {
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

  const { code } = useSelector((state) => state?.userInfo);
  const snackBar = useSelector((state) => state?.snackBar);
  const isAdmin = code === codes?.admin || code === codes?.super_admin;
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableDatas,
    tableReRenderActions,
  } = useTableCustomHooks(REFERALS);

  const listParams = handleTableDatas(
    isAdmin ? referredSearchFields : searchFields,
    isAdmin ? referredColumns() : columns
  );
  const { pageSize, currentPage } = tableReRenderActions();

  const { data, isLoading, refetch } = useQuery(
    ["myReferals", listParams],
    () => postApiServices(REFERED_USERS, listParams)
  );

  useEffect(() => {
    snackBar?.message && refetch();
  }, [snackBar?.message]); // eslint-disable-line

  return (
    <>
      <ListTopbar
        label={isAdmin ? "Referals" : "My referals"}
        disableNewForm={isAdmin}
        newFormPath={REFERAL_FORM}
        listPath={REFERALS}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
      />
      <ListingComponent
        data={data?.data.rows || []}
        columns={
          isAdmin ? referredColumns(handleOpen, handleModalClick) : columns
        }
        isLoading={isLoading}
        onPageNumberChange={onPageNumberChange}
        onChangePageSize={onChangePageSize}
        pageSize={pageSize}
        currentPage={currentPage}
        count={data?.data?.count || 1}
        topMenuDetails={isAdmin ? topMenuDetails : mobileMenuDetails}
        bottomMenuDetails={
          isAdmin ? mobileReferredColumns(handleOpen, handleModalClick) : []
        }
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

export default Referals;
