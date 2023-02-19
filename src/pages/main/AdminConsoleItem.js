import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { SettingContext } from '../..'

const AdminConsoleItem = observer(({ plan, currentRate, comment }) => {

    const { Setting } = useContext(SettingContext)

    const [rate, setRate] = useState(0)
    const [currenGrow, setCurrentGrow] = useState(0)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (rate < currentRate / plan * 100) {
                setRate(rate + 1);
            }

        }, 10);
        return () => {
            clearTimeout(timeout);
        };
    }, [rate]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currenGrow < currentRate) {
                setCurrentGrow(currenGrow + 1);
            }
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [currenGrow]);


    return (
        <div className='admin_console_item'>
            <div className='admin_console_progress'>
                <div className='admin_console_progress_circle'>
                    <div className='admin_console_progress_segment' style={{ background: `conic-gradient(rgba(90, 90, 90, 0.792) ${rate}%,1%,rgba(194, 194, 194, 0.822)` }}></div>
                    <div className={`admin_console_progress_inner ${Setting.app_theme}`}></div>
                    <div className='admin_console_level_circle_value'>{currenGrow}/{plan}</div>
                    <div className='admin_console_level_circle_value_comment'>{comment}</div>
                </div>
            </div>
        </div>
    )
})

export default AdminConsoleItem