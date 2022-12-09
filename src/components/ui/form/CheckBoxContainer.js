import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Form.css'

const CheckBoxContainer = observer(({ children, ...props }) => {

    const { Setting } = useContext(SettingContext)

    return (
        <div {...props} className={Setting.app_theme === 'light' ? 'checkbox_container' : 'checkbox_container checkbox_container_dark'}>{children}</div>
    )
})
export { CheckBoxContainer }