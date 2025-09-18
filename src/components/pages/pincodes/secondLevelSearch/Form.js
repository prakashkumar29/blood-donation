import React, { useEffect, useState } from "react";
import { FormLayout, StyledFormContainer } from "../../../../styles";
import { BackNavigator } from "../../../shared";
import { SECOND_LEVEL_SEARCH_LIST } from "../../../../routes/routePaths";
import { Grid } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  GET_FIRST_LEVEL_PINCODES,
  SECOND_LEVEL_SEARCH,
  pincodes,
} from "../../../../api/apiPaths";
import SubForm from "../../SubForm";
import {
  initialValues,
  pincodeFields,
  secondaryColumns,
  secondaryMobileMenus,
} from "../../../../constants/pincodes/secondLevelSearches";
import {
  secondaryValidationSchema,
  validationSchema,
} from "../../../../validations/pincodes/secondLevelSearch";
import { useQuery } from "react-query";
import {
  getApiServices,
  getByIdApiServices,
  postApiServices,
  updateApiServices,
} from "../../../../api/api";
import useNotify from "../../../../utils/useNotify";
import useArraySeeds from "../../../../utils/useArraySeeds";
import FormActions from "../../../shared/FormActions";
import SingleAutoComplete from "../../../shared/SingleAutoComplete";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = location?.state?.viewDetails;
  const [pincodesData, setPincodesData] = useState([]);
  const { notifySuccess, notifyError } = useNotify();
  const { pincode: pincodeSeeds } = useArraySeeds([pincodes]);

  const handleOnReset = () => {
    navigate(SECOND_LEVEL_SEARCH_LIST);
  };

  const handleOnSubmit = (values) => {
    if (values.secondLevelSearch.length < 1)
      return notifyError("Atleast 1 second level search is required");
    editId ? updateDetails() : createSecondLevels();
  };

  const onModifyList = (list) => {
    setFieldValue("secondLevelSearch", list);
  };

  const formik = useFormik({
    initialValues: { id: "", secondLevelSearch: [] },
    validationSchema: validationSchema,
    onSubmit: handleOnSubmit,
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    handleSubmit,
    setValues,
  } = formik;

  const { data: firstLevelPincodes } = useQuery(
    ["firstLevelPincodes", location.pathname],
    () => getApiServices(GET_FIRST_LEVEL_PINCODES)
  );
  //getById
  useQuery(
    ["pincodeDetails", editId],
    () => getByIdApiServices(SECOND_LEVEL_SEARCH, editId),
    {
      enabled: !!editId && Boolean(firstLevelPincodes?.data),
      onSuccess: ({ data }) => {
        setValues(data);
      },
    }
  );
  const { refetch: createSecondLevels } = useQuery(
    "create",
    () => {
      const extractedValues = values.secondLevelSearch.map((value) => ({
        mappingPincodeId: value?.mappingPincodeId,
      }));
      const updatedPincodes = { ...values, secondLevelSearch: extractedValues };
      return postApiServices(SECOND_LEVEL_SEARCH, updatedPincodes);
    },
    {
      enabled: false,
      onSuccess: ({ data: { message } }) => {
        notifySuccess(message);
        navigate(SECOND_LEVEL_SEARCH_LIST);
      },
    }
  );
  const { refetch: updateDetails } = useQuery(
    "update",
    () => {
      const extractedValues = values.secondLevelSearch.map((value) => {
        const updated = { mappingPincodeId: value?.mappingPincodeId };
        if (value?.id) updated.id = value?.id;
        return updated;
      });
      const updatedPincodes = { ...values, secondLevelSearch: extractedValues };
      return updateApiServices(SECOND_LEVEL_SEARCH, editId, updatedPincodes);
    },
    {
      enabled: false,
      onSuccess: ({ data: { message } }) => {
        notifySuccess(message);
        navigate(SECOND_LEVEL_SEARCH_LIST);
      },
    }
  );

  useEffect(() => {
    const getCurrentData = values?.secondLevelSearch.map((pincode) => ({
      ...pincodeSeeds.find((seed) => seed?.id === pincode?.mappingPincodeId),
      mappingPincodeId: pincode?.mappingPincodeId,
      id: pincode?.id || "",
    }));
    setPincodesData(getCurrentData);
  }, [values?.secondLevelSearch]); // eslint-disable-line

  return (
    <>
      <BackNavigator
        title="SECOND LEVEL SEARCH"
        navigateTo={SECOND_LEVEL_SEARCH_LIST}
      />
      <FormLayout>
        <StyledFormContainer>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <SingleAutoComplete
                label="First Level Pincode *"
                name="id"
                value={values.id}
                touched={touched.id}
                errors={errors.id}
                onChange={(e, v) => {
                  setFieldValue("id", v?.id || "");
                }}
                onBlur={handleBlur}
                inputValues={firstLevelPincodes?.data || []}
                isViewMode={
                  isViewMode || editId || values.secondLevelSearch.length
                }
                getOptionLabel={(option) => `${option?.code} - ${option?.name}`}
              />
            </Grid>
            <Grid item xs={12}>
              <SubForm
                list={pincodesData || []}
                onModifyList={onModifyList}
                fields={pincodeFields}
                initialValues={initialValues}
                validationSchema={secondaryValidationSchema}
                columns={secondaryColumns}
                mobileMenuDetails={secondaryMobileMenus}
                title="Second Level Pincode"
                uniqueId="mappingPincodeId"
                isViewMode={isViewMode}
                disableCancel={true}
                inputValues={{ mappingPincodeId: pincodeSeeds || [] }}
                value={values.id}
                duplicateMessage="Pincode"
              />
            </Grid>
            <FormActions
              isViewMode={isViewMode}
              handleOnReset={handleOnReset}
              handleSubmit={handleSubmit}
              isUpdate={!!editId}
            />
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
};

export default Form;
