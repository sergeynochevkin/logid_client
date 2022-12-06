import './Form.css'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'

const Input = observer( ({ children, ...props }) => {

    const {Setting} = useContext(SettingContext)

    return (
        <input className={Setting.app_theme === 'light' ? 'custom_input' : 'custom_input custom_input_dark'} {...props}>{children}</input>
    )
})

export { Input }