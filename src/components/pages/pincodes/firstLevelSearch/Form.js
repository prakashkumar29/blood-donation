import React, { useEffect, useState } from "react";
import { FormLayout, StyledFormContainer } from "../../../../styles/index";
import { BackNavigator } from "../../../shared/index";
import { FIRST_LEVEL_SEARCH_LIST } from "../../../../routes/routePaths";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import {
  createFirstLevelSearch,
  getFirstLevelSearch,
  pincodes,
  updateFirstLevelSearch,
} from "../../../../api/apiPaths";
import SubForm from "../../SubForm";
import {
  fields,
  getPayload,
  initialValues,
  secondaryColumns,
  secondaryMobileMenus,
  subInitialValues,
} from "../../../../constants/pincodes/firstLevelSearch";
import {
  secondaryValidationSchema,
  validationSchema,
} from "../../../../validations/pincodes/firstLevelSearch";
import { useFormik } from "formik";
import {
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import useNotify from "../../../../utils/useNotify";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useArraySeeds from "../../../../utils/useArraySeeds";
import FormActions from "../../../shared/FormActions";
import SingleAutoComplete from "../../../shared/SingleAutoComplete";

const Form = () => {
  const { pincode: allPincodes } = useArraySeeds([pincodes]);
  const { notifySuccess, notifyError } = useNotify();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();

  const { refetch: createNewSearch } = useQuery(
    "firstLevelSearch",
    () => {
      return editId
        ? updateApiServices(
            updateFirstLevelSearch,
            editId,
            getPayload(formik.values)
          )
        : postApiServices(createFirstLevelSearch, getPayload(formik.values));
    },
    {
      enabled: false,
      onSuccess: ({ data }) => {
        notifySuccess(data.message);
        navigate(FIRST_LEVEL_SEARCH_LIST);
      },
    }
  );

  useQuery(
    "getFirstLevelSearchById",
    () => getByIdApiServices(getFirstLevelSearch, editId),
    {
      enabled: editId ? true : false,
      onSuccess: ({ data }) => {
        formik.setValues(data);
      },
    }
  );

  const handlePincodeSubmit = () => {
    if (values.firstLevelSearch.length < 1) {
      notifyError("Atleast one first level search is required");
      return;
    }
    createNewSearch();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handlePincodeSubmit,
  });

  const { values, touched, errors, handleBlur, handleSubmit, setFieldValue } =
    formik;
  
  const onModifyList = (list) => {
    setFieldValue("firstLevelSearch", list);
  };
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(
      values.firstLevelSearch.map((mapcode) => ({
        ...allPincodes.find(
          (pincode) => pincode?.id === mapcode?.mappingPincodeId
        ),
        mappingPincodeId: mapcode.mappingPincodeId,
      }))
    );
  }, [values.firstLevelSearch]); // eslint-disable-line

  const handleReset = () => navigate(FIRST_LEVEL_SEARCH_LIST);

  return (
    <>
      <BackNavigator
        title="FIRST LEVEL SEARCH"
        navigateTo={FIRST_LEVEL_SEARCH_LIST}
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <SingleAutoComplete
                label="Pincode Area *"
                name="id"
                value={values.id}
                touched={touched.id}
                errors={errors.id}
                onChange={(e, v) => {
                  setFieldValue("id", v?.id || "");
                }}
                onBlur={handleBlur}
                inputValues={allPincodes}
                isViewMode={
                  isViewMode || editId || values.firstLevelSearch.length > 0
                }
                getOptionLabel={(option) => `${option?.code} - ${option?.name}`}
              />
            </Grid>
            <Grid item xs={12}>
              <SubForm
                title="First Level Search"
                onModifyList={onModifyList}
                fields={fields}
                initialValues={subInitialValues}
                uniqueId="mappingPincodeId"
                inputValues={{ mappingPincodeId: allPincodes || [] }}
                disableCancel={true}
                list={list}
                validationSchema={secondaryValidationSchema}
                columns={secondaryColumns}
                mobileMenuDetails={secondaryMobileMenus}
                isViewMode={isViewMode}
                value={values.id}
                duplicateMessage="Pincode"
              />
            </Grid>
            {!state?.viewDetails && (
              <FormActions
                handleOnReset={handleReset}
                handleSubmit={handleSubmit}
                isUpdate={!!editId}
              />
            )}
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
};

export default Form;
