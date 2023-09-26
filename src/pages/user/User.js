import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import OrderForm from '../../components/order/OrderForm'
import OrderList from '../../components/order/OrderList'
import { Area50 } from '../../components/ui/area/Area50'
import PageBanner from '../banner/PageBanner'
import { BookMark } from '../../components/ui/button/BookMark'
import { ComponentFunctionContext, OrderContext, UserInfoContext, SettingContext, TranslateContext, FetcherContext, UserContext, AdressContext, TransportContext, LinkContext, NotificationContext } from '../..'
import { observer } from 'mobx-react-lite'
import Account from '../../components/account/Account'
import Partners from '../../components/partner/Partners'
import SettingsComponent from '../../components/setting/SettingsComponent'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import TransportComponent from '../../components/transport/TransportComponent'
import Modal from '../../components/ui/modal/Modal'
import AccountCompletionForm from '../../components/account/AccountCompletionForm'
import { v4 } from "uuid";
import './User.css'
import DriverComponent from '../../components/driver/DriverComponent'


const Container = styled.div`
display:flex;
`
const User = observer(() => {
  const { order } = useContext(OrderContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { link } = useContext(LinkContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { Notification } = useContext(NotificationContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { user } = useContext(UserContext)
  const { Adress } = useContext(AdressContext)
  const { Transport } = useContext(TransportContext)
  const [modalActive, setModalActive] = useState(false)


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
    if (link.order.id) {
      fetcher.setCustomLoading(true)
      setFunction(link.order.status, 'orderList', 'orderList')
    }
  }, [])

  useEffect(() => {
    if (link.order.id) {
      let i = 0
      let delay = link.internet_speed < 5 ? 40 : link.internet_speed < 20 ? 20 : 10
      let message = SetNativeTranslate(Translate.language, {
        russian: [`Заказ ${link.order.id} уже не доступен`],
        english: [`Order ${link.order.id} is no longer available`],
        spanish: [`El pedido ${link.order.id} ya no está disponible`],
        turkish: [`${link.order.id} siparişi artık mevcut değil`],
        сhinese: [`订单 ${link.order.id} 不再可用`],
        hindi: [`ऑर्डर ${link.order.id} अब उपलब्ध नहीं है`],
      })

      let interval = setInterval(() => {
        if (order.totalCount[ComponentFunction.Function] > 0) {
          // check if now order id show sorry
          fetcher.setCustomLoading(false)
          clearInterval(interval)

          if (!order.divided_orders[ComponentFunction.Function].find(el => el.id === parseInt(link.order.id))) {
            !Notification.notifications.find(el => el.message === message) && Notification.addNotification([{ id: v4(), type: 'error', message: message }])
          }
        } else {
          i++
        }
        if (i > delay) { // depends on internet speed
          fetcher.setCustomLoading(false)
          clearInterval(interval)
          !Notification.notifications.find(el => el.message === message) && Notification.addNotification([{ id: v4(), type: 'error', message: message }])
        }
      }, 500)
    }
    // link.setOrder('', 'id')
    // link.setOrder('', 'status')
  }, [order.totalCount[ComponentFunction.Function]])

  useEffect(() => {
    if (link.refer.id && link.refer.action === 'add_partner') {
      ComponentFunction.setPageFunction('partners')
      ComponentFunction.setPartnersComponentFunction('add')
    }
  }, [])


  return (
    <div className={`user_page_container ${Setting.app_theme}`}>
      <title>{SetNativeTranslate(Translate.language, {}, user.user.role === 'customer' ? 'customers_office' : user.user.role === 'carrier' ? 'carriers_office' : user.user.role === 'driver' ? 'drivers_office' : '')}</title>


      <PageBanner>{SetNativeTranslate(Translate.language, {}, user.user.role === 'customer' ? 'customers_office' : user.user.role === 'carrier' ? 'carriers_office' : user.user.role === 'driver' ? 'drivers_office' : '')}</PageBanner>

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

            {user.user.role === 'carrier' || user.user.role === 'driver' ?
              <>
                <BookMark onClick={() => {
                  ComponentFunction.PageFunction !== 'transport' && setFunction(false, false, 'transport', false)
                }} style={{
                  color: ComponentFunction.PageFunction === 'transport' && 'grey', cursor: ComponentFunction.PageFunction === 'transport' && 'default'
                }}>{SetNativeTranslate(Translate.language, {}, 'transports')}</BookMark>
              </> : <></>
            }
            {user.user.role === 'carrier' &&
              <BookMark onClick={() => {
                ComponentFunction.PageFunction !== 'drivers' && setFunction(false, false, 'drivers', false)
              }} style={{
                color: ComponentFunction.PageFunction === 'drivers' && 'grey', cursor: ComponentFunction.PageFunction === 'drivers' && 'default'
              }}>{SetNativeTranslate(Translate.language, {
                russian: ['Водители'],
                english: ['Drivers'],
                spanish: ['Conductores'],
                turkish: ['Sürücüler'],
                сhinese: ['司机'],
                hindi: ['ड्राइवरों'],
              })}</BookMark>}

            {user.user.role !== 'driver' &&
              <BookMark onClick={() => {
                ComponentFunction.PageFunction !== 'partners' && setFunction('partners', false, 'partners', false)
              }} style={{
                color: ComponentFunction.PageFunction === 'partners' && 'grey', cursor: ComponentFunction.PageFunction === 'partners' && 'default'
              }}>{SetNativeTranslate(Translate.language, {}, user.user.role === 'carrier' ? 'customers' : 'carriers')}</BookMark>
            }

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
              (user.user.role === 'carrier' || user.user.role === 'driver') && ComponentFunction.PageFunction === 'transport' ? <TransportComponent /> :
                ComponentFunction.PageFunction === 'partners' ? <Partners /> :
                  ComponentFunction.PageFunction === 'settings' ? <SettingsComponent /> :
                    ComponentFunction.PageFunction === 'drivers' ? <DriverComponent /> :
                      <OrderList />
      }

      {/* {(ComponentFunction.PageFunction === 'orderList' && ComponentFunction.Function === 'new' && user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction !== 'orderItem') && <MapComponent />} */}
      {/* {ComponentFunction.OrdersComponentFunction === 'orderItem' && (ComponentFunction.Function === 'new' || ComponentFunction.Function === 'postponed' || ComponentFunction.Function === 'inWork') ? <MapComponent /> : <></>} */}

      <Area50></Area50>

      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <AccountCompletionForm setModalActive={setModalActive} parent={'user'} setFunction={setFunction} />
      </Modal>
    </div>
  )

}
)


export default User