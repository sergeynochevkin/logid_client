import React, { useContext, useEffect, useState } from 'react'
import { addPartnerByKey } from '../../http/partnerApi'
import { Button } from '../ui/button/Button'
import { Input } from '../ui/form/Input'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { ComponentFunctionContext, FetcherContext, LinkContext, NotificationContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { v4 } from "uuid";
import { observer } from 'mobx-react-lite'
import { FieldName } from '../ui/page/FieldName'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const AddPartnerComponent = observer(() => {
  const { UserInfo } = useContext(UserInfoContext)
  const { Link } = useContext(LinkContext)
  const [key, setKey] = useState(Link.refer.id ? Link.refer.id : '')
  const [isDirty, setIsDirty] = useState(false)
  const { Notification } = useContext(NotificationContext)
  const { user } = useContext(UserContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)

  const partner_added = SetNativeTranslate(Translate.language, {}, 'partner_added')

  useEffect(() => {
    if (Link.refer.id && Link.refer.action === 'add_partner') {
      addPartnerAction()
      Link.setRefer('', 'action')
      Link.setRefer('', 'id')
    }
  }, [])

  const addPartnerAction = async function () {
    try {
      await addPartnerByKey(Translate.language, user.user.role, UserInfo.userInfo.id, key).then(data => {
        if (Array.isArray(data)) {
          Notification.addNotification([{ id: v4(), type: 'success', message: `${partner_added} ${data[0].partnerUserInfoId}` }])        
          ComponentFunction.setPartnersComponentFunction('list')
          fetcher.setPartners(true)
        } else {
          Notification.addNotification([{ id: v4(), type: 'error', message: `${data}` }])
        }
      })
    } catch (error) {
      Notification.addNotification([{ id: v4(), type: 'error', message: error.response.data.message }])
    }

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
          placeholder={SetNativeTranslate(Translate.language, {}, 'enter_id')}
          style={{ height: '40px', fontSize: '16px', width: '300px', marginTop: '8vh' }}
        ></Input>
        <FieldName
          style={{
            fontWeight: 'normal',
            color: 'rgb(254, 111, 103,0.8)'
          }}>
          {isDirty && key === '' ?
            SetNativeTranslate(Translate.language, {}, 'id_not_empty') :
            isDirty && key.length !== 36 ?
              SetNativeTranslate(Translate.language, {}, 'id_36') : ''
          }
        </FieldName>
      </VerticalContainer>
      <Button
        disabled={key === '' || key.length !== 36}
        onClick={addPartnerAction}
      >{SetNativeTranslate(Translate.language, {}, 'add')}</Button>
    </VerticalContainer>
  )
})

export default AddPartnerComponent