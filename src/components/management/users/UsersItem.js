import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ManagementContext, SettingContext, TranslateContext, UserContext } from '../../..'
import useComponentVisible from '../../../hooks/useComponentVisible'

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
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'


const UsersItem = observer(({ oneUser, selected, setSelected, setAllSelected, allSelected }) => {
    const { Setting } = useContext(SettingContext)
    const [actionMenuActive, setActionMenuActive] = useState(false)
    const { Translate } = useContext(TranslateContext)
    const { Management } = useContext(ManagementContext)
    const { user } = useContext(UserContext)

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='users_item_container'
                style={{ border: selected.includes(oneUser.id) ? 'solid 1px orange' : '' }}
                onClick={() => {
                    if (!selected.includes(oneUser.id)) {
                        setSelected([...selected, oneUser.id])
                        if (selected.length + 1 === Management.users.length) {
                            setAllSelected(true)
                        }
                    }
                    selected.includes(oneUser.id) && setSelected(selected.filter(el => el !== oneUser.id))
                    if (selected.includes(oneUser.id) && allSelected) {
                        setAllSelected(false)
                    }
                }}
            >
                <div className={`users_item_properties_container ${Setting.app_theme}`}>
                    <div className='users_item_property'>{oneUser.email}</div>
                    <div className='users_item_property'>{SetNativeTranslate(Translate.language, '', oneUser.role)}</div>
                    <div className='users_item_property'>{SetNativeTranslate(Translate.language, '', oneUser.user_info.country)}</div>
                    <div className='users_item_property'>{oneUser.user_info.city}</div>
                    <div className='users_item_property'>{SetNativeTranslate(Translate.language, '', oneUser.transports.length)}</div>
                </div>
                <div className='management_more_icon_container'>
                    <img
                        onClick={(event) => {
                            event.stopPropagation()
                            actionMenuActive && setActionMenuActive(false)
                            actionMenuActive && setIsComponentVisible(false)
                            !actionMenuActive && setActionMenuActive(true)
                            !actionMenuActive && setIsComponentVisible(true)
                        }}
                        className='management_more_icon' src={Setting.app_theme === 'light' ? more : more_dark} />
                    {actionMenuActive && isComponentVisible ?
                        <div className='users_item_action_menu' ref={ref}>
                            <img src={Setting.app_theme === 'light' ? mail : mail_dark} className='management_sync_icon' alt='mail'></img>
                            <img src={Setting.app_theme === 'light' ? alert : alert_dark} className='management_sync_icon' alt='alert'></img>
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