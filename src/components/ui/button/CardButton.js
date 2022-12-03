import './Button.css'

import React from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..'

const CardButton = ({ children, ...props }) => {

        const { Setting } = useContext(SettingContext)

        return (
                <div className={Setting.app_theme === 'light' ? 'card_button' : 'card_button card_button_dark'} {...props}>{children}</div>
        )
}

export { CardButton }