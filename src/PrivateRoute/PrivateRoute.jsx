import React from 'react';
import { Redirect} from "react-router-dom";
import { getFromStorage } from '../utils/storage';
import { isLogin } from './isLogin';

export const PrivateRoute = ({ children }) => {
    if (!isLogin()) {
        if(!getFromStorage("isLoggedIn"))
            return <Redirect to="/" />;
        else if(window.location.pathname === "/" || window.location.pathname === "/signup") 
            return <Redirect to="/create_event" />
    }
  
    return children;
};