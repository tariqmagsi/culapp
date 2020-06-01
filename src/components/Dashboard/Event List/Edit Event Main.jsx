import React from 'react';
import { getFromStorage } from '../../../utils/storage';
import EditEvent from './Edit Event';

const checkLocation = () => {
    return getFromStorage("username") ? (getFromStorage("username").type === "profile" ? false : true) : false
  }

export default function EditEventMain(props) {
    return (
        <div>
            {checkLocation() &&
                <EditEvent isOpened={props.isOpened} changeState={props.changeState} />
            }
        </div>
    )
}