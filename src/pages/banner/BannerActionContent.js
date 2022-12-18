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
                    <div className='banner_disclaimer'>
                        {SetNativeTranslate(Translate.language, {
                            russian: [`Все данные предославляемые в этом сервисе носят информационный хаарктер и не являются публичной офертой предусмотренной... Сервис logid не является перевозчиком или представителем перевозчика. Собирает данные исключтельно в представленном здесь объеме и на основе...`],
                            english: [`All data provided in this service is for informational purposes only and is not a public offer provided for by... The logid service is not a carrier or a representative of a carrier. Collects data solely to the extent presented here and based on...`]
                        })}
                    </div>
                </> :
                <>
                    <div className='banner_promo_message'>{SetNativeTranslate(Translate.language, {
                        russian: [`${UserInfo.userInfo.name_surname_fathersname}, успешных доставок!`],
                        english: [`${UserInfo.userInfo.name_surname_fathersname}, happy delivery!`]
                    })}</div>
                    <div className='banner_disclaimer'>
                        {SetNativeTranslate(Translate.language, {
                            russian: [`Все данные предославляемые в этом сервисе носят информационный хаарктер и не являются публичной офертой предусмотренной... Сервис logid не является перевозчиком или представителем перевозчика. Собирает данные исключтельно в представленном здесь объеме и на основе...`],
                            english: [`All data provided in this service is for informational purposes only and is not a public offer provided for by... The logid service is not a carrier or a representative of a carrier. Collects data solely to the extent presented here and based on...`]
                        })}
                    </div>
                    <div className={Setting.app_theme === 'light' ? 'account_container' : 'account_container account_container_dark'}>
                        <FieldName>{SetTranslate('your_rating')}</FieldName>
                        <RatingView parent={'account'} onePartnerInfo={UserInfo.userInfo} user={user} />
                    </div>
                </>}
        </div>
    )
})

export default BannerActionContent