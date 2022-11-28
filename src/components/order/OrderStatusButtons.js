import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, NotificationContext, OrderContext, PointContext, StateContext, UserContext, UserInfoContext } from '../..'
import { CardButton } from '../ui/button/CardButton'
import { CardRow } from '../ui/card/CardRow'
import { v4 } from "uuid";
import OfferComponent from '../offer/OfferComponent'
import { createOrder, updateOrder } from '../../http/orderApi'
import { sendMail } from '../../http/mailApi'
import { createPartner } from '../../http/partnerApi'
import OrderRatingComponent from '../rating/OrderRatingComponent'
import { createPoint } from '../../http/pointApi'

const OrderStatusButtons = observer(({ parent, setFetchStart, thisOrder, thisOrderOffers, thisPartnerInfo, thisOrderNoPartners, thisCarrierOffer, thisOrderPoints, setFetchPartnersStart }) => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Notification } = useContext(NotificationContext)
    const { order } = useContext(OrderContext)
    const { Point } = useContext(PointContext)
    const { State } = useContext(StateContext)


    const toAuction = async (event) => {
        await updateOrder('', 'auction', thisOrder.id, user.user.role, thisOrder.order_status)
            .then(sendMail(user.user.role, thisOrder.id, 'order_type', 'auction'))
            .then(event.stopPropagation());
        Notification.addNotification([{ id: v4(), type: 'success', message: `Вы преобразовали заказ ${thisOrder.id} в аукцион` }])
        // ComponentFunction.setOrdersComponentFunction('orderList')
        ComponentFunction.setFunction(thisOrder.order_status)
        setFetchStart(true)
    }

    const toOrder = async (event) => {
        await updateOrder('', 'order', thisOrder.id, user.user.role, thisOrder.order_status)
            .then(sendMail(user.user.role, thisOrder.id, 'order_type', 'order'))
            .then(event.stopPropagation());
        Notification.addNotification([{ id: v4(), type: 'success', message: `Вы преобразовали аукцион ${thisOrder.id} в заказ` }])
        // ComponentFunction.setOrdersComponentFunction('orderList')
        ComponentFunction.setFunction(thisOrder.order_status)

        setFetchStart(true)
    }

    const postpone = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'postponed', thisOrder.order_status)
                .then(sendMail(user.user.role, thisOrder.id, 'order_status', 'postponed'))
                .then(setFetchStart(true))
                .then(event.stopPropagation());
            order.setGroup(order.group.filter(el => el !== thisOrder.id))
            ComponentFunction.setOrdersComponentFunction('orderList')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы отложили ${thisOrder.order_type === 'order' ? `заказ` : `аукцион`} ${thisOrder.id}` }])
        }

        if (parent === 'selector') {
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'postponed', ComponentFunction.Function)
                    .then(event.stopPropagation());
                order.setGroup(order.group.filter(el => el !== element))
            })
            sendMail(user.user.role, order.group, 'order_status', 'postponed', '')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы отложили заказы ${order.group.toString()}` }])
            setFetchStart(true)
        };
    }

    const cancel = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'canceled', thisOrder.order_status)
                .then(sendMail(user.user.role, thisOrder.id, 'order_status', 'canceled'))
                .then(setFetchStart(true))
                .then(event.stopPropagation());
            order.setGroup(order.group.filter(el => el !== thisOrder.id))
            ComponentFunction.setOrdersComponentFunction('orderList')
            Notification.addNotification([{ id: v4(), type: 'error', message: `Вы отменили ${thisOrder.order_type === 'order' ? `заказ` : `аукцион`} ${thisOrder.id}` }])
        };
        if (parent === 'selector') {
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'canceled', ComponentFunction.Function)
                    .then(event.stopPropagation());
                order.setGroup(order.group.filter(el => el !== element))
            })
            sendMail(user.user.role, order.group, 'order_status', 'canceled', '')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы отменили заказы ${order.group.toString()}` }])
            setFetchStart(true)
        };
    }

    const toNew = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'new', thisOrder.order_status)
                .then(sendMail(user.user.role, thisOrder.id, 'order_status', 'new'))
                .then(setFetchStart(true))
                .then(event.stopPropagation());
            order.setGroup(order.group.filter(el => el !== thisOrder.id))
            ComponentFunction.setOrdersComponentFunction('orderList')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы отправили ${thisOrder.order_type === 'order' ? `заказ` : `аукцион`} ${thisOrder.id}` }])
        }
        if (parent === 'selector') {
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'new', ComponentFunction.Function)
                    .then(event.stopPropagation());
                order.setGroup(order.group.filter(el => el !== element))
            })
            sendMail(user.user.role, order.group, 'order_status', 'new', '')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы отправили заказы ${order.group.toString()}` }])
            setFetchStart(true)
        };

    }

    const inWork = async (event) => {
        event.stopPropagation()
        if (parent === 'order') {
            try {
                await updateOrder('', '', thisOrder.id, user.user.role, 'inWork', thisOrder.order_status, UserInfo.userInfo.id)
                await createPartner(UserInfo.userInfo.id, thisOrder.userInfoId, 'normal')//на сервер
                await createPartner(thisOrder.userInfoId, UserInfo.userInfo.id, 'normal')//на сервер
                await sendMail(user.user.role, thisOrder.id, 'order_status', 'inWork')                
                order.setGroup(order.group.filter(el => el !== thisOrder.id))
                ComponentFunction.setOrdersComponentFunction('orderList')
                setFetchStart(true)
                Notification.addNotification([{ id: v4(), type: 'success', message: `Вы взяли в работу ${thisOrder.order_type === 'order' ? `заказ` : `аукцион`} ${thisOrder.id}` }])
            } catch (e) {
                Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
            }
        }     
    }


    const completed = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'completed', thisOrder.order_status, thisOrder.carrierId, thisOrder.userInfoId)
                .then(sendMail(user.user.role, thisOrder.id, 'order_status', 'completed'))
                .then(setFetchStart(true))
                .then(event.stopPropagation());
            order.setGroup(order.group.filter(el => el !== thisOrder.id))
            ComponentFunction.setOrdersComponentFunction('orderList')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы завершили ${thisOrder.order_type === 'order' ? `заказ` : `аукцион`} ${thisOrder.id}` }])
        }
        if (parent === 'selector') {
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'completed', ComponentFunction.Function)
                    .then(event.stopPropagation());
                order.setGroup(order.group.filter(el => el !== element))
            })
            sendMail(user.user.role, order.group, 'order_status', 'completed', '')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы завершили заказы ${order.group.toString()}` }])
            setFetchStart(true)
        };
    }

    const arc = async (event) => {
        if (parent === 'order') {
            await updateOrder('', '', thisOrder.id, user.user.role, 'arc', thisOrder.order_status)
                .then(sendMail(user.user.role, thisOrder.id, 'order_status', 'arc'),
                    (setFetchStart(true)),
                    order.setGroup(order.group.filter(el => el !== thisOrder.id)),
                    State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id),
                    ComponentFunction.setOrdersComponentFunction('orderList'),
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${thisOrder.order_type === 'order' ? `Заказ` : `Аукцион`} ${thisOrder.id} в архиве` }])
                ).then(event.stopPropagation());
        }
        if (parent === 'selector') {
            order.group.forEach(async element => {
                await updateOrder('', '', element, user.user.role, 'arc', ComponentFunction.Function)
                    .then(event.stopPropagation());
                State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id);
                order.setGroup(order.group.filter(el => el !== element))
            })
            sendMail(user.user.role, order.group, 'order_status', 'arc', '')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Заказы ${order.group.toString()} в архиве` }])
            setFetchStart(true)
        };
    }

    // не делал массовой обработки так как это неподача, недоступно для заказов в работе
    const disrupt = async (event) => {
        State.setUserStateField(State.user_state.favorite_order_state.filter(el => el !== thisOrder.id), 'favorite_order_state', UserInfo.userInfo.id);
        if (parent === 'order') {
            await updateOrder('disrupt', '', thisOrder.id, user.user.role, 'canceled', thisOrder.order_status)
                .then(sendMail(user.user.role, thisOrder.id, 'order_status', 'disrupt'))
                .then(setFetchStart(true))
                .then(event.stopPropagation());
            order.setGroup(order.group.filter(el => el !== thisOrder.id))
            // Notification.addNotification([{ id: v4(), type: 'error', message: `Вы отменили ${thisOrder.order_type === 'order' ? `заказ` : `аукцион`} ${thisOrder.id} в связи ${user.user.role === 'carrier' ? 'c незагрузкой, это повлияет на рейтинг заказчика' : user.user.role === 'customer' ? 'с неподачей, это повлияет на рейтинг перевозчика' : ''}` }])
            ComponentFunction.setOrdersComponentFunction('orderList')
        }
    }

    const restore = async (event) => {
        await updateOrder('restote', '', thisOrder.id)
        if (parent === 'order') {
            order.setPattern(JSON.stringify(thisOrder))
            Point.setPattern(JSON.stringify(thisOrderPoints))
            order.setIntegrationId()
            ComponentFunction.setOrderFormFunction('pattern')
            ComponentFunction.setPageFunction('orderForm')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы открыли форму из ${thisOrder.order_type === 'order' ? 'заказа' : 'аукциона'} ${thisOrder.id}` }])
        }
    }

    const edit = async (event) => {
        await updateOrder('edit', '', thisOrder.id)
        if (parent === 'order') {
            order.setPattern(JSON.stringify(thisOrder))
            Point.setPattern(JSON.stringify(thisOrderPoints))
            order.setIntegrationId()
            localStorage.removeItem('orderFormData')
            ComponentFunction.setOrderFormFunction('edit')
            ComponentFunction.setPageFunction('orderForm')
            Notification.addNotification([{ id: v4(), type: 'success', message: `Вы открыли ${thisOrder.order_type === 'order' ? 'заказ' : 'аукцион'} ${thisOrder.id} для редактирования` }])
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
                        <CardButton onClick={postpone}>Отложить</CardButton>
                        <CardButton onClick={cancel}>Отменить</CardButton>

                        {thisOrder.order_type === 'auction' ? <CardButton onClick={toOrder}> Заказ</CardButton> : thisOrder.order_type === 'order' ? <CardButton onClick={toAuction}>Аукцион</CardButton> : <></>}

                    </CardRow>
                        {parent === 'order' ?
                            <OfferComponent thisOrder={thisOrder} thisOrderOffers={thisOrderOffers} setFetchStart={setFetchStart} thisOrderNoPartners={thisOrderNoPartners} thisCarrierOffer={thisCarrierOffer}
                                firstPoint={ComponentFunction.OrdersComponentFunction === 'orderItem' ? Point.thisOrderPoints.find(el => el.sequence === 1) : thisOrderPoints.find(el => el.sequence === 1)}
                            />
                            : <></>}
                    </>
                    :
                    user.user.role === 'customer' && thisOrder.order_status === 'postponed' ?
                        <>
                            <CardRow>
                                <CardButton onClick={toNew}>Отправить</CardButton>
                                <CardButton onClick={cancel}>Отменить</CardButton>
                                {parent !== 'selector' ?
                                    <CardButton onClick={edit}>Редактировать</CardButton>
                                    : <></>}
                                {/* {thisOrder.order_type === 'auction' ? <CardButton onClick={toOrder}> Заказ</CardButton> : thisOrder.order_type === 'order' ? <CardButton onClick={toAuction}>Аукцион</CardButton> : <></>} */}

                            </CardRow>
                            {parent === 'order' ?
                                <OfferComponent thisOrder={thisOrder} thisOrderOffers={thisOrderOffers} setFetchStart={setFetchStart} thisOrderNoPartners={thisOrderNoPartners} thisCarrierOffer={thisCarrierOffer}
                                    firstPoint={ComponentFunction.OrdersComponentFunction === 'orderItem' ? Point.thisOrderPoints.find(el => el.sequence === 1) : thisOrderPoints.find(el => el.sequence === 1)} /> : <></>}
                        </>
                        :
                        user.user.role === 'customer' && thisOrder.order_status === 'inWork' ?
                            <CardRow>
                                <CardButton onClick={disrupt}>Неподача</CardButton>
                                <CardButton onClick={completed}>Завершить</CardButton>
                            </CardRow>
                            :
                            user.user.role === 'customer' && thisOrder.order_status === 'completed' ?
                                <CardRow>
                                    <CardButton onClick={arc}>В архив</CardButton>
                                    {parent !== 'selector' ?
                                        <OrderRatingComponent oneOrder={thisOrder} setFetchStart={setFetchStart} thisPartnerInfo={thisPartnerInfo} setFetchPartnersStart={setFetchPartnersStart} />
                                        : <></>}
                                </CardRow> :
                                user.user.role === 'customer' && thisOrder.order_status === 'arc' ?
                                    <CardRow></CardRow> :
                                    user.user.role === 'customer' && thisOrder.order_status === 'canceled' ?
                                        <CardRow>
                                            {thisOrder.disrupted_by !== '' && parent === 'order' && thisOrder.restored !== 'restored' ?
                                                <CardButton onClick={restore}>Восстановить</CardButton> :
                                                <></>
                                            }
                                            <CardButton onClick={arc}>В архив</CardButton>
                                        </CardRow> :
                                        thisOrder.order_status === 'new' ?
                                            <CardRow>
                                                {thisOrder.order_type === 'order' ? <CardButton onClick={inWork}>Взять в работу</CardButton> :
                                                    thisOrder.order_type === 'auction' && parent === 'order' ? <OfferComponent thisOrder={thisOrder} thisOrderOffers={thisOrderOffers} setFetchStart={setFetchStart} thisOrderNoPartners={thisOrderNoPartners} thisCarrierOffer={thisCarrierOffer} firstPoint={ComponentFunction.OrdersComponentFunction === 'orderItem' ? Point.thisOrderPoints.find(el => el.sequence === 1) : thisOrderPoints.find(el => el.sequence === 1)} /> :
                                                        <></>
                                                }
                                            </CardRow> :
                                            user.user.role === 'carrier' && thisOrder.order_status === 'inWork' ?
                                                <CardRow>
                                                    <CardButton onClick={disrupt}>Незагрузка</CardButton>
                                                    <CardButton onClick={completed}>Завершить</CardButton>
                                                </CardRow> :
                                                user.user.role === 'carrier' && thisOrder.order_status === 'completed' ?
                                                    <CardRow>
                                                        <CardButton onClick={arc}>В архив</CardButton>
                                                        {parent !== 'selector' ?
                                                            <OrderRatingComponent oneOrder={thisOrder} setFetchStart={setFetchStart} thisPartnerInfo={thisPartnerInfo} setFetchPartnersStart={setFetchPartnersStart} />
                                                            : <></>}
                                                    </CardRow> :
                                                    user.user.role === 'carrier' && thisOrder.order_status === 'canceled' ?
                                                        <CardRow>
                                                            <CardButton onClick={arc}>В архив</CardButton>
                                                        </CardRow> :
                                                        <></>
            }

        </>

    )
})

export default OrderStatusButtons