import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, DriverContext, FetcherContext, FilterAndSortContext, OfferContext, OrderContext, PartnerContext, PointContext, SettingContext, StateContext, TranslateContext, UserInfoContext } from '../../index'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite'
import OrderItem from './OrderItem'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import FilterAndSortComponentForServer from '../filterAndSort/FilterAndSortComponentForServer'
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
  const { Driver } = useContext(DriverContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Setting } = useContext(SettingContext)
  const { Offer } = useContext(OfferContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Point } = useContext(PointContext)
  const { Partner } = useContext(PartnerContext)
  const { State } = useContext(StateContext)
  const { Translate } = useContext(TranslateContext)
  const [startLimit, setStartLimit] = useState()
  const [limitDirty, setLimitDirty] = useState(false)

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

  // useEffect(() => {
  //   if (ComponentFunction.PageFunction === 'orderList') {
  //     fetcher.setOrders(true)
  //   }
  // }, [])

  // const scrollHandler = (e) => {
  //   if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)) < 400 && order.divided_orders[ComponentFunction.Function].length < totalCount) {
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
      <div className='orders_container'
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
                            {order.group.length < order.divided_orders[ComponentFunction.Function].length ?
                              <CardButton
                                onClick={() => { order.setGroup(order.divided_orders[ComponentFunction.Function].map(el => el.id)) }}
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
                      {`${SetNativeTranslate(Translate.language, {}, 'total_in_favorites')} ${order.divided_orders[ComponentFunction.Function].filter(el => State.user_state.favorite_order_state.includes(el.id)).length}`}
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
                    order.divided_orders[ComponentFunction.Function].map(oneOrder => <OrderItem
                      key={oneOrder.id}
                      oneOrder={oneOrder}
                      oneOrderOffers={Offer.offers.filter(el => el.orderId === oneOrder.id)}
                      oneOrderPoints={Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === oneOrder.pointsIntegrationId)}
                      oneOrderNoPartners={Partner.noPartnerInfos}
                      user={user}
                      orderItemFunction={orderItemFunction}
                      setOrderItemFunction={setOrderItemFunction}
                      onePartnerInfo={user.user.role === 'carrier' || user.user.role === 'driver' ? Partner.partnerInfos.find(el => el.id === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === oneOrder.carrierId) : ''}
                      onePartner={user.user.role === 'carrier' || user.user.role === 'driver'? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.userInfoId) : user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === oneOrder.carrierId) : ''}
                      driverInfo={Driver.drivers.length>0 && ((user.user.role === 'carrier' && oneOrder.driver_id !== UserInfo.userInfo.id) || user.user.role === 'customer') && oneOrder && oneOrder.order_status !== 'new' && oneOrder.order_status !== 'postponed' && oneOrder.order_status !== 'canceled' && oneOrder.order_status !== 'arc' ? Driver.drivers.find(el => el.user_info.id === oneOrder.driver_id).user_info : ''}
                    />)}
                </HorizontalContainer>

                <div className='more_orders_buttons_container'>
                  {order.divided_orders[ComponentFunction.Function].length < order.filtered_count[ComponentFunction.Function] && order.divided_orders[ComponentFunction.Function].length !== 0 ?
                    <>
                      {(FilterAndSort.filters[ComponentFunction.Function].limit + 10) < order.filtered_count[ComponentFunction.Function] ?
                        <Button
                          onClick={() => {
                            if ((order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length) > 10) {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + 10 }, ComponentFunction.Function)
                              fetcher.setOrders(true)
                            } else {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + (order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length) }, ComponentFunction.Function)
                              fetcher.setOrders(true)
                            }
                          }}
                        >{`${SetNativeTranslate(Translate.language, {}, 'show_more')} ${(order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length) > 10 ? 10 : order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length}`}</Button> : <></>}

                      <Button
                        onClick={() => {
                          FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: order.filtered_count[ComponentFunction.Function] }, ComponentFunction.Function)
                          fetcher.setOrders(true)
                        }}
                      >{`${SetNativeTranslate(Translate.language, {}, 'show_all')} ${order.filtered_count[ComponentFunction.Function]}`}</Button>
                    </>
                    : <></>}
                  {limitDirty && FilterAndSort.filters[ComponentFunction.Function].limit > startLimit ?
                    <Button
                      onClick={() => {
                        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: startLimit }, ComponentFunction.Function)
                        fetcher.setOrders(true)
                        setLimitDirty(false)
                      }}
                    >{SetNativeTranslate(Translate.language, {}, 'roll_up_list')}</Button> : <></>}
                </div>

              </div>

            </>
              : <NoData
              >
                {ComponentFunction.Function === 'new' && user.user.role === 'carrier' ?
                  SetNativeTranslate(Translate.language, {
                    russian: ['Нет заказов, мы уведомим вас о поступлении новых заказов на email'],
                    english: ['No orders, we will notify you of new orders by email'],
                    spanish: ['No hay pedidos, te avisaremos de nuevos pedidos por email'],
                    turkish: ['Sipariş yok, yeni siparişleri size e-postayla bildireceğiz'],
                    сhinese: ['没有订单，有新订单我们会通过电子邮件通知您'],
                    hindi: ['कोई ऑर्डर नहीं है, हम आपको ईमेल द्वारा नए ऑर्डर के बारे में सूचित करेंगे'],
                  }, '') : (user.user.role === 'driver' && Setting.user_settings.length > 0 && Setting.user_settings.find(el => el.name === 'can_see_new_orders').value === false) ?
                    SetNativeTranslate(Translate.language, {
                      russian: ['Показ новых заказов отключен, обратитесь в автопарк'],
                      english: ['Display of new orders is disabled, contact the fleet'],
                      spanish: ['La visualización de nuevos pedidos está deshabilitada, contacta con la flota'],
                      turkish: ['Yeni siparişlerin görüntülenmesi devre dışı bırakıldı, filoyla iletişime geçin'],
                      сhinese: ['新订单显示已禁用，请联系车队'],
                      hindi: ['नए ऑर्डर का प्रदर्शन अक्षम है, बेड़े से संपर्क करें'],
                    }, '')
                    : SetNativeTranslate(Translate.language, {}, 'no_orders')
                }


              </NoData>}


          </VerticalContainer> :

          ComponentFunction.OrdersComponentFunction === 'orderList' && (ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern') ?
            <>
              <VerticalContainer
                style={{
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                {(
                  order.totalCount.arc >= 0 &&
                  ComponentFunction.Function === 'arc') || (order.totalCount.pattern > 0 && ComponentFunction.Function === 'pattern') ?
                  <>
                    <FilterAndSortComponentForServer parent={'orders'} />
                    <div className={'scroll_bar_container'}>
                      <table className={'order_table'}>
                        {order.divided_orders[ComponentFunction.Function].length !== 0 ?
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
                            order.divided_orders[ComponentFunction.Function].map(oneArcOrder => <ArcOrderItem
                              key={oneArcOrder.id}
                              oneArcOrder={oneArcOrder}
                              thisPoints={Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === oneArcOrder.pointsIntegrationId)}
                            />)
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className='more_orders_buttons_container'>
                      {order.divided_orders[ComponentFunction.Function].length < order.filtered_count[ComponentFunction.Function] && order.divided_orders[ComponentFunction.Function].length !== 0 ?
                        <>
                          {(FilterAndSort.filters[ComponentFunction.Function].limit + 10) < order.filtered_count[ComponentFunction.Function] ?
                            <Button
                              onClick={() => {
                                if ((order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length) > 10) {
                                  FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + 10 }, ComponentFunction.Function)
                                  fetcher.setOrders(true)
                                } else {
                                  FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: FilterAndSort.filters[ComponentFunction.Function].limit + (order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length) }, ComponentFunction.Function)
                                  fetcher.setOrders(true)
                                }
                                setLimitDirty(true)
                              }}
                            >{`${SetNativeTranslate(Translate.language, {}, 'show_more')} ${(order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length) > 10 ? 10 : order.filtered_count[ComponentFunction.Function] - order.divided_orders[ComponentFunction.Function].length}`}</Button> : <></>}

                          <Button
                            onClick={() => {
                              FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: order.filtered_count[ComponentFunction.Function] }, ComponentFunction.Function)
                              fetcher.setOrders(true)
                              setLimitDirty(true)
                            }}
                          >{`${SetNativeTranslate(Translate.language, {}, 'show_all')} ${order.filtered_count[ComponentFunction.Function]}`}</Button>
                        </>
                        : <></>}
                      {limitDirty && FilterAndSort.filters[ComponentFunction.Function].limit > startLimit ?
                        <Button
                          onClick={() => {
                            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: startLimit }, ComponentFunction.Function)
                            fetcher.setOrders(true)
                            setLimitDirty(false)
                          }}
                        >{SetNativeTranslate(Translate.language, {}, 'roll_up_list')}</Button> : <></>}
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
                  oneOrderPoints={Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === order.order.pointsIntegrationId)}
                  oneOrderNoPartners={Partner.noPartnerInfos}
                  user={user}
                  orderItemFunction={orderItemFunction}
                  setOrderItemFunction={setOrderItemFunction}
                  driverInfo={((Driver.drivers.length>0 && (user.user.role === 'carrier' && order.order.driver_id !== UserInfo.userInfo.id)) || user.user.role === 'customer') && order.order.order_status !== 'new' && order.order.order_status !== 'postponed' && order.order.order_status !== 'canceled' && order.order.order_status !== 'arc' && Driver.drivers.find(el => el.user_info.id === order.order.driver_id) ? Driver.drivers.find(el => el.user_info.id === order.order.driver_id).userInfo : ''}
                  onePartnerInfo={user.user.role === 'carrier' || user.user.role === 'driver' ? Partner.partnerInfos.find(el => el.id === order.order.userInfoId) :
                    user.user.role === 'customer' ? Partner.partnerInfos.find(el => el.id === order.order.carrierId) : ''}
                  onePartner={user.user.role === 'carrier' || user.user.role === 'driver' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.userInfoId) :
                    user.user.role === 'customer' ? Partner.partners.find(el => el.partnerUserInfoId === order.order.carrierId) : ''}


                />
              </>
              : <></>}
      </div>
      <div style={{ width: '100%' }}>
        {(ComponentFunction.Function === 'new' && (user.user.role === 'carrier' || user.user.role === 'driver') && ComponentFunction.OrdersComponentFunction !== 'orderItem') && <MapComponent />}
      </div>
    </>
  )
})

export default Orders