import React, { useContext } from 'react'
import './Notification.css'
import close_white from '../../../src/assets/close_white.png';
import { NotificationContext } from '../..';
import { deleteNotification } from '../../http/notificationApi';
import { setTime } from '../../modules/setTime';

const ServerNotificationItem = ({ notification, setFetchPartnersStart, setModalActive }) => {
    const { Notification } = useContext(NotificationContext)
    const deleteNotificationAction = () => {
        deleteNotification(notification.id)
        setFetchPartnersStart()
        if (Notification.server_notifications.length === 1) {
            setModalActive(false)
        }
    }

    return (<>
        <div className={'list_item_container'}>

            <img src={close_white}
                onClick={deleteNotificationAction}
                className={'item_delete_icon'}
            ></img>
            <div className={'list_time'}>{setTime(new Date(notification.createdAt), 0, 'show')}</div>
            <div className={'list_meassage'}>{notification.message}</div>
        </div>
    </>
    )
}

export default ServerNotificationItem