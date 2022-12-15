import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, OrderContext, PointContext, TranslateContext, UserInfoContext } from '../../index'
import { fetchOrders } from '../../http/orderApi'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite'
import OrderItem from './OrderItem'
import { OrderTh } from '../ui/table/OrderTh'
import FlexContainer from '../ui/page/FlexContainer'
import { useFetching } from '../../hooks/useFetching'
import { fetchPoints } from '../../http/pointApi'
import ArcOrderItem from './ArcOrderItem'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import FilterAndSortComponentForServer from '../FilterAndSortComponentForServer'
import useDebounce from '../../hooks/useDebounce'
import './Order.css'
import { SetTranslate } from '../../modules/SetTranslate'
import NoData from '../ui/page/NoData'
import { CardButton } from '../ui/button/CardButton'
import { Button } from '../ui/button/Button'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const ArcOrders = observer(({ setComponentFunction }) => {
  const { order } = useContext(OrderContext)
  const { user } = useContext(UserContext)
  const [listStyle, setListStyle] = useState('list')
  const { UserInfo } = useContext(UserInfoContext)
  const { Point } = useContext(PointContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const [fetchStart, setFetchStart] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [startLimit, setStartLimit] = useState()

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { height, width } = useWindowDimensions();

  console.log(`width:${width}px`);
  console.log(`height:${height}px`);


  const debouncedSearchTerm = useDebounce(FilterAndSort.filters[ComponentFunction.Function], 500);

  useEffect(() => {
    if (height > 768) {
      FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: 30 }, ComponentFunction.Function)
    } else if (height > 425) {
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
  }, [])

  useEffect(() => {
    setStartLimit(FilterAndSort.filters[ComponentFunction.Function].limit)
  }, [ComponentFunction.Function])

  useEffect(
    () => {
      // Make sure we have a value (user entered something)
      if (debouncedSearchTerm) {
        // Set state isSearching
        setIsSearching(true);
        // Made API request
        setFetchStart(true)
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );

  const [fetching, error] = useFetching(async () => {
    await fetchOrders(UserInfo.userInfo.id, user.user.role, user.user.id, ComponentFunction.Function, UserInfo.userInfo.country, UserInfo.userInfo.city, [], [], [], [], ComponentFunction.Function === 'arc' ? 'arc' : ComponentFunction.Function === 'pattern' ? 'pattern' : '', FilterAndSort.filters).then(data => {
      setResults(data)
      setTotalCount(data.filtered_count)
      order.setOrders(data.rows)
      if (data.length !== 0) {
        fetchPoints(data.rows.map(el => el.pointsIntegrationId), UserInfo.userInfo.id).then(data => Point.setPoints(data.rows));
      }
    })
  })

  useEffect(() => {
    setFetchStart(true)
  }, [ComponentFunction.Function])

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

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler)
  //   }
  // }, [])

  return (
    <>
      {listStyle === 'tile'
        ?
        <FlexContainer>
          {
            order.orders.map(oneOrder => <OrderItem
              key={oneOrder.id}
              oneOrder={oneOrder}
              user={user}
              setComponentFunction={setComponentFunction}
            />)
          }

        </FlexContainer>
        :
        <VerticalContainer
          style={{
            gap: '10px',
            alignItems: 'center',
          }}
        >
          {order.totalCount.arc > 0 || order.totalCount.pattern > 0 ?
            <>
              <FilterAndSortComponentForServer parent={'orders'} />
              <div className={'scroll_bar_container'}>
                <table className={'order_table'}>
                  {order.orders.length !== 0 ?
                    <tbody>
                      <tr>
                        <OrderTh>{SetTranslate('id')}</OrderTh>
                        <OrderTh>{SetTranslate('order_type')}</OrderTh>
                        <OrderTh>{SetTranslate('start')}</OrderTh>
                        <OrderTh>{SetTranslate('time')}</OrderTh>
                        <OrderTh>{SetTranslate('finish')}</OrderTh>
                        <OrderTh>{SetTranslate('transport')}</OrderTh>
                        <OrderTh>{SetTranslate('cost')}</OrderTh>
                        {ComponentFunction.Function === 'arc' ?
                          <OrderTh>{SetTranslate('last_order_status')}</OrderTh>
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
                        setFetchStart={setFetchStart}
                        key={oneArcOrder.id}
                        oneArcOrder={oneArcOrder}
                        thisPoints={Point.points.filter(el => el.orderIntegrationId === oneArcOrder.pointsIntegrationId)}
                      />)
                    }
                  </tbody>
                </table>
              </div>
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
                      >{`${SetTranslate('show_more')} ${(totalCount - order.orders.length) > 10 ? 10 : totalCount - order.orders.length}`}</Button> : <></>}

                    <Button
                      onClick={() => {
                        FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: totalCount }, ComponentFunction.Function)
                        setFetchStart(true)
                      }}
                    >{`${SetTranslate('show_all')} ${totalCount}`}</Button>
                  </>
                  : <></>}
                {FilterAndSort.filters[ComponentFunction.Function].limit > startLimit &&
                  <Button
                    onClick={() => {
                      FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], limit: startLimit }, ComponentFunction.Function)
                      setFetchStart(true)
                    }}
                  >{SetTranslate('roll_up_list')}</Button>}
              </div>
            </>
            :
            <NoData
              style={{
                marginTop: '10vh',
                fontSize: '20px'
              }}
            >{SetTranslate('no_orders')}</NoData>
          }

        </VerticalContainer>
      }
    </>
  )
})

export default ArcOrders