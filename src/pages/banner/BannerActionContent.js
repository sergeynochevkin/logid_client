import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import RatingView from '../../components/rating/RatingView'
import { FieldName } from '../../components/ui/page/FieldName'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

import '../../components/account/Account.css'
import FastSignUp from '../../components/fastSignUp/FastSignUp'


const BannerActionContent = observer(() => {

    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)
    const { Setting } = useContext(SettingContext)

    return (
        <div className='banner_section action'>
            {/* 
            {!user.isAuth &&
                <div className='text_middle dark'>{SetNativeTranslate(Translate.language, {}, 'main_slogan')}</div>
            } */}

            {!user.user.role ?
                <>

                    <div className='text_middle dark'>{SetNativeTranslate(Translate.language, {
                        russian: ['Биржа грузоперевозок и курьерских заказов, доска объявлений перевозчиков и курьеров, инструмент управления доставкой для автопарков и курьерских служб'],
                        english: ['Exchange of freight and courier orders, bulletin board for carriers and couriers, delivery management tool for fleets and courier services'],
                        spanish: ['Intercambio de pedidos de carga y mensajería, tablón de anuncios para transportistas y mensajería, herramienta de gestión de entregas para flotas y servicios de mensajería.'],
                        turkish: ['Navlun ve kurye siparişlerinin değişimi, taşıyıcılar ve kuryeler için ilan panosu, filolar ve kurye hizmetleri için teslimat yönetimi aracı'],
                        сhinese: ['货运和快递订单交换、承运人和快递公司公告板、车队和快递服务的配送管理工具'],
                        hindi: ['माल ढुलाई और कूरियर आदेशों का आदान-प्रदान, वाहक और कूरियर के लिए बुलेटिन बोर्ड, बेड़े और कूरियर सेवाओं के लिए वितरण प्रबंधन उपकरण'],
                    })}</div>




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
                    <div className='text_middle'>{SetNativeTranslate(Translate.language, {
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