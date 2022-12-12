import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { NotificationContext, SettingContext, TranslateContext } from '../..'
import MainBanner from '../../components/ui/banner/MainBanner'
import PageContainer from '../../components/ui/page/PageContainer'
import { v4 } from "uuid";
import { deleteNotification, fetchNotification } from '../../http/notificationApi'
import './Main.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import ModalBottom from '../../components/ui/modal/ModalBottom'
import CookiesModalContent from '../../components/legality/CookiesModalContent'

const Main = observer(() => {
  const { Notification } = useContext(NotificationContext)
  const { Translate } = useContext(TranslateContext)
  const { Setting } = useContext(SettingContext)
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

  return (
    
    <PageContainer>
      <title>logid</title>
      <MainBanner />
      <div className={Setting.app_theme === 'light' ? 'section_container uneven' : 'section_container uneven dark'}  >
        <div className='section_header'>{SetNativeTranslate(Translate.language, {
          russian: ['О сервисе'],
          english: ['About']
        })}</div>
        <div className='section_header_comment'>{SetNativeTranslate(Translate.language, {
          russian: ['Комментарий'],
          english: ['Comment']
        })}</div>
        <div className='sectiion_content_container'>
          {SetNativeTranslate(Translate.language, {
            russian: ['Приветуауацацау цуацуацуацацуауа цуацацацацацацаца'],
            english: ['wfweffwefwe fwefwefwefwefewf wefwfwfwefwefwefw']
          })}
        </div>
      </div>

      <div className={Setting.app_theme === 'light' ? 'section_container even' : 'section_container even dark'}>
        <div className='section_header'>{SetNativeTranslate(Translate.language, {
          russian: ['Возможности'],
          english: ['Сapabilities']
        })}</div>
        <div className='section_header_comment'>{SetNativeTranslate(Translate.language, {
          russian: ['Комментарий'],
          english: ['Comment']
        })}</div>
        <div className='sectiion_content_container'>
          <div className={'section_item_container'}></div>
          <div className={'section_item_container'}></div>
          <div className={'section_item_container'}></div>
          <div className={'section_item_container'}></div>
          <div className={'section_item_container'}></div>
          <div className={'section_item_container'}></div>
        </div>
      </div>

      <div className={Setting.app_theme === 'light' ? 'section_container uneven' : 'section_container uneven dark'}  >
        <div className='section_header'>{SetNativeTranslate(Translate.language, {
          russian: ['Цены'],
          english: ['Pricing']
        })}</div>
        <div className='section_header_comment'>{SetNativeTranslate(Translate.language, {
          russian: ['Комментарий'],
          english: ['Comment']
        })}</div>
        <div className='sectiion_content_container'>

        </div>
      </div>
      <ModalBottom modalActive={modalActive}>
        <CookiesModalContent setModalActive={setModalActive}/>
      </ModalBottom>
    </PageContainer>
  )
})

export default Main