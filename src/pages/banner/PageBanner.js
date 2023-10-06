import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../..'



const PageBanner = observer(({ children, ...props }) => {

    const { Setting } = useContext(SettingContext)

    return (
        <div className='banner'>
            <div className={`text_large ${Setting.app_theme}`} {...props}>{children}</div>
        </div>
    )
})

export default PageBanner