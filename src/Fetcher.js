import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, ComponentFunctionContext, DriverContext, FetcherContext, FilterAndSortContext, LimitContext, LinkContext, ManagementContext, NotificationContext, OfferContext, OrderContext, PartnerContext, PointContext, RatingContext, SettingContext, StateContext, SubscriptionContext, TransportContext, UserContext, UserInfoContext } from '.'
import { fetchUserLimits } from './http/limitApi'
import { fetchNotifications, updateNotifications } from './http/notificationApi'
import { fetchGroups, fetchPartners } from './http/partnerApi'
import { fetchOrderRatings, fetchOtherRatings } from './http/ratingApi'
import { fetchUserState } from './http/stateApi'
import { fetchSubscription } from './http/subscriptionApi'
import { fetchUserInfo, fetchUserInfos } from './http/userInfoApi'
import { fetchOffers } from './http/offerApi'
import { fetchPoints } from './http/pointApi'
import { fetchOrderConnections, fetchOrders, setOrderViewed } from './http/orderApi'
import { fetchTransport } from './http/transportApi'
import { fetchDrivers, fetchUser } from './http/userAPI'
import { fetchManagementOrders, fetchManagementRegistrations, fetchManagementTransports, fetchManagementUsers, fetchManagementVisits } from './http/managementApi'
import { fetchAdTransports, fetchMainCounters } from './http/adApi'
import { fetchSettings } from './http/settingApi'
import { fetchFile } from './http/fileApi'
import FetcherLoader from './components/ui/loader/FetcherLoader'

import { ReactInternetSpeedMeter } from 'react-internet-meter'
import { useFetcherTransport } from './hooks/useFetcherTransport'
import { useFetcherDriver } from './hooks/useFetcherDriver'
import { useFetcherOrders } from './hooks/useFetcherOrders'
import { useFetcherUserInfo } from './hooks/useFetcherUserInfo'
// import 'react-internet-speed-meter/dist/index.css'

