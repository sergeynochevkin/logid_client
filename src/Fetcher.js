import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { AdContext, ComponentFunctionContext, FetcherContext, FilterAndSortContext, LimitContext, ManagementContext, NotificationContext, OfferContext, OrderContext, PartnerContext, PointContext, RatingContext, SettingContext, StateContext, SubscriptionContext, TransportContext, UserContext, UserInfoContext } from '.'
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
import { fetchOrderConnections, fetchOrders, setOrderViewed } from './http/orderApi'
import { fetchTransport } from './http/transportApi'
import { fetchUser } from './http/userAPI'
import { fetchManagementOrders, fetchManagementTransports, fetchManagementUsers, fetchManagementVisits } from './http/managementApi'
import { fetchAdTransports, fetchMainCounters } from './http/adApi'
import { fetchSettings } from './http/settingApi'
import { fetchFile } from './http/fileApi'
import FetcherLoader from './components/ui/loader/FetcherLoader'

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
    const { Management } = useContext(ManagementContext)
    const { Ad } = useContext(AdContext)
    const { Setting } = useContext(SettingContext)

    let fetchImages = async (type, item, file) => {
        let serverFile = await fetchFile(item.id, type, file)
        let objectURL = await URL.createObjectURL(serverFile)
        return (objectURL)
    }

    let imageHandler = async (transports) => {
        for (const transport of transports) {
            if (!Transport.transports.find(el => el.id === transport.id)) {
                Transport.setTransports([...Transport.transports, transport])

                let transportImageObject = {
                    id: transport.id,
                    urlsArray: []
                }

                let fileNames = JSON.parse(transport.files)

                if (fileNames) {
                    for (const file of fileNames) {
                        let url = await fetchImages('transport', transport, file)
                        transportImageObject.urlsArray.push(url)
                    }
                    Transport.setTransportImages([...Transport.transport_images, transportImageObject])
                }

            }
        }
    }

    let orderImageHandler = async (orders) => {
        for (const oneOrder of orders) {
            if (!order.order_images.find(el => el.id === oneOrder.id) || JSON.stringify(order.order_images.find(el => el.id === oneOrder.id).urlsArray) !== JSON.stringify(oneOrder.files)) {
                let orderImageObject = {
                    id: oneOrder.id,
                    urlsArray: []
                }

                let fileNames = JSON.parse(oneOrder.files)
                if (fileNames) {
                    for (const file of fileNames) {
                        let url = await fetchImages('order', oneOrder, file)
                        orderImageObject.urlsArray.push(url)
                    }
                    order.setOrderImages([...order.order_images.filter(el => el.id !== oneOrder.id), orderImageObject])
                }

            }
        }
    }

    let adImageHandler = async (transports) => {

        for (const transport of transports) {
            if (!Ad.transports.find(el => el.id === transport.id)) {
                Ad.setTransports([...Ad.transports, transport])

                let transportImageObject = {
                    id: transport.id,
                    urlsArray: []
                }

                let fileNames = JSON.parse(transport.files)

                if (fileNames) {
                    for (const file of fileNames) {
                        let url = await fetchImages(transport, file)
                        transportImageObject.urlsArray.push(url)
                    }
                }
                Ad.setTransportImages([...Ad.transport_images, transportImageObject])
            }
        }
    }

    // server notifications
    useEffect(() => {
        if (UserInfo && Object.keys(UserInfo.userInfo).length > 0) {
            async function fetch() {
                await fetchNotifications(UserInfo.userInfo.id).then(async data => {
                    Notification.setServerNotifications(data.filter(el => el.viewed === true))
                    Notification.setNewServerNotifications(data.filter(el => el.viewed === false))
                })
            }
            fetcher.server_notifications && fetch()
        }
        fetcher.setServerNotifications(false)
    }, [fetcher.server_notifications])

    useEffect(() => {
        setInterval(() => {
            fetcher.setServerNotifications(true)
        }, 10000)
    }, [])

    useEffect(() => {
        Notification.new_server_notifications.forEach(async element => {
            Notification.addNotification([{ id: element.uuid, type: element.type, message: element.message }])
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
        if (Object.keys(UserInfo.userInfo).length !== 0 && order_status !== 'partners' && order_status !== '') {
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
                        order.added && order.setAdded(data.added)
                    }

                    order.setDividedOrders(data.rows, order_status)

                    // set order images
                    if (data.rows.length !== 0) {
                        await orderImageHandler(data.rows)
                    }
                    // accumulate transport and find and accumulate images              
                    await imageHandler(data.transport)
                    data.total_count && Transport.setTransportByOrder(data.total_count.transport)

                    order.setMapOrders(data.map_rows)
                    if (data.rows.length !== 0) {
                        await fetchPoints(data.rows.map(el => el.pointsIntegrationId), UserInfo.userInfo.id).then(data => {
                            Point.setDividedPoints(data.rows, order_status);
                            Point.setAdded(data.added)
                            if (ComponentFunction.OrdersComponentFunction === 'orderItem' && data.rows.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId).length > 0) {
                                Point.setThisOrderPoints(data.rows.filter(el => el.orderIntegrationId === order.order.pointsIntegrationId))
                            }
                        })
                    }

                    if (data.views && data.views.length !== 0) {
                        order.setViews(data.views, order_status)
                    }

                    if (ComponentFunction.OrdersComponentFunction === 'orderItem' && data.rows.find(el => el.id === order.order.id)) {
                        order.setOrder(data.rows.find(el => el.id === order.order.id))
                    }
                    if (order_status === 'completed' && data.length !== 0) {
                        await fetchOrderRatings(data.rows.map(el => el.id), UserInfo.userInfo.id).then(data => Rating.setOrderRatings(data))
                    }
                    if ((order_status === 'new' || order_status === 'postponed') && data.length !== 0) {
                        await fetchOrderConnections(data.rows.map(el => el.id), 'groups').then(data => order.setOrdersByGroup(data))
                        await fetchOrderConnections(data.rows.map(el => el.id), 'partners').then(data => order.setOrdersByPartner(data))
                        await fetchOffers(data.rows.filter(el => el.order_type !== 'order').map(el => el.id), UserInfo.userInfo.id).then(async data => {
                            Offer.setOffers(data.rows)

                            // get transport by offers accumulate and accumulate images 
                            await imageHandler(data.transport)

                            Offer.setChanges(data.changes)
                            await fetchUserInfos(Offer.offers.map(el => el.carrierId), FilterAndSort.partnerFilters).then(data => Partner.setNoPartnerInfos(data)
                            )
                        })
                    }
                    // order.setOrders(data.rows) // delete whent check point notifications                 
                })
        }
    }

    useEffect(() => {
        if (fetcher.orders_all) {
            fetcher.orders_all && fetch('new')
            fetcher.orders_all && fetch('postponed')
            fetcher.orders_all && fetch('inWork')
            fetcher.orders_all && fetch('canceled')
            fetcher.orders_all && fetch('completed')
            fetcher.orders_all && fetch('arc')
            fetcher.orders_all && fetch('pattern')
        }
        fetcher.setOrdersAll(false)
    }, [fetcher.orders_all])

    useEffect(() => {
        fetcher.setLoading(true)
        if (ComponentFunction.Function !== 'partners') {
            if (fetcher.new_status !== '') {
                fetcher.divided_order && fetch(ComponentFunction.Function)
                fetcher.divided_order && fetch(fetcher.new_status)
            } else {
                fetch(ComponentFunction.Function)
            }
        }
        fetcher.setDividedOrders(false)
        fetcher.setLoading(false)
        fetcher.setNewStatus('')
    }, [fetcher.divided_orders])

    useEffect(() => {
        fetcher.setLoading(true)
        fetcher.create && fetch(fetcher.status)
        fetcher.setStatus('')
        fetcher.setCreate(false)
        fetcher.setLoading(false)
    }, [fetcher.create])

    useEffect(() => {
        if (ComponentFunction.Function !== 'partners') {
            fetcher.setLoading(true)
            fetch(ComponentFunction.Function)
        }
        fetcher.setOrders(false)
        fetcher.setLoading(false)
    }, [fetcher.orders])

    useEffect(() => {
        if (!fetcher.divided_orders && !fetcher.orders && !fetcher.orders_all && !fetcher.create) {
            fetcher.setLoading(true)
            fetcher.orders_new && fetch('new')
        }
        fetcher.setOrdersNew(false)
        fetcher.setLoading(false)
    }, [fetcher.orders_new])

    useEffect(() => {
        if (!fetcher.divided_orders && !fetcher.orders && !fetcher.orders_all && !fetcher.create) {
            fetcher.setLoading(true)
            fetch('inWork')
        }
        fetcher.setOrdersInWork(false)
        fetcher.setLoading(false)
    }, [fetcher.orders_in_work])

    useEffect(() => {
        if (user && user.user.role !== 'admin') {
            setInterval(() => {
                fetcher.setOrdersNew(true)
            }, 10000);
            setInterval(() => {
                fetcher.setOrdersInWork(true)
            }, 60000);
        }
    }, [])

    //set_order_viewed
    useEffect(() => {
        async function fetch() {
            //activate just if not viewed go to orderItem 114 and activate it, and include viewed fetch and state and show it to carrier and cusomer activate just at new?
            await setOrderViewed(order.order.id, UserInfo.userInfo.id)
        }

        fetcher.order_viewed && fetch()

        fetcher.setOrderViewed(false)
    }, [fetcher.order_viewed])

    //partners
    useEffect(() => {
        if (user.user.role === 'customer') {
            async function fetch() {
                if (ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') {
                    if ((ComponentFunction.PageFunction === 'partners' || ComponentFunction.PageFunction === 'orderList') && Object.keys(UserInfo.userInfo).length !== 0) {
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
                    if ((ComponentFunction.PageFunction === 'partners' || ComponentFunction.PageFunction === 'orderList') && Object.keys(UserInfo.userInfo).length !== 0) {
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

            fetcher.partners && fetch()
        }
        fetcher.setPartners(false)
    }, [fetcher.partners])

    useEffect(() => {
        fetcher.setPartners(true)
    }, [/*ComponentFunction.Function,*/ ComponentFunction.PageFunction])

    //transport
    useEffect(() => {
        async function fetch() {
            await fetchTransport(UserInfo.userInfo.id).then(data =>
                Transport.setTransports(data))

            let transportsImagesArray = []

            for (const transport of Transport.transports) {
                let transportImageObject = {
                    id: transport.id,
                    urlsArray: []
                }
                let fileNames = JSON.parse(transport.files)

                if (fileNames) {

                    for (const file of fileNames) {
                        try {
                            let url = await fetchImages(transport, file)
                            transportImageObject.urlsArray.push(url)
                        } catch (error) {
                            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
                        }
                    }
                    transportsImagesArray.push(transportImageObject)
                }
            }
            Transport.setTransportImages(transportsImagesArray)
        }


        fetcher.transports && fetch()
        fetcher.setTransports(false)
    }, [fetcher.transports])

    //account
    useEffect(() => {
        async function fetch() {
            await fetchUser(user.user.id).then(data => user.setUser(data))
        }
        fetcher.account_user && fetch()
        fetcher.setAccountUser(false)
    }, [fetcher.account_user])
    useEffect(() => {
        async function fetch() {
            await fetchUserInfo(user.user.id).then(data => {
                data && UserInfo.setUserInfo(data)
            })
        }
        fetcher.account_user_info && fetch()
        fetcher.setAccountUserInfo(false)
    }, [fetcher.account_user_info])

    //ad:
    useEffect(() => {
        async function fetch() {
            await fetchMainCounters().then(data => {
                if (data) {
                    Ad.setCustomersCount(data.customers_count)
                    Ad.setCarriersCount(data.carriers_count)
                    Ad.setFinishedOrdersCount(data.finished_orders_count)
                }
            })
        }
        fetcher.main_counters && fetch()
        fetcher.setMainCounters(false)
    }, [fetcher.main_counters])

    useEffect(() => {
        async function fetch() {
            await fetchAdTransports().then(data => {
                Ad.setUsers(data.users)
                adImageHandler(data.rows)
            })
        }
        fetcher.ad_transports && fetch()
        fetcher.setAdTransports(false)
    }, [fetcher.ad_transports])


    useEffect(() => {
        setInterval(() => {
            fetcher.setAdTransports(true)
        }, 600000)
    }, [])

    //management:
    //users
    useEffect(() => {
        async function fetch() {
            await fetchManagementUsers(user.user.id).then(data => {
                data && Management.setUsers(data)
            })
        }
        fetcher.management_users && fetch()
        fetcher.setManagementUsers(false)
    }, [fetcher.management_users])

    //orders
    useEffect(() => {
        async function fetch() {
            await fetchManagementOrders().then(data => {
                data && Management.setOrders(data)
            })
        }
        fetcher.management_orders && fetch()
        fetcher.setManagementOrders(false)
    }, [fetcher.management_orders])
    //transports
    useEffect(() => {
        async function fetch() {
            await fetchManagementTransports().then(data => {
                data && Management.setTransports(data);
            })

            let transportsImagesArray = []
            for (const transport of Management.transports) {
                let transportImageObject = {
                    id: transport.id,
                    urlsArray: []
                }
                let fileNames = JSON.parse(transport.files)

                if (fileNames) {
                    for (const file of fileNames) {
                        let url = await fetchImages(transport, file)
                        transportImageObject.urlsArray.push(url)
                    }
                    transportsImagesArray.push(transportImageObject)
                }
            }
            Management.setTransportImages(transportsImagesArray)
        }
        fetcher.management_transports && fetch()
        fetcher.setManagementTransports(false)
    }, [fetcher.management_transports])
    //orders
    //visits
    useEffect(() => {
        async function fetch() {
            await fetchManagementVisits().then(data => {
                data && Management.setVisits(data)
            })
        }
        fetcher.management_visits && fetch()
        fetcher.setManagementVisits(false)
    }, [fetcher.management_visits])


    useEffect(() => {
        if (user.user.role === 'admin') {
            setInterval(() => {
                fetcher.setManagementVisits(true)
                fetcher.setManagementUsers(true)
                fetcher.setManagementOrders(true)
                fetcher.setManagementTransports(true)
            }, 60000);
        }
    }, [])

    //settings
    useEffect(() => {
        async function fetch() {
            await fetchSettings(UserInfo.userInfo.id).then(data => Setting.setUserSettings(data))
        }
        fetcher.user_app_setting && fetch()
        fetcher.setUserAppSetting(false)
    }, [fetcher.user_app_setting])

    return (
        <>
            {fetcher.loading ? <FetcherLoader /> :
                fetcher.custom_loading ? <FetcherLoader /> : <></>}
        </>)
})

export default Fetcher