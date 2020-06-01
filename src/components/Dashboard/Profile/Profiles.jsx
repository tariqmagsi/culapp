import React from 'react';
import Profile from './Profile';
import AdminProfile from './AdminProfile';
import { getFromStorage } from '../../../utils/storage';

const checkLocation = () => {
  return getFromStorage("username") ? (getFromStorage("username").type === "profile" ? false : true) : false
}

const checkAdmin = () => {
  return getFromStorage("username") ? (getFromStorage("username").privilege === 0 ? true : false) : true
}

const Profiles = ({isOpened, changeState}) => {
    return <div>
            {!checkLocation() ?
              <Profile isOpened={isOpened} changeState={changeState} />
              :
              checkAdmin() &&
              <AdminProfile isOpened={isOpened} changeState={changeState} />
            }
    </div>
}

export default Profiles