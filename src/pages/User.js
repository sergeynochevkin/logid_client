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
import { ComponentFunctionContext, OrderContext, UserInfoContext, SettingContext, TranslateContext, FetcherContext, UserContext, AdressContext, TransportContext } from '..'
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
  const { Transport } = useContext(TransportContext)
  useEffect(() => {
    fetcher.setPartners(true)
    fetcher.setSubscriptions(true)
  }, [])

  useEffect(() => {
    if (user.user.role === 'carrier' && Object.keys(UserInfo.userInfo).length !== 0 && (!Transport.transports || Transport.transports.length === 0)) {
      ComponentFunction.setPageFunction('transport')
      //may be something else
    }
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

  const setFunction = (Function, OrdersComponentFunction, PageFunction, OrderFormFunction) => {
    if (OrdersComponentFunction) {
      ComponentFunction.setOrdersComponentFunction(OrdersComponentFunction)
    }
    if (Function) {
      ComponentFunction.setFunction(Function)
    }
    if (PageFunction) {
      ComponentFunction.setPageFunction(PageFunction)
    }
    if (OrderFormFunction) {
      ComponentFunction.setOrderFormFunction(OrderFormFunction)
    }
    if (PageFunction !== 'orderForm' && ComponentFunction.orderFormFunction !== 'newOrder' && user.user.role === 'customer') {
      ComponentFunction.setOrderFormFunction('newOrder')
    }
  }

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
                  setFunction('inWork', 'orderList', 'orderList')
                }} style={{
                  color: ComponentFunction.PageFunction === 'orderList' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'orders')}</BookMark>

                {user.user.role === 'customer' &&
                  <BookMark onClick={() => {
                    setFunction(false, false, 'orderForm', 'newOrder')
                    order.setIntegrationId()
                  }} style={{
                    color: ComponentFunction.PageFunction === 'orderForm' && 'grey',
                  }}>{ComponentFunction.orderFormFunction === 'edit' ? SetNativeTranslate(Translate.language, {}, 'order_editing') : SetNativeTranslate(Translate.language, {}, 'create_order')}</BookMark>
                }

                {user.user.role === 'carrier' &&
                  <BookMark onClick={() => {
                    setFunction(false, false, 'transport', false)
                  }} style={{
                    color: ComponentFunction.PageFunction === 'transport' && 'grey',
                  }}>{SetNativeTranslate(Translate.language, {}, 'transports')}</BookMark>
                }

                <BookMark onClick={() => {
                  setFunction('partners', false, user.user.role === 'customer' ? 'carriers' : 'customers', false)
                }} style={{
                  color: ComponentFunction.PageFunction === 'carriers' || ComponentFunction.PageFunction === 'customers' ? 'grey' : false,
                }}>{SetNativeTranslate(Translate.language, {}, 'carriers')}</BookMark>

                <BookMark onClick={() => {
                  setFunction(false, false, 'account', false)
                }} style={{
                  color: ComponentFunction.PageFunction === 'account' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'account')}</BookMark>
                {/* 
                <BookMark onClick={() => {
                    setFunction(false, false, 'settings', false)    
                   }} style={{
                  color: ComponentFunction.PageFunction === 'settings' && 'grey',
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