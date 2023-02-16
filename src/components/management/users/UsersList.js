import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { FetcherContext, ManagementContext, SettingContext, UserContext } from '../../..'
import '../Management.css'

import sync from '../../../assets/icons/sync.png'
import sync_dark from '../../../assets/icons/sync_dark.png'
import UsersItem from './UsersItem'

const UsersList = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Management } = useContext(ManagementContext)
    const { fetcher } = useContext(FetcherContext)
    const { user } = useContext(UserContext)

    return (
        <>
            <div className='management_actions_container'>

                <img src={Setting.app_theme === 'light' ? sync : sync_dark} className='management_sync_icon' alt='sync'
                    onClick={() => {
                        fetcher.setManagementUsers(true)
                    }}
                ></img>
            </div>
            <div className='users_list_container'>
                {Management.users.filter(el => el.id !== user.user.id).map(oneUser => <UsersItem oneUser={oneUser} />)}
            </div>
        </>
    )
})

export default UsersList