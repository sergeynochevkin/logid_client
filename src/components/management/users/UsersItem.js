import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { SettingContext, UserContext } from '../../..'

import more from '../../../assets/icons/more.png'
import more_dark from '../../../assets/icons/more_dark.png'
import block from '../../../assets/icons/block.png'
import block_dark from '../../../assets/icons/block_dark.png'
import remove from '../../../assets/icons/remove.png'
import remove_dark from '../../../assets/icons/remove_dark.png'
import mail from '../../../assets/icons/mail.png'
import mail_dark from '../../../assets/icons/mail_dark.png'
import alert from '../../../assets/icons/alert.png'
import alert_dark from '../../../assets/icons/alert_dark.png'
import useComponentVisible from '../../../hooks/useComponentVisible'

const UsersItem = observer(({ oneUser }) => {
    const { Setting } = useContext(SettingContext)
    const [actionMenuActive, setActionMenuActive] = useState(false)

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='users_item_container'>
                <div className={`users_item_properties_container ${Setting.app_theme}`}>
                    <div className='users_item_property'>{oneUser.email}</div>
                </div>
                <div className='management_more_icon_container'>
                    <img
                        onClick={() => {
                            actionMenuActive && setActionMenuActive(false)
                            actionMenuActive && setIsComponentVisible(false)
                            !actionMenuActive && setActionMenuActive(true)
                            !actionMenuActive && setIsComponentVisible(true)
                        }}
                        className='management_more_icon' src={Setting.app_theme === 'light' ? more : more_dark} />
                    {actionMenuActive && isComponentVisible ?
                        <div className='users_item_action_menu' ref={ref}>
                            <img src={Setting.app_theme === 'light' ? mail : mail_dark} className='management_sync_icon' alt='remove'></img>
                            <img src={Setting.app_theme === 'light' ? alert : alert_dark} className='management_sync_icon' alt='remove'></img>
                            <img src={Setting.app_theme === 'light' ? block : block_dark} className='management_sync_icon' alt='block'></img>
                            <img src={Setting.app_theme === 'light' ? remove : remove_dark} className='management_sync_icon' alt='remove'></img>
                        </div> : <></>
                    }
                </div>
            </div>
        </>
    )
})

export default UsersItem