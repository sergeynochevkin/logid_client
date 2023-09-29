import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { CardButton } from '../ui/button/CardButton'
import { UserContext, ComponentFunctionContext, OrderContext, UserInfoContext, PointContext, PartnerContext, FilterAndSortContext, StateContext, AdressContext, TranslateContext, FetcherContext, SettingContext, TransportContext, LinkContext, DriverContext } from '../../index'
import { CardContainer } from '../ui/card/CardContainer'
import { CardRow } from '../ui/card/CardRow'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardEquipment } from '../ui/card/CardEquipment'
import { EquipmentRow } from '../ui/card/EquipmentRow'
import Modal from '../ui/modal/Modal'
import PointItem from '../point/PoinItem'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import PartnerModalContent from '../partner/PartnerModalContent'


import { setColor } from '../../modules/setColor'
import OrderStatusButtons from './OrderStatusButtons'
import MapComponent from '../map/MapComponent'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

import arrow_back from '../../assets/icons/arrow_back.png';
import arrow_back_dark from '../../assets/icons/arrow_back_dark.png';
import g from '../../assets/icons/g.webp';
import ya from '../../assets/icons/ya.webp';

import ShareComponent from '../share/ShareComponent'
import DriverModalContent from '../partner/DriverModalContent'


const OrderItem = observer(({ oneOrder, oneOrderOffers, oneOrderPoints, onePartnerInfo, onePartner, oneOrderNoPartners, driverInfo }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { user } = useContext(UserContext)
    const { link } = useContext(LinkContext)
    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)
    const [modalActive3, setModalActive3] = useState(false)
    const { order } = useContext(OrderContext)
    const { Driver } = useContext(DriverContext)
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

    const [order_images, setOrderImages] = useState([])

    let thisOrder
    ComponentFunction.OrdersComponentFunction === 'orderList' ? thisOrder = oneOrder : ComponentFunction.OrdersComponentFunction === 'orderItem' ? thisOrder = order.order : thisOrder = {}
    let thisPartner
    let thisDriverInfo
    ComponentFunction.OrdersComponentFunction === 'orderList' ? thisPartner = onePartner : ComponentFunction.OrdersComponentFunction === 'orderItem' ? thisPartner = Partner.partner : thisPartner = {}
    let thisPartnerInfo
    ComponentFunction.OrdersComponentFunction === 'orderList' ? thisPartnerInfo = onePartnerInfo : ComponentFunction.OrdersComponentFunction === 'orderItem' ? thisPartnerInfo = Partner.partnerInfo : thisPartnerInfo = {}
    ComponentFunction.OrdersComponentFunction === 'orderList' ? thisDriverInfo = driverInfo : ComponentFunction.OrdersComponentFunction === 'orderItem' ? thisDriverInfo = Driver.driver : thisDriverInfo = {}

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

    useEffect(() => {
        if (oneOrder.order_status === 'inWork' && Transport.transports) {
            Transport.transport_by_order.find(el => el.orderId === oneOrder.id) && setTransport(Transport.transports.find(el => el.id === Transport.transport_by_order.find(el => el.orderId === oneOrder.id).transportId))
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




    useEffect(() => {
        if (thisOrder.id === parseInt(link.order.id)) {
            toOrderItem()
            setTimeout(() => {
                link.setOrder('', 'id')
                link.setOrder('', 'status')
            }, 1000)
        }
    }, [order.dividedOrders])


    const toOrderItem = () => {
        order.setOrder(thisOrder)
        Point.setThisOrderPoints(Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
        Partner.setPartner(thisPartner)
        Driver.setDriver(thisDriverInfo)
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
                    <div className='order_actions_container'
                        onClick={(e) => { e.stopPropagation() }}>
                        {thisOrder.order_status === 'new' || thisOrder.order_status === 'inWork' ? <ShareComponent parent='order_item' thisOrder={thisOrder} /> : <></>}

                        <div className='nav_links_container'>

                            {thisOrder.yandex_url && Adress.country.value === 'russia' ?
                                <div><a
                                    target='blank' href={thisOrder.yandex_url}
                                >
                                    <img src={ya} alt={SetNativeTranslate(Translate.language, {
                                        russian: ['Открыть в Яндекс навигаторе'],
                                        english: ['Open in Yandex navigator'],
                                        spanish: ['Abrir en el navegador Yandex'],
                                        turkish: ['Yandex gezgininde aç'],
                                        сhinese: ['在 Yandex 导航器中打开'],
                                        hindi: ['यांडेक्स नेविगेटर में खोलें'],

                                    })} />
                                </a></div> : <></>}
                            {thisOrder.google_url &&
                                <div><a
                                    target='blank' href={thisOrder.google_url}
                                >
                                    <img src={g} alt={SetNativeTranslate(Translate.language, {
                                        russian: ['Открыть в Google навигаторе'],
                                        english: ['Open in Google navigator'],
                                        spanish: ['Abrir en el navegador Google'],
                                        turkish: ['Google gezgininde aç'],
                                        сhinese: ['在谷歌导航器中打开'],
                                        hindi: ['Google नेविगेटर में खोलें'],

                                    })} />
                                </a></div>}
                        </div>
                    </div>

                    <CardRow>
                        {(user.user.role === 'carrier' && thisOrder.order_status === 'new') || (thisOrder.order_status === 'inWork') ?
                            <></>
                            : ComponentFunction.OrdersComponentFunction !== 'orderItem' && user.user.role !== 'driver' ?
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
                                    {user.user.role === 'carrier'  ||user.user.role === 'driver'? SetNativeTranslate(Translate.language, {}, 'customer') :
                                        user.user.role === 'customer' ? SetNativeTranslate(Translate.language, {}, 'carrier') : ''}
                                </CardColName>                                
                                {onePartnerInfo &&
                                    <>
                                        {
                                            onePartnerInfo.legal === 'person' ?
                                                <CardColName
                                                    style={{ backgroundColor: user.user.role !=='driver' && thisPartner ?  setColor(thisPartner?.status) : '' }}>
                                                    {onePartnerInfo.name_surname_fathersname}
                                                </CardColName>
                                                :
                                                <CardColName
                                                    style={{ backgroundColor:  user.user.role !=='driver' && thisPartner ? setColor(thisPartner?.status) : '' }}>
                                                    {onePartnerInfo.company_name}
                                                </CardColName>
                                        }
                                    </>
                                }
                            </CardRow>
                        </> : <></>
                    }

                    {thisDriverInfo && onePartnerInfo && thisDriverInfo.id !== onePartnerInfo.id ? <CardRow style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setModalActive3(true)
                        }}
                    >
                        <CardColName>{SetNativeTranslate(Translate.language, {
                            russian: ['Водитель'],
                            english: ['Driver'],
                            spanish: ['Conductor'],
                            turkish: ['Sürücü'],
                            сhinese: ['司机'],
                            hindi: ['चालक'],
                        }, '')}</CardColName>
                        <CardColValue>{thisDriverInfo.name_surname_fathersname}</CardColValue>
                    </CardRow> : <></>}



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

                    {((ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed') && user.user.role !== 'driver') &&
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'available')}</CardColName>
                            {user.user.role === 'customer' && Partner.partnerInfos.length > 0 && (thisOrder.order_status === 'new' || thisOrder.order_status === 'postponed') ?
                                <CardColValue>
                                    {!thisOrder.for_group && !thisOrder.for_partner ? SetNativeTranslate(Translate.language, {}, 'to_all') : thisOrder.for_group ? `${SetNativeTranslate(Translate.language, {}, 'to_group')} ${Partner.groups.find(el => el.dataValues.id === thisOrder.for_group).dataValues.name}` : thisOrder.for_partner ? `${SetNativeTranslate(Translate.language, {}, 'to_partner')} ${Partner.partnerInfos.find(el => el.id === thisOrder.for_partner).legal !== 'person' ? Partner.partnerInfos.find(el => el.id === thisOrder.for_partner).company_name : Partner.partnerInfos.find(el => el.id === thisOrder.for_partner).name_surname_fathersname}` : ''}
                                </CardColValue> :
                                user.user.role === 'carrier' && thisOrder.order_status === 'new' ?
                                    <CardColValue>
                                        {!thisOrder.for_group && !thisOrder.for_partner ? SetNativeTranslate(Translate.language, {
                                            russian: ['Всем'],
                                            english: ['To all']
                                        }) : thisOrder.for_group ? SetNativeTranslate(Translate.language, {
                                            russian: ['Вашей группе'],
                                            english: ['To your group']
                                        }) : thisOrder.for_partner ? SetNativeTranslate(Translate.language, {
                                            russian: ['Вам'],
                                            english: ['To you']
                                        }) : ''}
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
                            english: ['Viewed', order.views[thisOrder.order_status] && order.views[thisOrder.order_status].filter(el => el.orderId === thisOrder.id).length, 'times'],
                            spanish: ['Visto', order.views[thisOrder.order_status] && order.views[thisOrder.order_status].filter(el => el.orderId === thisOrder.id).length, 'veces'],
                            turkish: [order.views[thisOrder.order_status] && order.views[thisOrder.order_status].filter(el => el.orderId === thisOrder.id).length, 'kez görüntülendi'],
                            сhinese: ['已查看', order.views[thisOrder.order_status] && order.views[thisOrder.order_status].filter(el => el.orderId === thisOrder.id).length, '次'],
                            hindi: ['देखा गया', order.views[thisOrder.order_status] && order.views[thisOrder.order_status].filter(el => el.orderId === thisOrder.id).length, 'बार'],
                        }, '')}

                    </div> : <></>}

                {order.views[thisOrder.order_status] && user.user.role === 'carrier' && order.views[thisOrder.order_status].find(el => el.orderId === thisOrder.id && el.userInfoId === UserInfo.userInfo.id) ?
                    <div className='viwes_counter'>
                        {SetNativeTranslate(Translate.language, {
                            russian: ['Вы просматривали этот заказ'],
                            english: ['You viewed this order'],
                            spanish: ['Viste este pedido'],
                            turkish: ['Bu siparişi görüntülediniz'],
                            сhinese: ['您查看过此订单吗'],
                            hindi: ['क्या आपने यह आदेश देखा है'],

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
            {ComponentFunction.OrdersComponentFunction === 'orderItem' && (ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed' || ComponentFunction.Function === 'inWork') ? <MapComponent thisOrder={thisOrder} /> : <></>}

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
            <Modal modalActive={modalActive3} setModalActive={setModalActive3}>
                <DriverModalContent setModalActive={setModalActive3} onePartnerInfo={thisDriverInfo} />
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

