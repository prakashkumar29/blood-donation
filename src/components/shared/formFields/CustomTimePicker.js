import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export function CustomTimePicker({
  label,
  onChange,
  value,
  name,
  isViewMode,
  maxTime,
  minTime,
  className,
  disabled,
  touched,
  onBlur,
  errors,
  customHelpertext,
  setTouced,
}) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          className={className}
          label={label}
          name={name}
          readOnly={Boolean(isViewMode)}
          disabled={disabled}
          onBlur={onBlur}
          value={value ? new Date(value) : null}
          fullWidth
          onChange={onChange}
          minTime={minTime ? new Date(minTime) : null}
          maxTime={maxTime ? new Date(maxTime) : null}
          // autoFocus={Boolean(value)}
          error={Boolean(customHelpertext || (touched && errors))}
          helperText={customHelpertext || (touched && errors ? errors : "")}
          closeOnSelect
          sx={{ width: "100%" }}
          slotProps={{
            textField: {
              onBlur: (e) => {
                !touched?.lastDonatedDate && setTouced(name, e.type === "blur");
              },
              error: !!touched && !!errors,
              helperText: !!touched && errors,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
