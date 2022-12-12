import './Text.css'

import React from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'

const LikeCardButton = observer(({ children, ...props }) => {
    const { Setting } = useContext(SettingContext)
    return (
        <div className={Setting.app_theme === 'light' ? 'iike_card_button' : 'iike_card_button dark'} {...props}>{children}</div>
    )
})

export { LikeCardButton }