import './Button.css'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'

const BookMark = observer( ({ children, ...props }) => {

    const { Setting } = useContext(SettingContext)

    return (
        <button className={Setting.app_theme === 'light' ? 'bookmark' : 'bookmark bookmark_dark'} {...props}>{children}</button>
    )
})

export { BookMark }