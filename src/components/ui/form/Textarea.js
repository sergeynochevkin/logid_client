import './Form.css'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'

const Textarea = observer( ({ children, ...props }) => {

    const {Setting} = useContext(SettingContext)

    return (
        <textarea className={Setting.app_theme === 'light' ? 'custom_textarea' : 'custom_textarea dark'} {...props}>{children}</textarea>
    )
})

export { Textarea }