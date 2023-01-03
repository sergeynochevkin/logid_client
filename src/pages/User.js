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
import { ComponentFunctionContext, OrderContext, UserInfoContext, SettingContext, TranslateContext, FetcherContext, UserContext, AdressContext } from '..'
import { observer } from 'mobx-react-lite'
import Account from '../components/account/Account'
import Partners from '../components/partner/Partners'
import SettingsComponent from '../components/setting/SettingsComponent'
import { VerticalContainer } from '../components/ui/page/VerticalContainer'
import { SetNativeTranslate } from '../modules/SetNativeTranslate'
import TransportComponent from '../components/transport/TransportComponent'
import MapComponent from '../components/map/MapComponent'
import PageLoader from '../components/ui/loader/PageLoader '

const Container = styled.div`
display:flex;
`
const User = observer(() => {
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { user } = useContext(UserContext)
  const { Adress } = useContext(AdressContext)

  useEffect(() => {
    fetcher.setPartners(true)
    fetcher.setSubscriptions(true)
  }, [])

  const [libraries] = useState(['places']);

  // const { isLoaded } = useJsApiLoader({
  //   // id: "__googleMapsScriptId",
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: libraries,
  //   region: 'CA',
  //   language: 'en'
  // })

  let language = Adress.country.google_language
  let region = Adress.country.google_code

  // console.log(JSON.stringify(Adress.country));
  // console.log(language);
  // console.log(region);

  const { isLoaded } = Adress.country && Translate.language ? useJsApiLoader({
    // id: "__googleMapsScriptId",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    region: region,
    language: language
  }) : false


  if (!isLoaded) { return <PageLoader /> }
  else {
    return (
      <PageContainer>
        <title>{SetNativeTranslate(Translate.language, {}, user.user.role === 'customer' ? 'customers_office' : 'carriers_office')}</title>

        <PageBanner>{SetNativeTranslate(Translate.language, {}, user.user.role === 'customer' ? 'customers_office' : 'carriers_office')}</PageBanner>

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
                }} style={{
                  color: ComponentFunction.PageFunction === 'orderList' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'orders')}</BookMark>

                {user.user.role === 'customer' &&
                  <BookMark onClick={() => {
                    ComponentFunction.setOrderFormFunction('newOrder')
                    ComponentFunction.setPageFunction('orderForm')
                    order.setOrders([])
                    if (ComponentFunction.orderFormFunction !== 'edit') {
                    }
                    order.setIntegrationId()
                  }} style={{
                    color: ComponentFunction.PageFunction === 'orderForm' && 'grey',
                  }}>{ComponentFunction.orderFormFunction === 'edit' ? SetNativeTranslate(Translate.language, {}, 'order_editing') : SetNativeTranslate(Translate.language, {}, 'create_order')}</BookMark>
                }

                {user.user.role === 'carrier' &&
                  <BookMark onClick={() => {
                    ComponentFunction.setPageFunction('transport')
                  }} style={{
                    color: ComponentFunction.PageFunction === 'transport' && 'grey',
                  }}>{SetNativeTranslate(Translate.language, {}, 'transports')}</BookMark>
                }

                <BookMark onClick={() => {
                  // ComponentFunction.setOrdersComponentFunction('orderList')
                  ComponentFunction.setFunction('partners')
                  ComponentFunction.setPageFunction(user.user.role === 'customer' ? 'carriers' : 'customers')
                }} style={{
                  color: ComponentFunction.PageFunction === 'carriers' || ComponentFunction.PageFunction === 'customers' ? 'grey' : '',
                }}>{SetNativeTranslate(Translate.language, {}, 'carriers')}</BookMark>

                <BookMark onClick={() => {
                  // ComponentFunction.setOrdersComponentFunction('orderList')
                  ComponentFunction.setPageFunction('account')
                }} style={{
                  color: ComponentFunction.PageFunction === 'account' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'account')}</BookMark>
                {/* 
                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('settings');                
                }} style={{
                  color: ComponentFunction.PageFunction === 'settings' && 'lightgrey',
                }}>{SetNativeTranslate(Translate.language,{},'settings')}</BookMark> */}
              </div>
            </div>
          }

        </Container>
        {
          ComponentFunction.PageFunction === 'orderList' ? <OrderList /> :
            ComponentFunction.PageFunction === 'account' ? <Account /> :
              user.user.role === 'customer' && ComponentFunction.PageFunction === 'orderForm' ?
                <OrderForm /> :
                user.user.role === 'carrier' && ComponentFunction.PageFunction === 'transport' ? <TransportComponent /> :
                  ComponentFunction.PageFunction === 'carriers' ? <Partners /> :
                    ComponentFunction.PageFunction === 'settings' ? <SettingsComponent /> :
                      <OrderList />
        }

        {/* {(ComponentFunction.PageFunction === 'orderList' && ComponentFunction.Function === 'new' && user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction !== 'orderItem') && <MapComponent />} */}
        {/* {ComponentFunction.OrdersComponentFunction === 'orderItem' && (ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed' || ComponentFunction.Function === 'inWork') ? <MapComponent /> : <></>} */}

        <Area50></Area50>
      </PageContainer>
    )
  }
})


export default User