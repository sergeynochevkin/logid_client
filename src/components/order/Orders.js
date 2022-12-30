import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FetcherContext, FilterAndSortContext, OfferContext, OrderContext, PartnerContext, PointContext, StateContext, TranslateContext, UserInfoContext } from '../../index'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite'
import OrderItem from './OrderItem'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import FilterAndSortComponentForServer from '../FilterAndSortComponentForServer'
import useDebounce from '../../hooks/useDebounce'
import { CardButton } from '../ui/button/CardButton'
import OrderStatusButtons from './OrderStatusButtons'
import MapComponent from '../map/MapComponent'
import NoData from '../ui/page/NoData'
import { LikeCardButton } from '../ui/text/LikeCardButton'
import { Button } from '../ui/button/Button'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { OrderTh } from '../ui/table/OrderTh'
import ArcOrderItem from './ArcOrderItem'

const Orders = observer(({ orderItemFunction, setOrderItemFunction }) => {
  const { fetcher } = useContext(FetcherContext)
  const { order } = useContext(OrderContext)
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Offer } = useContext(OfferContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Point } = useContext(PointContext)
  const { Partner } = useContext(PartnerContext)
  const { State } = useContext(StateContext)
  const { Translate } = useContext(TranslateContext)
  const [startLimit, setStartLimit] = useState()

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { height, width } = useWindowDimensions();


  useEffect(() => {
    if (ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern') {
      if (height > 768) {
        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 20 }, ComponentFunction.Function)
      } else if (height > 425) {
        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 20 }, ComponentFunction.Function)
      } else {
        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 10 }, ComponentFunction.Function)
      }
    } else {
      if (width > 768) {
        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 30 }, ComponentFunction.Function)
      } else if (width > 425) {
        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 20 }, ComponentFunction.Function)
      } else {
        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 10 }, ComponentFunction.Function)
      }
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
      // Make sure we have a value (user entered something)
      if (debouncedSearchTerm) {
        // Set state isSearching
        setIsSearching(true);
        // Made API request
        fetcher.setOrders(true)
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  )

  useEffect(() => {
    if (ComponentFunction.PageFunction === 'orderList') {
      fetcher.setOrders(true)
    }
  }, [])

  // const scrollHandler = (e) => {
  //   if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)) < 400 && order.orders.length < totalCount) {
  //     FilterAndSort.filters[ComponentFunction.Function].limit = FilterAndSort.filters[ComponentFunction.Function].limit + 10
  //     fetcher.setOrders(true)
  //   }
  // }

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
        {ComponentFunction.OrdersComponentFunction === 'orderList' && ComponentFunction.Function !== 'arc' && ComponentFunction.Function !== 'pattern' && Object.keys(UserInfo.userInfo).length !== 0 ?
          <VerticalContainer
            style={{
              gap: '0px',
              alignItems: 'center'
            }}>
            {order.totalCount[ComponentFunction.Function] > 0 ? <>
              <FilterAndSortComponentForServer parent={'orders'} />
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
                          {`${SetNativeTranslate(Translate.language, {}, 'selected_orders')} ${order.group.length}`}
                        </LikeCardButton>
                        <OrderStatusButtons parent={'selector'} thisOrder={thisOrder} />
                        {user.user.role === 'carrier' && ComponentFunction.Function === 'new' ? <></> :
                          <>
                            {order.group.length < order.orders.length ?
                              <CardButton
                                onClick={() => { order.setGroup(order.orders.map(el => el.id)) }}
                              >{SetNativeTranslate(Translate.language, {}, 'select_all')}</CardButton> :
                              <CardButton
                                onClick={() => { order.setGroup([]) }}
                              >{SetNativeTranslate(Translate.language, {}, 'reset')}</CardButton>
                            }
                          </>}
                      </HorizontalContainer>
                      : <></>
                    }
                  </>}

                {State.user_state.favorite_order_state && State.user_state.favorite_order_state.length !== 0 ?
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
                      {`${SetNativeTranslate(Translate.language, {}, 'total_in_favorites')} ${order.orders.filter(el => State.user_state.favorite_order_state.includes(el.id)).length}`}
                    </LikeCardButton>
                    {FilterAndSort.filters.selected.length === 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters(State.user_state.favorite_order_state, 'selected')
                          fetcher.setOrders(true)
                        }}
                      >{SetNativeTranslate(Translate.language, {}, 'just_favorites')}</CardButton>
                      : <></>}
                    {FilterAndSort.filters.selected.length > 0 ?
                      <CardButton
                        onClick={() => {
                          FilterAndSort.setFilters([], 'selected')
                          fetcher.setOrders(true)
                        }}
                      >{SetNativeTranslate(Translate.language, {}, 'reset_favorites')}</CardButton>
                      : <></>}
                    <CardButton
                      onClick={() => {
                        State.setUserStateField([], 'favorite_order_state', UserInfo.userInfo.id)
                        FilterAndSort.setFilters([], 'selected')
                        fetcher.setOrders(true)
                      }}
                    >{SetNativeTranslate(Translate.language, {}, 'clear_favorites')}</CardButton>
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
                      onePartnerInfo={user.user.role === 'carrier' ? Partner.partnerInfos.find(el => el.id === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === oneOrder.carrierId) : ''}
                      onePartner={user.user.role === 'carrier' ? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.carrierId) : ''}
                    />)}
                </HorizontalContainer>

                <div className='more_orders_buttons_container'>
                  {order.orders.length < order.filtered_count && order.orders.length !== 0 ?
                    <>
                      {(FilterAndSort.filters[ComponentFunction.Function].limit + 10) < order.filtered_count ?
                        <Button
                          onClick={() => {
                            if ((order.filtered_count - order.orders.length) > 10) {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + 10 }, ComponentFunction.Function)
                              fetcher.setOrders(true)
                            } else {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + (order.filtered_count - order.orders.length) }, ComponentFunction.Function)
                              fetcher.setOrders(true)
                            }
                          }}
                        >{`${SetNativeTranslate(Translate.language, {}, 'show_more')} ${(order.filtered_count - order.orders.length) > 10 ? 10 : order.filtered_count - order.orders.length}`}</Button> : <></>}

                      <Button
                        onClick={() => {
                          FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: order.filtered_count }, ComponentFunction.Function)
                          fetcher.setOrders(true)
                        }}
                      >{`${SetNativeTranslate(Translate.language, {}, 'show_all')} ${order.filtered_count}`}</Button>
                    </>
                    : <></>}
                  {FilterAndSort.filters[ComponentFunction.Function].limit > startLimit &&
                    <Button
                      onClick={() => {
                        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: startLimit }, ComponentFunction.Function)
                        fetcher.setOrders(true)
                      }}
                    >{SetNativeTranslate(Translate.language, {}, 'roll_up_list')}</Button>}
                </div>

              </div>

            </>
              : <NoData
              >{SetNativeTranslate(Translate.language, {}, 'no_orders')}</NoData>}
          </VerticalContainer> :

          ComponentFunction.OrdersComponentFunction === 'orderList' && (ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern') ?
            <>
              <VerticalContainer
                style={{
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                {(order.totalCount.arc > 0 && ComponentFunction.Function === 'arc') || (order.totalCount.pattern > 0 && ComponentFunction.Function === 'pattern') ?
                  <>
                    <FilterAndSortComponentForServer parent={'orders'} />
                    <div className={'scroll_bar_container'}>
                      <table className={'order_table'}>
                        {order.orders.length !== 0 ?
                          <tbody>
                            <tr>
                              <OrderTh>{SetNativeTranslate(Translate.language, {}, 'id')}</OrderTh>
                              <OrderTh>{SetNativeTranslate(Translate.language, {}, 'order_type')}</OrderTh>
                              <OrderTh>{SetNativeTranslate(Translate.language, {}, 'start')}</OrderTh>
                              <OrderTh>{SetNativeTranslate(Translate.language, {}, 'time')}</OrderTh>
                              <OrderTh>{SetNativeTranslate(Translate.language, {}, 'finish')}</OrderTh>
                              <OrderTh>{SetNativeTranslate(Translate.language, {}, 'transport')}</OrderTh>
                              <OrderTh>{SetNativeTranslate(Translate.language, {}, 'cost')}</OrderTh>
                              {ComponentFunction.Function === 'arc' ?
                                <OrderTh>{SetNativeTranslate(Translate.language, {}, 'last_order_status')}</OrderTh>
                                : <></>}
                              <th></th>
                              <th></th>
                            </tr>
                          </tbody> :
                          <></>
                        }
                        <tbody>
                          {
                            order.orders.map(oneArcOrder => <ArcOrderItem
                              key={oneArcOrder.id}
                              oneArcOrder={oneArcOrder}
                              thisPoints={Point.points.filter(el => el.orderIntegrationId === oneArcOrder.pointsIntegrationId)}
                            />)
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className='more_orders_buttons_container'>
                      {order.orders.length < order.filtered_count && order.orders.length !== 0 ?
                        <>
                          {(FilterAndSort.filters[ComponentFunction.Function].limit + 10) < order.filtered_count ?
                            <Button
                              onClick={() => {
                                if ((order.filtered_count - order.orders.length) > 10) {
                                  FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + 10 }, ComponentFunction.Function)
                                  fetcher.setOrders(true)
                                } else {
                                  FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + (order.filtered_count - order.orders.length) }, ComponentFunction.Function)
                                  fetcher.setOrders(true)
                                }
                              }}
                            >{`${SetNativeTranslate(Translate.language, {}, 'show_more')} ${(order.filtered_count - order.orders.length) > 10 ? 10 : order.filtered_count - order.orders.length}`}</Button> : <></>}

                          <Button
                            onClick={() => {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: order.filtered_count }, ComponentFunction.Function)
                              fetcher.setOrders(true)
                            }}
                          >{`${SetNativeTranslate(Translate.language, {}, 'show_all')} ${order.filtered_count}`}</Button>
                        </>
                        : <></>}
                      {FilterAndSort.filters[ComponentFunction.Function].limit > startLimit &&
                        <Button
                          onClick={() => {
                            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: startLimit }, ComponentFunction.Function)
                            fetcher.setOrders(true)
                          }}
                        >{SetNativeTranslate(Translate.language, {}, 'roll_up_list')}</Button>}
                    </div>
                  </>
                  :
                  <NoData
                    style={{
                      marginTop: '10vh',
                      fontSize: '20px'
                    }}
                  >{ComponentFunction.Function === 'arc' ? SetNativeTranslate(Translate.language, {}, 'no_orders') : SetNativeTranslate(Translate.language, {}, 'no_templates')}</NoData>
                }
              </VerticalContainer>
            </> :
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

                  onePartnerInfo={user.user.role === 'carrier' ? Partner.partnerInfos.find(el => el.id === order.order.userInfoId) :
                    user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === order.order.carrierId) : ''}
                  onePartner={user.user.role === 'carrier' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.userInfoId) :
                    user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.carrierId) : ''}

                />
              </>
              : <></>}
      </HorizontalContainer>
      <div style={{ width: '100%' }}>
        {(ComponentFunction.Function === 'new' && user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction !== 'orderItem') && <MapComponent />}
      </div>
    </>
  )
})

export default Orders