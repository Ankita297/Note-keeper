import React from 'react'
import { Navigate } from "react-router-dom";


const Protected = ({ isLoggedIn, children }) => {
 if (!isLoggedIn) {
   return <Navigate to="/register" replace />;
 }
 return <div>{children}</div>;};

export default Protected