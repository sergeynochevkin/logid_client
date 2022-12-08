import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..'
import './Form.css'

const AddDeleteFieldButton = observer(({ children, props }) => {

   const { Setting } = useContext(SettingContext)

   return (
      <div {...props} className = {Setting.app_theme === 'light' ? 'add_delete_button' : 'add_delete_button add_delete_button_dark'}>{children}</div>
   )
})

export { AddDeleteFieldButton }