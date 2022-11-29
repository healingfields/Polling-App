import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const PrivateRoute = (props) => {
  
  const navigate = useNavigate();
  console.log(props.isAuthenticated);

  if(!props.isAuthenticated){
    return <Navigate to="/login" />
  }
  return props.children;
}
export default PrivateRoute;