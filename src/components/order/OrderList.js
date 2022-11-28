import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Orders from './Orders'
import ArcOrders from './ArcOrders'
import { UserContext, OrderContext, ComponentFunctionContext, UserInfoContext, FilterAndSortContext } from '../../index'
import { observer } from 'mobx-react-lite'
import { BookMark } from '../ui/button/BookMark'


const Container = styled.div`
display:flex;
flex-wrap:wrap;
gap:5px;
border-radius:5px;
justify-content:center;
`
const NumberOfOrders = styled.div`
position:relative;
font-size:10px;
border-radius:5px;
width:30px;
height:30px;
display:flex;
align-items:center;
justify-content:center;
top:-35px
`
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
        <>
          <Container
          >
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
              <NumberOfOrders
                style={{
                  left: '40px',
                }}
              >{order.totalCount.new}</NumberOfOrders>
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
                  <NumberOfOrders
                    style={{
                      left: '95px',
                    }}
                  >{order.totalCount.postponed}</NumberOfOrders>
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
              <NumberOfOrders
                style={{
                  left: '65px',
                }}
              >{order.totalCount.inWork}</NumberOfOrders>
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
              <NumberOfOrders
                style={{
                  left: '100px',
                }}
              >{order.totalCount.completed}</NumberOfOrders>
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
              <NumberOfOrders
                style={{
                  left: '95px',
                }}
              >{order.totalCount.canceled}</NumberOfOrders>
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
              <NumberOfOrders
                style={{
                  left: '40px',
                }}
              >{order.totalCount.arc}</NumberOfOrders>
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
                <NumberOfOrders
                  style={{
                    left: '70px',
                  }}
                >{order.totalCount.pattern}</NumberOfOrders>
              </BookMark> : <></>}
          </Container>

        </> : <></>}

      {
        ComponentFunction.Function === 'new' || ComponentFunction.Function === 'inWork' ||
          ComponentFunction.Function === 'completed' || ComponentFunction.Function === 'postponed' || ComponentFunction.Function === 'canceled' ? <Orders setFetchPartnersStart={setFetchPartnersStart} fetchStart={fetchStart} setFetchStart={setFetchStart} /> :
          ComponentFunction.Function === 'arc' || ComponentFunction.Function === 'pattern' ? <ArcOrders listStyle={listStyle} fetchStart={fetchStart} setFetchStart={setFetchStart} /> : <></>
      }
    </>
  )
})

export default OrderList