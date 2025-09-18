import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/material";

export const CustomSelectField = ({
  label,
  variant,
  inputValues,
  name,
  onChange,
  onBlur,
  value = "",
  className,
  style,
  fieldStyle,
  onOpen,
  isViewMode,
  disabled,
  touched,
  errors,
  customHelpertext,
  accessor,
  accessorReturn,
  getOptionLabel,
}) => {
  return (
    <Box style={style}>
      <FormControl
        fullWidth
        error={Boolean(customHelpertext || (touched && errors))}
      >
        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
        <Select
          labelid="demo-simple-select-error-label"
          id="demo-simple-select"
          value={value && inputValues?.length ? value : ""}
          label={label}
          onChange={onChange}
          variant={variant || "outlined"}
          fullWidth
          onOpen={onOpen}
          name={name}
          onBlur={onBlur}
          error={Boolean(customHelpertext || (touched && errors))}
          className={className}
          style={fieldStyle}
          inputProps={{
            readOnly: Boolean(isViewMode),
            disabled: Boolean(disabled),
          }}
        >
          {inputValues?.map((option, index) => {
            return (
              <MenuItem key={index} value={option?.id || option?.value}>
                {(getOptionLabel && getOptionLabel(option)) ||
                  option?.[accessor] ||
                  option?.name ||
                  option?.label ||
                  "No data Found"}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error>
          {customHelpertext || (touched && errors)}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};
