import { observer } from 'mobx-react-lite';
import React from 'react'
import { useContext } from 'react';
import { NotificationContext } from '../..';
import './Notification.css'

const NotificationIcon = observer(({ modalActive, setModalActive }) => {
    const { Notification } = useContext(NotificationContext)

    return (
        <>
            {!Notification.server_notifications.length > 0 ?
                <></>
                :
                <div className='notification_circle'
                    onClick={() => {
                        if (!modalActive) {
                            setModalActive(true)
                        } else {
                            setModalActive(false)
                        }
                    }}
                >
                    <div className='notification_count'
                    >{Notification.server_notifications.length}</div>

                </div>

            }
        </>
    )
})

export default NotificationIcon