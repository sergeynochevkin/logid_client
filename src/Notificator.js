import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { NotificationContext, OfferContext, OrderContext, PointContext, TranslateContext, UserContext, UserInfoContext } from '.'
import { SetNativeTranslate } from './modules/SetNativeTranslate'
import { v4 } from "uuid";

const Notificator = observer(() => {
    const { Translate } = useContext(TranslateContext)
    const { Point } = useContext(PointContext)
    const { user } = useContext(UserContext)
    const { order } = useContext(OrderContext)
    const { Offer } = useContext(OfferContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Notification } = useContext(NotificationContext)
    

    const new_orders_received = SetNativeTranslate(Translate.language, {}, 'new_orders_received')
    const new_order_received = SetNativeTranslate(Translate.language, {}, 'new_order_received')
    const order_taken = SetNativeTranslate(Translate.language, {}, 'order_taken')
    const orders_taken = SetNativeTranslate(Translate.language, {}, 'orders_taken')
    const offers_accepted = SetNativeTranslate(Translate.language, {}, 'offers_accepted')
    const offer_accepted = SetNativeTranslate(Translate.language, {}, 'offer_accepted')
    const offers_accepted_carrier = SetNativeTranslate(Translate.language, {}, 'offers_accepted_carrier')
    const offer_accepted_carrier = SetNativeTranslate(Translate.language, {}, 'offer_accepted_carrier')
    const postponed_orders = SetNativeTranslate(Translate.language, {}, 'postponed_orders')
    const postponed_order = SetNativeTranslate(Translate.language, {}, 'new_order_received')
    const start_doing = SetNativeTranslate(Translate.language, {}, 'start_doing')
    const restored_orders = SetNativeTranslate(Translate.language, {}, 'restored_orders')
    const restored_order = SetNativeTranslate(Translate.language, {}, 'restored_order')
    const check_restored = SetNativeTranslate(Translate.language, {}, 'check_restored')
    const orders_canceled = SetNativeTranslate(Translate.language, {}, 'orders_canceled')
    const order_canceled = SetNativeTranslate(Translate.language, {}, 'order_canceled')
    const canceled_disrupted_orders = SetNativeTranslate(Translate.language, {}, 'canceled_disrupted_orders')
    const canceled_disrupted_order = SetNativeTranslate(Translate.language, {}, 'canceled_disrupted_order')
    const restore_to_resend = SetNativeTranslate(Translate.language, {}, 'restore_to_resend')
    const affect_carrier_rating = SetNativeTranslate(Translate.language, {}, 'affect_carrier_rating')
    const affect_your_rating = SetNativeTranslate(Translate.language, {}, 'affect_your_rating')
    const affect_customer_rating = SetNativeTranslate(Translate.language, {}, 'affect_customer_rating')
    const non_arrival = SetNativeTranslate(Translate.language, {}, 'non_arrival')
    const not_loading = SetNativeTranslate(Translate.language, {}, 'not_loading')
    const customer_completed_orders = SetNativeTranslate(Translate.language, {}, 'customer_completed_orders')
    const customer_completed_order = SetNativeTranslate(Translate.language, {}, 'customer_completed_order')
    const completed_orders = SetNativeTranslate(Translate.language, {}, 'completed_orders')
    const completed_order = SetNativeTranslate(Translate.language, {}, 'completed_order')
    const orders_notifications = SetNativeTranslate(Translate.language, {}, 'orders_notifications')
    const order_notifications = SetNativeTranslate(Translate.language, {}, 'order_notifications')
    const auctions_notifications = SetNativeTranslate(Translate.language, {}, 'auctions_notifications')
    const auction_notifications = SetNativeTranslate(Translate.language, {}, 'auction_notifications')
    const converted_many = SetNativeTranslate(Translate.language, {}, 'converted_many')
    const converted_one = SetNativeTranslate(Translate.language, {}, 'converted_one')
    const to_auction = SetNativeTranslate(Translate.language, {}, 'to_auction')
    const to_order = SetNativeTranslate(Translate.language, {}, 'to_order')
    const can_take_it = SetNativeTranslate(Translate.language, {}, 'can_take_it')
    const new_offers = SetNativeTranslate(Translate.language, {}, 'new_offers')
    const new_offer = SetNativeTranslate(Translate.language, {}, 'new_offer')
    const changed_offers = SetNativeTranslate(Translate.language, {}, 'changed_offers')
    const changed_offer = SetNativeTranslate(Translate.language, {}, 'changed_offer')
    const removed_offers = SetNativeTranslate(Translate.language, {}, 'removed_offers')
    const removed_offer = SetNativeTranslate(Translate.language, {}, 'removed_offer')
    const postponed_points = SetNativeTranslate(Translate.language, {}, 'postponed_points')
    const postponed_point = SetNativeTranslate(Translate.language, {}, 'postponed_point')
    const canceled_point = SetNativeTranslate(Translate.language, {}, 'canceled_point')
    const canceled_points = SetNativeTranslate(Translate.language, {}, 'canceled_points')
    const restored_points = SetNativeTranslate(Translate.language, {}, 'restored_points')
    const restored_point = SetNativeTranslate(Translate.language, {}, 'restored_point')
    const on_orders = SetNativeTranslate(Translate.language, {}, 'on_orders')
    const on_order = SetNativeTranslate(Translate.language, {}, 'on_order')
    const completed_points = SetNativeTranslate(Translate.language, {}, 'completed_points')
    const completed_point = SetNativeTranslate(Translate.language, {}, 'completed_point')
    const in_work_points = SetNativeTranslate(Translate.language, {}, 'in_work_points')
    const in_work_point = SetNativeTranslate(Translate.language, {}, 'in_work_point')


    //orders start
    useEffect(() => {
        if (order.added && Object.keys(order.added).length > 0) {
            if (order.added.new.length > 0) {
                if (user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.new.length > 1 ? new_orders_received : new_order_received} ${order.added.new.map(el => el.id).toString()}` }])
                }
                // if (user.user.role === 'customer') {
                //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.new.length > 1 ? 'Отправлены заказы:' : 'Отправлен заказ'} ${order.added.new.map(el => el.id).toString()}` }])
                // }
            }
            if (order.added.inWork.length > 0) {
                if (user.user.role === 'customer' && order.added.inWork[0].updated_by_role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? orders_taken : order_taken} ${order.added.inWork.map(el => el.id).toString()}` }])
                }
                if (user.user.role === 'customer' && order.added.inWork[0].updated_by_role === 'customer') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? offers_accepted : offer_accepted} ${order.added.inWork.map(el => el.id).toString()}` }])
                }
                if (user.user.role === 'carrier' && order.added.inWork[0].updated_by_role === 'customer') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? offers_accepted_carrier : offer_accepted_carrier} ${order.added.inWork.map(el => el.id).toString()}, ${start_doing}` }])
                }
                // if (user.user.role === 'carrier') {
                //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.inWork.length > 1 ? 'Вы взяли в работу заказы:' : 'Вы взяли в работу заказ'} ${order.added.inWork.map(el => el.id).toString()}` }])
                // }
            }
            if (order.added.postponed.filter(el => el.disrupted_by === '').length > 0) {
                // if (user.user.role === 'customer') {
                //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.postponed.length > 1 ? 'Вы отложили заказы:' : 'Вы отложили заказ'} ${order.added.postponed.map(el => el.id).toString()}` }])
                // } 
                if (user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.postponed.length > 1 ? postponed_orders : postponed_order} ${order.added.postponed.map(el => el.id).toString()}` }])
                }
            }
            if (order.added.postponed.filter(el => el.disrupted_by !== '').length > 0) {
                if (user.user.role === 'customer') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.postponed.length > 1 ? restored_orders : restored_order} ${order.added.postponed.map(el => el.id).toString()}, ${check_restored}` }])
                }
            }
            if (order.added.canceled.filter(el => el.disrupted_by === '').length > 0) {
                // if (user.user.role === 'customer') {
                //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.canceled.length > 1 ? 'Вы отменили заказы:' : 'Вы отменили заказ'} ${order.added.canceled.map(el => el.id).toString()}` }])
                // } 
                if (user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'error', message: `${order.added.canceled.length > 1 ? orders_canceled : order_canceled} ${order.added.canceled.map(el => el.id).toString()}` }])
                }
            }
            else if (order.added.canceled.filter(el => el.disrupted_by !== '').length > 0) {
                if (order.added.canceled.filter(el => el.disrupted_by === 'carrier').length > 0 && user.user.role === 'customer') {
                    Notification.addNotification([{ id: v4(), type: 'error', message: `${order.added.canceled.length > 1 ? canceled_disrupted_orders : canceled_disrupted_order} ${order.added.canceled.map(el => el.id).toString()}, ${restore_to_resend}. ${affect_carrier_rating}` }])
                } if (order.added.canceled.filter(el => el.disrupted_by === 'carrier' && el.carrierId === UserInfo.userInfo.id).length > 0 && user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'error', message: `${non_arrival} ${order.added.canceled.length > 1 ? orders_canceled.toLowerCase() : order_canceled.toLowerCase()} ${order.added.canceled.map(el => el.id).toString()} ${affect_your_rating}` }])
                }
                if (order.added.canceled.filter(el => el.disrupted_by === 'customer').length > 0 && user.user.role === 'customer') {
                    Notification.addNotification([{ id: v4(), type: 'error', message: `${not_loading} ${order.added.canceled.length > 1 ? orders_canceled.toLowerCase() : order_canceled.toLowerCase()} ${order.added.canceled.map(el => el.id).toString()} ${affect_your_rating}` }])
                }
                if (order.added.canceled.filter(el => el.disrupted_by === 'customer').length > 0 && user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'error', message: `${not_loading} ${order.added.canceled.length > 1 ? orders_canceled.toLowerCase() : order_canceled.toLowerCase()} ${order.added.canceled.map(el => el.id).toString()} ${affect_customer_rating.toLowerCase()}` }])
                }
            }
            if (order.added.completed.filter(el => el.updated_by_role === 'customer').length > 0) {
                // if (user.user.role === 'carrier') {
                //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? 'Вы завершили заказы:' : 'Вы завершили заказ'} ${order.added.completed.map(el => el.id).toString()}` }])
                // }
                if (user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? customer_completed_orders : customer_completed_order} ${order.added.completed.map(el => el.id).toString()}` }])
                }
            }

            if (order.added.completed.filter(el => el.updated_by_role === 'carrier').length > 0) {
                // if (user.user.role === 'carrier') {
                //   Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? 'Вы завершили заказы:' : 'Вы завершили заказ'} ${order.added.completed.map(el => el.id).toString()}` }])
                // }
                if (user.user.role === 'customer') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.completed.length > 1 ? completed_orders : completed_order} ${order.added.completed.map(el => el.id).toString()}` }])
                }
            }
            if (order.added.newType.filter(el => el.order_type === 'auction').length > 0) {
                if (user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.newType.length > 1 ? orders_notifications : order_notifications} ${order.added.newType.map(el => el.id).toString()} ${order.added.newType.length > 1 ? converted_many : converted_one} ${to_auction}` }])
                }
            }
            if (order.added.newType.filter(el => el.order_type === 'order').length > 0) {
                if (user.user.role === 'carrier') {
                    Notification.addNotification([{ id: v4(), type: 'success', message: `${order.added.newType.length > 1 ? auctions_notifications : auction_notifications} ${order.added.newType.map(el => el.id).toString()} ${order.added.newType.length > 1 ? converted_many : converted_one} ${to_order} ${can_take_it}` }])
                }
            }
        }
    }, [order.added])
    useEffect(() => {
        if ( Offer.changes && Object.keys(Offer.changes).length > 0) {
            if (Offer.changes.new.length > 0 && user.user.role !== 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Offer.changes.new.length > 1 ? new_offers : new_offer} ${Offer.changes.new.map(el => el.orderId).toString()}` }])
            }
            if (Offer.changes.updated.length > 0 && user.user.role !== 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Offer.changes.updated.length > 1 ? changed_offers : changed_offer} ${Offer.changes.updated.map(el => el.orderId).toString()}` }])
            }
            if (Offer.changes.deleted.length > 0 && user.user.role !== 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Offer.changes.deleted.length > 1 ? removed_offers : removed_offer} ${Offer.changes.deleted.map(el => el.orderId).toString()}` }])
            }
        }
    }, [Offer.changes])
    useEffect(() => {
        if (Point.added && Object.keys(Point.added).length > 0) {
            if (Point.added.postponed.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.postponed.length > 1 ? postponed_points : postponed_point} ${Point.added.postponed.map(el => el.sequence).toString()} ${Point.added.postponed.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.postponed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.canceled.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.canceled.length > 1 ? canceled_points : canceled_point} ${Point.added.canceled.map(el => el.sequence).toString()} ${Point.added.canceled.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.canceled.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.new.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role === 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.new.filter(el => el.updatedAt !== el.createdAt).length > 1 ? restored_points : restored_point} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.sequence).toString()} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.completed.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.completed.length > 1 ? completed_points : completed_point} ${Point.added.completed.map(el => el.sequence).toString()} ${Point.added.completed.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.completed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.in_work.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.in_work.length > 1 ? in_work_points : in_work_point} ${Point.added.in_work.map(el => el.sequence).toString()} ${Point.added.in_work.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.in_work.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }

            if (Point.added.postponed.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.postponed.length > 1 ? postponed_points : postponed_point} ${Point.added.postponed.map(el => el.sequence).toString()} ${Point.added.postponed.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.postponed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.canceled.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.canceled.length > 1 ? canceled_points : canceled_point} ${Point.added.canceled.map(el => el.sequence).toString()} ${Point.added.canceled.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.canceled.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.new.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.new.filter(el => el.updatedAt !== el.createdAt).length > 1 ? restored_points : restored_point} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.sequence).toString()} ${Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.new.filter(el => el.updatedAt !== el.createdAt).map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.completed.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.completed.length > 1 ? completed_points : completed_point} ${Point.added.completed.map(el => el.sequence).toString()} ${Point.added.completed.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.completed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
            if (Point.added.in_work.filter(el => el.updated_by_role === 'customer').length > 0 && user.user.role !== 'customer') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.in_work.length > 1 ? in_work_points : in_work_point} ${Point.added.in_work.map(el => el.sequence).toString()} ${Point.added.in_work.map(el => el.orderIntegrationId).length > 1 ? on_orders : on_order} ${order.orders.filter(el => Point.added.in_work.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
            }
        }
    }, [Point.added])
    //orders finish

    return (
        <></>
    )
})

export default Notificator