import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { SettingContext, UserInfoContext } from '../..'
import { useFetching } from '../../hooks/useFetching'
import { fetchSettings } from '../../http/settingApi'
import SettingItem from './SettingItem'

const Container = styled.div`
display:flex;
flex-direction:column;
gap:5px;
align-items:left;
`

const SettingsComponent = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [fetchStart, setFetchStart] = useState(false)

    const sortSetings = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }

    const [fetching, error] = useFetching(async () => {
        await fetchSettings(UserInfo.userInfo.id).then(data => Setting.setUserSettings(data))
        setFetchStart(false)
    })

    useEffect(() => {
        fetching()
    }, [])      

    return (
        <Container
            style={{ boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', backgroundColor: 'rgb(245, 245, 245, 0.8)', minHeight: '500px', marginTop: '10px' }}>
            {Setting.user_settings.slice().sort(sortSetings).map(setting =>
                <SettingItem id={setting.id} key={setting.id} name={setting.name} value={setting.value}  />)}
        </Container>
    )
})

export default SettingsComponent