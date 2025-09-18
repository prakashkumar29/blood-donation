/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { FormControl, FormHelperText, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import useNotify from "../../../utils/useNotify";

const InputField = styled("input")(() => ({
  display: "none",
}));

const FileInputHolder = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  padding: 10,
  border: "1px dashed #c4c4c4",
  height: "55px !important",
  borderRadius: 5,
  svg: { fontSize: "29px" },
}));

const ImgTag = styled("img")(() => ({
  height: 40,
  width: 40,
  borderRadius: "50%",
  marginRight: 12,
}));

export function CustomFileUpload({
  name,
  label="",
  type,
  url = "",
  value = "",
  onChange,
  defaultLabel,
  setFieldValue,
  disabled,
  isMultirec,
  accept,
  touched,
  errors,
  customHelpertext,
}) {
  const [imgUrl, setImgUrl] = React.useState("");
  const [fileName, setFileName] = React.useState(
    (value && value[0]?.name) || ""
  );
  const myRefname = useRef(null);
  const [key, setKey] = useState(false);
  const { notifyError } = useNotify();
  const handleClick = (e) => {
    myRefname.current.click();
  };
  const onImageChange = (event) => {
    if (event.target.files[0].size > 10000000) {
      return notifyError("Size should be less than 10MB");
    } else if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (type === "Image" || type === "GIF") {
          setImgUrl(reader.result);
        }
        onChange(event);
        if (!isMultirec) {
          setFileName(event.target.files[0].name);
        }
      };
      if (
        event.target.files[0].type.includes(
          type.toLowerCase() === "gif" ? "image" : type.toLowerCase()
        )
      ) {
        reader.readAsDataURL(event.target.files[0]);
      } else {
        notifyError("Media type not supported");
      }
    }
  };

  useEffect(() => {
    if (type === "Image" || type === "GIF") {
      typeof url === "string" && setImgUrl(url);
    }
  }, [type, url]);

  useEffect(() => {
    if (value === "" && defaultLabel) {
      setImgUrl("");
    } else if (typeof value === "string") {
      setFileName(label);
    }
  }, [value]);

  const errorBorder =
    errors && touched
      ? {
          border: "1.8px dashed #d32f2f",
        }
      : {};

  const errorText =
    errors && touched ? { color: "#d32f2f" } : { color: "#000" };

  const imageIcon = () => {
    if ((type === "Image" || type === "GIF") && imgUrl) {
      return <ImgTag src={imgUrl} alt=""></ImgTag>;
    } else if (type === "Audio") {
      return (
        <IconButton>
          <AudioFileIcon />
        </IconButton>
      );
    } else if (type === "Video") {
      return (
        <IconButton>
          <VideoFileIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton>
          <AddPhotoAlternateIcon />
        </IconButton>
      );
    }
  };
  const resetValues = () => {
    if (type === "Image") {
      setFieldValue(`${name}Url`, "");
    }
    setImgUrl("");
    setFieldValue(name, "");
    setFieldValue(`${name}Name`, "");
    setKey(!key);
    setFileName("");
  };
  useEffect(() => {
    setKey(!key);
    if (value === "") {
      setFileName("");
    }
  }, [value]);
  return (
    <FormControl fullWidth>
      <InputField
        ref={myRefname}
        name={name}
        key={key}
        type={"file"}
        onChange={(event) => onImageChange(event)}
        label={label}
        disabled={disabled}
        accept={type === "GIF" ? "image/*" : accept}
        error={Boolean(customHelpertext || (touched && errors))}
      />

      <FileInputHolder
        style={{ ...errorBorder, cursor: "pointer", position: "relative" }}
        onClick={(e) => handleClick(e)}
      >
        {fileName && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              left: "15px",
              background: "#fff",
              padding: "0 5px",
              fontSize: "13px",
              color: "#686868",
            }}
          >
            {defaultLabel}
          </div>
        )}
        {imageIcon()}
        <span
          style={{
            // color: `${theme.palette.textColor.main}`,
            font: "normal normal normal 16px/19px Lato",
            width: "80%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            ...errorText,
          }}
        >
          {fileName || defaultLabel}
        </span>
        {!disabled && value && (
          <IconButton
            sx={{ transform: "scale(.8)" }}
            onClick={(event) => {
              event.stopPropagation();
              resetValues();
            }}
          >
            <CancelIcon />
          </IconButton>
        )}
      </FileInputHolder>
      <FormHelperText error>
        {customHelpertext || (touched && errors)}
      </FormHelperText>
    </FormControl>
  );
}
