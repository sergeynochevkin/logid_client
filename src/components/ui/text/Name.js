import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..'
import './Text.css'

const Name = observer(({ children, props }) => {

   const { Setting } = useContext(SettingContext)

   return (
      <div {...props} className = {Setting.app_theme === 'light' ? 'text_name' : 'text_name_dark'}>{children}</div>
   )
})

export { Name }