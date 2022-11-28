import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { SettingContext, UserInfoContext } from '../../../..'
import { updateSetting } from '../../../../http/settingApi'
import './Toggle.css'

const Toggle = ({ id, value }) => {
   const { UserInfo } = useContext(UserInfoContext)
  const { Setting } = useContext(SettingContext)

  const updateSettingAction = async () => {
    if (value === false) {
      await updateSetting(id, true, UserInfo.userInfo.id).then(data => Setting.setUserSettings(data))
    }
    if (value === true) {
      await updateSetting(id, false, UserInfo.userInfo.id).then(data => Setting.setUserSettings(data))
    }
    
  }

  return (
    <>      
      <div className={'toggle'}>
        <input type='checkbox' checked={value} id={id} value={value}
          onChange={() => {
            updateSettingAction()
          }}
        ></input>
        <label htmlFor={id}><h2>OFF</h2><h1>ON</h1></label>
      </div>
    </>
  )
}

export default observer(Toggle)