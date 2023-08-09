import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { CardButton } from '../ui/button/CardButton'
import { UserContext, ComponentFunctionContext, OrderContext, UserInfoContext, PointContext, PartnerContext, FilterAndSortContext, StateContext, AdressContext, TranslateContext, FetcherContext, SettingContext, TransportContext, LinkContext } from '../../index'
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
import { v4 } from "uuid";


import { setColor } from '../../modules/setColor'
import OrderStatusButtons from './OrderStatusButtons'
import MapComponent from '../map/MapComponent'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

import arrow_back from '../../assets/icons/arrow_back.png';
import arrow_back_dark from '../../assets/icons/arrow_back_dark.png';

import info from '../../assets/icons/info.png';
import info_dark from '../../assets/icons/info_dark.png';
import ShareComponent from '../share/ShareComponent'


const OrderItem = observer(({ oneOrder, oneOrderOffers, oneOrderPoints, onePartnerInfo, onePartner, oneOrderNoPartners }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { user } = useContext(UserContext)
    const { Link } = useContext(LinkContext)
    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)
    const { order } = useContext(OrderContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [modalFunction, setModalFunction] = useState('')
    const { Point } = useContext(PointContext)
    const { Partner } = useContext(PartnerContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { State } = useContext(StateContext)
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const { Setting } = useContext(SettingContext)
    const { Transport } = useContext(TransportContext)
    const [transport, setTransport] = useState({})

    const [images, setImages] = useState([])
    const [image, setImage] = useState()

    const [files, setFiles] = useState()
    const [pairs, setPairs] = useState()

    const [order_images, setOrderImages] = useState([])

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

    useEffect(() => {
        if (oneOrder.order_status === 'inWork') {
            setTransport(Transport.transports.find(el => el.id === Transport.transport_by_order.find(el => el.orderId === oneOrder.id).transportId))
        }
    }, [Transport.transports, ComponentFunction.Function])

    useEffect(() => {
        if (transport && user.user.role === 'customer' && oneOrder.order_status === 'inWork') {
            if (Transport.transport_images.find(el => el.id === transport.id)) {
                setImages(Transport.transport_images.find(el => el.id === transport.id).urlsArray)
                // setImage(Transport.transport_images.find(el => el.id === transport.id).urlsArray[0])               
            }
        }
    }, [transport])

    useEffect(() => {
        if (order.order_images.find(el => el.id === oneOrder.id)) {
            setOrderImages(order.order_images.find(el => el.id === oneOrder.id).urlsArray)
        }

    }, [])

    useEffect(() => {
        if (order.order_images.find(el => el.id === oneOrder.id)) {
            setOrderImages(order.order_images.find(el => el.id === oneOrder.id).urlsArray)
        }

    }, [order.dividedOrders])

    let groups
    let for_group = order.ordersByGroup.filter(el => el.orderId === thisOrder.id)
    for_group = for_group.map(el => el.groupId)
    if (for_group.length > 0) {
        groups = Partner.groups.filter(el => for_group.includes(el.dataValues.id))
        groups = groups.map(el => el.dataValues.name).toString()
    }


    useEffect(() => {
        if (thisOrder.id === parseInt(Link.order.id)) {
            toOrderItem()
            setTimeout(() => {
                Link.setOrder('', 'id')
                Link.setOrder('', 'status')
            }, 1000)
        }
    }, [order.dividedOrders])


    const toOrderItem = () => {
        order.setOrder(thisOrder)
        Point.setThisOrderPoints(Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
        Partner.setPartner(thisPartner)
        Partner.setPartnerInfo(thisPartnerInfo)
        if (user.user.role === 'carrier') {
            if (order.views[thisOrder.order_status] && !order.views[thisOrder.order_status].find(el => el.orderId === thisOrder.id && el.userInfoId === UserInfo.userInfo.id)) {
                fetcher.setOrderViewed(true)
            }
        }
        ComponentFunction.setOrdersComponentFunction('orderItem')
    }



    return (
        <>{thisOrderPoints.length > 0 ?
            <CardContainer
                onClick={() => {
                    toOrderItem()
                }}
                thisOrder={thisOrder}
            >
                {ComponentFunction.OrdersComponentFunction === 'orderItem' ?
                    <>
                        <img className={"order_action_icon"} src={Setting.app_theme === 'light' ? arrow_back : arrow_back_dark}
                            onClick={(event) => {
                                event.stopPropagation()
                                ComponentFunction.setFunction(thisOrder.order_status)
                                ComponentFunction.setOrdersComponentFunction('orderList')
                                fetcher.setOrders(true)
                            }}
                        />

                    </>
                    : <></>}

                <VerticalContainer style={{ gap: '3px' }}>

                    {thisOrder.order_status === 'new' && <ShareComponent parent='order_item' thisOrder={thisOrder} />}

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
                                {thisPartner &&
                                    <>
                                        {
                                            onePartnerInfo.legal === 'person' ?
                                                <CardColName
                                                    style={{ backgroundColor: setColor(thisPartner.status) }}>
                                                    {onePartnerInfo.name_surname_fathersname}
                                                </CardColName>
                                                :
                                                <CardColName
                                                    style={{ backgroundColor: setColor(thisPartner.status) }}>
                                                    {onePartnerInfo.company_name}
                                                </CardColName>
                                        }
                                    </>
                                }
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
                    />)}

                    {ComponentFunction.OrdersComponentFunction === 'orderItem' ?
                        <>
                            {Point.thisOrderPoints.filter(el => el.sequence !== 1).sort(sortPoints).map(onePoint => <PointItem
                                onePoint={onePoint}
                                key={onePoint.id}
                                oneOrder={thisOrder}
                            />)}
                        </>
                        : <></>}

                    {thisOrder.order_comment !== '' ? <CardRow>
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'order_comment')}</CardColName>
                        <CardColValue>{thisOrder.order_comment}</CardColValue>
                    </CardRow> : <></>}

                    <CardRow>
                        {/* for carrier at in work orders transport tag */}
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'transport')}</CardColName>

                        <CardColValue>{
                            user.user.role === 'carrier' && thisOrder.order_status === 'inWork' && transport ? transport.tag :


                                user.user.role === 'customer' && thisOrder.order_status === 'inWork' && images.length > 0 ?

                                    <div className='in_order_transport_image_icon_container'>{images.length > 0 ? images.map(image => <img src={image} className='in_order_transport_image_icon' key={image}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            setImage(image)
                                            setModalActive2(true)
                                        }}
                                    ></img>)
                                        : <CardColValue>{thisOrder.type}</CardColValue>}</div>

                                    : SetNativeTranslate(Translate.language, {}, thisOrder.type)


                        }</CardColValue>

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

                {(thisOrder.order_status === 'new' || thisOrder.order_status === 'postponed') && user.user.role === 'customer' ?
                    <div className='viwes_counter'>
                        {SetNativeTranslate(Translate.language, {
                            russian: ['Просмотрен', order.views[thisOrder.order_status] && order.views[thisOrder.order_status].filter(el => el.orderId === thisOrder.id).length, 'раз'],
                            english: ['Viewed', order.views[thisOrder.order_status] && order.views[thisOrder.order_status].filter(el => el.orderId === thisOrder.id).length, 'times']
                        }, '')}

                    </div> : <></>}

                {order.views[thisOrder.order_status] && user.user.role === 'carrier' && order.views[thisOrder.order_status].find(el => el.orderId === thisOrder.id && el.userInfoId === UserInfo.userInfo.id) ?
                    <div className='viwes_counter'>
                        {SetNativeTranslate(Translate.language, {
                            russian: ['Вы просматривали этот заказ'],
                            english: ['You viewed this order']
                        }, '')}

                    </div>
                    :
                    <></>
                }

                <div className='in_order_transport_image_icon_container'>{order_images.length > 0 ? order_images.map(image => <img
                    onClick={(event) => {
                        event.stopPropagation()
                        setImage(image)
                        setModalActive2(true)
                    }}
                    src={image} className='in_order_transport_image_icon' key={image} />) : <></>}</div>


                <VerticalContainer>
                    <OrderStatusButtons
                        parent={'order'}

                        thisOrder={thisOrder}

                        thisOrderOffers={thisOrderOffers}
                        thisPartnerInfo={thisPartnerInfo}
                        thisOrderNoPartners={thisOrderNoPartners}
                        thisCarrierOffer={thisCarrierOffer}
                        thisOrderPoints={thisOrderPoints}

                        order_images={order_images}
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

            <Modal modalActive={modalActive2} setModalActive={setModalActive2}>
                <div className='image_modal_container'>
                    <img src={image} className='image_modal'></img>
                </div>
            </Modal>
        </>

    )
})

export default OrderItem

