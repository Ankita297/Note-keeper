import React from "react";
import { Alert } from "@mui/material";
const ErrorMessage = ({severity="info",children}) => {
  return (
    <Alert style={{ fontSize: 20 }} severity={severity}>
      {children}
    </Alert>
  );
};

export default ErrorMessage;
