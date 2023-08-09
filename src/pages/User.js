import React, { useContext, useEffect, useState } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import styled from 'styled-components'
import OrderForm from '../components/order/OrderForm'
import OrderList from '../components/order/OrderList'
import { Area50 } from '../components/ui/area/Area50'
import PageBanner from './banner/PageBanner'
import { BookMark } from '../components/ui/button/BookMark'
import PageContainer from '../components/ui/page/PageContainer'
import { ComponentFunctionContext, OrderContext, UserInfoContext, SettingContext, TranslateContext, FetcherContext, UserContext, AdressContext, TransportContext, LinkContext } from '..'
import { observer } from 'mobx-react-lite'
import Account from '../components/account/Account'
import Partners from '../components/partner/Partners'
import SettingsComponent from '../components/setting/SettingsComponent'
import { SetNativeTranslate } from '../modules/SetNativeTranslate'
import TransportComponent from '../components/transport/TransportComponent'
import PageLoader from '../components/ui/loader/PageLoader '
import Modal from '../components/ui/modal/Modal'
import AccountCompletionForm from '../components/account/AccountCompletionForm'

const Container = styled.div`
display:flex;
`
const User = observer(() => {
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Link } = useContext(LinkContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { user } = useContext(UserContext)
  const { Adress } = useContext(AdressContext)
  const { Transport } = useContext(TransportContext)
  const [modalActive, setModalActive] = useState(false)


  useEffect(() => {
    if (!Link.refer.id) {
      fetcher.setPartners(true)
    }
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

  useEffect(() => {
    if (Link.order.id || !order.divided_orders) {
      fetcher.setCustomLoading(true)
      setFunction(Link.order.status, 'orderList', 'orderList')
    }
  }, [])

  useEffect(() => {

    if (order.map_orders && order.map_orders.find(el => el === Link.order.id)) {
      fetcher.setCustomLoading(false)
    }

  }, [order.map_orders])

  useEffect(() => {
    if (Link.refer.id && Link.refer.action === 'add_partner') {
      ComponentFunction.setPageFunction('partners')
      ComponentFunction.setFunction('partners')
      ComponentFunction.setPartnersComponentFunction('add')
    }
  }, [])

  if (!isLoaded) { return <PageLoader /> }
  else {
    return (
      <PageContainer>
        <title>{SetNativeTranslate(Translate.language, {}, user.user.role === 'customer' ? 'customers_office' : 'carriers_office')}</title>

        <PageBanner>{SetNativeTranslate(Translate.language, {}, user.user.role === 'customer' ? 'customers_office' : 'carriers_office')}</PageBanner>

        <Container>

          <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
            <div className='scroll_content_container'>
              <BookMark onClick={() => {
                ComponentFunction.PageFunction !== 'orderList' && setFunction('inWork', 'orderList', 'orderList')
              }} style={{
                color: ComponentFunction.PageFunction === 'orderList' && 'grey', cursor: ComponentFunction.PageFunction === 'orderList' && 'default'
              }}>{SetNativeTranslate(Translate.language, {}, 'orders')}</BookMark>

              {user.user.role === 'customer' &&
                <BookMark onClick={() => {
                  if (!UserInfo.userInfo.legal) {
                    setModalActive(true)
                  } else {
                    setFunction(false, false, 'orderForm', 'newOrder')
                    order.setPairs([])
                    order.setFiles([])
                    order.setIntegrationId()
                  }

                }} style={{
                  color: ComponentFunction.PageFunction === 'orderForm' && 'grey', cursor: ComponentFunction.PageFunction === 'orderForm' && 'default'
                }}>{ComponentFunction.orderFormFunction === 'edit' ? SetNativeTranslate(Translate.language, {}, 'order_editing') : SetNativeTranslate(Translate.language, {}, 'create_order')}</BookMark>
              }

              {user.user.role === 'carrier' &&
                <BookMark onClick={() => {
                  ComponentFunction.PageFunction !== 'transport' && setFunction(false, false, 'transport', false)
                }} style={{
                  color: ComponentFunction.PageFunction === 'transport' && 'grey', cursor: ComponentFunction.PageFunction === 'transport' && 'default'
                }}>{SetNativeTranslate(Translate.language, {}, 'transports')}</BookMark>
              }

              <BookMark onClick={() => {
                ComponentFunction.PageFunction !== 'partners' && setFunction('partners', false, 'partners', false)
              }} style={{
                color: ComponentFunction.PageFunction === 'partners' && 'grey', cursor: ComponentFunction.PageFunction === 'partners' && 'default'
              }}>{SetNativeTranslate(Translate.language, {}, user.user.role === 'carrier' ? 'customers' : 'carriers')}</BookMark>

              <BookMark onClick={() => {
                ComponentFunction.PageFunction !== 'account' && setFunction(false, false, 'account', false)
              }} style={{
                color: ComponentFunction.PageFunction === 'account' && 'grey', cursor: ComponentFunction.PageFunction === 'account' && 'default'
              }}>{SetNativeTranslate(Translate.language, {}, 'account')}</BookMark>


              <BookMark onClick={() => {
                setFunction(false, false, 'settings', false)
              }} style={{
                color: ComponentFunction.PageFunction === 'settings' && 'grey',
              }}>{SetNativeTranslate(Translate.language, {}, 'settings')}</BookMark>

            </div>
          </div>


        </Container>
        {
          ComponentFunction.PageFunction === 'orderList' ? <OrderList /> :
            ComponentFunction.PageFunction === 'account' ? <Account /> :
              user.user.role === 'customer' && ComponentFunction.PageFunction === 'orderForm' ?
                <OrderForm /> :
                user.user.role === 'carrier' && ComponentFunction.PageFunction === 'transport' ? <TransportComponent /> :
                  ComponentFunction.PageFunction === 'partners' ? <Partners /> :
                    ComponentFunction.PageFunction === 'settings' ? <SettingsComponent /> :
                      <OrderList />
        }

        {/* {(ComponentFunction.PageFunction === 'orderList' && ComponentFunction.Function === 'new' && user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction !== 'orderItem') && <MapComponent />} */}
        {/* {ComponentFunction.OrdersComponentFunction === 'orderItem' && (ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed' || ComponentFunction.Function === 'inWork') ? <MapComponent /> : <></>} */}

        <Area50></Area50>

        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <AccountCompletionForm setModalActive={setModalActive} parent={'user'} setFunction={setFunction} />
        </Modal>

      </PageContainer>
    )
  }
}
)


export default User