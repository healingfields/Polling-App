import React from 'react'
import { redirect } from 'react-router-dom';

export const PrivateRoute = ({isAuthenticated, children}) => {
  if(!isAuthenticated){
    redirect("/login");
  }
  return children;
}
export default PrivateRoute;