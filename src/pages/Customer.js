import React, { useContext, useEffect, useState } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import styled from 'styled-components'
import OrderForm from '../components/order/OrderForm'
import OrderList from '../components/order/OrderList'
import { Area50 } from '../components/ui/area/Area50'
import PageBanner from './banner/PageBanner'
import { BookMark } from '../components/ui/button/BookMark'
import PageContainer from '../components/ui/page/PageContainer'
import UserInfoForm from '../components/account/UserInfoForm'
import { ComponentFunctionContext, OrderContext,  UserInfoContext, NotificationContext, SettingContext, TranslateContext, FetcherContext } from '..'
import { observer } from 'mobx-react-lite'
import Account from '../components/account/Account'
import Partners from '../components/partner/Partners'
import {  updateNotifications } from '../http/notificationApi'
import { v4 } from "uuid";
import SettingsComponent from '../components/setting/SettingsComponent'
import { VerticalContainer } from '../components/ui/page/VerticalContainer'
import { SetNativeTranslate } from '../modules/SetNativeTranslate'



const Container = styled.div`
display:flex;
`
const Customer = observer(() => {
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { Notification } = useContext(NotificationContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const {fetcher} = useContext(FetcherContext)

  useEffect(() => {
    fetcher.setPartners(true)
  }, [])

  useEffect(() => {
    fetcher.setPartners(true)
  }, [ ComponentFunction.Function, ComponentFunction.PageFunction])

  const [libraries] = useState(['places']);
  const { isLoaded } = useJsApiLoader({
    // id: "__googleMapsScriptId",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    region: 'CA',
    language: 'en'
  })

  if (!isLoaded) { return <PageContainer /> }
  else {

    return (
      <PageContainer>
        <title>{SetNativeTranslate(Translate.language, {}, 'customers_office')}</title>


        <PageBanner>{SetNativeTranslate(Translate.language, {}, 'customers_office')}</PageBanner>

        <Container>
          {Object.keys(UserInfo.userInfo).length === 0 ?
            <VerticalContainer
              style={{
                gap: '0px'
              }}
            >
              <BookMark>{SetNativeTranslate(Translate.language, {}, 'fill_account')}</BookMark>
              <UserInfoForm />
            </VerticalContainer>
            :
            <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
              <div className='scroll_content_container'>
                <BookMark onClick={() => {
                  ComponentFunction.setOrdersComponentFunction('orderList')
                  order.setOrders([])
                  ComponentFunction.setFunction('inWork');
                  ComponentFunction.setPageFunction('orderList')
                  ComponentFunction.setOrderFormFunction('newOrder')
                }} style={{
                  color: ComponentFunction.PageFunction === 'orderList' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'orders')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setOrdersComponentFunction('orderList')
                  ComponentFunction.setPageFunction('orderForm')
                  order.setOrders([])
                  if (ComponentFunction.orderFormFunction !== 'edit') {
                    ComponentFunction.setOrderFormFunction('newOrder')
                  }
                  order.setIntegrationId()
                }} style={{
                  color: ComponentFunction.PageFunction === 'orderForm' && 'grey',
                }}>{ComponentFunction.orderFormFunction === 'edit' ? SetNativeTranslate(Translate.language, {}, 'order_editing') : SetNativeTranslate(Translate.language, {}, 'create_order')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setOrdersComponentFunction('orderList')
                  ComponentFunction.setFunction('partners')
                  ComponentFunction.setPageFunction('carriers')
                  ComponentFunction.setOrderFormFunction('newOrder')
                }} style={{
                  color: ComponentFunction.PageFunction === 'carriers' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'carriers')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setOrdersComponentFunction('orderList')
                  ComponentFunction.setPageFunction('account')
                  ComponentFunction.setOrderFormFunction('newOrder')
                }} style={{
                  color: ComponentFunction.PageFunction === 'account' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'account')}</BookMark>
                {/* 
                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('settings'); ComponentFunction.setOrdersComponentFunction('orderList')
                  ComponentFunction.setOrderFormFunction('newOrder')
                }} style={{
                  color: ComponentFunction.PageFunction === 'settings' && 'lightgrey',
                }}>{SetNativeTranslate(Translate.language,{},'settings')}</BookMark> */}
              </div>
            </div>
          }

        </Container>
        {
          ComponentFunction.PageFunction === 'orderList' ? <OrderList  /> :
            ComponentFunction.PageFunction === 'account' ? <Account  /> :
              ComponentFunction.PageFunction === 'orderForm' ? <OrderForm /> :
                ComponentFunction.PageFunction === 'carriers' ? <Partners  /> :
                  ComponentFunction.PageFunction === 'settings' ? <SettingsComponent /> :
                    <OrderList />
        }
        <Area50></Area50>
      </PageContainer>
    )
  }
})


export default Customer