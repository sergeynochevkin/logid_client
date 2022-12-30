import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { ComponentFunctionContext, FetcherContext, FilterAndSortContext, LimitContext, NotificationContext, OfferContext, OrderContext, PartnerContext, PointContext, RatingContext, StateContext, SubscriptionContext, TransportContext, UserContext, UserInfoContext } from '.'
import { fetchUserLimits } from './http/limitApi'
import { fetchNotifications, updateNotifications } from './http/notificationApi'
import { fetchGroups, fetchPartners } from './http/partnerApi'
import { fetchOrderRatings, fetchOtherRatings } from './http/ratingApi'
import { fetchUserState } from './http/stateApi'
import { fetchSubscription } from './http/subscriptionApi'
import { fetchUserInfos } from './http/userInfoApi'
import { v4 } from "uuid";
import { fetchOffers } from './http/offerApi'
import { fetchPoints } from './http/pointApi'
import { fetchOrderConnections, fetchOrders } from './http/orderApi'
import { fetchTransport } from './http/transportApi'

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
    useEffect(() => {
        async function fetch() {
            if (Object.keys(UserInfo.userInfo).length !== 0) {
                await fetchOrders(UserInfo.userInfo.id, user.user.role, UserInfo.userInfo.id, ComponentFunction.Function, UserInfo.userInfo.country, UserInfo.userInfo.city, ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern' ? [] : user.user.role === 'carrier' ? Transport.transports : [],
                    ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern' ? [] : Partner.myBlocked, ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern' ? [] : Partner.iAmBlocked, ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern' ? [] : Partner.myFavorite, ComponentFunction.Function === 'arc' ? 'arc' : ComponentFunction.Function === 'pattern' ? 'pattern' : '', FilterAndSort.filters).then(async data => {
                        order.setFilteredCount(data.filtered_count)
                        if (ComponentFunction.Function !=='arc' && ComponentFunction.Function !=='pattern') {
                            order.setTotalCount(data.total_count.new, 'new')
                            order.setTotalCount(data.total_count.canceled, 'canceled')
                            order.setTotalCount(data.total_count.completed, 'completed')
                            order.setTotalCount(data.total_count.postponed, 'postponed')
                            order.setTotalCount(data.total_count.inWork, 'inWork')
                            order.setTotalCount(data.total_count.arc, 'arc')
                            order.setTotalCount(data.total_count.pattern, 'pattern')
                            order.setAdded(data.added)
                        }
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
                        order.setOrders(data.rows)
                        order.setMapOrders(data.map_rows)
                    })
            }
        }
        fetch()
        fetcher.setOrders(false)
    }, [fetcher.orders])

    useEffect(() => {
        if (ComponentFunction.Function === 'inWork') {
            const interval = setInterval(() => {
                fetcher.setOrders(true)
            }, 10000);
            return () => clearInterval(interval)
        }
        else if (ComponentFunction.Function === 'new' && user.user.role === 'carrier') {
            const interval = setInterval(() => {
                fetcher.setOrders(true)
            }, 10000);
            return () => clearInterval(interval);
        } else if (ComponentFunction.Function === 'new' && user.user.role === 'customer') {
            const interval = setInterval(() => {
                fetcher.setOrders(true)
            }, 10000);
            return () => clearInterval(interval);
        } else {
            const interval = setInterval(() => {
                fetcher.setOrders(true)
            }, 20000);
            return () => clearInterval(interval);
        }
    }, [ComponentFunction.Function])

    useEffect(() => {
        fetcher.setOrders(true)
    }, [ComponentFunction.Function])

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

    //transport
    useEffect(() => {
        async function fetch() {
            await fetchTransport(UserInfo.userInfo.id).then(data => Transport.setTransports(data))
        }
        fetcher.setTransports(false)
    }, [fetcher.transports])

    return (
        <></>)
})

export default Fetcher