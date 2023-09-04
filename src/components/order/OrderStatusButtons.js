import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FetcherContext, NotificationContext, OrderContext, PointContext, StateContext, TranslateContext, TransportContext, UserContext, UserInfoContext } from '../..'
import { CardButton } from '../ui/button/CardButton'
import { CardRow } from '../ui/card/CardRow'
import { v4 } from "uuid";
import OfferComponent from '../offer/OfferComponent'
import { updateOrder } from '../../http/orderApi'
import { sendMail } from '../../http/mailApi'
import { createPartner } from '../../http/partnerApi'
import OrderRatingComponent from '../rating/OrderRatingComponent'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import Modal from '../ui/modal/Modal'
import AccountCompletionForm from '../account/AccountCompletionForm'
import TransportSelector from '../transport/TransportSelector'

const OrderStatusButtons = observer(({ parent, thisOrder, thisOrderOffers, thisPartnerInfo, thisOrderNoPartners, thisCarrierOffer, thisOrderPoints, order_images }) => {
    const { Translate } = useContext(TranslateContext)
    const { Transport } = useContext(TransportContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Notification } = useContext(NotificationContext)
    const { order } = useContext(OrderContext)
    const { Point } = useContext(PointContext)
    const { State } = useContext(StateContext)
    const { fetcher } = useContext(FetcherContext)
    const Auction = SetNativeTranslate(Translate.language, {}, 'auction')
    const Order = SetNativeTranslate(Translate.language, {}, 'order')
    const to_order = SetNativeTranslate(Translate.language, {}, 'to_order')
    const to_auction = SetNativeTranslate(Translate.language, {}, 'to_auction')
    const you_converted = SetNativeTranslate(Translate.language, {}, 'you_converted')
    const you_postponed = SetNativeTranslate(Translate.language, {}, 'you_postponed')
    const you_canceled = SetNativeTranslate(Translate.language, {}, 'you_canceled')
    const you_send = SetNativeTranslate(Translate.language, {}, 'you_send')
    const you_took = SetNativeTranslate(Translate.language, {}, 'you_took')
    const you_finished = SetNativeTranslate(Translate.language, {}, 'you_finished')
    const you_moved_to_arc = SetNativeTranslate(Translate.language, {}, 'you_moved_to_arc')
    const you_opened = SetNativeTranslate(Translate.language, {}, 'you_opened')
    const the = SetNativeTranslate(Translate.language, {}, 'the')
    const orders_notification = SetNativeTranslate(Translate.language, {}, 'orders_notification')
    const form_from_auction = SetNativeTranslate(Translate.language, {}, 'form_from_auction')
    const for_editing = SetNativeTranslate(Translate.language, {}, 'for_editing')
    const form_from_order = SetNativeTranslate(Translate.language, {}, 'form_from_order')

    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)
    const [transport, setTransport] = useState({})


    // const sortOrders = (a, b) => {
    //     if (a && b) {
    //         if (a > b) {
    //             return 1
    //         } else {
    //             return -1
    //         }
    //     } else {
    //         return
    //     }
    // }

    const boost = (id) => {
        order.setDividedOrders([...order.divided_orders[ComponentFunction.Function].filter(el => el.id !== id)], ComponentFunction.Fuction)
        order.setTotalCount(order.totalCount[ComponentFunction.Function] - 1, ComponentFunction.Fuction)
        order.setFilteredCount(order.filtered_count[ComponentFunction.Function] - 1, ComponentFunction.Fuction)
    }

    const afterAction = (status, group) => {
        if (parent === 'order') {
            boost(thisOrder.id)
            fetcher.setNewStatus(status)
            fetcher.setDividedOrders(true)
            order.setGroup(order.group.filter(el => el !== thisOrder.id))
            sendMail(Translate.language, user.user.role, thisOrder.id, 'order_status', status === 'disrupt' ? 'canceled' : status)
            if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
                ComponentFunction.setOrdersComponentFunction('orderList')
            }
        }
        if (parent === 'selector') {
            sendMail(Translate.language, user.user.role, group, 'order_status', status, '')
            fetcher.setNewStatus(status)
            fetcher.setDividedOrders(true)
        }

        if (status === 'inWork') {
            fetcher.setPartners(true)
        }
    }

    const toAuction = async (event) => {
        await updateOrder('', 'auction', thisOrder.id, user.user.role, thisOrder.order_status)
            .then(sendMail(Translate.language, user.user.role, thisOrder.id, 'order_type', 'auction'))
            .then(event.stopPropagation());
        Notification.addNotification([{ id: v4(), type: 'success', message: `${you_converted} ${Order.toLowerCase()} ${thisOrder.id} ${to_auction}` }])
        // ComponentFunction.setFunction(thisOrder.order_status)
        fetcher.setDividedOrders(true)
    }

    const toOrder = async (event) => {
        await updateOrder('', 'order', thisOrder.id, user.user.role, thisOrder.order_status)
            .then(sendMail(Translate.language, user.user.role, thisOrder.id, 'order_type', 'order'))
            .then(event.stopPropagation());
        Notification.addNotification([{ id: v4(), type: 'success', message: `${you_converted} ${Auction.toLowerCase()} ${thisOrder.id} ${to_order}` }])
        // ComponentFunction.setFunction(thisOrder.order_status)
        fetcher.setDividedOrders(true)
    }

    const postpone = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'postponed', thisOrder.order_status)
                .then(event.stopPropagation());
            afterAction('postponed')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_postponed} ${the.toLowerCase()} ${thisOrder.order_type === 'order' ? Order.toLowerCase() : Auction.toLowerCase()} ${thisOrder.id}` }])
        }

        if (parent === 'selector') {
            let group = [...order.group]
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'postponed', ComponentFunction.Function)
                    .then(event.stopPropagation());
                boost(element.id)
                order.setGroup(order.group.filter(el => el !== element))
            })
            afterAction('postponed', group)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_postponed} ${orders_notification.toLowerCase()} ${order.group.toString()}` }])

        };
    }

    const cancel = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'canceled', thisOrder.order_status)
                .then(event.stopPropagation());
            afterAction('canceled')
            Notification.addNotification([{ id: v4(), type: 'error', message: `${you_canceled} ${the.toLowerCase()} ${thisOrder.order_type === 'order' ? Order.toLowerCase() : Auction.toLowerCase()} ${thisOrder.id}` }])
        };
        if (parent === 'selector') {
            let group = [...order.group]
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'canceled', ComponentFunction.Function)
                    .then(event.stopPropagation());
                boost(element.id)
                order.setGroup(order.group.filter(el => el !== element))
            })
            afterAction('canceled', group)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_canceled} ${orders_notification.toLowerCase()} ${order.group.toString()}` }])
        };
    }

    const toNew = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'new', thisOrder.order_status)
                .then(event.stopPropagation());
            afterAction('new')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_send} ${the.toLowerCase()} ${thisOrder.order_type === 'order' ? Order.toLowerCase() : Auction.toLowerCase()} ${thisOrder.id}` }])
        }
        if (parent === 'selector') {
            let group = [...order.group]
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'new', ComponentFunction.Function)
                    .then(event.stopPropagation());
                boost(element.id)
                order.setGroup(order.group.filter(el => el !== element))
            })
            afterAction('new', group)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_send} ${orders_notification.toLowerCase()} ${order.group.toString()}` }])
        };
    }


    useEffect(() => {
        if (thisOrder.order_status === 'new') {
            if (Transport.transports.filter(el => el.type === thisOrder.type).length === 1) {
                setTransport(Transport.transports.find(el => el.type === thisOrder.type))
            }
        }
    }, [])


    //userInfo stopper!
    const inWork = async (event, option, transportId) => {
        if (option !== 'selector') {
            event.stopPropagation()
        }
        if (!UserInfo.userInfo.legal && user.user.role === 'carrier') {
            setModalActive(true)
        } else {
            if (parent === 'order') {
                if (Object.keys(transport).length === 0 && !transportId) {
                    setModalActive2(true)
                }
                else {
                    try {
                        await updateOrder('', '', thisOrder.id, user.user.role, 'inWork', thisOrder.order_status, UserInfo.userInfo.id, undefined, undefined, undefined, undefined, transportId ? transportId : transport.id)
                        await createPartner(UserInfo.userInfo.id, thisOrder.userInfoId, 'normal')//to the server
                        await createPartner(thisOrder.userInfoId, UserInfo.userInfo.id, 'normal')//to the server
                        Transport.setTransport({})
                        afterAction('inWork')
                        Notification.addNotification([{ id: v4(), type: 'success', message: `${you_took} ${the.toLowerCase()} ${thisOrder.order_type === 'order' ? Order.toLowerCase() : Auction.toLowerCase()} ${thisOrder.id}` }])
                    } catch (e) {
                        Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
                    }
                }
            }
        }
    }

    const completed = async (event) => {
        if (parent === 'order') {

            await updateOrder('', '', thisOrder.id, user.user.role, 'completed', thisOrder.order_status, thisOrder.carrierId, thisOrder.userInfoId)
                .then(event.stopPropagation());
            afterAction('completed')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_finished} ${the.toLowerCase()} ${thisOrder.order_type === 'order' ? Order.toLowerCase() : Auction.toLowerCase()} ${thisOrder.id}` }])
        }
        if (parent === 'selector') {
            let group = [...order.group]
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'completed', ComponentFunction.Function)
                    .then(event.stopPropagation());
                boost(element.id)
                order.setGroup(order.group.filter(el => el !== element))
            })
            afterAction('completed', group)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_finished} ${orders_notification.toLowerCase()} ${order.group.toString()}` }])
        };
    }

    const arc = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'arc', thisOrder.order_status)
                .then(event.stopPropagation())
            order.setGroup(order.group.filter(el => el !== thisOrder.id))
            afterAction('arc')
            State.user_state.favorite_order_state && State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${thisOrder.order_type === 'order' ? Order : Auction} ${thisOrder.id} ${you_moved_to_arc}` }])
        }
        if (parent === 'selector') {
            let group = [...order.group]
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'arc', ComponentFunction.Function)
                    .then(event.stopPropagation());
                boost(element.id)
                State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id);
                order.setGroup(order.group.filter(el => el !== element))
            })
            afterAction('arc', group)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${orders_notification} ${order.group.toString()} ${you_moved_to_arc}` }])
        };
    }

    const disrupt = async (event) => {
        if (parent === 'order') {
            await updateOrder('disrupt', '', thisOrder.id, user.user.role, 'canceled', thisOrder.order_status)
                .then(event.stopPropagation());
            afterAction('disrupt')
            State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id);
        }
    }

    const restore = async (event) => {
        await updateOrder('restote', '', thisOrder.id).then(event.stopPropagation())
        if (parent === 'order') {
            order.setPattern(JSON.stringify(thisOrder))
            Point.setPattern(JSON.stringify(thisOrderPoints))
            order.setIntegrationId()
            localStorage.removeItem('orderFormData')
            ComponentFunction.setOrderFormFunction('pattern')
            ComponentFunction.setPageFunction('orderForm')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_opened} ${thisOrder.order_type === 'order' ? form_from_order : form_from_auction} ${thisOrder.id}` }])
        }
    }

    const edit = async (event) => {
        await updateOrder('edit', '', thisOrder.id).then(event.stopPropagation())
        if (parent === 'order') {
            order.setPattern(JSON.stringify(thisOrder))       
            Point.setPattern(JSON.stringify(thisOrderPoints))
            order.setIntegrationId()

            //put files to state
            if (order_images) {

                order.setPairs([])
                order.setFiles([])

                let blob

                const createImage = async (image) => {
                    blob = await fetch(image).then(r => r.blob()).then(data => {
                        let newFile = new File([data], `${v4()}.${data.type.split('/')[1]}`, { type: data.type })
                        let newPair = { file: newFile, url: URL.createObjectURL(newFile) }
                        // newFiles.push(newFile)// можно сразу в состояние
                        // newPairs.push(newPair)// можно сразу в состояние
                        order.setPairs([...order.pairs, newPair])
                        order.setFiles([...order.files, newFile])

                    })
                }

                // let newFiles = []
                // let newPairs = []

                for (const image of order_images) {
                    await createImage(image)
                }

                // order.setFiles(newFiles)
                // order.setPairs(newPairs)


            }

            localStorage.removeItem('orderFormData')
            ComponentFunction.setOrderFormFunction('edit')
            ComponentFunction.setPageFunction('orderForm')
            Notification.addNotification([{ id: v4(), type: 'success', message: `${you_opened} ${thisOrder.order_type === 'order' ? Order.toLowerCase() : Auction.toLowerCase()} ${thisOrder.id} ${for_editing}` }])
        }
    }


    if (parent === 'selector') {
        thisOrder.order_status = ComponentFunction.Function
    }

    return (
        <>
            {
                user.user.role === 'customer' && thisOrder.order_status === 'new' ?
                    <><CardRow>
                        <CardButton onClick={postpone}>{SetNativeTranslate(Translate.language, {}, 'postpone')}</CardButton>
                        <CardButton onClick={cancel}>{SetNativeTranslate(Translate.language, {}, 'cancel')}</CardButton>
                        <CardButton onClick={thisOrder.order_type === 'auction' ? toOrder : toAuction}> {SetNativeTranslate(Translate.language, {}, thisOrder.order_type === 'auction' ? 'order' : 'auction')}</CardButton>
                    </CardRow>
                        {parent === 'order' ?
                            <OfferComponent thisOrder={thisOrder} thisOrderOffers={thisOrderOffers} thisOrderNoPartners={thisOrderNoPartners} thisCarrierOffer={thisCarrierOffer}
                                firstPoint={ComponentFunction.OrdersComponentFunction === 'orderItem' ? Point.thisOrderPoints.find(el => el.sequence === 1) : thisOrderPoints.find(el => el.sequence === 1)}
                            />
                            : <></>}
                    </>
                    :
                    user.user.role === 'customer' && thisOrder.order_status === 'postponed' ?
                        <>
                            <CardRow>
                                <CardButton onClick={toNew}>{SetNativeTranslate(Translate.language, {}, 'send')}</CardButton>
                                <CardButton onClick={cancel}>{SetNativeTranslate(Translate.language, {}, 'cancel')}</CardButton>
                                {parent !== 'selector' ?
                                    <CardButton onClick={edit}>{SetNativeTranslate(Translate.language, {}, 'edit')}</CardButton>
                                    : <></>}
                            </CardRow>
                            {parent === 'order' ?
                                <OfferComponent thisOrder={thisOrder} thisOrderOffers={thisOrderOffers} thisOrderNoPartners={thisOrderNoPartners} thisCarrierOffer={thisCarrierOffer}
                                    firstPoint={ComponentFunction.OrdersComponentFunction === 'orderItem' ? Point.thisOrderPoints.find(el => el.sequence === 1) : thisOrderPoints.find(el => el.sequence === 1)} /> : <></>}
                        </>
                        :
                        user.user.role === 'customer' && thisOrder.order_status === 'inWork' ?
                            <CardRow>
                                <CardButton onClick={disrupt}>{SetNativeTranslate(Translate.language, {}, 'not_arrival_button')}</CardButton>
                                <CardButton onClick={completed}>{SetNativeTranslate(Translate.language, {}, 'finish_button')}</CardButton>
                            </CardRow>
                            :
                            user.user.role === 'customer' && thisOrder.order_status === 'completed' ?
                                <CardRow>
                                    <CardButton onClick={arc}>{SetNativeTranslate(Translate.language, {}, 'to_arc')}</CardButton>
                                    {parent !== 'selector' ?
                                        <OrderRatingComponent oneOrder={thisOrder} thisPartnerInfo={thisPartnerInfo} />
                                        : <></>}
                                </CardRow> :
                                user.user.role === 'customer' && thisOrder.order_status === 'arc' ?
                                    <CardRow></CardRow> :
                                    user.user.role === 'customer' && thisOrder.order_status === 'canceled' ?
                                        <CardRow>
                                            {thisOrder.disrupted_by !== '' && parent === 'order' && thisOrder.restored !== 'restored' ?
                                                <CardButton onClick={restore}>{SetNativeTranslate(Translate.language, {}, 'restore')}</CardButton> :
                                                <></>
                                            }
                                            <CardButton onClick={arc}>{SetNativeTranslate(Translate.language, {}, 'to_arc')}</CardButton>
                                        </CardRow> :
                                        thisOrder.order_status === 'new' ?
                                            <CardRow>
                                                {thisOrder.order_type === 'order' ? <CardButton onClick={inWork}>{SetNativeTranslate(Translate.language, {}, 'take')}</CardButton> :
                                                    thisOrder.order_type === 'auction' && parent === 'order' ? <OfferComponent thisOrder={thisOrder} thisOrderOffers={thisOrderOffers} thisOrderNoPartners={thisOrderNoPartners} thisCarrierOffer={thisCarrierOffer} firstPoint={ComponentFunction.OrdersComponentFunction === 'orderItem' ? Point.thisOrderPoints.find(el => el.sequence === 1) : thisOrderPoints.find(el => el.sequence === 1)} /> :
                                                        <></>
                                                }
                                            </CardRow> :
                                            user.user.role === 'carrier' && thisOrder.order_status === 'inWork' ?
                                                <CardRow>
                                                    <CardButton onClick={disrupt}>{SetNativeTranslate(Translate.language, {}, 'not_loading_button')}</CardButton>
                                                    <CardButton onClick={completed}>{SetNativeTranslate(Translate.language, {}, 'finish_button')}</CardButton>
                                                </CardRow> :
                                                user.user.role === 'carrier' && thisOrder.order_status === 'completed' ?
                                                    <CardRow>
                                                        <CardButton onClick={arc}>{SetNativeTranslate(Translate.language, {}, 'to_arc')}</CardButton>
                                                        {parent !== 'selector' ?
                                                            <OrderRatingComponent oneOrder={thisOrder} thisPartnerInfo={thisPartnerInfo} />
                                                            : <></>}
                                                    </CardRow> :
                                                    user.user.role === 'carrier' && thisOrder.order_status === 'canceled' ?
                                                        <CardRow>
                                                            <CardButton onClick={arc}>{SetNativeTranslate(Translate.language, {}, 'to_arc')}</CardButton>
                                                        </CardRow> :
                                                        <></>
            }

            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <AccountCompletionForm setModalActive={setModalActive} parent={'take_order'} />
            </Modal>
            <Modal modalActive={modalActive2} setModalActive={setModalActive2}>
                <TransportSelector thisOrder={thisOrder} setModalActive={setModalActive2} inWork={inWork} transport={transport} setTransport={setTransport} />
            </Modal>
        </>

    )
})

export default OrderStatusButtons