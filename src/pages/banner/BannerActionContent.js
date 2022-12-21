import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdressContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import RatingView from '../../components/rating/RatingView'
import { Button } from '../../components/ui/button/Button'
import { FieldName } from '../../components/ui/page/FieldName'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { SetTranslate } from '../../modules/SetTranslate'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import './Banner.css'
import '../../components/account/Account.css'

const BannerActionContent = observer(() => {

    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { Setting } = useContext(SettingContext)

    return (
        <div className='banner_action_container'>
            {!user.user.role ?
                <>
                    {Adress.country.value === 'russia' ?
                        <>
                            <div className='banner_promo_message'>{SetNativeTranslate(Translate.language, {
                                russian: ['Начните пользоваться нашим сервисом до 28.02.2023, выберите любой подходящий вам тарифный план и пользуйтесь им до окончания срока действия бесплатно!'],
                                english: ['Start using our service before 02/28/2022, choose any tariff plan that suits you and use it until the expiration date for free!']
                            })}</div>
                        </> :
                        <>
                            <div className='banner_promo_message'>{SetNativeTranslate(Translate.language, {
                                russian: [`No such language in your country`],
                                english: [`At the moment our service in ${SetTranslate(Adress.country.value)} is absolutely free. You can familiarize yourself with the tariff plans and connect any one that suits you for free!`]
                            })}</div>
                        </>}
                    <div className='banner_action_button_container'>
                        <Button
                            onClick={() =>
                                navigate(LOGIN_ROUTE)}>{SetTranslate('sign_in')}</Button>
                        <Button
                            onClick={() =>
                                navigate(REGISTRATION_ROUTE)}>{SetTranslate('sign_up')}</Button>
                    </div>
                    {/* <div className='banner_disclaimer'>
                        {SetNativeTranslate(Translate.language, {
                            russian: ['Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. Сервис собирает данные исключительно в представленном здесь объеме и с целью обеспечения коммуникации перевозчиков и заказчиков. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе оп причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов. Продолжая использование данного сервиса вы даете согласие на обработку ваших персональных данных в соответствии с соглашением о конфиденциальности и политикой использования персональных данных. Размещая заказ, соглашаясь на предложение, беря заказ в работу, вы осознаете, что представленные вами в сервис данные, а также ваш рейтинг внутри сервиса будут доступны заказчику или перевозчику с которым вы вступаете в коммуникацию, в полном объеме, с целью обеспечения юридической чистоты сделки. Сервис не предоставляет ваши данные партнеру и данные партнера вам, если он или вы не брали ваш заказ в работу, он или вы не соглашались на его предложение. Сервис не предоставляет другим пользователям информацию о ваших партнерах'],
                            english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer determined by the provisions of Article 437 of the Civil Code of the Russian Federation. The service is not a carrier, a carrier`s representative, a customer, a customer`s representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, if he or you did not take your order to work, he or you did not agree to his offer. The Service does not provide other users with information about your partners']
                        })}
                    </div> */}
                </> :
                <>
                    <div className='banner_promo_message'>{SetNativeTranslate(Translate.language, {
                        russian: [`${UserInfo.userInfo.name_surname_fathersname}, успешных доставок!`],
                        english: [`${UserInfo.userInfo.name_surname_fathersname}, happy deliveries!`]
                    })}</div>
                    <div className={Setting.app_theme === 'light' ? 'account_container' : 'account_container account_container_dark'}>
                        <FieldName>{SetTranslate('your_rating')}</FieldName>
                        <RatingView parent={'account'} onePartnerInfo={UserInfo.userInfo} user={user} />
                    </div>
                    {/* {Adress.country.value === 'russia' ?

                        <div className='banner_disclaimer'>
                            {SetNativeTranslate(Translate.language, {
                                russian: ['Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. Сервис собирает данные исключительно в представленном здесь объеме и с целью обеспечения коммуникации перевозчиков и заказчиков. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе оп причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов. Продолжая использование данного сервиса вы даете согласие на обработку ваших персональных данных в соответствии с соглашением о конфиденциальности и политикой использования персональных данных. Размещая заказ, соглашаясь на предложение, беря заказ в работу, вы осознаете, что представленные вами в сервис данные, а также ваш рейтинг внутри сервиса будут доступны заказчику или перевозчику с которым вы вступаете в коммуникацию, в полном объеме, с целью обеспечения юридической чистоты сделки. Сервис не предоставляет ваши данные партнеру и данные партнера вам, если он или вы не брали ваш заказ в работу, он или вы не соглашались на его предложение. Сервис не предоставляет другим пользователям информацию о ваших партнерах'],
                                english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer determined by the provisions of Article 437 of the Civil Code of the Russian Federation. The service is not a carrier, a carrier`s representative, a customer, a customer`s representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, if he or you did not take your order to work, he or you did not agree to his offer. The Service does not provide other users with information about your partners']

                            })}
                        </div>
                        :
                        SetNativeTranslate(Translate.language, {
                            russian: ['No such language in your country'],
                            english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer. The service is not a carrier, a carrier`s representative, a customer, a customer`s representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, if he or you did not take your order to work, he or you did not agree to his offer. The Service does not provide other users with information about your partners']
                        })} */}

                </>}
        </div>
    )
})

export default BannerActionContent