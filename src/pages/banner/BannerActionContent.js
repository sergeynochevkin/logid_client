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
                                english: [`At the moment our service in ${SetNativeTranslate(Translate.language,{},Adress.country.value)} is absolutely free. You can familiarize yourself with the tariff plans and connect any one that suits you for free!`]
                            })}</div>
                        </>}
                    <div className='banner_action_button_container'>
                        <Button
                            onClick={() =>
                                navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language,{},'sign_in')}</Button>
                        <Button
                            onClick={() =>
                                navigate(REGISTRATION_ROUTE)}>{SetNativeTranslate(Translate.language,{},'sign_up')}</Button>
                    </div>
                    <div className='banner_disclaimer'>
                        {SetNativeTranslate(Translate.language, {
                            russian: ['Обратите внимание, сервис logid не проводит юридической проверки пользователей и не несет ответственности за их благонадежность. Для работы заказчиком или перевозчиком настоятельно рекомендуем всегда выстраивать договорные отношения, проверять документы, и поддерживать необходимый документооборот'],
                            english: ['Please note that the logid service does not conduct any legal due diligence of users and is not responsible for their reliability. To work with a customer or carrier, we strongly recommend that you always build contractual relationships, check documents, and maintain the necessary document flow']
                        })}
                    </div>
                </> :
                <>
                    <div className='banner_promo_message'>{SetNativeTranslate(Translate.language, {
                        russian: [`${UserInfo.userInfo.name_surname_fathersname}, успешных доставок!`],
                        english: [`${UserInfo.userInfo.name_surname_fathersname}, happy deliveries!`]
                    })}</div>
                    <div className={Setting.app_theme === 'light' ? 'account_container' : 'account_container account_container_dark'}>
                        <FieldName>{SetNativeTranslate(Translate.language,{},'your_rating')}</FieldName>
                        <RatingView parent={'account'} onePartnerInfo={UserInfo.userInfo} user={user} />
                    </div>
                    {Adress.country.value === 'russia' ?

                        <div className='banner_disclaimer'>
                            {SetNativeTranslate(Translate.language, {
                                russian: ['Обратите внимание, сервис logid не проводит юридической проверки пользователей и не несет ответственности за их благонадежность. Для работы с заказчиком или перевозчиком настоятельно рекомендуем всегда выстраивать договорные отношения, проверять документы, и поддерживать необходимый документооборот'],
                                english: ['Please note that the logid service does not conduct any legal due diligence of users and is not responsible for their reliability. To work with a customer or carrier, we strongly recommend that you always build contractual relationships, check documents, and maintain the necessary document flow']

                            })}
                        </div>
                        :
                        SetNativeTranslate(Translate.language, {
                            russian: ['No such language in your country'],
                            english: ['Please note that the logid service does not conduct any legal due diligence of users and is not responsible for their reliability. To work with a customer or carrier, we strongly recommend that you always build contractual relationships, check documents, and maintain the necessary document flow']
                        })}

                </>}
        </div>
    )
})

export default BannerActionContent