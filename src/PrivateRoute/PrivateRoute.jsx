import React from 'react';
import { Redirect} from "react-router-dom";
import { getFromStorage } from '../utils/storage';
import { isLogin } from './isLogin';

export const PrivateRoute = ({ children }) => {
    if (!isLogin()) {
        if(!getFromStorage("isLoggedIn"))
            return <Redirect to="/login" />;
        // else if(window.location.pathname === "/login") 
        //     return <Redirect to="/home" />
    }
  
    return children;
};