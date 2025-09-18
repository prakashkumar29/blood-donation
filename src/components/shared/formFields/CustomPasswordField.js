import React from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function CustomPasswordField({
  id,
  name,
  onChange,
  value,
  variant,
  onBlur,
  label,
  disabled,
  style,
  isViewMode,
  showEyeIcon,
  touched,
  onKeyDown,
  fixedErrors,
  errors,
  customHelpertext,
  placeholder,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (e) => {
    return !/^\S+$/.test(e.key) && e.preventDefault();
  };
  return (
    <>
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        variant={variant ? variant : "outlined"}
        type={showPassword ? "text" : "password"}
        name={name}
        fullWidth
        autoComplete={"off"}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ""}
        style={style}
        onKeyDown={onKeyDown}
        error={Boolean(customHelpertext || (touched && errors))}
        helperText={
          customHelpertext ||
          (!fixedErrors && touched && errors
            ? errors
            : "")
        }
        InputProps={{
          readOnly: isViewMode,
          disabled: disabled,
          onKeyPress: (e) => handleKeyPress(e),
          endAdornment: showEyeIcon && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                color="primary"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {fixedErrors && touched?.[name] && errors?.[name] ? (
        <p
          style={{
            color: "red",
            margin: "5px",
            fontSize: "13px",
            position: "absolute",
          }}
        >
          {errors?.[name]}
        </p>
      ) : (
        <p style={{ margin: "0" }}>{""}</p>
      )}
    </>
  );
}
