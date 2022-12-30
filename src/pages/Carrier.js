import React, { useContext, useEffect, useState } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import styled from 'styled-components'
import { Area50 } from '../components/ui/area/Area50'
import PageBanner from './banner/PageBanner'
import PageContainer from '../components/ui/page/PageContainer'
import { BookMark } from '../components/ui/button/BookMark'
import OrderList from '../components/order/OrderList'
import UserInfoForm from '../components/account/UserInfoForm'
import TransportComponent from '../components/transport/TransportComponent'
import { ComponentFunctionContext, OrderContext, UserInfoContext, NotificationContext, SettingContext, TranslateContext, FetcherContext } from '..'
import { observer } from 'mobx-react-lite'
import Account from '../components/account/Account'
import Partners from '../components/partner/Partners'
import SettingsComponent from '../components/setting/SettingsComponent'
import { VerticalContainer } from '../components/ui/page/VerticalContainer'
import { SetNativeTranslate } from '../modules/SetNativeTranslate'


const Container = styled.div`
display:flex;
`
const Carrier = observer(() => {
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { UserInfo } = useContext(UserInfoContext)
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
    region: 'RU',
    language: 'ru'
  })

  if (!isLoaded) { return <PageContainer /> }
  else {

    return (
      <PageContainer>
        <title>{SetNativeTranslate(Translate.language, {}, 'carriers_office')}</title>

        <PageBanner>{SetNativeTranslate(Translate.language, {}, 'carriers_office')}</PageBanner>

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
                  ComponentFunction.setPageFunction('orderList'); ComponentFunction.setFunction('inWork');
                  ComponentFunction.setOrdersComponentFunction('orderList')
                  order.setOrders([])
                  order.setOrder({})

                }} style={{
                  color: ComponentFunction.PageFunction === 'orderList' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'orders')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('transport')
                }} style={{
                  color: ComponentFunction.PageFunction === 'transport' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'transports')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('customers')
                  ComponentFunction.setFunction('partners')
                  ComponentFunction.setOrdersComponentFunction('orderList')
                }} style={{
                  color: ComponentFunction.PageFunction === 'customers' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'customers')}</BookMark>

                <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('account'); ComponentFunction.setOrdersComponentFunction('orderList')
                }} style={{
                  color: ComponentFunction.PageFunction === 'account' && 'grey',
                }}>{SetNativeTranslate(Translate.language, {}, 'account')}</BookMark>

                {/* <BookMark onClick={() => {
                  ComponentFunction.setPageFunction('settings'); ComponentFunction.setOrdersComponentFunction('orderList')
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
              ComponentFunction.PageFunction === 'transport' ? <TransportComponent /> :
                ComponentFunction.PageFunction === 'customers' ? <Partners  /> :
                  ComponentFunction.PageFunction === 'settings' ? <SettingsComponent /> :
                    <></>
        }

        <Area50></Area50>

      </PageContainer>
    )
  }
})

export default Carrier