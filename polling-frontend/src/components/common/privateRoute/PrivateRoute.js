import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const PrivateRoute = ({isAuthenticated, children}) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/login")
    }
  }, [])
  

  return children;
}
export default PrivateRoute;