import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../..'
import './Banner.css'



const PageBanner = observer(({ children, ...props }) => {

    const { Setting } = useContext(SettingContext)

    return (
        <div className={Setting.app_theme === 'light' ? 'page_banner' : 'page_banner page_banner_dark'}>
            <div className='page_banner_slogan' {...props}>{children}</div>
        </div>
    )
})

export default PageBanner