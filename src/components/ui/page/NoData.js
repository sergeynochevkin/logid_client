import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { FetcherContext, SettingContext, TranslateContext } from '../../..'
import './Page.css'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'

const NoData = observer(({ children, ...props }) => {
    const { Setting } = useContext(SettingContext)
    const { fetcher } = useContext(FetcherContext)
    const { Translate } = useContext(TranslateContext)

    return (<>
        {fetcher.custom_loading ?
            <div{...props} className={Setting.app_theme === 'light' ? 'no_data' : 'no_data dark'}>
                {SetNativeTranslate(Translate.language, {
                    russian: ['Загрузка...'],
                    english: ['Loading...'],
                    spanish: ['Cargando...'],
                    turkish: ['Yükleniyor...'],
                })}</div> : <div className={Setting.app_theme === 'light' ? 'no_data' : 'no_data dark'}>{children}</div>
        }


    </>
    )
})

export default NoData