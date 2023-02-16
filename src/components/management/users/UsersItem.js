import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useState } from 'react'
import { SettingContext, UserContext } from '../../..'

import more from '../../../assets/icons/more.png'
import more_dark from '../../../assets/icons/more_dark.png'
import block from '../../../assets/icons/block.png'
import block_dark from '../../../assets/icons/block_dark.png'
import remove from '../../../assets/icons/remove.png'
import remove_dark from '../../../assets/icons/remove_dark.png'

const UsersItem = observer(({ oneUser }) => {
    const { Setting } = useContext(SettingContext)
    const [actionMenuActive, setActionMenuActive] = useState(false)

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
                            !actionMenuActive && setActionMenuActive(true)
                        }}
                        className='management_more_icon' src={Setting.app_theme === 'light' ? more : more_dark} />
                    {actionMenuActive &&
                        <div className='users_item_action_menu'>
                            <img src={Setting.app_theme === 'light' ? block : block_dark} className='management_sync_icon' alt='block'></img>
                            <img src={Setting.app_theme === 'light' ? remove : remove_dark} className='management_sync_icon' alt='remove'></img>
                        </div>
                    }
                </div>
            </div>
        </>
    )
})

export default UsersItem