import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Orders from './Orders'
import ArcOrders from './ArcOrders'
import { UserContext, OrderContext, ComponentFunctionContext, UserInfoContext, FilterAndSortContext } from '../../index'
import { observer } from 'mobx-react-lite'
import { BookMark } from '../ui/button/BookMark'


const OrderList = observer(({ listStyle, setFetchPartnersStart }) => {
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const [fetchStart, setFetchStart] = useState(false)

  return (
    <>
      {Object.keys(UserInfo.userInfo).length !== 0 ?

        <div className='scroll_content_container'>
          <div className='bookmark_bar_container'>
            <BookMark onClick={() => {
              if (ComponentFunction.Function !== 'new') {
                order.setOrders([])
                order.setGroup([])
              }
              ComponentFunction.setOrdersComponentFunction('orderList')
              FilterAndSort.filters[ComponentFunction.Function].limit = 10
              ComponentFunction.setFunction('new')
            }} style={{
              color: ComponentFunction.Function === 'new' ? 'lightgrey' : 'black',
            }}>Новые
              <div className='number_of_orders'>{order.totalCount.new}</div>
            </BookMark>
            {
              user.user.role === 'customer' ?
                <BookMark onClick={() => {
                  if (ComponentFunction.Function !== 'postponed') {
                    order.setOrders([])
                    order.setGroup([])
                    ComponentFunction.setFunction('postponed')
                  }
                  FilterAndSort.filters[ComponentFunction.Function].limit = 10
                  ComponentFunction.setOrdersComponentFunction('orderList')
                }} style={{
                  color: ComponentFunction.Function === 'postponed' ? 'lightgrey' : 'black',
                }}>Отложенные
                  <div className='number_of_orders'>{order.totalCount.postponed}</div>
                </BookMark>
                : <></>
            }
            <BookMark onClick={() => {
              if (ComponentFunction.Function !== 'inWork') {
                order.setOrders([])
                order.setGroup([])
                ComponentFunction.setFunction('inWork')
              }
              FilterAndSort.filters[ComponentFunction.Function].limit = 10
              ComponentFunction.setOrdersComponentFunction('orderList')
            }} style={{
              color: ComponentFunction.Function === 'inWork' ? 'lightgrey' : 'black',
            }}>В работе
              <div className='number_of_orders' >{order.totalCount.inWork}</div>
            </BookMark>
            <BookMark onClick={() => {
              if (ComponentFunction.Function !== 'completed') {
                order.setOrders([])
                order.setGroup([])
                ComponentFunction.setFunction('completed')
              }
              FilterAndSort.filters[ComponentFunction.Function].limit = 10
              ComponentFunction.setOrdersComponentFunction('orderList')
            }} style={{
              color: ComponentFunction.Function === 'completed' ? 'lightgrey' : 'black',
            }}>Выполненные
              <div className='number_of_orders' >{order.totalCount.completed}</div>
            </BookMark>
            <BookMark onClick={() => {
              if (ComponentFunction.Function !== 'canceled') {
                order.setOrders([])
                order.setGroup([])
                ComponentFunction.setFunction('canceled')
              }
              FilterAndSort.filters[ComponentFunction.Function].limit = 10
              ComponentFunction.setOrdersComponentFunction('orderList')
            }} style={{
              color: ComponentFunction.Function === 'canceled' ? 'lightgrey' : 'black',
            }}>Отмененные
              <div className='number_of_orders' >{order.totalCount.canceled}</div>
            </BookMark>
            <BookMark onClick={() => {
              if (ComponentFunction.Function !== 'arc') {
                order.setOrders([])
                order.setGroup([])
                ComponentFunction.setFunction('arc')
              }
              FilterAndSort.filters[ComponentFunction.Function].limit = 30
              ComponentFunction.setOrdersComponentFunction('orderList')
            }} style={{
              color: ComponentFunction.Function === 'arc' ? 'lightgrey' : 'black',
            }}>Архив
              <div className='number_of_orders'  >{order.totalCount.arc}</div>
            </BookMark>

            {user.user.role === 'customer' ?
              <BookMark onClick={() => {
                if (ComponentFunction.Function !== 'pattern') {
                  order.setOrders([])
                  order.setGroup([])
                  ComponentFunction.setFunction('pattern')
                }
                FilterAndSort.filters[ComponentFunction.Function].limit = 30
                ComponentFunction.setOrdersComponentFunction('orderList')
              }} style={{
                color: ComponentFunction.Function === 'pattern' ? 'lightgrey' : 'black',
              }}>Шаблоны
                <div className='number_of_orders' >{order.totalCount.pattern}</div>
              </BookMark> : <></>}
          </div>
        </div>

        : <></>}

      {
        ComponentFunction.Function === 'new' || ComponentFunction.Function === 'inWork' ||
          ComponentFunction.Function === 'completed' || ComponentFunction.Function === 'postponed' || ComponentFunction.Function === 'canceled' ? <Orders setFetchPartnersStart={setFetchPartnersStart} fetchStart={fetchStart} setFetchStart={setFetchStart} /> :
          ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern' ? <ArcOrders listStyle={listStyle} fetchStart={fetchStart} setFetchStart={setFetchStart} /> : <></>
      }
    </>
  )
})

export default OrderList