const Fetcher = observer(() => {
    const { fetcher } = useContext(FetcherContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Notification } = useContext(NotificationContext)
    const { Limit } = useContext(LimitContext)
    const { link } = useContext(LinkContext)
    const { State } = useContext(StateContext)
    const { Subscription } = useContext(SubscriptionContext)
    const { user } = useContext(UserContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Rating } = useContext(RatingContext)
    const { order } = useContext(OrderContext)
    const { Partner } = useContext(PartnerContext)
    const { Driver } = useContext(DriverContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Transport } = useContext(TransportContext)
    const { Management } = useContext(ManagementContext)
    const { Ad } = useContext(AdContext)
    const { Setting } = useContext(SettingContext)



    let fetchImages = async (type, item, file) => {
        let serverFile = await fetchFile(item.id, type, file)
        let objectURL = await URL.createObjectURL(serverFile)
        return (objectURL)
    }

    let transportImageHandler = async (transports) => {
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
                    let data = [...order.order_images.filter(el => el.id !== oneOrder.id), orderImageObject]
                    order.setOrderImages(data)
                }

            }
        }
    }

    let imageHandler = async (objects) => {
        for (const object of objects) {
            if (!UserInfo.images.find(el => el.id === object.id) || JSON.stringify(UserInfo.images.find(el => el.id === object.id).urlsArray) !== JSON.stringify(object.files)) {
                let imageObject = {
                    id: object.id,
                    urlsArray: []
                }
                if (object.files) {
                    let fileNames = JSON.parse(object.files)
                    for (const file of fileNames) {
                        let url = await fetchImages('avatar', object, file)
                        imageObject.urlsArray.push(url)
                    }
                    let data = [...UserInfo.images.filter(el => el.id !== object.id), imageObject]
                    UserInfo.setImages(data)
                }
            }
        }
    }

    let partnerImageHandler = async (objects) => {
        for (const object of objects) {
            if (!Partner.images.find(el => el.id === object.id) || JSON.stringify(Partner.images.find(el => el.id === object.id).urlsArray) !== JSON.stringify(object.files)) {
                let imageObject = {
                    id: object.id,
                    urlsArray: []
                }
                if (object.files) {
                    let fileNames = JSON.parse(object.files)
                    for (const file of fileNames) {
                        let url = await fetchImages('avatar', object, file)
                        imageObject.urlsArray.push(url)
                    }
                    let data = [...Partner.images.filter(el => el.id !== object.id), imageObject]
                    Partner.setImages(data)
                }
            }
        }
    }
    let managementUserImageHandler = async (objects) => {
        console.log(JSON.stringify(objects));
        for (const object of objects) {
            if (!Management.user_images.find(el => el.id === object.id) || JSON.stringify(Management.images.find(el => el.id === object.id).urlsArray) !== JSON.stringify(object.files)) {
                let imageObject = {
                    id: object.id,
                    urlsArray: []
                }
                if (object.files) {
                    let fileNames = JSON.parse(object.files)
                    for (const file of fileNames) {
                        let url = await fetchImages('avatar', object, file)
                        imageObject.urlsArray.push(url)
                    }
                    let data = [...Management.user_images.filter(el => el.id !== object.id), imageObject]
                    Management.setUserImages(data)
                }
            }
        }
    }



    let driverImageHandler = async (objects) => {
        for (const object of objects) {

            if (!Driver.images.find(el => el.id === object.user_info.id) || JSON.stringify(Driver.images.find(el => el.id === object.user_info.id).urlsArray) !== JSON.stringify(object.user_info.files)) {
                let imageObject = {
                    id: object.user_info.id,
                    urlsArray: []
                }

                if (object.user_info.files) {
                    let fileNames = JSON.parse(object.user_info.files)
                    for (const file of fileNames) {
                        let url = await fetchImages('avatar', object, file)
                        imageObject.urlsArray.push(url)
                    }
                    let data = [...Driver.images.filter(el => el.id !== object.id), imageObject]
                    Driver.setImages(data)
                }
            }
        }
    }



    let adImageHandler = async (transports, option) => {

        for (const transport of transports) {
            if (!Ad.transport_images[option].find(el => el.id === transport.id)) {
                // Ad.setTransports([...Ad.transports, transport])

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
                }
                Ad.setTransportImages([...Ad.transport_images[option], transportImageObject], option)
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
                    await fetchUserState(UserInfo.userInfo.id).then(data => {
                        State.setUserState(JSON.parse(data.state))
                        user.user.role === 'driver' && State.setSupervisorState(data.supervisor_state)
                    })
                }
            }
            fetch()
        }
        fetcher.setUserState(false)
    }, [fetcher.user_state])

    //orders done!
    useFetcherOrders(orderImageHandler, transportImageHandler)

    //userInfo done
    useFetcherUserInfo(imageHandler)

    //set_order_viewed
    useEffect(() => {
        async function fetch() {
            await setOrderViewed(order.order.id, UserInfo.userInfo.id)
        }
        fetcher.order_viewed && fetch()
        fetcher.setOrderViewed(false)
    }, [fetcher.order_viewed])

    //partners
    useEffect(() => {
        if (user.user.role === 'customer') {
            async function fetch() {
                // if (ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') {
                if (Object.keys(UserInfo.userInfo).length !== 0) {
                    await fetchPartners(UserInfo.userInfo.id).then(async data => {
                        await fetchGroups(UserInfo.userInfo.id, data.map(el => el.partnerUserInfoId)).then(data => Partner.setGroups(data))
                        await fetchOtherRatings(UserInfo.userInfo.id).then(data => { Rating.setOtherRatings(data) })
                        Partner.setPartner(data.find(el => el.partnerUserInfoId === order.order.carrierId))
                        Partner.setMyBlocked(data.filter(el => el.status === 'blocked').map(el => el.partnerUserInfoId))
                        Partner.setMyFavorite(data.filter(el => el.status === 'favorite').map(el => el.partnerUserInfoId))
                        Partner.setPartners(data);
                        await fetchUserInfos(data.map(el => el.partnerUserInfoId), FilterAndSort.partnerFilters).then(data => {
                            Partner.setPartnerInfos(data)
                            partnerImageHandler(data)
                        })
                    })
                }
                // }
            }
            fetcher.partners && fetch()

        } else if (user.user.role === 'carrier' || user.user.role === 'driver') {
            async function fetch() {
                // if (ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') {
                if (Object.keys(UserInfo.userInfo).length !== 0) {
                    await fetchPartners(UserInfo.userInfo.id).then(async data => {

                        user.user.role === 'carrier' && fetchGroups(UserInfo.userInfo.id, data.map(el => el.partnerUserInfoId)).then(data => Partner.setGroups(data))

                        Partner.setPartner(data.find(el => el.partnerUserInfoId === order.order.userInfoId))
                        await fetchUserInfos(data.map(el => el.partnerUserInfoId), FilterAndSort.partnerFilters).then(data => {
                            Partner.setPartnerInfos(data)
                            partnerImageHandler(data)
                        })
                        if (user.user.role === 'carrier' || user.user.role === 'driver') {
                            user.user.role !== 'driver' && Partner.setMyBlocked(data.filter(el => el.status === 'blocked').map(el => el.partnerUserInfoId))
                            user.user.role !== 'driver' && Partner.setMyFavorite(data.filter(el => el.status === 'priority').map(el => el.partnerUserInfoId))
                            await fetchPartners(UserInfo.userInfo.id).then(async data => {
                                Partner.setPartners(data);
                                user.user.role !== 'driver' && Partner.setIAmBlocked(data.filter(el => el.status === 'blocked').map(el => el.userInfoId))
                                user.user.role !== 'driver' && Partner.setIAmFavorite(data.filter(el => el.status === 'favorite').map(el => el.userInfoId))
                            })
                            user.user.role !== 'driver' && await fetchOtherRatings(UserInfo.userInfo.id).then(data => { Rating.setOtherRatings(data) })
                        }
                    })
                }
                // }
            }
            fetcher.partners && fetch()
        }
        fetcher.setPartners(false)
    }, [fetcher.partners])

    useEffect(() => {
        fetcher.partners && fetcher.setPartners(true)
    }, [/*ComponentFunction.Function,*/ ComponentFunction.PageFunction])

    useEffect(() => {
        if (user.user.role === 'carrier' || user.user.role === 'customer') {
            setInterval(() => {
                fetcher.setPartners(true)
            }, 60000);
        }
    }, [])

    //drivers done!
    useFetcherDriver(driverImageHandler)

    //transport done!
    useFetcherTransport(fetchImages)

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
            await fetchAdTransports(FilterAndSort.boardFilters, Ad.transport_option, user.isAuth ? UserInfo.userInfo.id : '').then(data => {
                adImageHandler(data.rows, Ad.transport_option)
                Ad.setUsers(data.users, Ad.transport_option)
                Ad.setTransports(data.rows, Ad.transport_option)
            })
        }
        fetcher.ad_transports && fetch()
        fetcher.setAdTransports(false)
    }, [fetcher.ad_transports])


    //management:
    //users
    useEffect(() => {
        async function fetch() {
            await fetchManagementUsers(user.user.id).then(data => {
                data && Management.setUsers(data)
                data && managementUserImageHandler(data.map(el => el.user_info))

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
                        let url = await fetchImages('transport', transport, file)
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
    //registratiosns
    useEffect(() => {
        async function fetch() {
            await fetchManagementRegistrations().then(data => {
                data && Management.setRegistrations(data)
            })
        }
        fetcher.management_registrations && fetch()
        fetcher.setManagementRegistrations(false)
    }, [fetcher.management_registrations])


    useEffect(() => {
        if (user.user.role === 'admin') {
            setInterval(() => {
                fetcher.setManagementVisits(true)
                fetcher.setManagementRegistrations(true)
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


    useEffect(() => {
        if (user.user.role === 'driver') {
            setInterval(() => {
                fetcher.setUserAppSetting(true)
            }, 60000)
        }
    }, [])

    return (
        <>
            {fetcher.loading ? <FetcherLoader /> :
                fetcher.custom_loading ? <FetcherLoader /> : <></>}
            <ReactInternetSpeedMeter
                txtSubHeading="Internet is too slow"
                outputType="empty"
                customClassName={null}
                txtMainHeading="Opps..."
                pingInterval={4000} // milliseconds 
                thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
                threshold={1000}
                imageUrl={"https://thumbs.dreamstime.com/b/%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-apple-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F-%D1%8F%D0%B1%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D1%85-165328587.jpg"}
                downloadSize="1781287"  //bytes
                callbackFunctionOnNetworkDown={(speed) => {
                    if (speed === 0) {
                        link.setInternet(false)
                    } else {
                        link.setInternet(true)
                    }
                }}
                callbackFunctionOnNetworkTest={(speed) => link.setInternetSpeed(speed)}
            />
        </>)
})

export default Fetcher