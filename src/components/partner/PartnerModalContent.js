import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { OrderContext, TranslateContext, UserContext } from '../..'
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
import { SetTranslate } from '../../modules/SetTranslate'

const PartnerModalContent = observer(({ setModalActive, onePartnerInfo, onePartner, setFetchPartnersStart }) => {
    const { user } = useContext(UserContext)
    const { Notification } = useContext(NotificationContext)
    const { Translate } = useContext(TranslateContext)

    const you_added = SetTranslate('you_added')
    const you_blocked = SetTranslate('you_blocked')
    const you_have_changed_status = SetTranslate('you_have_changed_status')
    const customer_notification = SetTranslate('customer_notification')
    const carrier_notification = SetTranslate('carrier_notification')
    const to_favorite_notification = SetTranslate('to_favorite_notification')
    const to_normal_notification = SetTranslate('to_normal_notification')

    const priority = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'priority')
            const to_favorite_notification = SetTranslate('to_favorite_notification')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_added} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_favorite_notification}` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            await updatePartner(onePartner.id, 'priority')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_added} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_favorite_notification}` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
    }

    const blocked = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'blocked')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_blocked} ${user.user.role === 'carrier' ? customer_notification : carrier_notification}` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_blocked} ${user.user.role === 'carrier' ? customer_notification : carrier_notification}` }])
            await updatePartner(onePartner.id, 'blocked')
            setFetchPartnersStart(true)
            setModalActive(false)
        }
    }

    const normal = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'normal')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_have_changed_status} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_normal_notification}` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            await updatePartner(onePartner.id, 'normal')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_have_changed_status} ${user.user.role === 'carrier' ? customer_notification : carrier_notification} ${to_normal_notification}` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
    }

    return (
        <VerticalContainer
            style={{ alignItems: 'left' }}
        >
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
                    <CardColName>{SetTranslate('type_of_customer_content')}</CardColName><CardColValue>{SetTranslate(onePartnerInfo.type_of_customer)}</CardColValue>
                </CardRow>
                : <></>}
            <CardRow>
                <CardColName>{SetTranslate('city_content')}</CardColName><CardColValue> {onePartnerInfo.city}</CardColValue>
            </CardRow>
            <CardRow>
                <CardColName>{SetTranslate('adress_field_name')}</CardColName><CardColValue>{onePartnerInfo.company_adress}</CardColValue>
            </CardRow>

            {onePartnerInfo.legal === 'entity' || onePartnerInfo.legal === 'sole_trader' ?
                <>
                    {onePartnerInfo.website ?
                        <CardRow>
                            <CardColName>{SetTranslate('website_field_name')}</CardColName><CardColValue>{onePartnerInfo.website}</CardColValue>
                        </CardRow>
                        : <></>}
                    <CardRow>
                        <CardColName>{SetTranslate('company_inn_content')}</CardColName><CardColValue>{onePartnerInfo.company_inn}</CardColValue>
                    </CardRow>
                </>
                : <></>}
            {onePartnerInfo.legal === 'person' ?
                <>
                    <CardRow>
                        <CardColName>{SetTranslate('passport_number_content')}</CardColName><CardColValue>{onePartnerInfo.passport_number}</CardColValue>
                    </CardRow>
                    <CardRow>
                        <CardColName>{SetTranslate('passport_date_of_issue_content')}</CardColName><CardColValue>{onePartnerInfo.passport_date_of_issue}</CardColValue>
                    </CardRow>
                    <CardRow>
                        <CardColName>{SetTranslate('passport_issued_by_content')}</CardColName><CardColValue>{onePartnerInfo.passport_issued_by}</CardColValue>
                    </CardRow>
                </>
                : <></>}
            <CardRow>
                <CardColName>{SetTranslate('legal_partner_info')}</CardColName><CardColValue>{SetTranslate(onePartnerInfo.legal)}</CardColValue>
            </CardRow>
            <RatingView onePartnerInfo={onePartnerInfo} user={user} />
            <HorizontalContainer>

                {onePartner.status === 'normal' ?
                    <>
                        <CardButton onClick={priority}>{SetTranslate('partner_to_favorite')}</CardButton>
                        <CardButton onClick={blocked}>{SetTranslate('partner_to_blocked')}</CardButton>
                    </>
                    :
                    onePartner.status === 'blocked' ?
                        <>
                            <CardButton onClick={priority}>{SetTranslate('partner_to_favorite')}</CardButton>
                            <CardButton onClick={normal}>{SetTranslate('partner_from_blocked')}</CardButton>
                        </> :
                        onePartner.status === 'priority' ?
                            <>
                                <CardButton onClick={normal}>{SetTranslate('partner_to_normal')}</CardButton>
                                <CardButton onClick={blocked}>{SetTranslate('partner_to_blocked')}</CardButton>
                            </>
                            :
                            <></>}

                <CardButton
                    onClick={() => {
                        setModalActive(false)
                    }}
                >{SetTranslate('close')}</CardButton>
            </HorizontalContainer>
        </VerticalContainer>
    )
})

export default PartnerModalContent