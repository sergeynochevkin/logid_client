import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { CardButton } from '../ui/button/CardButton'
import { UserContext, ComponentFunctionContext, OrderContext, UserInfoContext, PointContext, PartnerContext, FilterAndSortContext, StateContext, AdressContext, TranslateContext, FetcherContext, SettingContext } from '../../index'
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

import { setColor } from '../../modules/setColor'
import OrderStatusButtons from './OrderStatusButtons'
import MapComponent from '../map/MapComponent'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


const OrderItem = observer(({ oneOrder, oneOrderOffers, oneOrderPoints, onePartnerInfo, onePartner, oneOrderNoPartners }) => {
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
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const {Setting} = useContext(SettingContext)

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
        <>{thisOrderPoints.length > 0 ?
            <CardContainer
                onClick={() => {
                    // if (ComponentFunction.OrdersComponentFunction !== 'orderItem') {
                    //     Point.setPoints([])
                    // }
                    order.setOrder(thisOrder)
                    Point.setThisOrderPoints(Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
                    Partner.setPartner(thisPartner)
                    Partner.setPartnerInfo(thisPartnerInfo)
                    ComponentFunction.setOrdersComponentFunction('orderItem')
                }}
                thisOrder={thisOrder}
            // style={{                    
            //     boxShadow: `0px 5px 10px 0px ${order.group.includes(thisOrder.id) ? 'grey' : setColor(thisOrder.order_status)}`,
            //     minWidth: ComponentFunction.OrdersComponentFunction === 'orderItem' ? '200px' : '',
            //     marginTop: ComponentFunction.OrdersComponentFunction === 'orderItem' ? '10px' : '',
            //     cursor: ComponentFunction.OrdersComponentFunction === 'orderItem' ? 'default' : 'pointer',
            //     backgroundColor: State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(thisOrder.id) ? 'rgb(255, 253, 231, 0.8)' : ''
            // }}
            >
                {ComponentFunction.OrdersComponentFunction === 'orderItem' ?
                    <>
                        <span class={`material-symbols-outlined order_action_icon ${Setting.app_theme === 'dark' ? 'dark' : ''}`}
                            onClick={(event) => {
                                event.stopPropagation()
                                ComponentFunction.setFunction(thisOrder.order_status)
                                ComponentFunction.setOrdersComponentFunction('orderList')
                                fetcher.setOrders(true)
                            }}
                        >
                            arrow_back
                        </span>
                    </>
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
                                >{!order.group.includes(thisOrder.id) ? SetNativeTranslate(Translate.language, {}, 'select') : SetNativeTranslate(Translate.language, {}, 'deselect')}</CardButton>
                                : <></>
                        }

                        <CardButton
                            onClick={(event) => {
                                event.stopPropagation();
                                if (!State.user_state.favorite_order_state) {
                                    State.setUserStateField([thisOrder.id], 'favorite_order_state', UserInfo.userInfo.id)
                                }
                                else if (!State.user_state.favorite_order_state.includes(thisOrder.id)) {
                                    State.setUserStateField([...State.user_state.favorite_order_state, thisOrder.id], 'favorite_order_state', UserInfo.userInfo.id)
                                } else {
                                    State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id);
                                    FilterAndSort.filters.selected.length > 0 && FilterAndSort.setFilters(State.user_state.favorite_order_state, 'selected')
                                    fetcher.setOrders(true)
                                }
                            }}
                        >{!State.user_state.favorite_order_state || (State.user_state.favorite_order_state && !State.user_state.favorite_order_state.includes(thisOrder.id)) ? SetNativeTranslate(Translate.language, {}, 'to_favorites') : State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(thisOrder.id) ? SetNativeTranslate(Translate.language, {}, 'from_favorites') : ''}
                        </CardButton>

                    </CardRow>

                    <CardRow>
                        <CardColName
                        >{
                                thisOrder.order_type === "order" ? SetNativeTranslate(Translate.language, {}, 'order') :
                                    thisOrder.order_type === "auction" ? SetNativeTranslate(Translate.language, {}, 'auction') :
                                        <></>
                            }</CardColName>
                        <CardColValue>{thisOrder.id}</CardColValue>
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'status')}</CardColName>
                        <CardColValue>{SetNativeTranslate(Translate.language, {}, thisOrder.order_status)}</CardColValue>
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
                                    {user.user.role === 'carrier' ? SetNativeTranslate(Translate.language, {}, 'customer') :
                                        user.user.role === 'customer' ? SetNativeTranslate(Translate.language, {}, 'carrier') : ''}
                                </CardColName>

                                {onePartnerInfo.legal === 'person' ?
                                    <CardColName
                                        style={{ backgroundColor: setColor(thisPartner.status) }}>
                                        {onePartnerInfo.name_surname_fathersname}
                                    </CardColName>
                                    :
                                    <CardColName
                                        style={{ backgroundColor: setColor(thisPartner.status) }}>
                                        {onePartnerInfo.company_name}
                                    </CardColName>}
                            </CardRow>
                        </> : <></>
                    }

                    {ComponentFunction.OrdersComponentFunction === 'orderItem' && (thisOrder.order_status !== 'new' && thisOrder.order_status !== 'postponed' && thisOrder.order_status !== 'canceled') && thisPartnerInfo ?
                        <>
                            <CardRow>
                                <CardColName>{SetNativeTranslate(Translate.language, {}, 'phone')}</CardColName>
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
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'order_comment')}</CardColName>
                        <CardColValue>{thisOrder.order_comment}</CardColValue>
                    </CardRow> : <></>}

                    <CardRow>
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'transport')}</CardColName>
                        <CardColValue>{SetNativeTranslate(Translate.language, {}, thisOrder.type)}</CardColValue>
                    </CardRow>
                    {(thisOrder.side_type || thisOrder.load_capacity) &&
                        <CardRow>
                            {thisOrder.side_type && <CardColValue> {SetNativeTranslate(Translate.language, {}, thisOrder.side_type)}</CardColValue>}
                            {thisOrder.load_capacity && <CardColValue> {SetNativeTranslate(Translate.language, {}, thisOrder.load_capacity)}</CardColValue>}
                        </CardRow>
                    }
                    <CardRow>
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'cost')}</CardColName>
                        <CardColValue>{thisOrder.cost === 0 ? SetNativeTranslate(Translate.language, {}, 'not_specified') : `${thisOrder.cost} ${Adress.country.currency}`}</CardColValue>
                    </CardRow>

                    {(ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed') &&
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'available')}</CardColName>
                            {user.user.role === 'customer' && (thisOrder.order_status === 'new' || thisOrder.order_status === 'postponed') ?
                                <CardColValue>
                                    {for_group.length === 0 && for_partner.length === 0 ? SetNativeTranslate(Translate.language, {}, 'to_all') : for_group.length !== 0 ? `${SetNativeTranslate(Translate.language, {}, 'to_group')} ${groups}` : for_partner.length !== 0 ? `${SetNativeTranslate(Translate.language, {}, 'to_partner')} ${partnerNames}` : ''}
                                </CardColValue> :
                                user.user.role === 'carrier' && thisOrder.order_status === 'new' ?
                                    <CardColValue>
                                        {for_group.length === 0 && for_partner.length === 0 ? SetNativeTranslate(Translate.language, {}, 'to_all') : for_group.length !== 0 ? SetNativeTranslate(Translate.language, {}, 'your_group') : for_partner.length !== 0 ? SetNativeTranslate(Translate.language, {}, 'to_you') : ''}
                                    </CardColValue> : <></>}
                        </CardRow>
                    }

                    <EquipmentRow>
                        {thisOrder.thermo_bag === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'thermo_bag')}</CardEquipment> : <></>}
                        {thisOrder.thermo_van === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'thermo_van')}</CardEquipment> : <></>}
                        {thisOrder.refrigerator_minus === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'refrigerator_minus')}</CardEquipment> : <></>}
                        {thisOrder.refrigerator_plus === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'refrigerator_plus')}</CardEquipment> : <></>}
                        {thisOrder.hydraulic_platform === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'hydraulic_platform')}</CardEquipment> : <></>}
                        {thisOrder.side_loading === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'side_loading')}</CardEquipment> : <></>}
                        {thisOrder.glass_stand === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'glass_stand')}</CardEquipment> : <></>}
                    </EquipmentRow>
                </VerticalContainer>
                <VerticalContainer>
                    <OrderStatusButtons
                        parent={'order'}

                        thisOrder={thisOrder}

                        thisOrderOffers={thisOrderOffers}
                        thisPartnerInfo={thisPartnerInfo}
                        thisOrderNoPartners={thisOrderNoPartners}
                        thisCarrierOffer={thisCarrierOffer}
                        thisOrderPoints={thisOrderPoints}
                    />
                </VerticalContainer>

            </CardContainer>
            : <></>}
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

                        />
                        : <></>
                }
            </Modal>
        </>

    )
})

export default OrderItem

