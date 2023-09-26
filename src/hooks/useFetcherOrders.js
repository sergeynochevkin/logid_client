import { useContext, useEffect } from "react"
import { ComponentFunctionContext, FetcherContext, FilterAndSortContext, OfferContext, OrderContext, PartnerContext, PointContext, RatingContext, TransportContext, UserContext, UserInfoContext } from ".."
import { fetchOrders } from "../http/orderApi"
import { fetchPoints } from "../http/pointApi"
import { fetchOrderRatings } from "../http/ratingApi"
import { fetchOffers } from "../http/offerApi"
import { fetchUserInfos } from "../http/userInfoApi"


export const useFetcherOrders = (orderImageHandler, imageHandler) => {
    const { fetcher } = useContext(FetcherContext)
    const { order } = useContext(OrderContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Transport } = useContext(TransportContext)
    const { Point } = useContext(PointContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { user } = useContext(UserContext)
    const { Offer } = useContext(OfferContext)
    const { Partner } = useContext(PartnerContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const {Rating} = useContext(RatingContext)


    async function fetch(order_status) {
        if (Object.keys(UserInfo.userInfo).length !== 0 && order_status !== 'partners' && order_status !== '') {
            await fetchOrders(UserInfo.userInfo.id, UserInfo.userInfo.id, order_status, order_status === 'arc' ? 'arc' : '', FilterAndSort.filters).then(async data => {
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

                // set order images
                if (data.rows.length !== 0) {
                    await orderImageHandler(data.rows)
                }

                order.setDividedOrders(data.rows, order_status)

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

    return []
}
