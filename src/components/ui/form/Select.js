import './Form.css'

import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'

const Select = observer(({children, ...props}) => {
    const {Setting} = useContext(SettingContext)
  return (
    <select className={Setting.app_theme === 'light' ? 'custom_select' : 'custom_select custom_select_dark'} {...props}>{children}</select>
  )
})

export  {Select}