import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdressContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import RatingView from '../../components/rating/RatingView'
import { Button } from '../../components/ui/button/Button'
import { FieldName } from '../../components/ui/page/FieldName'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import './Banner.css'
import '../../components/account/Account.css'
import CaptureForm from '../../components/captureForm/CaptureForm'
import FastSignUp from '../../components/fastSignUp/FastSignUp'


const BannerActionContent = observer(({ callRequested, setCallRequested }) => {

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
                                russian: ['Регистрируйтесь сейчас, дарим год профессиональной подписки бесплатно. Предложение ограничено!'],
                                english: ['Register now, we give you a year of professional subscription for free. The offer is limited!'],
                                spanish: ['Regístrate ahora, te regalamos un año de suscripción profesional. ¡La oferta es limitada!'],
                                turkish: ['Şimdi kaydolun, size bir yıllık profesyonel aboneliği ücretsiz veriyoruz. Teklif sınırlıdır!'],
                                сhinese: ['立即注册，我们将免费为您提供一年的专业订阅。 限量优惠！'],
                                hindi: ['अभी पंजीकरण करें और हम आपको एक वर्ष की व्यावसायिक सदस्यता निःशुल्क देंगे। सीमित ऑफ़र!'],
                            })}</div>
                        </> :
                        <>
                            <div className='banner_promo_message'>{SetNativeTranslate(Translate.language, {
                                russian: [`В настоящий момент наш сервис в полностью бесплатный!`],
                                english: ['At the moment our service in', SetNativeTranslate(Translate.language, {}, Adress.country.value), 'is absolutely free!'],
                                spanish: ['¡Por el momento nuestro servicio en ', SetNativeTranslate(Translate.language, {}, Adress.country.value), ' es absolutamente gratuito!'],
                                turkish: ['Şu anda ', SetNativeTranslate(Translate.language, {}, Adress.country.value), ' hizmetimiz tamamen ücretsizdir!'],
                                сhinese: ['目前我们的服务是完全免费的！'],
                                hindi: ['फिलहाल हमारी सेवा पूरी तरह से निःशुल्क है!'],
                            })}</div>
                        </>}


                 

                    <FastSignUp />

                    {/* <div className='banner_action_button_container'>
                        <Button
                            onClick={() =>
                                navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'sign_in')}</Button>
                        <Button
                            onClick={() =>
                                navigate(REGISTRATION_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'sign_up')}</Button>
                    </div> */}

                    {/* {!callRequested && <CaptureForm setCallRequested = {setCallRequested} section = {{header:'banner action'}}/>} */}

                    {/* <div className='banner_disclaimer'>
                        {SetNativeTranslate(Translate.language, {
                            russian: ['Обратите внимание, сервис logid не проводит юридической проверки пользователей и не несет ответственности за их благонадежность. Для работы заказчиком или перевозчиком настоятельно рекомендуем всегда выстраивать договорные отношения, проверять документы, и поддерживать необходимый документооборот'],
                            english: ['Please note that the logid service does not conduct any legal due diligence of users and is not responsible for their reliability. To work with a customer or carrier, we strongly recommend that you always build contractual relationships, check documents, and maintain the necessary document flow']
                        })}
                    </div> */}
                </> :
                <>
                    <div className='banner_promo_message'>{SetNativeTranslate(Translate.language, {
                        russian: [`${UserInfo.userInfo.legal === 'person' ? UserInfo.userInfo.name_surname_fathersname : UserInfo.userInfo.company_name ? UserInfo.userInfo.company_name : UserInfo.userInfo.email}, успешных доставок!`],
                        english: [`${UserInfo.userInfo.legal === 'person' ? UserInfo.userInfo.name_surname_fathersname : UserInfo.userInfo.company_name ? UserInfo.userInfo.company_name : UserInfo.userInfo.email}, happy deliveries!`],
                        spanish: [`${UserInfo.userInfo.legal === 'person' ? UserInfo.userInfo.name_surname_fathersname : UserInfo.userInfo.company_name ? UserInfo.userInfo.company_name : UserInfo.userInfo.email}, entregas exitosas!`],
                        turkish: [`${UserInfo.userInfo.legal === 'person' ? UserInfo.userInfo.name_surname_fathersname : UserInfo.userInfo.company_name ? UserInfo.userInfo.company_name : UserInfo.userInfo.email}, başarılı teslimatlar!`],
                        сhinese: [`${UserInfo.userInfo.legal === 'person' ? UserInfo.userInfo.name_surname_fathersname : UserInfo.userInfo.company_name ? UserInfo.userInfo.company_name : UserInfo.userInfo.email}, 交货愉快！`],
                        hindi: [`${UserInfo.userInfo.legal === 'person' ? UserInfo.userInfo.name_surname_fathersname : UserInfo.userInfo.company_name ? UserInfo.userInfo.company_name : UserInfo.userInfo.email}, शुभ प्रसव!`],
                    })}</div>
                    <div className={Setting.app_theme === 'light' ? 'account_container' : 'account_container account_container_dark'}>
                        <FieldName>{SetNativeTranslate(Translate.language, {}, 'your_rating')}</FieldName>
                        <RatingView parent={'account'} onePartnerInfo={UserInfo.userInfo} user={user} />
                    </div>

                    {/* <div className='banner_disclaimer'>
                        {SetNativeTranslate(Translate.language, {
                            russian: ['Обратите внимание, сервис logid не проводит юридической проверки пользователей и не несет ответственности за их благонадежность. Для работы с заказчиком или перевозчиком настоятельно рекомендуем всегда выстраивать договорные отношения, проверять документы, и поддерживать необходимый документооборот'],
                            english: ['Please note that the logid service does not conduct any legal due diligence of users and is not responsible for their reliability. To work with a customer or carrier, we strongly recommend that you always build contractual relationships, check documents, and maintain the necessary document flow']

                        })}
                    </div> */}

                </>}
        </div>
    )
})

export default BannerActionContent