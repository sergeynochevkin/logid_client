import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { FetcherContext, OrderContext, TranslateContext, UserContext } from '../..'
import { updatePartner } from '../../http/partnerApi'
import RatingView from '../rating/RatingView'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardRow } from '../ui/card/CardRow'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { v4 } from "uuid";
import { NotificationContext } from '../../index'
import './Partner.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const PartnerModalContent = observer(({ setModalActive, onePartnerInfo, onePartner }) => {
    const { user } = useContext(UserContext)
    const { Notification } = useContext(NotificationContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const you_added = SetNativeTranslate(Translate.language, {}, 'you_added')
    const you_blocked = SetNativeTranslate(Translate.language, {}, 'you_blocked')
    const you_have_changed_status = SetNativeTranslate(Translate.language, {}, 'you_have_changed_status')
    const customer_notification = SetNativeTranslate(Translate.language, {}, 'customer_notification')
    const carrier_notification = SetNativeTranslate(Translate.language, {}, 'carrier_notification')
    const to_favorite_notification = SetNativeTranslate(Translate.language, {}, 'to_favorite_notification')
    const to_normal_notification = SetNativeTranslate(Translate.language, {}, 'to_normal_notification')

    const priority = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'priority')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_added} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_favorite_notification}` }])
            fetcher.setPartners(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            await updatePartner(onePartner.id, 'priority')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_added} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_favorite_notification}` }])
            fetcher.setPartners(true)
            setModalActive(false)
        }
    }

    const blocked = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'blocked')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_blocked} ${user.user.role === 'carrier' ? customer_notification : carrier_notification}` }])
            fetcher.setPartners(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_blocked} ${user.user.role === 'carrier' ? customer_notification : carrier_notification}` }])
            await updatePartner(onePartner.id, 'blocked')
            fetcher.setPartners(true)
            setModalActive(false)
        }
    }

    const normal = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'normal')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_have_changed_status} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_normal_notification}` }])
            fetcher.setPartners(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            await updatePartner(onePartner.id, 'normal')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_have_changed_status} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_normal_notification}` }])
            fetcher.setPartners(true)
            setModalActive(false)
        }
    }

    return (
        <div
            className='partner_modal_content_container'
        >
            <div className='partner_view_container'>
                <CardRow>
                    <CardColValue>{onePartnerInfo.id}</CardColValue>
                    <CardColName
                        style={{
                            backgroundColor: onePartner.status === 'normal' ? 'rgb(241,196,15,0.8)' :
                                onePartner.status === 'priority' ? 'rgb(129, 199, 132,0.8)' :
                                    onePartner.status === 'blocked' ? 'rgb(254, 111, 103,0.8)' : ''
                        }}
                    >

                        {onePartnerInfo.legal === 'person' ?
                            <>{onePartnerInfo.name_surname_fathersname}</>
                            :
                            <>{onePartnerInfo.company_name}</>
                        }
                    </CardColName>
                    <CardColValue>{onePartnerInfo.phone}</CardColValue>
                </CardRow>

                {onePartnerInfo.type_of_customer ?
                    <CardRow>
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'type_of_customer_content')}</CardColName><CardColValue>{SetNativeTranslate(Translate.language, {}, onePartnerInfo.type_of_customer)}</CardColValue>
                    </CardRow>
                    : <></>}
                <CardRow>
                    <CardColName>{SetNativeTranslate(Translate.language, {}, 'city_content')}</CardColName><CardColValue> {onePartnerInfo.city}</CardColValue>
                </CardRow>
                <CardRow>
                    <CardColName>{SetNativeTranslate(Translate.language, {}, 'adress_field_name')}</CardColName><CardColValue>{onePartnerInfo.company_adress}</CardColValue>
                </CardRow>

                {onePartnerInfo.legal === 'entity' || onePartnerInfo.legal === 'sole_trader' ?
                    <>
                        {onePartnerInfo.website ?
                            <CardRow>
                                <CardColName>{SetNativeTranslate(Translate.language, {}, 'website_field_name')}</CardColName><CardColValue>{onePartnerInfo.website}</CardColValue>
                            </CardRow>
                            : <></>}
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'company_inn_content')}</CardColName><CardColValue>{onePartnerInfo.company_inn}</CardColValue>
                        </CardRow>
                    </>
                    : <></>}
                {onePartnerInfo.legal === 'person' ?
                    <>
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'passport_number_content')}</CardColName><CardColValue>{onePartnerInfo.passport_number}</CardColValue>
                        </CardRow>
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'passport_date_of_issue_content')}</CardColName><CardColValue>{onePartnerInfo.passport_date_of_issue}</CardColValue>
                        </CardRow>
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'passport_issued_by_content')}</CardColName><CardColValue>{onePartnerInfo.passport_issued_by}</CardColValue>
                        </CardRow>
                    </>
                    : <></>}
                <CardRow>
                    <CardColName>{SetNativeTranslate(Translate.language, {}, 'legal_partner_info')}</CardColName><CardColValue>{SetNativeTranslate(Translate.language, {}, onePartnerInfo.legal)}</CardColValue>
                </CardRow>
                <RatingView onePartnerInfo={onePartnerInfo} user={user} parent={'account'} />
                <HorizontalContainer>

                    {onePartner.status === 'normal' ?
                        <>
                            <CardButton onClick={priority}>{SetNativeTranslate(Translate.language, {}, 'partner_to_favorite')}</CardButton>
                            <CardButton onClick={blocked}>{SetNativeTranslate(Translate.language, {}, 'partner_to_blocked')}</CardButton>
                        </>
                        :
                        onePartner.status === 'blocked' ?
                            <>
                                <CardButton onClick={priority}>{SetNativeTranslate(Translate.language, {}, 'partner_to_favorite')}</CardButton>
                                <CardButton onClick={normal}>{SetNativeTranslate(Translate.language, {}, 'partner_from_blocked')}</CardButton>
                            </> :
                            onePartner.status === 'priority' ?
                                <>
                                    <CardButton onClick={normal}>{SetNativeTranslate(Translate.language, {}, 'partner_to_normal')}</CardButton>
                                    <CardButton onClick={blocked}>{SetNativeTranslate(Translate.language, {}, 'partner_to_blocked')}</CardButton>
                                </>
                                :
                                <></>}

                    <CardButton
                        onClick={() => {
                            setModalActive(false)
                        }}
                    >{SetNativeTranslate(Translate.language, {}, 'close')}</CardButton>
                </HorizontalContainer>
            </div>
        </div>
    )
})

export default PartnerModalContent