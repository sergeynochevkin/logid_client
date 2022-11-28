import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { NotificationContext } from '../..'
import NotificationItem from './NotificationItem'
import './Notification.css'

const NotificationComponent = observer(() => {
    const { Notification } = useContext(NotificationContext)

    return (
        <>
            {Notification.notifications.length !== 0 ?
                <div className={'notification_container'}>
                    {Notification.notifications.map(notification =>
                        <NotificationItem
                            key={notification.id}
                            message={notification.message}
                            type={notification.type}
                            id={notification.id}
                        />
                    )}
                </div> : <></>
            }
        </>
    )
})
export default NotificationComponent


