import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Page.css'

const FieldName = observer(({ children, ...props }) => {

    const { Setting } = useContext(SettingContext)

    return (
        <div {...props} className={Setting.app_theme === 'light' ? 'field_name' : 'field_name field_name_dark'}>{children}</div>
    )
}
)
export { FieldName }