import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { ComponentFunctionContext, FetcherContext, FilterAndSortContext, LimitContext, NotificationContext, OfferContext, OrderContext, PartnerContext, PointContext, RatingContext, StateContext, SubscriptionContext, TransportContext, UserContext, UserInfoContext } from '.'
import { fetchUserLimits } from './http/limitApi'
import { fetchNotifications, updateNotifications } from './http/notificationApi'
import { fetchGroups, fetchPartners } from './http/partnerApi'
import { fetchOrderRatings, fetchOtherRatings } from './http/ratingApi'
import { fetchUserState } from './http/stateApi'
import { fetchSubscription } from './http/subscriptionApi'
import { fetchUserInfo, fetchUserInfos } from './http/userInfoApi'
import { v4 } from "uuid";
import { fetchOffers } from './http/offerApi'
import { fetchPoints } from './http/pointApi'
import { fetchOrderConnections, fetchOrders } from './http/orderApi'
import { fetchTransport } from './http/transportApi'
import { fetchUser } from './http/userAPI'

const Fetcher = observer(() => {
    const { fetcher } = useContext(FetcherContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Notification } = useContext(NotificationContext)
    const { Limit } = useContext(LimitContext)
    const { State } = useContext(StateContext)
    const { Subscription } = useContext(SubscriptionContext)
    const { user } = useContext(UserContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Rating } = useContext(RatingContext)
    const { order } = useContext(OrderContext)
    const { Partner } = useContext(PartnerContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Point } = useContext(PointContext)
    const { Offer } = useContext(OfferContext)
    const { Transport } = useContext(TransportContext)

    // server notifications
    useEffect(() => {
        if (UserInfo && Object.keys(UserInfo.userInfo).length > 0) {
            async function fetch() {
                await fetchNotifications(UserInfo.userInfo.id).then(async data => {
                    Notification.setServerNotifications(data.filter(el => el.viewed === true))
                    Notification.setNewServerNotifications(data.filter(el => el.viewed === false))
                })
            }
            fetch()
        }
        fetcher.setServerNotifications(false)
    }, [fetcher.server_notifications])

    useEffect(() => {
        fetcher.setServerNotifications(true)
    }, [])
    setInterval(() => {
        fetcher.setServerNotifications(true)
    }, 60000 * 15)

    useEffect(() => {
        Notification.new_server_notifications.forEach(async element => {
            Notification.addNotification([{ id: v4(), type: element.type, message: element.message }])
        });
        let ids = Notification.new_server_notifications.map(el => el.id)
        updateNotifications(ids, true)
    }, [Notification.new_server_notifications])

    // subscriptions
    useEffect(() => {
        if (UserInfo && Object.keys(UserInfo.userInfo).length > 0) {
            async function fetch() {
                if (Object.keys(UserInfo.userInfo).length !== 0) {
                    await fetchUserLimits(UserInfo.userInfo.id).then(data => Limit.setUserLimits(data))
                    await fetchSubscription(UserInfo.userInfo.id).then(data => Subscription.setSubscription(data))
                }
            }
            fetch()
        }
        fetcher.setSubscriptions(false)
    }, [fetcher.subscriptions])

    //userState not used!
    useEffect(() => {
        if (UserInfo && Object.keys(UserInfo.userInfo).length > 0) {
            async function fetch() {
                if (Object.keys(UserInfo.userInfo).length !== 0) {
                    await fetchUserState(UserInfo.userInfo.id).then(data => { State.setUserState(JSON.parse(data.state)) })
                }
            }
            fetch()
        }
        fetcher.setUserState(false)
    }, [fetcher.user_state])

    //orders
    async function fetch(order_status) {
        if (Object.keys(UserInfo.userInfo).length !== 0) {
            await fetchOrders(UserInfo.userInfo.id, user.user.role, UserInfo.userInfo.id, order_status, UserInfo.userInfo.country, UserInfo.userInfo.city, order_status === 'arc' || order_status === 'pattern' ? [] : user.user.role === 'carrier' ? Transport.transports : [],
                order_status === 'arc' || order_status === 'pattern' ? [] : Partner.myBlocked, order_status === 'arc' || order_status === 'pattern' ? [] : Partner.iAmBlocked, order_status === 'arc' || order_status === 'pattern' ? [] : Partner.myFavorite, order_status === 'arc' ? 'arc' : '', FilterAndSort.filters).then(async data => {
                    order.setFilteredCount(data.filtered_count, order_status)
                    if (order.divided_orders && order_status !== 'arc' && order_status) {
                        data.total_count && order.setTotalCount(data.total_count.new, 'new')
                        data.total_count && order.setTotalCount(data.total_count.canceled, 'canceled')
                        data.total_count && order.setTotalCount(data.total_count.completed, 'completed')
                        data.total_count && order.setTotalCount(data.total_count.postponed, 'postponed')
                        data.total_count && order.setTotalCount(data.total_count.inWork, 'inWork')
                        data.total_count && order.setTotalCount(data.total_count.arc, 'arc')
                        data.total_count && order.setTotalCount(data.total_count.pattern, 'pattern')
                        data.edded && order.setAdded(data.added)
                    }
                    if (data.rows.length !== 0) {
                        await fetchPoints(data.rows.map(el => el.pointsIntegrationId), UserInfo.userInfo.id).then(data => {
                            Point.setDividedPoints(data.rows, order_status);
                            Point.setAdded(data.added)
                            if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
                                Point.setThisOrderPoints(data.rows.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
                            }
                        })
                    }
                    if ((order_status !== 'new' || order_status !== 'postponed') && data.length !== 0) {
                        await fetchOrderRatings(data.rows.map(el => el.id), UserInfo.userInfo.id).then(data => Rating.setOrderRatings(data))
                    }
                    if ((order_status === 'new' || order_status === 'postponed') && data.length !== 0) {
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
                    // order.setOrders(data.rows)// delete whent check point notifications
                    order.setMapOrders(data.map_rows)
                    order.setDividedOrders(data.rows, order_status)
                })
        }
    }

    useEffect(() => {
        fetch('new')
        fetch('postponed')
        fetch('inWork')
        fetch('canceled')
        fetch('completed')
        fetch('arc')
        fetch('pattern')
        fetcher.setOrdersAll(false)
    }, [fetcher.orders_all])

    useEffect(() => {
        if (ComponentFunction.Function !== 'partners') {
            if (fetcher.new_status !== '') {
                fetch(ComponentFunction.Function)
                fetch(fetcher.new_status)
            } else {
                fetch(ComponentFunction.Function)
            }
        }
        fetcher.setDividedOrders(false)
        fetcher.setNewStatus('')
    }, [fetcher.divided_orders])

    useEffect(() => {
        if (ComponentFunction.Function !== 'partners') {
            fetch(ComponentFunction.Function)
        }
        fetcher.setOrders(false)
    }, [fetcher.orders])

    useEffect(() => {
        if (!fetcher.divided_orders && !fetcher.orders && !fetcher.orders_all) {
            fetch('new')
        }
        fetcher.setOrdersNew(false)
    }, [fetcher.orders_new])

    useEffect(() => {
        if (!fetcher.divided_orders && !fetcher.orders && !fetcher.orders_all) {
            fetch('inWork')
        }
        fetcher.setOrdersInWork(false)
    }, [fetcher.orders_in_work])

    useEffect(() => {
        setInterval(() => {
            fetcher.setOrdersNew(true)
        }, 10000);
        clearInterval()
        setInterval(() => {
            fetcher.setOrdersInWork(true)
        }, 60000);
        clearInterval()
    }, [])

    //partners
    useEffect(() => {
        if (user.user.role === 'customer') {
            async function fetch() {
                if (ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') {
                    if ((ComponentFunction.PageFunction === 'carriers' || ComponentFunction.PageFunction === 'orderList') && Object.keys(UserInfo.userInfo).length !== 0) {
                        await fetchPartners(UserInfo.userInfo.id).then(async data => {
                            await fetchGroups(UserInfo.userInfo.id, data.map(el => el.partnerUserInfoId)).then(data => Partner.setGroups(data))
                            await fetchOtherRatings(UserInfo.userInfo.id).then(data => { Rating.setOtherRatings(data) })
                            Partner.setPartner(data.find(el => el.partnerUserInfoId === order.order.carrierId))
                            Partner.setMyBlocked(data.filter(el => el.status === 'blocked').map(el => el.partnerUserInfoId))
                            Partner.setMyFavorite(data.filter(el => el.status === 'favorite').map(el => el.partnerUserInfoId))
                            Partner.setPartners(data);
                            await fetchUserInfos(data.map(el => el.partnerUserInfoId), FilterAndSort.partnerFilters).then(data => Partner.setPartnerInfos(data))
                        })
                    }
                }
            }
            fetch()
        } else if (user.user.role === 'carrier') {
            async function fetch() {
                if (ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') {
                    if ((ComponentFunction.PageFunction === 'customers' || ComponentFunction.PageFunction === 'orderList') && Object.keys(UserInfo.userInfo).length !== 0) {
                        await fetchPartners(UserInfo.userInfo.id, undefined).then(async data => {
                            fetchGroups(UserInfo.userInfo.id, data.map(el => el.partnerUserInfoId)).then(data => Partner.setGroups(data))
                            Partner.setPartner(data.find(el => el.partnerUserInfoId === order.order.userInfoId))
                            await fetchUserInfos(data.map(el => el.partnerUserInfoId), FilterAndSort.partnerFilters).then(data => {
                                Partner.setPartnerInfos(data)
                            })
                            Partner.setMyBlocked(data.filter(el => el.status === 'blocked').map(el => el.partnerUserInfoId))
                            Partner.setMyFavorite(data.filter(el => el.status === 'priority').map(el => el.partnerUserInfoId))
                            Partner.setPartners(data);
                            await fetchPartners(undefined, UserInfo.userInfo.id).then(async data => {
                                Partner.setIAmBlocked(data.filter(el => el.status === 'blocked').map(el => el.userInfoId))
                                Partner.setIAmFavorite(data.filter(el => el.status === 'favorite').map(el => el.userInfoId))
                            })
                            await fetchOtherRatings(UserInfo.userInfo.id).then(data => { Rating.setOtherRatings(data) })
                        })
                    }
                }
            }
            fetch()
        }
        fetcher.setPartners(false)
    }, [fetcher.partners])

    useEffect(() => {
        fetcher.setPartners(true)
    }, [/*ComponentFunction.Function,*/ ComponentFunction.PageFunction])

    //transport
    useEffect(() => {
        async function fetch() {
            await fetchTransport(UserInfo.userInfo.id).then(data => Transport.setTransports(data))
        }
        fetcher.setTransports(false)
    }, [fetcher.transports])

    //account
    useEffect(() => {
        async function fetch() {
            await fetchUser(user.user.id).then(data => user.setUser(data))
            await fetchUserInfo(user.user.id).then(data => UserInfo.setUserInfo(data))
        }
        fetcher.setAccount(false)
    }, [fetcher.account])

    return (
        <></>)
})

export default Fetcher