import React, { useContext } from 'react'
import Toggle from '../ui/form/Toggle/Toggle'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { TranslateContext, UserContext } from '../..'
import { observer } from 'mobx-react-lite'

const SettingItem = observer(({ setting, disabled, updateSettingAction }) => {
    const { Translate } = useContext(TranslateContext)

    return (
        <HorizontalContainer
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <div style={{ whiteSpace: 'normal', fontSize: '10px', width: '70%', color: disabled ? 'grey' : '' }}>{SetNativeTranslate(Translate.language, {}, setting.name)}</div><Toggle updateSettingAction={updateSettingAction} disabled={disabled} setting={setting} />
        </HorizontalContainer>
    )
})

export default SettingItem