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
import NoData from '../ui/page/NoData'
import { LikeCardButton } from '../ui/text/LikeCardButton'
import { Button } from '../ui/button/Button'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

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
  const [startLimit, setStartLimit] = useState()

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { height, width } = useWindowDimensions();

  // console.log(`width:${width}px`);
  // console.log(`height:${height}px`);
  
  useEffect(() => {
    if (width > 768) {
      FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 30 }, ComponentFunction.Function)
    } else if (width > 425) {
      FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 20 }, ComponentFunction.Function)
    } else {
      FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 10 }, ComponentFunction.Function)
    }
  }, [])

  useEffect(() => {
    setStartLimit(FilterAndSort.filters[ComponentFunction.Function].limit)
  }, [])

  useEffect(() => {
    setStartLimit(FilterAndSort.filters[ComponentFunction.Function].limit)
  }, [ComponentFunction.Function])


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
        setTotalCount(data.filtered_count)
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



  // const scrollHandler = (e) => {
  //   if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)) < 400 && order.orders.length < totalCount) {
  //     FilterAndSort.filters[ComponentFunction.Function].limit = FilterAndSort.filters[ComponentFunction.Function].limit + 10
  //     setFetchStart(true)
  //   }
  // }

  const new_orders_received = SetNativeTranslate(Translate.language,{},'new_orders_received')
  const new_order_received = SetNativeTranslate(Translate.language,{},'new_order_received')
  const order_taken = SetNativeTranslate(Translate.language,{},'order_taken')
  const orders_taken = SetNativeTranslate(Translate.language,{},'orders_taken')
  const offers_accepted = SetNativeTranslate(Translate.language,{},'offers_accepted')
  const offer_accepted = SetNativeTranslate(Translate.language,{},'offer_accepted')
  const offers_accepted_carrier = SetNativeTranslate(Translate.language,{},'offers_accepted_carrier')
  const offer_accepted_carrier = SetNativeTranslate(Translate.language,{},'offer_accepted_carrier')
  const postponed_orders = SetNativeTranslate(Translate.language,{},'postponed_orders')
  const postponed_order = SetNativeTranslate(Translate.language,{},'new_order_received')
  const start_doing = SetNativeTranslate(Translate.language,{},'start_doing')
  const restored_orders = SetNativeTranslate(Translate.language,{},'restored_orders')
  const restored_order = SetNativeTranslate(Translate.language,{},'restored_order')
  const check_restored = SetNativeTranslate(Translate.language,{},'check_restored')
  const orders_canceled = SetNativeTranslate(Translate.language,{},'orders_canceled')
  const order_canceled = SetNativeTranslate(Translate.language,{},'order_canceled')
  const canceled_disrupted_orders = SetNativeTranslate(Translate.language,{},'canceled_disrupted_orders')
  const canceled_disrupted_order = SetNativeTranslate(Translate.language,{},'canceled_disrupted_order')
  const restore_to_resend = SetNativeTranslate(Translate.language,{},'restore_to_resend')
  const affect_carrier_rating = SetNativeTranslate(Translate.language,{},'affect_carrier_rating')
  const affect_your_rating = SetNativeTranslate(Translate.language,{},'affect_your_rating')
  const affect_customer_rating = SetNativeTranslate(Translate.language,{},'affect_customer_rating')
  const non_arrival = SetNativeTranslate(Translate.language,{},'non_arrival')
  const not_loading = SetNativeTranslate(Translate.language,{},'not_loading')
  const customer_completed_orders = SetNativeTranslate(Translate.language,{},'customer_completed_orders')
  const customer_completed_order = SetNativeTranslate(Translate.language,{},'customer_completed_order')
  const completed_orders = SetNativeTranslate(Translate.language,{},'completed_orders')
  const completed_order = SetNativeTranslate(Translate.language,{},'completed_order')
  const orders_notifications = SetNativeTranslate(Translate.language,{},'orders_notifications')
  const order_notifications = SetNativeTranslate(Translate.language,{},'order_notifications')
  const auctions_notifications = SetNativeTranslate(Translate.language,{},'auctions_notifications')
  const auction_notifications = SetNativeTranslate(Translate.language,{},'auction_notifications')
  const converted_many = SetNativeTranslate(Translate.language,{},'converted_many')
  const converted_one = SetNativeTranslate(Translate.language,{},'converted_one')
  const to_auction = SetNativeTranslate(Translate.language,{},'to_auction')
  const to_order = SetNativeTranslate(Translate.language,{},'to_order')
  const can_take_it = SetNativeTranslate(Translate.language,{},'can_take_it')
  const new_offers = SetNativeTranslate(Translate.language,{},'new_offers')
  const new_offer = SetNativeTranslate(Translate.language,{},'new_offer')
  const changed_offers = SetNativeTranslate(Translate.language,{},'changed_offers')
  const changed_offer = SetNativeTranslate(Translate.language,{},'changed_offer')
  const removed_offers = SetNativeTranslate(Translate.language,{},'removed_offers')
  const removed_offer = SetNativeTranslate(Translate.language,{},'removed_offer')
  const postponed_points = SetNativeTranslate(Translate.language,{},'postponed_points')
  const postponed_point = SetNativeTranslate(Translate.language,{},'postponed_point')
  const canceled_point = SetNativeTranslate(Translate.language,{},'canceled_point')
  const canceled_points = SetNativeTranslate(Translate.language,{},'canceled_points')
  const restored_points = SetNativeTranslate(Translate.language,{},'restored_points')
  const restored_point = SetNativeTranslate(Translate.language,{},'restored_point')
  const on_orders = SetNativeTranslate(Translate.language,{},'on_orders')
  const on_order = SetNativeTranslate(Translate.language,{},'on_order')
  const completed_points = SetNativeTranslate(Translate.language,{},'completed_points')
  const completed_point = SetNativeTranslate(Translate.language,{},'completed_point')
  const in_work_points = SetNativeTranslate(Translate.language,{},'in_work_points')
  const in_work_point = SetNativeTranslate(Translate.language,{},'in_work_point')

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

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler)
  //   }
  // }, [])

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
                        <LikeCardButton>
                          {`${SetNativeTranslate(Translate.language,{},'selected_orders')} ${order.group.length}`}
                        </LikeCardButton>
                        <OrderStatusButtons parent={'selector'} thisOrder={thisOrder} setFetchStart={setFetchStart} />
                        {user.user.role === 'carrier' && ComponentFunction.Function === 'new' ? <></> :
                          <>
                            {order.group.length < order.orders.length ?
                              <CardButton
                                onClick={() => { order.setGroup(order.orders.map(el => el.id)) }}
                              >{SetNativeTranslate(Translate.language,{},'select_all')}</CardButton> :
                              <CardButton
                                onClick={() => { order.setGroup([]) }}
                              >{SetNativeTranslate(Translate.language,{},'reset')}</CardButton>
                            }
                          </>}
                      </HorizontalContainer>
                      : <></>
                    }
                  </>}

                { State.user_state.favorite_order_state && State.user_state.favorite_order_state.length !== 0 ?
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
                    <LikeCardButton>
                      {`${SetNativeTranslate(Translate.language,{},'total_in_favorites')} ${order.orders.filter(el => State.user_state.favorite_order_state.includes(el.id)).length}`}
                    </LikeCardButton>
                    {FilterAndSort.filters.selected.length === 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters(State.user_state.favorite_order_state, 'selected')
                          setFetchStart(true)
                        }}
                      >{SetNativeTranslate(Translate.language,{},'just_favorites')}</CardButton>
                      : <></>}
                    {FilterAndSort.filters.selected.length > 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters([], 'selected')
                          setFetchStart(true)
                        }}
                      >{SetNativeTranslate(Translate.language,{},'reset_favorites')}</CardButton>
                      : <></>}
                    <CardButton
                      onClick={() => {
                        State.setUserStateField([], 'favorite_order_state', UserInfo.userInfo.id)
                        FilterAndSort.setFilters([], 'selected')
                        setFetchStart(true)
                      }}
                    >{SetNativeTranslate(Translate.language,{},'clear_favorites')}</CardButton>
                  </HorizontalContainer>
                  : <></>}

              </HorizontalContainer>

              <div className='orders_with_more_button'>
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

                <div className='more_orders_buttons_container'>
                  {order.orders.length < totalCount && order.orders.length !== 0 ?
                    <>
                      {(FilterAndSort.filters[ComponentFunction.Function].limit + 10) < totalCount ?
                        <Button
                          onClick={() => {
                            if ((totalCount - order.orders.length) > 10) {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + 10 }, ComponentFunction.Function)
                              setFetchStart(true)
                            } else {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + (totalCount - order.orders.length) }, ComponentFunction.Function)
                              setFetchStart(true)
                            }
                          }}
                        >{`${SetNativeTranslate(Translate.language,{},'show_more')} ${(totalCount - order.orders.length) > 10 ? 10 : totalCount - order.orders.length}`}</Button> : <></>}

                      <Button
                        onClick={() => {
                          FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: totalCount }, ComponentFunction.Function)
                          setFetchStart(true)
                        }}
                      >{`${SetNativeTranslate(Translate.language,{},'show_all')} ${totalCount}`}</Button>
                    </>
                    : <></>}
                  {FilterAndSort.filters[ComponentFunction.Function].limit > startLimit &&
                    <Button
                      onClick={() => {
                        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: startLimit }, ComponentFunction.Function)
                        setFetchStart(true)
                      }}
                    >{SetNativeTranslate(Translate.language,{},'roll_up_list')}</Button>}
                </div>

              </div>

            </>
              : <NoData
              >{SetNativeTranslate(Translate.language,{},'no_orders')}</NoData>}
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