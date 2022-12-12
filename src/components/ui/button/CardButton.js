import './Button.css'

import React from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'

const CardButton = observer(({ children, ...props }) => {
        const { Setting } = useContext(SettingContext)
        return (
                <button className={Setting.app_theme === 'light' ? 'card_button' : 'card_button card_button_dark'} {...props}>{children}</button>
        )
})

export { CardButton }