import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Page.css'

const PageContainer = ({ children }) => {
    const { Setting } = useContext(SettingContext)

    return (
        <div className={Setting.app_theme === 'light' ? 'page_container' : 'page_container dark'}>{children}</div>
    )
}

export default PageContainer












