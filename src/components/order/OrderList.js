import React, { useContext, useState } from 'react'
import Orders from './Orders'
import { UserContext, OrderContext, ComponentFunctionContext, UserInfoContext, FilterAndSortContext, SettingContext, TranslateContext } from '../../index'
import { observer } from 'mobx-react-lite'
import { BookMark } from '../ui/button/BookMark'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


const OrderList = observer(() => {
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)

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
            }}>{SetNativeTranslate(Translate.language, {}, 'new_bookmark')}
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
                }}>{SetNativeTranslate(Translate.language, {}, 'postponed_bookmark')}
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
            }}>{SetNativeTranslate(Translate.language, {}, 'inWork_bookmark')}
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
            }}>{SetNativeTranslate(Translate.language, {}, 'completed_bookmark')}
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
            }}>{SetNativeTranslate(Translate.language, {}, 'canceled_bookmark')}
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
            }}>{SetNativeTranslate(Translate.language, {}, 'arc_bookmark')}
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
              }}>{SetNativeTranslate(Translate.language, {}, 'templates_bookmark')}
                <div className='number_of_orders' >{order.totalCount.pattern}</div>
              </BookMark> : <></>}
          </div>
        </div>

        : <></>}

      <Orders />
    </>
  )
})

export default OrderList