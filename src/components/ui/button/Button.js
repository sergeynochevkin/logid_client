import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..';
import ButtonLoader from '../loader/ButtonLoader';

const Button = observer( ({ children, ...props }) => {
    const { Setting } = useContext(SettingContext)
    const [wait, setWait] = useState(false)

    const waitAction = () => {
        setWait(true)
        setTimeout(() => {
            setWait(false)
        }, 3000)
    }

    return (
        <div
            onClick={waitAction}
        >
            {!wait ?
                <button className={Setting.app_theme === 'light' ? 'custom_button' : 'custom_button dark'}
                    {...props}
                >{children}
                </button>
                : <ButtonLoader parent ={'button'}/>}
        </div>
    )
})

export { Button }