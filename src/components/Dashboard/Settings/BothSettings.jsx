import React from 'react';
import Settings from './Settings';
import AdminSettings from './AdminSettings';
import { getFromStorage } from '../../../utils/storage';

const checkLocation = () => {
    return getFromStorage("username") ? (getFromStorage("username").type === "profile" ? false : true) : false
  }

const checkAdmin = () => {
  return getFromStorage("username") ? (getFromStorage("username").privilege === 0 ? true : false) : true
}

const BothSettings = ({isOpened, changeState}) => {
    return <div>
            {!checkLocation() ?
              <Settings isOpened={isOpened} changeState={changeState} />
              :
              checkAdmin() &&
              <AdminSettings isOpened={isOpened} changeState={changeState} />
            }
    </div>
}

export default BothSettings