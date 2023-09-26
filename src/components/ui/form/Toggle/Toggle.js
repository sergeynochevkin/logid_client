import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { SettingContext, UserInfoContext } from '../../../..'
import { updateSetting } from '../../../../http/settingApi'
import './Toggle.css'

const Toggle = ({ setting, disabled, updateSettingAction }) => {


  return (
    <>      
      <div className={`toggle ${disabled ? 'disabled' : ''}`}>
        <input disabled = {disabled} type='checkbox' checked={setting.value} id={setting.id} value={setting.value}
          onChange={() => {
            updateSettingAction(setting)
          }}
        ></input>
        <label htmlFor={setting.id}><h2>OFF</h2><h1>ON</h1></label>
      </div>
    </>
  )
}

export default observer(Toggle)