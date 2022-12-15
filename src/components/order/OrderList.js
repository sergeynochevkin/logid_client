import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Orders from './Orders'
import ArcOrders from './ArcOrders'
import { UserContext, OrderContext, ComponentFunctionContext, UserInfoContext, FilterAndSortContext, SettingContext } from '../../index'
import { observer } from 'mobx-react-lite'
import { BookMark } from '../ui/button/BookMark'
import { SetTranslate } from '../../modules/SetTranslate'


const OrderList = observer(({ listStyle, setFetchPartnersStart }) => {
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const [fetchStart, setFetchStart] = useState(false)
  const {Setting} = useContext(SettingContext)

  return (
    <>
      {Object.keys(UserInfo.userInfo).length !== 0 ?

        <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
          <div className='scroll_content_container'>
            <BookMark onClick={() => {
              if (ComponentFunction.Function !== 'new') {
                order.setOrders([])
                order.setGroup([])
              }
              ComponentFunction.setOrdersComponentFunction('orderList')
              FilterAndSort.filters[ComponentFunction.Function].limit = 10
              ComponentFunction.setFunction('new')
            }} style={{
              color: ComponentFunction.Function === 'new' && 'grey',
            }}>{SetTranslate('new_bookmark')}
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
                  color: ComponentFunction.Function === 'postponed' && 'grey',
                }}>{SetTranslate('postponed_bookmark')}
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
              color: ComponentFunction.Function === 'inWork' && 'grey',
            }}>{SetTranslate('inWork_bookmark')}
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
              color: ComponentFunction.Function === 'completed' && 'grey',
            }}>{SetTranslate('completed_bookmark')}
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
              color: ComponentFunction.Function === 'canceled' && 'grey',
            }}>{SetTranslate('canceled_bookmark')}
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
              color: ComponentFunction.Function === 'arc' && 'grey',
            }}>{SetTranslate('arc_bookmark')}
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
                color: ComponentFunction.Function === 'pattern' && 'grey',
              }}>{SetTranslate('templates_bookmark')}
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