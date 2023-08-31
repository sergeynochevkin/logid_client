import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Loader.css'
import { observer } from 'mobx-react-lite'

const PageFallBack = observer(() => {
    const { Setting } = useContext(SettingContext)


    return (
        <div className={`page_fallback_container ${Setting.app_theme}`}></div>
    )
})

export default PageFallBack