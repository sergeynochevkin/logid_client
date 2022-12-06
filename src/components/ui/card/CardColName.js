import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'

const CardColName = observer(({ children, ...props }) => {

    const { Setting } = useContext(SettingContext)

    return (
        <div{...props} className={ Setting.app_theme === 'light' ? 'card_col_name' :'card_col_name card_col_name_dark'}>{children}</ div>
    )
})

export { CardColName }