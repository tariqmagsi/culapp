import React from 'react';
import { getFromStorage } from '../../../utils/storage';
import FollowRequests from './FollowRequests';

const checkLocation = () => {
    return getFromStorage("username") ? (getFromStorage("username").privilege === 0 ? true : false) : true
  }

export default function FollowRequestMain(props) {
    return (
        <div>
            {checkLocation() &&
                <FollowRequests isOpened={props.isOpened} changeState={props.changeState} />
            }
        </div>
    )
}