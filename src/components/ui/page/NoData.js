import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Page.css'

const NoData = observer(({ children, ...props }) => {
    const { Setting } = useContext(SettingContext)

    return (
        <div{...props} className={Setting.app_theme === 'light' ? 'no_data' : 'no_data_dark'}>{children}</div>
    )
})

export default NoData