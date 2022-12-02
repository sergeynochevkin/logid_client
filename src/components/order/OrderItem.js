import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { CardButton } from '../ui/button/CardButton'
import { UserContext, ComponentFunctionContext, OrderContext, UserInfoContext, PointContext, PartnerContext, FilterAndSortContext, StateContext } from '../../index'
import { CardContainer } from '../ui/card/CardContainer'
import { CardRow } from '../ui/card/CardRow'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardEquipment } from '../ui/card/CardEquipment'
import { EquipmentRow } from '../ui/card/EquipmentRow'
import Modal from '../ui/modal/Modal'
import PointItem from '../point/PoinItem'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { AddDeleteFieldButton } from '../ui/form/AddDeleteFieldButton'
import PartnerModalContent from '../partner/PartnerModalContent'
import { useFetching } from '../../hooks/useFetching'
import { fetchPoints } from '../../http/pointApi'
// import MapComponent from './MapComponent'
import { SetTranslate } from '../../modules/SetTranslate'
import { useColor } from '../../hooks/useColor'
import OrderStatusButtons from './OrderStatusButtons'
import MapComponent from '../map/MapComponent'


const OrderItem = observer(({ oneOrder, oneOrderOffers, oneOrderPoints, setFetchStart, onePartnerInfo, onePartner, setFetchPartnersStart, oneOrderNoPartners }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { user } = useContext(UserContext)
    const [modalActive, setModalActive] = useState(false)
    const { order } = useContext(OrderContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [modalFunction, setModalFunction] = useState('')
    const [pointFetchStart, setPointFetchStart] = useState(false)
    const { Point } = useContext(PointContext)
    const { Partner } = useContext(PartnerContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { State } = useContext(StateContext)

    let thisOrder
    ComponentFunction.OrdersComponentFunction === 'orderList' ? thisOrder = oneOrder : ComponentFunction.OrdersComponentFunction === 'orderItem' ? thisOrder = order.order : thisOrder = {}
    let thisPartner
    ComponentFunction.OrdersComponentFunction === 'orderList' ? thisPartner = onePartner : ComponentFunction.OrdersComponentFunction === 'orderItem' ? thisPartner = Partner.partner : thisPartner = {}
    let thisPartnerInfo
    ComponentFunction.OrdersComponentFunction === 'orderList' ? thisPartnerInfo = onePartnerInfo : ComponentFunction.OrdersComponentFunction === 'orderItem' ? thisPartnerInfo = Partner.partnerInfo : thisPartnerInfo = {}

    let thisOrderOffers = oneOrderOffers
    let thisCarrierOffer = thisOrderOffers.find(el => el.carrierId === UserInfo.userInfo.id)
    let thisOrderPoints = oneOrderPoints
    let thisOrderNoPartners = oneOrderNoPartners


    const [fetching, error] = useFetching(async () => {
        await fetchPoints(thisOrder.pointsIntegrationId, UserInfo.userInfo.id).then(data => {
            Point.setPoints(data.rows)
            Point.setAdded(data.added)
        })
    })

    useEffect(() => {
        if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
            if (thisOrder.order_status === 'inWork') {
                fetching()
                const interval = setInterval(() => {
                    fetching()
                }, 2000);
                return () => clearInterval(interval);
            } else {
                fetching().then(setPointFetchStart(false))
            }
        }
    }, [pointFetchStart])

    const sortPoints = (a, b) => {
        if (a.sequence > b.sequence) {
            return 1
        } else {
            return -1
        }
    }

    let partnerNames = []
    let for_partner = order.ordersByPartner.filter(el => el.orderId === thisOrder.id)
    for_partner = for_partner.map(el => el.partnerId)
    if (for_partner.length > 0) {
        const partners = Partner.partnerInfos.filter(el => for_partner.includes(el.id))
        for (const row of partners) {
            if (row.legal === 'person') {
                partnerNames.push(row.name_surname_fathersname)
            } else {
                partnerNames.push(row.company_name)
            }
        }
        partnerNames = partnerNames.toString()
    }

    let groups
    let for_group = order.ordersByGroup.filter(el => el.orderId === thisOrder.id)
    for_group = for_group.map(el => el.groupId)
    if (for_group.length > 0) {
        groups = Partner.groups.filter(el => for_group.includes(el.dataValues.id))
        groups = groups.map(el => el.dataValues.name).toString()
    }

    return (
        <>
            <CardContainer
                onClick={() => {
                    // if (ComponentFunction.OrdersComponentFunction !== 'orderItem') {
                    //     Point.setPoints([])
                    // }
                    order.setOrder(thisOrder)
                    Point.setThisOrderPoints(Point.points.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
                    Partner.setPartner(thisPartner)
                    Partner.setPartnerInfo(thisPartnerInfo)
                    ComponentFunction.setOrdersComponentFunction('orderItem')
                }}

                style={{
                    boxShadow: `0px 5px 10px 0px ${order.group.includes(thisOrder.id) ? 'grey' : useColor(thisOrder.order_status)}`,
                    minWidth: ComponentFunction.OrdersComponentFunction === 'orderItem' ? '200px' : '',
                    marginTop: ComponentFunction.OrdersComponentFunction === 'orderItem' ? '10px' : '',
                    cursor: ComponentFunction.OrdersComponentFunction === 'orderItem' ? 'default' : 'pointer',
                    backgroundColor: State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(thisOrder.id) ? 'rgb(255, 253, 231, 0.8)' : ''
                }}
            >
                {ComponentFunction.OrdersComponentFunction === 'orderItem' ?
                    <AddDeleteFieldButton onClick={(event) => {
                        event.stopPropagation()
                        ComponentFunction.setFunction(thisOrder.order_status)
                        ComponentFunction.setOrdersComponentFunction('orderList')
                        setFetchStart(true)
                    }}>вернуться к списку заказов</AddDeleteFieldButton>
                    : <></>}

                <VerticalContainer style={{ gap: '3px' }}>

                    <CardRow>
                        {(user.user.role === 'carrier' && thisOrder.order_status === 'new') || (thisOrder.order_status === 'inWork') ?
                            <></>
                            : ComponentFunction.OrdersComponentFunction !== 'orderItem' ?
                                <CardButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        if (!order.group.includes(thisOrder.id)) {
                                            order.setGroup([...order.group, thisOrder.id]);
                                        } else {
                                            order.setGroup(order.group.filter(el => el !== thisOrder.id))
                                        }
                                    }}
                                >{!order.group.includes(thisOrder.id) ? 'Выбрать' : 'Отменить выбор'}</CardButton>
                                : <></>
                        }

                        <CardButton
                            onClick={(event) => {
                                event.stopPropagation();
                                if (!State.user_state.favorite_order_state.includes(thisOrder.id)) {
                                    State.setUserStateField([...State.user_state.favorite_order_state, thisOrder.id], 'favorite_order_state', UserInfo.userInfo.id)
                                } else {
                                    State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id);
                                    FilterAndSort.filters.selected.length > 0 && FilterAndSort.setFilters(State.user_state.favorite_order_state, 'selected')
                                    setFetchStart(true)
                                }
                            }}
                        >{State.user_state.favorite_order_state && !State.user_state.favorite_order_state.includes(thisOrder.id) ? 'В избранное' : 'Убрать из избранного'}
                        </CardButton>

                    </CardRow>

                    <CardRow>
                        <CardColName
                        >{
                                thisOrder.order_type === "order" ? 'Заказ' :
                                    thisOrder.order_type === "auction" ? 'Аукцион' :
                                        <></>
                            }</CardColName>
                        <CardColValue>{thisOrder.id}</CardColValue>
                        <CardColName>Статус</CardColName>
                        <CardColValue>{SetTranslate(thisOrder.order_status)}</CardColValue>
                    </CardRow>

                    {onePartnerInfo ?
                        <>
                            <CardRow
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setModalFunction('partner')
                                    setModalActive(true)
                                }}>
                                <CardColName>
                                    {user.user.role === 'carrier' ? 'Заказчик' :
                                        user.user.role === 'customer' ? 'Перевозчик' : ''}
                                </CardColName>

                                {onePartnerInfo.legal === 'person' ?
                                    <CardColName
                                        style={{ backgroundColor: useColor(thisPartner.status) }}>
                                        {onePartnerInfo.name_surname_fathersname}
                                    </CardColName>
                                    :
                                    <CardColName
                                        style={{ backgroundColor: useColor(thisPartner.status) }}>
                                        {onePartnerInfo.company_name}
                                    </CardColName>}
                            </CardRow>
                        </> : <></>
                    }

                    {ComponentFunction.OrdersComponentFunction === 'orderItem' && (thisOrder.order_status !== 'new' && thisOrder.order_status !== 'postponed' && thisOrder.order_status !== 'canceled') && thisPartnerInfo ?
                        <>
                            <CardRow>
                                <CardColName>Телефон</CardColName>
                                <CardColValue>{thisPartnerInfo.phone}</CardColValue>
                            </CardRow>
                        </>
                        :
                        <></>}

                    {thisOrderPoints.filter(el => el.sequence === 1).sort(sortPoints).map(onePoint => <PointItem
                        onePoint={onePoint}
                        key={onePoint.id}
                        oneOrder={thisOrder}
                        setPointFetchStart={setPointFetchStart}
                    />)}

                    {ComponentFunction.OrdersComponentFunction === 'orderItem' ?
                        <>
                            {Point.thisOrderPoints.filter(el => el.sequence !== 1).sort(sortPoints).map(onePoint => <PointItem
                                onePoint={onePoint}
                                key={onePoint.id}
                                oneOrder={thisOrder}
                                setPointFetchStart={setPointFetchStart}
                            />)}
                        </>
                        : <></>}

                    {thisOrder.order_comment !== '' ? <CardRow>
                        <CardColName>Комментарий к заказу</CardColName>
                        <CardColValue>{thisOrder.order_comment}</CardColValue>
                    </CardRow> : <></>}

                    <CardRow>
                        <CardColName>Транспорт</CardColName>
                        <CardColValue>{SetTranslate(thisOrder.type)}</CardColValue>
                    </CardRow>
                    {(thisOrder.side_type || thisOrder.load_capacity) &&
                        <CardRow>
                            {thisOrder.side_type && <CardColValue> {SetTranslate(thisOrder.side_type)}</CardColValue>}
                            {thisOrder.load_capacity && <CardColValue> {SetTranslate(thisOrder.load_capacity)}</CardColValue>}
                        </CardRow>
                    }
                    <CardRow>
                        <CardColName>Стоимость</CardColName>
                        <CardColValue>{thisOrder.cost === 0 ? 'не указана' : thisOrder.cost}</CardColValue>
                    </CardRow>

                    {(ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed') &&
                        <CardRow>
                            <CardColName>Доступен</CardColName>
                            {user.user.role === 'customer' && (thisOrder.order_status === 'new' || thisOrder.order_status === 'postponed') ?
                                <CardColValue>
                                    {for_group.length === 0 && for_partner.length === 0 ? 'всем' : for_group.length !== 0 ? `группе ${groups}` : for_partner.length !== 0 ? `партнеру ${partnerNames}` : ''}
                                </CardColValue> :
                                user.user.role === 'carrier' && thisOrder.order_status === 'new' ?
                                    <CardColValue>
                                        {for_group.length === 0 && for_partner.length === 0 ? 'всем' : for_group.length !== 0 ? `вашей группе` : for_partner.length !== 0 ? `вам` : ''}
                                    </CardColValue> : <></>}
                        </CardRow>
                    }

                    <EquipmentRow>
                        {thisOrder.thermo_bag === true ? <CardEquipment>{SetTranslate('thermo_bag')}</CardEquipment> : <></>}
                        {thisOrder.thermo_van === true ? <CardEquipment>{SetTranslate('thermo_van')}</CardEquipment> : <></>}
                        {thisOrder.refrigerator_minus === true ? <CardEquipment>{SetTranslate('refrigerator_minus')}</CardEquipment> : <></>}
                        {thisOrder.refrigerator_plus === true ? <CardEquipment>{SetTranslate('refrigerator_plus')}</CardEquipment> : <></>}
                        {thisOrder.hydraulic_platform === true ? <CardEquipment>{SetTranslate('hydraulic_platform')}</CardEquipment> : <></>}
                        {thisOrder.side_loading === true ? <CardEquipment>{SetTranslate('side_loading')}</CardEquipment> : <></>}
                        {thisOrder.glass_stand === true ? <CardEquipment>{SetTranslate('glass_stand')}</CardEquipment> : <></>}
                    </EquipmentRow>
                </VerticalContainer>
                <VerticalContainer>
                    <OrderStatusButtons
                        parent={'order'}
                        setFetchStart={setFetchStart}
                        thisOrder={thisOrder}
                        setFetchPartnersStart={setFetchPartnersStart}
                        thisOrderOffers={thisOrderOffers}
                        thisPartnerInfo={thisPartnerInfo}
                        thisOrderNoPartners={thisOrderNoPartners}
                        thisCarrierOffer={thisCarrierOffer}
                        thisOrderPoints={thisOrderPoints}
                    />
                </VerticalContainer>

            </CardContainer>
            {ComponentFunction.OrdersComponentFunction === 'orderItem' && (ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed' || ComponentFunction.Function === 'inWork') ? <MapComponent /> : <></>}

            <Modal
                modalActive={modalActive}
                setModalActive={setModalActive}>

                {
                    ComponentFunction.OrdersComponentFunction === 'orderItem' && modalFunction === 'partner' ?
                        <PartnerModalContent
                            setModalActive={setModalActive}
                            onePartner={thisPartner}
                            onePartnerInfo={thisPartnerInfo}
                            setFetchPartnersStart={setFetchPartnersStart}
                        />
                        : <></>
                }
            </Modal>
        </>

    )
})

export default OrderItem

