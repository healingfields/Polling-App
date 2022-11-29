import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthContext } from '../../../util/authProvider';

export const PrivateRoute = (props) => {
  
  const navigate = useNavigate();
  const {authData} = useContext(AuthContext);
  console.log(authData);

  if(!authData.isAuthenticated){
    return <Navigate to="/login" />
  }
  return props.children;
}
export default PrivateRoute;