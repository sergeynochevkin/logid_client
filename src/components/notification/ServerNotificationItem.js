import React, { useContext } from 'react'
import './Notification.css'
import { FetcherContext, NotificationContext, SettingContext } from '../..';
import { deleteNotification } from '../../http/notificationApi';
import { setTime } from '../../modules/setTime';
import { observer } from 'mobx-react-lite';

const ServerNotificationItem = observer(({ notification, setModalActive }) => {
    const { Setting } = useContext(SettingContext)
    const { Notification } = useContext(NotificationContext)
    const { fetcher } = useContext(FetcherContext)
    const deleteNotificationAction = () => {
        deleteNotification(notification.id)
        fetcher.setServerNotifications(true)
        if (Notification.server_notifications.length === 1) {
            setModalActive(false)
        }
    }

    return (<>
        <div className={'list_item_container'}>

            <span className={"material-symbols-outlined order_action_icon dark"}
                alt='delete notification'
                onClick={deleteNotificationAction}
            >
                delete_forever
            </span>

            <div className={'list_time'}>{setTime(new Date(notification.createdAt), 0, 'show')}</div>
            <div className={'list_meassage'}>{notification.message}</div>
        </div>



    </>
    )
})

export default ServerNotificationItem