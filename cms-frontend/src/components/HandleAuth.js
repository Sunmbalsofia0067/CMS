import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as routes from "../constants/routePaths";

const HandleAuth = ({ children, type }) => {
  const cookies = new Cookies();
  const token = cookies.get('authorization');

  if(type === "PROTECTED"){
    return token ? children : <Navigate to={routes.loginUserPage} />;
  }

  return token ? <Navigate to={routes.homePage} /> : children;
};

export default HandleAuth;
