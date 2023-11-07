import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import mail from '../../../assets/icons/mail.png'
import mail_dark from '../../../assets/icons/mail_dark.png'
import alert from '../../../assets/icons/alert.png'
import alert_dark from '../../../assets/icons/alert_dark.png'
import arrow_back from '../../../assets/icons/arrow_back.png'
import arrow_back_dark from '../../../assets/icons/arrow_back_dark.png'
import send from '../../../assets/icons/send.png'
import send_dark from '../../../assets/icons/send_dark.png'
import person_remove from '../../../assets/icons/person_remove.png'
import person_remove_dark from '../../../assets/icons/person_remove_dark.png'
import { FetcherContext, NotificationContext, SettingContext } from '../../..'
import useComponentVisible from '../../../hooks/useComponentVisible'
import { deleteUser } from '../../../http/managementApi'
import { v4 } from 'uuid'

const UsersItemActionMenu = observer(({ setActionMenuActive, setAction, setActionIcons, actionIcons, modalActive, setModalActive, oneUser, setFormData, formData }) => {

    const { Setting } = useContext(SettingContext)
    const { fetcher } = useContext(FetcherContext)
    const { Notification } = useContext(NotificationContext)

    const buttonAction = (action, iconOne, iconTwo) => {
        setFormData({ ...formData, type: action })
        setActionMenuActive(false)
        setActionIcons({ ...actionIcons, one: iconOne, two: iconTwo })
        setAction(action)
        setModalActive(true)
    }

    const deleteUserAction = async (user) => {
        try {
            await deleteUser(user.id)     
            fetcher.setManagementUsers(true)
            Notification.addNotification([{ id: v4(), type: 'error', message: `User ${user.email} deleted` }])
            setActionMenuActive(false)           
        } catch (error) {
            Notification.addNotification([{ id: v4(), type: 'error', message: error.response.data.message }])
            setActionMenuActive(false)
        }       
    }

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='item_action_menu' ref={ref}>
                <img src={Setting.app_theme === 'light' ? mail : mail_dark} className='management_sync_icon' alt='mail'
                    onClick={(event) => {
                        event.stopPropagation()
                        buttonAction('mail', Setting.app_theme === 'light' ? arrow_back : arrow_back_dark, Setting.app_theme === 'light' ? send : send_dark)
                    }}
                ></img>
                <img src={Setting.app_theme === 'light' ? alert : alert_dark} className='management_sync_icon' alt='alert'
                    onClick={(event) => {
                        event.stopPropagation()
                        buttonAction('alert', Setting.app_theme === 'light' ? arrow_back : arrow_back_dark, Setting.app_theme === 'light' ? send : send_dark)
                    }}
                ></img>
                <img src={Setting.app_theme === 'light' ? person_remove : person_remove_dark} className='management_sync_icon' alt='alert'
                    onClick={(event) => {
                        event.stopPropagation()
                        deleteUserAction(oneUser)
                    }}
                ></img>

                {/* <img src={Setting.app_theme === 'light' ? block : block_dark} className='management_sync_icon' alt='block'
                    onClick={(event) => {
                        event.stopPropagation()
                        buttonAction('block')
                    }}
                ></img>
                <img src={Setting.app_theme === 'light' ? remove : remove_dark} className='management_sync_icon' alt='remove'
                    onClick={(event) => {
                        event.stopPropagation()
                        buttonAction('remove')
                    }}
                ></img>

                <img src={Setting.app_theme === 'light' ? history : history_dark} className='management_sync_icon' alt='history'
                    onClick={(event) => {
                        event.stopPropagation()
                        buttonAction('history')
                    }}
                ></img> */}

            </div>

        </>
    )
})

export default UsersItemActionMenu