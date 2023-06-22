import React, { useContext } from 'react'
import Toggle from '../ui/form/Toggle/Toggle'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { TranslateContext } from '../..'

const SettingItem = ({ id, name, value }) => {
    const { Translate } = useContext(TranslateContext)

    return (
        <HorizontalContainer
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <div style={{ whiteSpace: 'normal', fontSize: '10px', width: '70%' }}>{SetNativeTranslate(Translate.language, {}, name)}</div><Toggle id={id} value={value} />
        </HorizontalContainer>
    )
}

export default SettingItem