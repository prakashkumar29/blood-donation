import * as React from "react";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@emotion/react";

const RadioBox = styled("div")(({ rowBreak }) => ({
  display: "flex",
  alignItems: rowBreak ? "left" : "center",
  flexDirection: rowBreak && "column",
}));

export function CustomRadioButton({
  inputValues,
  name,
  onChange,
  onBlur,
  value = "",
  labelStyle,
  label,
  style,
  rowBreak,
  disabled,
  defaultValue,
  isViewMode,
  accessor,
  touched,
  errors,
  customHelpertext,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("600"));
  return (
    <FormControl style={style}>
      <RadioBox
        rowBreak={isMobile ? true : rowBreak}
        style={{ justifyContent: "space-between" }}
      >
        <span
          style={{
            marginRight: "20px",
            fontSize: "18px",
            fontWeight: 500,
            ...labelStyle,
          }}
        >
          {label}
        </span>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name={name}
          onChange={ !isViewMode ? onChange : ()=>{}}
          onBlur={onBlur}
          error={Boolean(customHelpertext || (touched && errors)).toString()}
          value={value || ""}
          
          defaultValue={defaultValue}
          row={!isMobile}
        >
          {inputValues?.map((option, i) => {
            return (
              <FormControlLabel
                value={option[accessor]}
                control={<Radio />}
                label={option?.name || option?.label}
                key={i}
                name={name}
                disabled={disabled}
              ></FormControlLabel>
            );
          })}
        </RadioGroup>
      </RadioBox>
      <FormHelperText error>
        {customHelpertext || (touched && errors)}
      </FormHelperText>
    </FormControl>
  );
}
