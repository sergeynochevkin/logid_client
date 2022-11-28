import React, { useContext, useState } from 'react'
import { addPartnerByKey } from '../../http/partnerApi'
import { Button } from '../ui/button/Button'
import { Input } from '../ui/form/Input'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { ComponentFunctionContext, NotificationContext, UserContext, UserInfoContext } from '../..'
import { v4 } from "uuid";
import { observer } from 'mobx-react-lite'

const AddPartnerComponent = observer(() => {
  const { UserInfo } = useContext(UserInfoContext)
  const [key, setKey] = useState('')
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
      <Input
        value={key}
        onChange={(e) => {
          setKey(e.target.value)
        }}
        placeholder='Введите полученный от партнера id'
        style={{ height: '40px', fontSize: '20px', minWidth: '400px', marginTop: '8vh' }}
      ></Input>
      <Button
        onClick={addPartnerAction}
      >Добавить</Button>
    </VerticalContainer>
  )
})

export default AddPartnerComponent