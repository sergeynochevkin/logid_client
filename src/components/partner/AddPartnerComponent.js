import React, { useContext, useState } from 'react'
import { addPartnerByKey } from '../../http/partnerApi'
import { Button } from '../ui/button/Button'
import { Input } from '../ui/form/Input'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { ComponentFunctionContext, NotificationContext, UserContext, UserInfoContext } from '../..'
import { v4 } from "uuid";
import { observer } from 'mobx-react-lite'
import { FieldName } from '../ui/page/FieldName'

const AddPartnerComponent = observer(() => {
  const { UserInfo } = useContext(UserInfoContext)
  const [key, setKey] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const { Notification } = useContext(NotificationContext)
  const { user } = useContext(UserContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)

  const addPartnerAction = async function () {
    await addPartnerByKey(user.user.role, UserInfo.userInfo.id, key).then(data => {
      if (Array.isArray(data)) {
        Notification.addNotification([{ id: v4(), type: 'success', message: `Вы добавили партнера ${data[0].partnerUserInfoId}` }])
        ComponentFunction.setPartnersComponentFunction('list')
      } else {
        Notification.addNotification([{ id: v4(), type: 'error', message: `${data}` }])
      }
    })
  }

  return (
    <VerticalContainer
      style={{ alignItems: 'center', gap: '30px' }}>
      <VerticalContainer
        style={{ gap: '0px' }}>
      <Input
        value={key}
        onBlur={(e) => {
          setIsDirty(true)
        }}
        onChange={(e) => {
          setKey(e.target.value)
        }}
        placeholder='Введите полученный от партнера id'
        style={{ height: '40px', fontSize: '16px', minWidth: '400px', marginTop: '8vh' }}
      ></Input>
      <FieldName
        style={{
          fontWeight: 'normal',
          color: 'rgb(254, 111, 103,0.8)'
        }}>
        {isDirty && key === '' ?
          'id не может быть пустым' :
          isDirty && key.length !== 36 ?
            'длина id должна быть 36 симовлов' : ''
        }
      </FieldName>
      </VerticalContainer>
      <Button
        disabled={key === '' || key.length !== 36}
        onClick={addPartnerAction}
      >Добавить</Button>
    </VerticalContainer>
  )
})

export default AddPartnerComponent