import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { ComponentFunctionContext, FetcherContext, FilterAndSortContext, LimitContext, NotificationContext, OrderContext, PartnerContext, RatingContext, StateContext, SubscriptionContext, UserContext, UserInfoContext } from '.'
import { fetchUserLimits } from './http/limitApi'
import { fetchNotifications } from './http/notificationApi'
import { fetchGroups, fetchPartners } from './http/partnerApi'
import { fetchOtherRatings } from './http/ratingApi'
import { fetchUserState } from './http/stateApi'
import { fetchSubscription } from './http/subscriptionApi'
import { fetchUserInfos } from './http/userInfoApi'

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

    return (
        <></>)
})

export default Fetcher