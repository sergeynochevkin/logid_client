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
import { ComponentFunctionContext, OrderContext, PartnerContext, RatingContext, UserInfoContext, FilterAndSortContext, NotificationContext, StateContext, SettingContext, TranslateContext } from '..'
import { observer } from 'mobx-react-lite'
import Account from '../components/account/Account'
import { fetchUserInfos } from '../http/userInfoApi'
import { useFetching } from '../hooks/useFetching'
import { fetchGroups, fetchPartners } from '../http/partnerApi'
import Partners from '../components/partner/Partners'
import { fetchOtherRatings } from '../http/ratingApi'
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
  const [fetchPartnersStart, setFetchPartnersStart] = useState(false)
  const { Partner } = useContext(PartnerContext)
  const { Rating } = useContext(RatingContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Notification } = useContext(NotificationContext)
  const { State } = useContext(StateContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)

  const [fetching, error] = useFetching(async () => {  
     // to fetcher?
    if (ComponentFunction.Function !== 'new' || ComponentFunction.Function !== 'postponed') {
      if ((ComponentFunction.PageFunction === 'carriers' || ComponentFunction.PageFunction === 'orderList') && Object.keys(UserInfo.userInfo).length !== 0) {
        await fetchPartners(UserInfo.userInfo.id).then(async data => {
          await fetchGroups(UserInfo.userInfo.id, data.map(el => el.partnerUserInfoId)).then(data => Partner.setGroups(data))
          await fetchOtherRatings(UserInfo.userInfo.id).then(data => { Rating.setOtherRatings(data) })
          Partner.setPartner(data.find(el => el.partnerUserInfoId === order.order.carrierId))
          Partner.setMyBlocked(data.filter(el => el.status === 'blocked').map(el => el.partnerUserInfoId))
          Partner.setMyFavorite(data.filter(el => el.status === 'favorite').map(el => el.partnerUserInfoId))
          Partner.setPartners(data);
          await fetchUserInfos(data.map(el => el.partnerUserInfoId), FilterAndSort.partnerFilters).then(data => Partner.setPartnerInfos(data))
        })
      }
    }
    setFetchPartnersStart(false)
  })

  useEffect(() => {
    fetching()
  }, [])

  useEffect(() => {
    fetching()
  }, [fetchPartnersStart, ComponentFunction.Function, ComponentFunction.PageFunction])

  useEffect(() => {
    Notification.new_server_notifications.forEach(async element => {
      Notification.addNotification([{ id: v4(), type: element.type, message: element.message }])
    });
    let ids = Notification.new_server_notifications.map(el => el.id)
    updateNotifications(ids, true)
  }, [Notification.new_server_notifications])

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
          ComponentFunction.PageFunction === 'orderList' ? <OrderList setFetchPartnersStart={setFetchPartnersStart} /> :
            ComponentFunction.PageFunction === 'account' ? <Account setFetchPartnersStart={setFetchPartnersStart} /> :
              ComponentFunction.PageFunction === 'orderForm' ? <OrderForm /> :
                ComponentFunction.PageFunction === 'carriers' ? <Partners setFetchPartnersStart={setFetchPartnersStart} /> :
                  ComponentFunction.PageFunction === 'settings' ? <SettingsComponent /> :
                    <OrderList />
        }
        <Area50></Area50>
      </PageContainer>
    )
  }
})


export default Customer