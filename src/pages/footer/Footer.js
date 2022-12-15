import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import './Footer.css'
import FooterSection from './FooterSection'

const Footer = observer(() => {
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)

  const sections = [
    {
      id: 1, header: SetNativeTranslate(Translate.language, {
        russian: ['О сервисе'],
        english: ['About']
      }), header_comment: 'Комментарий 1', description: 'Описание 1', class: 'footer_copyright_container', type: 'text'
    },
    {
      id: 2, header: SetNativeTranslate(Translate.language, {
        russian: ['Возможности'],
        english: ['Сapabilities']
      }), header_comment: 'Комментарий 2', description: 'Описание 2', class: 'footer_section', type: 'items'
    },
    {
      id: 3, header: SetNativeTranslate(Translate.language, {
        russian: ['Цены'],
        english: ['Pricing']
      }), header_comment: 'Комментарий 3', description: 'Описание 3', class: 'footer_section', type: 'self_content'
    },
    {
      id: 4, header: SetNativeTranslate(Translate.language, {
        russian: ['Цены'],
        english: ['Pricing']
      }), header_comment: 'Комментарий 3', description: 'Описание 3', class: 'footer_section', type: 'self_content'
    },
  ]

  const items = [
    { id: 1, icon: '', name: 'logid', description: '', section_id: 1, class: 'footer_logo' },
    { id: 2, icon: '', name: 'logid 2022 © all rights reserved', description: '', section_id: 1, class: 'footer_copyright' },
    { id: 3, icon: '', name: 'support@logid.ru', description: '', section_id: 1, class: '' },
    { id: 5, icon: '', name: 'Все данные предославляемые в этом сервисе носят информационный хаарктер и не являются публичной офертой предусмотренной... Сервис logid не является перевозчиком или представителем перевозчика. Собирает данные исключтельно в представленном здесь объеме и на основе... ', description: '', section_id: 1, class: 'footer_copyright' },
    { id: 6, icon: '', name: 'wswsw', description: 'asas', section_id: 2, class: '' },
    { id: 7, icon: '', name: 'sdsd', description: 'efefe', section_id: 2, class: '' },
    { id: 8, icon: '', name: 'wdwd', description: 'asas', section_id: 3, class: '' },
    { id: 9, icon: '', name: 'wdwd', description: 'asas', section_id: 3, class: '' },
    { id: 10, icon: '', name: 'wdwd', description: 'asas', section_id: 3, class: '' },
    { id: 11, icon: '', name: 'wdwd', description: 'asas', section_id: 4, class: '' },
    { id: 12, icon: '', name: 'wdwd', description: 'asas', section_id: 4, class: '' },
    { id: 13, icon: '', name: 'wdwd', description: 'asas', section_id: 4, class: '' },
  ]

  return (
    <div className={Setting.app_theme === 'light' ? 'footer_container' : 'footer_container dark'}>
      {sections.map(section => <FooterSection section={section} items={items.filter(el => el.section_id === section.id)} key={section.id} />)}
    </div>
  )
})

export default Footer