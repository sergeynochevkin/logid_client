import React from 'react'
import Toggle from '../ui/form/Toggle/Toggle'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'

const SettingItem = ({id, name, value}) => {
    return (
        <HorizontalContainer
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <div style={{ whiteSpace: 'normal', fontSize: '10px', width: '70%' }}>{name}</div><Toggle id={id} value={value} />
        </HorizontalContainer>
    )
}

export default SettingItem