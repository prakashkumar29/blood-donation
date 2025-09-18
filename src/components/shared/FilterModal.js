import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  FilterButtonModal,
  FilterContainerStyle,
  FilterFormStyle,
  FilterIconButton,
  FilterTitle,
} from "../../styles";
import { APPLY, CANCEL, CLEARFILTER } from "../../constants/globalConstants";
import { CancelButton, SubmitButton } from "../../styles";
import { CustomSelectField } from ".";
import { CustomTextField } from ".";
import { StyledTooltip } from "../../styles";
import queryString from "query-string";
import { filterStringSeeds } from "../../constants/filterSeedTypes";

export const FilterModal = ({ listPath, filterFields, filterFieldInitial }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageParams = queryString.parse(location?.search);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = (data) => {
    let getFilterValues = filterFields.map((item) => ({
      type: data[item?.queryName],
      field: item?.fieldName,
      value: data?.[item?.fieldName]?.trim(),
    }));
    let filterArray = getFilterValues.filter((item) => item.type && item.value);
    filterArray.length !== 0 &&
      navigate({
        pathName: listPath,
        search: `?${createSearchParams({
          ...pageParams,
          filter: JSON.stringify([...filterArray]),
        })}`,
      });
    handleClose();
  };
  //to handle formik data
  const formik = useFormik({
    initialValues: filterFieldInitial,
    onSubmit,
  });
  
  const handleClearFilter = () => {
    const data = {
      ...pageParams,
    };
    delete data?.filter;
    navigate({
      pathName: `${listPath}`,
      search: `?${createSearchParams({
        ...data,
      })}`,
    });
    resetForm();
  };

  const { values, handleChange, resetForm } = formik;

  return (
    <>
      <StyledTooltip title="Filter" arrow>
        <FilterIconButton onClick={handleOpen}>
          <FilterListIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ marginLeft: 1, fontSize: "0.875rem" }}>
            Filter
          </Typography>
        </FilterIconButton>
      </StyledTooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilterContainerStyle>
          <FilterTitle>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "#fff" }}
            >
              Filter
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </FilterTitle>

          <form onSubmit={formik.handleSubmit}>
            <FilterFormStyle>
              {filterFields?.map((item, index) => {
                return (
                  <Grid
                    container
                    columnSpacing={4}
                    rowSpacing={3}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                    }}
                    key={index}
                  >
                    <Grid item xs={3}>
                      <Typography>{item?.label}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <CustomSelectField
                        label={"Query"}
                        inputValues={
                          item.querySeeds
                            ? item.querySeeds
                            : filterStringSeeds || []
                        }
                        name={item?.queryName}
                        onChange={handleChange}
                        value={values?.[item?.queryName] || ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CustomTextField
                        label={"Value"}
                        name={item.fieldName}
                        onChange={handleChange}
                        value={values[item.fieldName] || ""}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </FilterFormStyle>
            <FilterButtonModal>
              <CancelButton
                isFilter={true}
                sx={{ px: 3 }}
                onClick={handleClose}
                style={{ cursor: "pointer" }}
              >
                {CANCEL}
              </CancelButton>
              <CancelButton
                isFilter={true}
                sx={{ px: 3 }}
                onClick={handleClearFilter}
                style={{ cursor: "pointer" }}
              >
                {CLEARFILTER}
              </CancelButton>
              <SubmitButton
                isFilter={true}
                variant="contained"
                type="submit"
                sx={{ px: 3 }}
              >
                {APPLY}
              </SubmitButton>
            </FilterButtonModal>
          </form>
        </FilterContainerStyle>
      </Modal>
    </>
  );
};
