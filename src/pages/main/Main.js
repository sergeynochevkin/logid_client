import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { NotificationContext, SettingContext, TranslateContext } from '../..'
import MainBanner from '../banner/MainBanner'
import PageContainer from '../../components/ui/page/PageContainer'
import { v4 } from "uuid";
import { deleteNotification, fetchNotification } from '../../http/notificationApi'
import './Main.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import ModalBottom from '../../components/ui/modal/ModalBottom'
import CookiesModalContent from '../../components/legality/CookiesModalContent'
import MainSection from './MainSection'

const Main = observer(() => {
  const { Notification } = useContext(NotificationContext)
  const { Translate } = useContext(TranslateContext)
  const queryParams = new URLSearchParams(window.location.search)
  const uuid = queryParams.get("uuid")

  const [modalActive, setModalActive] = useState(true)

  useEffect(() => {
    async function handleUrlNotification() {
      let notification = await fetchNotification(uuid)
      Notification.addNotification([{ id: v4(), type: notification.type, message: notification.message }])
      await deleteNotification(notification.id)
    }
    if (uuid) {
      handleUrlNotification()
    }
  }, [])

  const sections = [
    {
      id: 1, header: SetNativeTranslate(Translate.language, {
        russian: ['О сервисе'],
        english: ['About']
      }), header_comment: 'Комментарий 1', description: 'Описание 1', class: 'uneven', type: 'text'
    },
    {
      id: 2, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности'],
        english: ['Сapabilities']
      }), header_comment: 'Комментарий 2', description: 'Описание 2', class: 'even', type: 'items'
    },
    {
      id: 3, header: SetNativeTranslate(Translate.language, {
        russian: ['Цены'],
        english: ['Pricing']
      }), header_comment: 'Комментарий 3', description: 'Описание 3', class: 'uneven', type: 'self_content'
    },
  ]

  const items = [
    { id: 1, icon: '', name: 'rrrr', description: 'rrrrrrrr' },
    { id: 2, icon: '', name: 'wewe', description: 'asas' },
    { id: 3, icon: '', name: 'sdsds', description: 'asas' },
    { id: 4, icon: '', name: 'wdwdwd', description: 'asas' },
    { id: 5, icon: '', name: 'sdsd', description: 'dedwdwd' },
    { id: 6, icon: '', name: 'wswsw', description: 'asas' },
    { id: 7, icon: '', name: 'sdsd', description: 'efefe' },
    { id: 8, icon: '', name: 'wdwd', description: 'asas' },
  ]

  return (

    <PageContainer>
      <title>logid</title>
      <MainBanner />

      {sections.map(section =>
        <MainSection section={section} key={section.id} items={items} />
      )}

      <ModalBottom modalActive={modalActive}>
        <CookiesModalContent setModalActive={setModalActive} />
      </ModalBottom>
    </PageContainer>
  )
})

export default Main