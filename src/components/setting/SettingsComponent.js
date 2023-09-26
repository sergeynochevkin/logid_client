import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { AdressContext, SettingContext, UserContext, UserInfoContext } from '../..'

import SettingItem from './SettingItem'
import './Setting.css'
import { updateSetting } from '../../http/settingApi'


const SettingsComponent = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Adress } = useContext(AdressContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)


    const updateSettingAction = async (setting) => {
        if (setting.value === false) {
            await updateSetting(setting.id, true, UserInfo.userInfo.id).then(data => Setting.setUserSettings(data))
        }
        if (setting.value === true) {
            await updateSetting(setting.id, false, UserInfo.userInfo.id).then(data => Setting.setUserSettings(data))
        }
    }

    const sortSetings = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <>
            <div className={Setting.app_theme === 'light' ? 'setting_container' : 'setting_container setting_container_dark'}>
                <div className='settings_list'>
                    {Adress.country.value === 'russia' ? Setting.user_settings.slice().sort(sortSetings).filter(el=>el.name !=='can_make_offer' && el.name !=='can_set_order_as_disrupted').map(setting =>
                        <SettingItem  updateSettingAction={updateSettingAction} disabled={user.user.role === 'driver' && setting.managing_by === 'supervisor'} setting={setting} key={setting.id} />) : Setting.user_settings.slice().sort(sortSetings).filter(el => el.name !== 'sms_messaging').map(setting =>
                            <SettingItem updateSettingAction={updateSettingAction} disabled={user.user.role === 'driver' && setting.managing_by === 'supervisor'} setting={setting} key={setting.id} />)}
                </div>
                {/* <div className='account_actions_container'>
                    <Button>{SetNativeTranslate(Translate.language, {
                        russian: ['Удалить аккаунт'],
                        english: ['Delete account']
                    }, '')}</Button>
                </div> */}

            </div>

        </>
    )
})

export default SettingsComponent