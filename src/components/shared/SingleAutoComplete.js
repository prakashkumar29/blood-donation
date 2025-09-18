import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SingleAutoComplete({
  className,
  label,
  onChange,
  onBlur,
  value,
  inputValues,
  readOnly,
  name,
  errors,
  touched,
  required,
  accessor,
  fullWidth,
  labelAccesor,
  isReturnObject,
  isViewMode,
  getOptionLabel,
  disabled
}) {
  return (
    <Autocomplete
      className={className}
      label={label}
      name={name}
      readOnly={readOnly || isViewMode}
      fullWidth={fullWidth || true}
      options={inputValues || []}
      value={
        inputValues?.find((item) => item?.[accessor || "id"] === value) || null
      }
      disablePortal
      getOptionLabel={(option) =>
        (getOptionLabel && getOptionLabel(option)) ||
        option?.[accessor] ||
        option?.name ||
        option?.label ||
        "No data Found"
      }
      onChange={onChange}
      onBlur={onBlur}
      disabled={Boolean(disabled)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...(inputValues?.length < 5 && {
              onKeyPress: (e) => e.preventDefault(),
            })}
            variant="outlined"
            label={label}
            name={name}
            error={errors && touched}
            helperText={touched && errors}
            fullWidth
            required={required}
            readOnly={readOnly || isViewMode}
          />
        );
      }}
    />
  );
}
