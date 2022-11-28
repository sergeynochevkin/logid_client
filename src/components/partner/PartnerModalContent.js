import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { OrderContext, UserContext } from '../..'
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

const PartnerModalContent = observer(({ setModalActive, onePartnerInfo, onePartner, setFetchPartnersStart }) => {
    const { user } = useContext(UserContext)
     const { Notification } = useContext(NotificationContext)

    const priority = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'priority')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы добавили ${user.user.role === 'carrier' ? 'заказчика' : 'перевозчика'} в избранное` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            await updatePartner(onePartner.id, 'priority')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы добавили ${user.user.role === 'carrier' ? 'заказчика' : 'перевозчика'} в избранное` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
    }

    const blocked = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'blocked')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы заблокировали ${user.user.role === 'carrier' ? 'заказчика' : 'перевозчика'}` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы заблокировали ${user.user.role === 'carrier' ? 'заказчика' : 'перевозчика'}` }])
            await updatePartner(onePartner.id, 'blocked')
            setFetchPartnersStart(true)
            setModalActive(false)
        }
    }

    const normal = async () => {
        if (user.user.role === 'carrier') {
            await updatePartner(onePartner.id, 'normal')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы изменили статус ${user.user.role === 'carrier' ? 'заказчика' : 'перевозчика'} на нормальный` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        }
        if (user.user.role === 'customer') {
            await updatePartner(onePartner.id, 'normal')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы изменили статус ${user.user.role === 'carrier' ? 'заказчика' : 'перевозчика'} на нормальный` }])
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
                    <CardColName>Вид деятельности</CardColName><CardColValue>{onePartnerInfo.type_of_customer === 'retail' ? 'Розничная торговля' :
                        onePartnerInfo.type_of_customer === 'wholesale' ? 'Оптовая торговля' :
                            onePartnerInfo.type_of_customer === 'food_delivery' ? 'Доставка продуктов' :
                                onePartnerInfo.type_of_customer === 'ready_food_delivery' ? 'Доставка готовых блюд' :
                                    onePartnerInfo.type_of_customer === 'electronics_repair' ? 'Ремонт электроники' :
                                        onePartnerInfo.type_of_customer === 'for_myself' ? 'В личных целях' : <></>}</CardColValue>
                </CardRow>
                : <></>}
            <CardRow>
                <CardColName>Город</CardColName><CardColValue> {onePartnerInfo.city === 'krasnodar' ? 'Краснодар' :
                    onePartnerInfo.city === 'sevastopol' ? 'Севастополь' :
                        onePartnerInfo.city === 'simferopol' ? 'Симферополь' :
                            onePartnerInfo.city === 'novorossiysk' ? 'Новороссийск' :
                                onePartnerInfo.city === 'rostov_on_don' ? 'Ростов на Дону' :
                                    onePartnerInfo.city === 'gelendzhik' ? 'Геленджик' :
                                        onePartnerInfo.city === 'anapa' ? 'Анапа' : <></>}</CardColValue>
            </CardRow>
            <CardRow>
                <CardColName>Адрес</CardColName><CardColValue>{onePartnerInfo.company_adress}</CardColValue>
            </CardRow>

            {onePartnerInfo.legal === 'entity' || onePartnerInfo.legal === 'sole_trader' ?
                <>
                    {onePartnerInfo.website ?
                        <CardRow>
                            <CardColName>Сайт</CardColName><CardColValue>{onePartnerInfo.website}</CardColValue>
                        </CardRow>
                        : <></>}
                    <CardRow>
                        <CardColName>ИНН</CardColName><CardColValue>{onePartnerInfo.company_inn}</CardColValue>
                    </CardRow>
                </>
                : <></>}
            {onePartnerInfo.legal === 'person' ?
                <>
                    <CardRow>
                        <CardColName>Паспорт</CardColName><CardColValue>{onePartnerInfo.passport_number}</CardColValue>
                    </CardRow>
                    <CardRow>
                        <CardColName>Дата выдачи</CardColName><CardColValue>{onePartnerInfo.passport_date_of_issue}</CardColValue>
                    </CardRow>
                    <CardRow>
                        <CardColName>Кем выдан</CardColName><CardColValue>{onePartnerInfo.passport_issued_by}</CardColValue>
                    </CardRow>
                </>
                : <></>}
            <CardRow>
                <CardColName>Юридический статус</CardColName><CardColValue>{onePartnerInfo.legal === 'entity' ? 'Юридическое лицо' :
                    onePartnerInfo.legal === 'sole_trader' ? 'Индивидуальный предприниматель' :
                        onePartnerInfo.legal === 'person' ? 'Физическое лицо' :
                            <></>}</CardColValue>
            </CardRow>
            <RatingView onePartnerInfo={onePartnerInfo} user={user} />
            <HorizontalContainer>

                {onePartner.status === 'normal' ?
                    <>
                        <CardButton onClick={priority}>В избранное</CardButton>
                        <CardButton onClick={blocked}>Заблокировать</CardButton>
                    </>
                    :
                    onePartner.status === 'blocked' ?
                        <>
                            <CardButton onClick={priority}>В избранное</CardButton>
                            <CardButton onClick={normal}>Разблокировать</CardButton>
                        </> :
                        onePartner.status === 'priority' ?
                            <>
                                <CardButton onClick={normal}>Удалить из избранного</CardButton>
                                <CardButton onClick={blocked}>Заблокировать</CardButton>
                            </>
                            :
                            <></>}

                <CardButton
                    onClick={() => {
                        setModalActive(false)
                    }}
                >Закрыть окно</CardButton>
            </HorizontalContainer>
        </VerticalContainer>
    )
})

export default PartnerModalContent