import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, ComponentFunctionContext, SettingContext, TranslateContext } from '../..'
import Agreement from '../../components/legality/Agreement'
import Modal from '../../components/ui/modal/Modal'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import './Footer.css'
import FooterSection from './FooterSection'

const Footer = observer(() => {
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { Adress } = useContext(AdressContext)
  const [modalActive, setModalActive] = useState(null)

  const [agreement, setAgreement] = useState('')
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  
  const sections = [
    {
      id: 1, header: SetNativeTranslate(Translate.language, {
        russian: ['О сервисе'],
        english: ['About']
      }), header_comment: 'Комментарий 1', description: 'Описание 1', class: 'footer_copyright_container', type: 'text'
    },
    // {
    //   id: 2, header: SetNativeTranslate(Translate.language, {
    //     russian: ['Возможности'],
    //     english: ['Сapabilities']
    //   }), header_comment: 'Комментарий 2', description: 'Описание 2', class: 'footer_section', type: 'items'
    // },
    // {
    //   id: 3, header: SetNativeTranslate(Translate.language, {
    //     russian: ['Цены'],
    //     english: ['Pricing']
    //   }), header_comment: 'Комментарий 3', description: 'Описание 3', class: 'footer_section', type: 'self_content'
    // },
    // {
    //   id: 4, header: SetNativeTranslate(Translate.language, {
    //     russian: ['Цены'],
    //     english: ['Pricing']
    //   }), header_comment: 'Комментарий 3', description: 'Описание 3', class: 'footer_section', type: 'self_content'
    // },
  ]

  const items = [
    { id: 1, icon: '', name: 'logid', description: '', section_id: 1, class: 'footer_logo' },
    { id: 2, icon: '', name: 'logid 2023 © all rights reserved', description: '', section_id: 1, class: 'footer_copyright' },
    { id: 3, icon: '', name: <a href="mailto:support@logid.app">support@logid.app</a>, description: '', section_id: 1, class: 'footer_email' },
    {
      id: 4, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Пользовательское соглашение'],
        english: ['User agreement'],
        spanish: ['Acuerdo del usuario'],
        turkish: ['Kullanıcı sözleşmesi']
      }), description: '', section_id: 1, class: 'legality_link'
    },
    {
      id: 6, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Политика конфиденциальности'],
        english: ['Privacy policy'],
        spanish: ['Política de privacidad'],
        turkish: ['Gizlilik politikası']
      }), description: '', section_id: 1, class: 'legality_link'
    },
    {
      id: 5, icon: '', name: SetNativeTranslate(Translate.language, {
        russian: ['Согласие на обработку персональных данных'],
        english: ['Consent to the processing of personal data'],
        spanish: ['Consentimiento para el tratamiento de datos personales'],
        turkish: ['Kişisel verilerin işlenmesine onay']
      }), description: '', section_id: 1, class: 'legality_link'
    },
    {
      id: 7, icon: '', name: Adress.country.value === 'russia' ? SetNativeTranslate(Translate.language, {
        russian: ['Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. Сервис собирает данные исключительно в представленном здесь объеме и с целью обеспечения коммуникации перевозчиков и заказчиков. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе оп причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов. Продолжая использование данного сервиса вы даете согласие на обработку ваших персональных данных в соответствии с соглашением о конфиденциальности и политикой использования персональных данных. Размещая заказ, соглашаясь на предложение, беря заказ в работу, вы осознаете, что представленные вами в сервис данные, а также ваш рейтинг внутри сервиса будут доступны заказчику или перевозчику с которым вы вступаете в коммуникацию, в полном объеме, с целью обеспечения юридической чистоты сделки. Сервис не предоставляет ваши данные партнеру и данные партнера вам, за исключением вашего рейтинга в сервисе, если он или вы не брали ваш заказ в работу, он или вы не соглашались на его предложение, он не добавил вас или вы не доавили его по предоставленному друг другу уникальному айди, полученному в разделе аккаунт сервиса. Сервис не предоставляет другим пользователям информацию о ваших партнерах'],
        english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer determined by the provisions of Article 437 of the Civil Code of the Russian Federation. The Service is not a carrier, carrier representative, customer, customer representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, with the exception of your rating in the service, if he or you did not take your order to work, he did not add you or you did not add him using the unique ID provided to each other, obtained in the service account section. The Service does not provide other users with information about your partners']
      }) :
        SetNativeTranslate(Translate.language, {
          russian: ['Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. Сервис собирает данные исключительно в представленном здесь объеме и с целью обеспечения коммуникации перевозчиков и заказчиков. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе оп причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов. Продолжая использование данного сервиса вы даете согласие на обработку ваших персональных данных в соответствии с соглашением о конфиденциальности и политикой использования персональных данных. Размещая заказ, соглашаясь на предложение, беря заказ в работу, вы осознаете, что представленные вами в сервис данные, а также ваш рейтинг внутри сервиса будут доступны заказчику или перевозчику с которым вы вступаете в коммуникацию, в полном объеме, с целью обеспечения юридической чистоты сделки. Сервис не предоставляет ваши данные партнеру и данные партнера вам, за исключением вашего рейтинга в сервисе, если он или вы не брали ваш заказ в работу, он или вы не соглашались на его предложение,он не добавил вас или вы не доавили его по предоставленному друг другу уникальному айди, полученному в разделе аккаунт сервиса. Сервис не предоставляет другим пользователям информацию о ваших партнерах'],
          english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer. The Service is not a carrier, carrier representative, customer, customer representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, with the exception of your rating in the service, if he or you did not take your order to work, he or you did not agree to his offer, he did not add you or you did not add him using the unique ID provided to each other, obtained in the service account section. The Service does not provide other users with information about your partners.']
        })
      , description: '', section_id: 1, class: 'footer_copyright'
    },
    // { id: 6, icon: '', name: 'wswsw', description: 'asas', section_id: 2, class: '' },
    // { id: 7, icon: '', name: 'sdsd', description: 'efefe', section_id: 2, class: '' },
    // { id: 8, icon: '', name: 'wdwd', description: 'asas', section_id: 3, class: '' },
    // { id: 9, icon: '', name: 'wdwd', description: 'asas', section_id: 3, class: '' },
    // { id: 10, icon: '', name: 'wdwd', description: 'asas', section_id: 3, class: '' },
    // { id: 11, icon: '', name: 'wdwd', description: 'asas', section_id: 4, class: '' },
    // { id: 12, icon: '', name: 'wdwd', description: 'asas', section_id: 4, class: '' },
    // { id: 13, icon: '', name: 'wdwd', description: 'asas', section_id: 4, class: '' },
  ]

  return (
    <>
      <Modal
        ComponentFunction={ComponentFunction}
        parent={'agreement'}
      >
        <Agreement agreement={agreement}></Agreement>
      </Modal>
    
      <div className={Setting.app_theme === 'light' ? 'footer_container' : 'footer_container dark'}>
        {sections.map(section => <FooterSection section={section} items={items.filter(el => el.section_id === section.id)} key={section.id} setModalActive={setModalActive} setAgreement={setAgreement} />)}
      </div>
    </>
  )
})

export default Footer