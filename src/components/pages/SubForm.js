import { useState } from "react";
import useNotify from "../../utils/useNotify";
import { useFormik } from "formik";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { DeleteIcon, EditIcon, FormTitles } from "../../styles";
import { ADD } from "../../constants/globalConstants";
import {
  CustomSelectField,
  CustomTextField,
  ListingComponent,
} from "../shared";
import { getTrimmedValues } from "../../utils/common";
import { useTheme } from "@emotion/react";
import FormActions from "../shared/FormActions";
import SingleAutoComplete from "../shared/SingleAutoComplete";

const PaperList = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.8rem 1rem",
  margin: "1rem 0",
});

function SubForm({
  fields,
  initialValues,
  validationSchema,
  list,
  columns,
  title,
  uniqueId,
  onModifyList,
  isViewMode,
  inputValues,
  disableCancel,
  value = "",
  duplicateMessage = "",
  mobileMenuDetails,
  mobileAccessor = "name",
  disableDelete,
  parentId = "",
}) {
  const [index, setIndex] = useState(-1);
  const { notifyError } = useNotify();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));

  const handleOnSubmit = (values) => {
    if (values?.[uniqueId] === parentId)
      return notifyError(`Cannot add ${duplicateMessage} of primary details`);
    if (values?.mappingPincodeId === value) {
      notifyError("Same pincode not allowed");
      return;
    }
    let updatedList = list;
    const trimmedValues = getTrimmedValues(values);
    if (index < 0) {
      const isDuplicateEntry = list.find(
        (listItem) => listItem?.[uniqueId] === trimmedValues?.[uniqueId]
      );
      if (isDuplicateEntry)
        return notifyError(`${duplicateMessage} already exists !`);
      updatedList = [...list, trimmedValues];
    } else {
      const isDuplicateEntry = list
        .filter((listData, listIndex) => listIndex !== index)
        .find((listItem) => listItem?.[uniqueId] === trimmedValues?.[uniqueId]);
      if (isDuplicateEntry)
        return notifyError(`${duplicateMessage} already exists !`);
      updatedList[index] = trimmedValues;
    }
    onModifyList(updatedList);
    resetForm();
    setIndex(-1);
  };

  const handleOnReset = () => {
    handleReset();
    setIndex(-1);
  };

  const handleDelete = (deleteIndex) => {
    onModifyList(list.toSpliced(deleteIndex, 1));
  };

  const handleEdit = (editIndex) => {
    setValues(list[editIndex]);
    setIndex(editIndex);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleOnSubmit,
    validateOnBlur: !isViewMode,
    validateOnChange: !isViewMode,
  });
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    resetForm,
    setValues,
    setFieldValue,
  } = formik;

  return (
    <>
      <Grid container columnSpacing={3} rowSpacing={3}>
        {isViewMode && !list.length ? (
          <></>
        ) : (
          <Grid item xs={12}>
            <FormTitles>{title}</FormTitles>
          </Grid>
        )}
        {!isViewMode &&
          fields?.map((field) => {
            if (field?.fieldType === "select")
              return (
                <Grid
                  item
                  xs={isMobile ? 12 : field?.xs || 6}
                  key={field?.name}
                >
                  <CustomSelectField
                    name={field?.name}
                    label={field?.label}
                    value={values[field?.name]}
                    touched={touched[field?.name]}
                    errors={errors[field?.name]}
                    maxLength={field?.maxLength}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isViewMode={isViewMode || !value}
                    accessor={field?.accessor || ""}
                    inputValues={inputValues[field?.name]}
                    disabled={isViewMode || !value}
                    getOptionLabel={(option) =>
                      `${option?.code} - ${option?.name}`
                    }
                  />
                </Grid>
              );
            if (field?.fieldType === "autocomplete")
              return (
                <Grid
                  item
                  xs={isMobile ? 12 : field?.xs || 6}
                  key={field?.name}
                >
                  <SingleAutoComplete
                    name={field?.name}
                    label={field?.label}
                    value={values[field?.name]}
                    touched={touched[field?.name]}
                    errors={errors[field?.name]}
                    maxLength={field?.maxLength}
                    onChange={(e, v) => {
                      setFieldValue(field?.name, v?.id || "");
                    }}
                    onBlur={handleBlur}
                    isViewMode={isViewMode || !value}
                    inputValues={inputValues[field?.name]}
                    disabled={isViewMode || !value}
                    getOptionLabel={(option) =>
                      `${option?.code} - ${option?.name}`
                    }
                  />
                </Grid>
              );
            return (
              <Grid item xs={isMobile ? 12 : field?.xs || 6} key={field?.name}>
                <CustomTextField
                  type={field?.type}
                  name={field?.name}
                  label={field.label}
                  value={values[field?.name]}
                  touched={touched[field?.name]}
                  errors={errors[field?.name]}
                  maxLength={field?.maxLength}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isViewMode={isViewMode}
                />
              </Grid>
            );
          })}
        {!isViewMode && (
          <FormActions
            handleOnReset={handleOnReset}
            handleSubmit={handleSubmit}
            disableCancel={disableCancel}
            submitLabel={ADD}
            isUpdate={index >= 0}
          />
        )}
      </Grid>
      {list?.length ? (
        <Box sx={{ marginTop: 3 }}>
          {isMobile ? (
            list?.length &&
            list?.map((listItem, listIndex) => (
              <PaperList>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{columns()[0]?.["Header"]}</Typography>
                  <Typography sx={{ marginInline: "3px" }}>-</Typography>
                  <Typography>{listItem?.[mobileAccessor]}</Typography>
                </Box>
                {isViewMode ? (
                  <></>
                ) : (
                  <Box>
                    {!disableDelete && (
                      <IconButton
                        onClick={() => {
                          handleDelete(listIndex);
                        }}
                        disabled={index >= 0 || isViewMode}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => {
                        handleEdit(listIndex);
                      }}
                      disabled={index >= 0 || isViewMode}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </PaperList>
            ))
          ) : (
            <ListingComponent
              data={list}
              columns={columns(
                handleDelete,
                handleEdit,
                index >= 0 || isViewMode
              )}
              disablePagination={true}
              disableSort={true}
              disableColumnHiding={true}
              disableLayout
              subMenuDetails={mobileMenuDetails(
                handleDelete,
                handleEdit,
                index >= 0 || isViewMode
              )}
            />
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

export default SubForm;
