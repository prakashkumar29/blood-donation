import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Container,
  SignUpFormContainer,
  FormHeading,
} from "../../../styles/signUp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CustomRadioButton } from "../../shared";
import { roles } from "../../../api/apiPaths";
import Institution from "./Institution";
import Donar from "./Donar";
import Individual from "./Individual";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../../routes/routePaths";
import useArraySeeds from "../../../utils/useArraySeeds";
import { codes } from "../../../constants/globalConstants";

const SignUpForm = () => {
  const requiredRoles = [
    codes?.donor,
    codes?.individual_seeker,
    codes?.institution_seeker,
  ];
  const { role: rolesList } = useArraySeeds([roles]);
  const roleSeeds =
    rolesList?.filter(({ code }) => requiredRoles.includes(code)) || [];
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue(e.target?.value);
  };

  const handleBack = () => {
    navigate(LOGIN);
  };

  const getSignInForm = () => {
    const code = roleSeeds?.find(({ id }) => id === value)?.code;
    if (code === codes?.donor) return <Donar />;
    if (code === codes?.individual_seeker) return <Individual />;
    if (code === codes?.institution_seeker) return <Institution />;
    return <></>;
  };

  useEffect(() => {
    if (roleSeeds.length > 0 && !value) setValue(roleSeeds[0]?.id);
  }, [roleSeeds]); // eslint-disable-line

  return (
    <Container>
      <SignUpFormContainer>
        <FormHeading>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon sx={{ fontSize: "28px", color: "#066BBd" }} />
          </IconButton>{" "}
          Sign Up
        </FormHeading>
        <CustomRadioButton
          name="role"
          label="Choose role"
          inputValues={roleSeeds}
          value={value}
          onChange={handleChange}
          accessor="id"
          rowBreak
        />
        {getSignInForm()}
      </SignUpFormContainer>
    </Container>
  );
};

export default SignUpForm;
