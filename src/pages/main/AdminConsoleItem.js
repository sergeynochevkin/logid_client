import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { SettingContext } from '../..'

const AdminConsoleItem = observer(({ plan, currentRate, comment }) => {

    const { Setting } = useContext(SettingContext)

    const [rate, setRate] = useState(0)
    const [field, setField] = useState(99)

    // make icreament
    useEffect(() => {
        setRate(currentRate / plan * 100)
        setField(99 - currentRate / plan * 100)
    }, [])

    return (
        <div className='admin_console_item'>
            <div className='admin_console_progress'>
                <div className='admin_console_progress_circle'>
                    <div className='admin_console_progress_segment' style={{ background: `conic-gradient(rgba(90, 90, 90, 0.792) ${rate}%, 1%,rgba(194, 194, 194, 0.822)  ${field}%)` }}></div>
                    <div className={`admin_console_progress_inner ${Setting.app_theme}`}></div>
                    <div className='admin_console_level_circle_value'>{currentRate}/{plan}</div>
                    <div className='admin_console_level_circle_value_comment'>{comment}</div>
                </div>
            </div>

        </div>
    )
})

export default AdminConsoleItem