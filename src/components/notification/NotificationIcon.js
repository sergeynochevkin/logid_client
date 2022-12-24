import { observer } from 'mobx-react-lite';
import React from 'react'
import { useContext } from 'react';
import { NotificationContext } from '../..';
import alert_grey from '../../../src/assets/alert_grey.png';
import alert_red from '../../../src/assets/alert_red.png';
import './Notification.css'

const NotificationIcon = observer(({ modalActive, setModalActive }) => {
    const { Notification } = useContext(NotificationContext)

    return (
        <>
            {!Notification.server_notifications.length > 0 ?
                <></>
                :
                 <div className='notification_circle'> 
                 <div  className='notification_count'
                  onClick={() => {
                        setModalActive(true)
                    }}
                 >{Notification.server_notifications.length}</div>    

                  {/* <img
                    src={alert_red}
                    className={'notification_icon active'}
                    onClick={() => {
                        setModalActive(true)
                    }}
                ></img> */}

                </div>

            }
        </>
    )
})

export default NotificationIcon