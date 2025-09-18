import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";

export const CustomSearch = ({label}) => {
  return (
    <TextField
      sx={{
        width: "100%",
        fontSize: "20px"
      }}
      placeholder={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
                <SearchIcon sx={{width:'30px', height:'30px'}} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
