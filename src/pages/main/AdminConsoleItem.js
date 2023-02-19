import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../..'

const AdminConsoleItem = observer(({ plan, currentRate, comment }) => {

    const { Setting } = useContext(SettingContext)
    let rate = `-2deg`

    return (
        <div className='admin_console_item'>
            <div className='admin_console_progress'>
                <div className='admin_console_progress_circle'>
                    <div className='admin_console_progress_segment' style={{ transform: `rotate(270deg) skew(${rate})` }}></div>
                    <div className={`admin_console_progress_inner ${Setting.app_theme}`}></div>
                    <div className='admin_console_level_circle_value'>{currentRate}</div>
                    <div className='admin_console_level_circle_value_comment'>{comment}</div>
                </div>
            </div>

        </div>
    )
})

export default AdminConsoleItem