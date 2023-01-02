import './Button.css'

import React, { useState } from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'
import ButtonLoader from '../loader/ButtonLoader'

const CardButton = observer(({ children, ...props }) => {
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
                                <button className={Setting.app_theme === 'light' ? 'card_button' : 'card_button card_button_dark'} {...props}>{children}</button>
                                : <ButtonLoader parent={'card_button'} />}
                </div>

        )
})

export { CardButton }