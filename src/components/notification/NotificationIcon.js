import { observer } from 'mobx-react-lite';
import React from 'react'
import { useContext } from 'react';
import { NotificationContext } from '../..';
import alert_grey from '../../../src/assets/alert_grey.png';
import alert_red from '../../../src/assets/alert_red.png';
import alert_white_smoke from '../../../src/assets/alert_white_smoke.png';
import './Notification.css'

const NotificationIcon = observer(({ modalActive, setModalActive }) => {
    const { Notification } = useContext(NotificationContext)

    return (
        <>
            {!Notification.server_notifications.length>0 ?
                <img
                    src={alert_white_smoke}
            className={'notification_icon'}
                ></img>
                :
<img
    src={alert_red}
    className={'notification_icon active'}
    onClick={() => {
        setModalActive(true)
    }}
></img>
            }
        </>
    )
})

export default NotificationIcon