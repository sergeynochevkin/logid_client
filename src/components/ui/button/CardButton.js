import './Button.css'

import React from 'react'
import { useContext } from 'react'
import { FetcherContext, SettingContext } from '../../..'
import { observer } from 'mobx-react-lite'
import ButtonLoader from '../loader/ButtonLoader'

const CardButton = observer(({ children, ...props }) => {
        const { Setting } = useContext(SettingContext)
        const { fetcher } = useContext(FetcherContext)

        return (
                <button  disabled={fetcher.loading} className={Setting.app_theme === 'light' ? 'card_button' : 'card_button card_button_dark'} {...props}>{fetcher.loading ? <ButtonLoader /> : children}</button>
        )
})

export { CardButton }