import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import block from '../../../assets/icons/block.png'
import block_dark from '../../../assets/icons/block_dark.png'
import remove from '../../../assets/icons/remove.png'
import remove_dark from '../../../assets/icons/remove_dark.png'
import mail from '../../../assets/icons/mail.png'
import mail_dark from '../../../assets/icons/mail_dark.png'
import alert from '../../../assets/icons/alert.png'
import alert_dark from '../../../assets/icons/alert_dark.png'
import arrow_back from '../../../assets/icons/arrow_back.png'
import arrow_back_dark from '../../../assets/icons/arrow_back_dark.png'
import send from '../../../assets/icons/send.png'
import send_dark from '../../../assets/icons/send_dark.png'
import { SettingContext } from '../../..'
import useComponentVisible from '../../../hooks/useComponentVisible'
import Modal from '../../ui/modal/Modal'

const UsersItemActionMenu = observer(({ setActionMenuActive, setModalActive, setAction, setActionIcons, actionIcons }) => {

    const { Setting } = useContext(SettingContext)

    const buttonAction = (action, iconOne, iconTwo) => {
        setActionMenuActive(false)
        setActionIcons({ ...actionIcons, one: iconOne, two: iconTwo })
        setAction(action)
        setModalActive(true)
    }

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='users_item_action_menu' ref={ref}>
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
                <img src={Setting.app_theme === 'light' ? block : block_dark} className='management_sync_icon' alt='block'
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
            </div>

        </>
    )
})

export default UsersItemActionMenu