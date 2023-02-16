import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { FetcherContext, ManagementContext, SettingContext, UserContext } from '../../..'
import '../Management.css'
import UsersItem from './UsersItem'

import sync from '../../../assets/icons/sync.png'
import sync_dark from '../../../assets/icons/sync_dark.png'
import search from '../../../assets/icons/search.png'
import search_dark from '../../../assets/icons/search_dark.png'
import arrow_back from '../../../assets/icons/arrow_back.png'
import arrow_back_dark from '../../../assets/icons/arrow_back_dark.png'

const UsersList = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Management } = useContext(ManagementContext)
    const { fetcher } = useContext(FetcherContext)
    const { user } = useContext(UserContext)

    const [selected, setSelected] = useState([])
    const [searchActive, setSearchActive] = useState(false)

    return (
        <>
            <div className='management_actions_container'>
                <img src={Setting.app_theme === 'light' ? sync : sync_dark} className='management_sync_icon' alt='sync'
                    onClick={() => {
                        fetcher.setManagementUsers(true)
                    }}
                ></img>
                {!searchActive ?
                <img src={Setting.app_theme === 'light' ? search : search_dark} className='management_sync_icon' alt='sync'
                    onClick={() => {
                        setSearchActive(true)
                    }}
                ></img> : 
                <img src={Setting.app_theme === 'light' ? arrow_back : arrow_back_dark} className='management_sync_icon' alt='sync'
                    onClick={() => {
                        setSearchActive(false)
                    }}
                ></img>}
                {searchActive && <input type='text' className={`management_search ${Setting.app_theme}`}></input>}
            </div>
            <div className='users_list_container'>
                {Management.users.filter(el => el.id !== user.user.id).map(oneUser => <UsersItem selected={selected} setSelected={setSelected} oneUser={oneUser} />)}
            </div>
        </>
    )
})

export default UsersList