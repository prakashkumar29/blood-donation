import React from "react";
import TextField from "@mui/material/TextField";

export function CustomTextField({
  type,
  name,
  onChange,
  value = "",
  variant,
  onBlur,
  label,
  disabled,
  style,
  isViewMode,
  maxLength,
  fullWidth,
  fieldType,
  autoComplete,
  onkeydown,
  placeholder,
  endAdornment,
  options,
  touched,
  errors,
  customHelpertext,
}) {
  const handleKeyPress = (e) => {
    if (fieldType === "mobile" && e.keyCode !== 13) {
      return !/[0-9]/.test(e.key) && e.preventDefault();
    }
    if (fieldType === "alphaNumeric") {
      return !/[0-9A-Za-z-/:_]/.test(e.key) && e.preventDefault();
    }
    if (fieldType === "alphabets") {
      return !/[A-Za-z/]/.test(e.key) && e.preventDefault();
    }
    if (fieldType === "email") {
      return / /g.test(e.key) && e.preventDefault();
    }
    if (type === "number" && e.keyCode !== 13) {
      return !/[0-9]/.test(e.key) && e.keyCode !== 16 && e.preventDefault();
    }
    if (fieldType === "decimal") {
      return !/[0-9.]/.test(e.key) && e.preventDefault();
    }
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label={label}
        placeholder={placeholder}
        variant={variant ? variant : "outlined"}
        type={"text"}
        name={name}
        fullWidth={fullWidth || true}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ""}
        style={style}
        onKeyDown={(e) => {
          if (fieldType === "number") return e.keyCode === 56;
        }}
        error={Boolean(
          customHelpertext || options ? touched && errors : touched && errors
        )}
        helperText={
          customHelpertext || options
            ? touched && errors
              ? errors
              : ""
            : touched && errors
            ? errors
            : ""
        }
        InputProps={{
          endAdornment: endAdornment,
          onKeyPress: (e) => handleKeyPress(e),
          onKeyDown: (e) => onkeydown && onkeydown(e),
          readOnly: Boolean(isViewMode),
          disabled: disabled,
        }}
        onInput={(e) => {
          e.target.value &&
            maxLength &&
            (e.target.value = e.target.value.toString().slice(0, maxLength));
        }}
        // onPaste={(e) => {
        //   if (type === "number") e.preventDefault();
        // }}
      />
    </>
  );
}
