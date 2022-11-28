import React, { useContext } from 'react'
import styled from 'styled-components'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { Button } from '../ui/button/Button'
import { useColor } from '../../hooks/useColor'
import { SetTranslate } from '../../modules/SetTranslate'
import { observer } from 'mobx-react-lite'
import { NotificationContext, UserContext } from '../..'
import { restoreLink } from '../../http/userAPI'
import { v4 } from "uuid";
import { FieldName } from '../ui/page/FieldName'

const Container = styled.div`
display:flex;
flex-direction:column;
gap:5px;
align-items:left;
`



const AccountActivationStatus = observer(() => {
    const { user } = useContext(UserContext)
    const { Notification } = useContext(NotificationContext)

    const generateLinkAction = async () => {
        try {
            await restoreLink(user.user.email).then(data => Notification.addNotification([{ id: v4(), type: 'success', message: data }]))
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }

    return (
        <Container
            style={{ boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)', padding: '20px 20px 20px 20px', borderRadius: '10px', backgroundColor: 'rgb(245, 245, 245, 0.8)', alignItems: 'flex-start', justifyContent: 'start' }}
        >
            <FieldName>Статус аккаунта</FieldName>
            <div
                style={{ boxShadow: `0px 5px 10px 0px ${useColor(`${user.user.isActivated ? 'activated' : 'not_activated'}`)}`, padding: '10px 20px 10px 20px', borderRadius: '10px', backgroundColor: 'rgb(245, 245, 245, 0.8)', alignItems: 'flex-start', justifyContent: 'start', width: '270px' }}>
                <HorizontalContainer
                    style={{ justifyContent: 'center', display: 'flex', width: '100%', gap: '20px', alignItems: 'center', minHeight: '50px' }}
                >
                    <div
                        style={{ fontSize: '14px' }}
                    >{user.user.isActivated ? SetTranslate('activated') : SetTranslate('not_activated')}</div>
                    {!user.user.isActivated &&
                        <Button
                            onClick={() => {
                                generateLinkAction()
                            }}
                        >Отправить ссылку</Button>}
                </HorizontalContainer>
            </div>
        </Container>
    )
})

export default AccountActivationStatus