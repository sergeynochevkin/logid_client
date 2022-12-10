import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, NotificationContext, OfferContext, OrderContext, PartnerContext, PointContext, RatingContext, StateContext, TranslateContext, TransportContext, UserInfoContext } from '../../index'
import { fetchOrderConnections, fetchOrders } from '../../http/orderApi'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite'
import OrderItem from './OrderItem'
import { useFetching } from '../../hooks/useFetching'
import { fetchOffers } from '../../http/offerApi'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { fetchPoints } from '../../http/pointApi'
import { fetchOrderRatings } from '../../http/ratingApi'
import { fetchUserInfos } from '../../http/userInfoApi'
import { fetchTransport } from '../../http/transportApi'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import FilterAndSortComponentForServer from '../FilterAndSortComponentForServer'
import useDebounce from '../../hooks/useDebounce'
import { v4 } from "uuid";
import { CardButton } from '../ui/button/CardButton'
import OrderStatusButtons from './OrderStatusButtons'
import { fetchUserState } from '../../http/stateApi'
import MapComponent from '../map/MapComponent'
import { SetTranslate } from '../../modules/SetTranslate'
import NoData from '../ui/page/NoData'

const Orders = observer(({ orderItemFunction, setOrderItemFunction, setFetchPartnersStart, fetchStart, setFetchStart }) => {
  const { order } = useContext(OrderContext)
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { Transport } = useContext(TransportContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Offer } = useContext(OfferContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Point } = useContext(PointContext)
  const { Partner } = useContext(PartnerContext)
  const { Rating } = useContext(RatingContext)
  const [totalCount, setTotalCount] = useState(0)
  const { Notification } = useContext(NotificationContext)
  const { State } = useContext(StateContext)
  const { Translate } = useContext(TranslateContext)


  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);


  const debouncedSearchTerm = useDebounce(FilterAndSort.filters[ComponentFunction.Function], 500);
  useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        // Выставить состояние isSearching
        setIsSearching(true);
        // Сделать запрос к АПИ
        setFetchStart(true)
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  )

  const [fetching, error] = useFetching(async () => {

    if (Object.keys(UserInfo.userInfo).length !== 0) {
      if (user.user.role === 'carrier') {
        await fetchTransport(UserInfo.userInfo.id).then(data => Transport.setTransports(data))
      }
      await fetchOrders(UserInfo.userInfo.id, user.user.role, UserInfo.userInfo.id, ComponentFunction.Function, UserInfo.userInfo.country, UserInfo.userInfo.city, user.user.role === 'carrier' ? Transport.transports : [], Partner.myBlocked, Partner.iAmBlocked, Partner.myFavorite, '', FilterAndSort.filters).then(async data => {
        setTotalCount(data.count)
        order.setTotalCount(data.total_count.new, 'new')
        order.setTotalCount(data.total_count.canceled, 'canceled')
        order.setTotalCount(data.total_count.completed, 'completed')
        order.setTotalCount(data.total_count.postponed, 'postponed')
        order.setTotalCount(data.total_count.inWork, 'inWork')
        order.setTotalCount(data.total_count.arc, 'arc')
        order.setTotalCount(data.total_count.pattern, 'pattern')
        // отключил код, так как он при смене вкладки с заказами чистил state
        // if (State.user_state.favorite_order_state.length > 0) {
        //   State.setUserStateField(State.user_state.favorite_order_state.filter(el => data.totalCount.ids.includes(el)), 'favorite_order_state', UserInfo.userInfo.id)
        // }
        order.setAdded(data.added)
        if (data.rows.length !== 0) {
          await fetchPoints(data.rows.map(el => el.pointsIntegrationId), UserInfo.userInfo.id).then(data => {
            Point.setPoints(data.rows);
            Point.setAdded(data.added)
            if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
              Point.setThisOrderPoints(data.rows.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
            }
          })
        }
        if ((ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') && data.length !== 0) {
          await fetchOrderRatings(data.rows.map(el => el.id), UserInfo.userInfo.id).then(data => Rating.setOrderRatings(data))
        }
        if ((ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed') && data.length !== 0) {

          await fetchOrderConnections(data.rows.map(el => el.id), 'groups').then(data => order.setOrdersByGroup(data))
          await fetchOrderConnections(data.rows.map(el => el.id), 'partners').then(data => order.setOrdersByPartner(data))

          await fetchOffers(data.rows.filter(el => el.order_type !== 'order').map(el => el.id), UserInfo.userInfo.id).then(async data => {
            Offer.setOffers(data.rows)
            Offer.setChanges(data.changes)
            await fetchUserInfos(Offer.offers.map(el => el.carrierId), FilterAndSort.partnerFilters).then(data => Partner.setNoPartnerInfos(data)
            )
          })

        }
        if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
          order.setOrder(data.rows.find(el => el.id === order.order.id))
        }
        //засетить точки           
        order.setOrders(data.rows)
        order.setMapOrders(data.map_rows)
        setFetchStart(false)
      })
    }
  })

  useEffect(() => {
    if (ComponentFunction.Function === 'inWork') {
      const interval = setInterval(() => {
        fetching()
      }, 10000);
      return () => clearInterval(interval)
    }
    else if (ComponentFunction.Function === 'new' && user.user.role === 'carrier') {
      const interval = setInterval(() => {
        fetching()
      }, 10000);
      return () => clearInterval(interval);
    } else if (ComponentFunction.Function === 'new' && user.user.role === 'customer') {
      const interval = setInterval(() => {
        fetching()
      }, 10000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        fetching()
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [fetchStart, ComponentFunction.Function])

  useEffect(() => {
    fetching()
    // setFetchStart(true)
  }, [ComponentFunction.Function])

  useEffect(() => {
    setFetchStart(true)
  }, [])

  useEffect(() => {
    fetching()
    setFetchStart(false)
    setIsSearching(false)
  }, [fetchStart])



  const scrollHandler = (e) => {
    if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)) < 400 && order.orders.length < totalCount) {
      FilterAndSort.filters[ComponentFunction.Function].limit = FilterAndSort.filters[ComponentFunction.Function].limit + 10
      setFetchStart(true)
    }
  }

  const new_orders_received = SetTranslate(Translate.language,'new_orders_received')
  const new_order_received = SetTranslate(Translate.language,'new_order_received')
  const order_taken = SetTranslate(Translate.language,'order_taken')
  const orders_taken = SetTranslate(Translate.language,'orders_taken')
  const offers_accepted = SetTranslate(Translate.language,'offers_accepted')
  const offer_accepted = SetTranslate(Translate.language,'offer_accepted')
  const offers_accepted_carrier = SetTranslate(Translate.language,'offers_accepted_carrier')
  const offer_accepted_carrier = SetTranslate(Translate.language,'offer_accepted_carrier')
  const postponed_orders = SetTranslate(Translate.language,'postponed_orders')
  const postponed_order = SetTranslate(Translate.language,'new_order_received')
  const start_doing = SetTranslate(Translate.language,'start_doing')
  const restored_orders = SetTranslate(Translate.language,'restored_orders')
  const restored_order = SetTranslate(Translate.language,'restored_order')
  const check_restored = SetTranslate(Translate.language,'check_restored')
  const orders_canceled = SetTranslate(Translate.language,'orders_canceled')
  const order_canceled = SetTranslate(Translate.language,'order_canceled')
  const canceled_disrupted_orders = SetTranslate(Translate.language,'canceled_disrupted_orders')
  const canceled_disrupted_order = SetTranslate(Translate.language,'canceled_disrupted_order')
  const restore_to_resend = SetTranslate(Translate.language,'restore_to_resend')
  const affect_carrier_rating = SetTranslate(Translate.language,'affect_carrier_rating')
  const affect_your_rating = SetTranslate(Translate.language,'affect_your_rating')
  const affect_customer_rating = SetTranslate(Translate.language,'affect_customer_rating')
  const non_arrival = SetTranslate(Translate.language,'non_arrival')
  const not_loading = SetTranslate(Translate.language,'not_loading')
  const customer_completed_orders = SetTranslate(Translate.language,'customer_completed_orders')
  const customer_completed_order = SetTranslate(Translate.language,'customer_completed_order')
  const completed_orders = SetTranslate(Translate.language,'completed_orders')
  const completed_order = SetTranslate(Translate.language,'completed_order')
  const orders_notifications = SetTranslate(Translate.language,'orders_notifications')
  const order_notifications = SetTranslate(Translate.language,'order_notifications')
  const auctions_notifications = SetTranslate(Translate.language,'auctions_notifications')
  const auction_notifications = SetTranslate(Translate.language,'auction_notifications')
  const converted_many = SetTranslate(Translate.language,'converted_many')
  const converted_one = SetTranslate(Translate.language,'converted_one')
  const to_auction = SetTranslate(Translate.language,'to_auction')
  const to_order = SetTranslate(Translate.language,'to_order')
  const can_take_it = SetTranslate(Translate.language,'can_take_it')
  const new_offers = SetTranslate(Translate.language,'new_offers')
  const new_offer = SetTranslate(Translate.language,'new_offer')
  const changed_offers = SetTranslate(Translate.language,'changed_offers')
  const changed_offer = SetTranslate(Translate.language,'changed_offer')
  const removed_offers = SetTranslate(Translate.language,'removed_offers')
  const removed_offer = SetTranslate(Translate.language,'removed_offer')
  const postponed_points = SetTranslate(Translate.language,'postponed_points')
  const postponed_point = SetTranslate(Translate.language,'postponed_point')
  const canceled_point = SetTranslate(Translate.language,'canceled_point')
  const canceled_points = SetTranslate(Translate.language,'canceled_points')
  const restored_points = SetTranslate(Translate.language,'restored_points')
  const restored_point = SetTranslate(Translate.language,'restored_point')
  const on_orders = SetTranslate(Translate.language,'on_orders')
  const on_order = SetTranslate(Translate.language,'on_order')
  const completed_points = SetTranslate(Translate.language,'completed_points')
  const completed_point = SetTranslate(Translate.language,'completed_point')
  const in_work_points = SetTranslate(Translate.language,'in_work_points')
  const in_work_point = SetTranslate(Translate.language,'in_work_point')

  useEffect(() => {
    if (Object.keys(order.added).length > 0) {
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
    if (Object.keys(Offer.changes).length > 0) {
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
    if (Object.keys(Point.added).length > 0) {
      if (Point.added.postponed.filter(el => el.updated_by_role === 'carrier').length > 0 && user.user.role !== 'carrier') {
        Notification.addNotification([{ id: v4(), type: 'success', message: `${Point.added.postponed.length > 1 ? postponed_points : postponed_point} ${Point.added.postponed.map(el => el.sequence).toString()} ${Point.added.postponed.map(el => el.orderIntegrationId).length > 1 ? SetTranslate(Translate.language,'on_orders') : SetTranslate(Translate.language,'on_order')} ${order.orders.filter(el => Point.added.postponed.map(el => el.orderIntegrationId).includes(el.pointsIntegrationId)).map(el => el.id).toString()}` }])
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
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  let thisOrder = { order_status: '' }

  return (
    <>
      <HorizontalContainer style={{ width: '100%' }}
      >
        {ComponentFunction.OrdersComponentFunction === 'orderList' && Object.keys(UserInfo.userInfo).length !== 0 ?
          <VerticalContainer
            style={{
              gap: '0px',
              alignItems: 'center'
            }}>
            {order.totalCount[ComponentFunction.Function] > 0 ? <>
              <FilterAndSortComponentForServer parent={'orders'} setFetchStart={setFetchStart} setFetchPartnersStart={setFetchPartnersStart} />
              <HorizontalContainer>

                {order &&
                  <>
                    {/* eslint-disable-next-line no-undef */}
                    {order.group.length !== 0 ?
                      <HorizontalContainer
                        style={{
                          marginTop: '5px',
                          fontSize: '12px',
                          alignItems: 'center',
                          border: 'solid 1px rgb(245, 245, 245, 0.8)',
                          width: '400px',
                          minHeight: '18px',
                          borderRadius: '5px',
                        }}
                      >
                        {`${SetTranslate(Translate.language,'selected_orders')} ${order.group.length}`}
                        <OrderStatusButtons parent={'selector'} thisOrder={thisOrder} setFetchStart={setFetchStart} />
                        {user.user.role === 'carrier' && ComponentFunction.Function === 'new' ? <></> :
                          <>
                            {order.group.length < order.orders.length ?
                              <CardButton
                                onClick={() => { order.setGroup(order.orders.map(el => el.id)) }}
                              >{SetTranslate(Translate.language,'select_all')}</CardButton> :
                              <CardButton
                                onClick={() => { order.setGroup([]) }}
                              >{SetTranslate(Translate.language,'reset')}</CardButton>
                            }
                          </>}
                      </HorizontalContainer>
                      : <></>
                    }
                  </>}

                {State.user_state.favorite_order_state.length !== 0 ?
                  <HorizontalContainer
                    style={{
                      marginTop: '5px',
                      fontSize: '12px',
                      alignItems: 'center',
                      border: 'solid 1px rgb(245, 245, 245, 0.8)',
                      width: '400px',
                      minHeight: '18px',
                      borderRadius: '5px',
                    }}
                  >
                    {`В избранном ${order.orders.filter(el => State.user_state.favorite_order_state.includes(el.id)).length}`}
                    {FilterAndSort.filters.selected.length === 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters(State.user_state.favorite_order_state, 'selected')
                          setFetchStart(true)
                        }}
                      >{SetTranslate(Translate.language,'just_favorites')}</CardButton>
                      : <></>}
                    {FilterAndSort.filters.selected.length > 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters([], 'selected')
                          setFetchStart(true)
                        }}
                      >{SetTranslate(Translate.language,'reset_favorites')}</CardButton>
                      : <></>}
                    <CardButton
                      onClick={() => {
                        State.setUserStateField([], 'favorite_order_state', UserInfo.userInfo.id)
                        FilterAndSort.setFilters([], 'selected')
                        setFetchStart(true)
                      }}
                    >{SetTranslate(Translate.language,'clear_favorites')}</CardButton>
                  </HorizontalContainer>
                  : <></>}

              </HorizontalContainer>
              <HorizontalContainer
                style={{ marginTop: '10px' }}>
                {
                  order.orders.map(oneOrder => <OrderItem
                    key={oneOrder.id}
                    oneOrder={oneOrder}
                    oneOrderOffers={Offer.offers.filter(el => el.orderId === oneOrder.id)}
                    oneOrderPoints={Point.points.filter(el => el.orderIntegrationId === oneOrder.pointsIntegrationId)}
                    oneOrderNoPartners={Partner.noPartnerInfos}
                    user={user}
                    orderItemFunction={orderItemFunction}
                    setOrderItemFunction={setOrderItemFunction}
                    setFetchStart={setFetchStart}
                    onePartnerInfo={user.user.role === 'carrier' ? Partner.partnerInfos.find(el => el.id === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === oneOrder.carrierId) : ''}
                    onePartner={user.user.role === 'carrier' ? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.carrierId) : ''}
                    setFetchPartnersStart={setFetchPartnersStart}
                  />)}
              </HorizontalContainer>
            </>
              : <NoData
              >{SetTranslate(Translate.language,'no_orders')}</NoData>}
          </VerticalContainer> :
          ComponentFunction.OrdersComponentFunction === 'orderItem' ?
            <>
              <OrderItem
                oneOrder={order.order}
                oneOrderOffers={Offer.offers.filter(el => el.orderId === order.order.id)}
                oneOrderPoints={Point.points.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId)}
                oneOrderNoPartners={Partner.noPartnerInfos}
                user={user}
                orderItemFunction={orderItemFunction}
                setOrderItemFunction={setOrderItemFunction}
                setFetchStart={setFetchStart}
                onePartnerInfo={user.user.role === 'carrier' ? Partner.partnerInfos.find(el => el.id === order.order.userInfoId) :
                  user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === order.order.carrierId) : ''}
                onePartner={user.user.role === 'carrier' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.userInfoId) :
                  user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.carrierId) : ''}
                setFetchPartnersStart={setFetchPartnersStart}
              />
            </>
            :
            <></>}
      </HorizontalContainer>
      <div style={{ width: '100%' }}>
        {(ComponentFunction.Function === 'new' && user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction !== 'orderItem') && <MapComponent setFetchStart={setFetchStart} />}
      </div>
    </>
  )
})

export default Orders