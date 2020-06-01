import React from 'react';
import AdminRequests from './AdminRequests';
import { getFromStorage } from '../../../utils/storage';

const checkLocation = () => {
    return getFromStorage("username") ? (getFromStorage("username").privilege === 0 ? true : false) : true
  }

export default function AdminRequestMain(props) {
    return (
        <div>
            {checkLocation() &&
                <AdminRequests isOpened={props.isOpened} changeState={props.changeState} />
            }
        </div>
    )
}