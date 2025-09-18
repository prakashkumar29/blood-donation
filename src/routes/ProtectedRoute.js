import React from "react";
import { Layout } from "../components/pages/Layout";
import { Navigate } from "react-router-dom";
import { getCookie } from "../constants/globalConstants";

export const ProtectedRoute = () => {
  const token = getCookie("token");

  return token ? <Layout /> : <Navigate to="/login" />;
};
