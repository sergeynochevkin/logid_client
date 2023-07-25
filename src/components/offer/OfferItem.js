import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ComponentFunctionContext, FetcherContext, NotificationContext, OrderContext, PartnerContext, SettingContext, TranslateContext, TransportContext } from '../..'
import { setTime } from '../../modules/setTime'
import { sendMail } from '../../http/mailApi'
import { updateOrder } from '../../http/orderApi'
import { createPartner } from '../../http/partnerApi'
import RatingView from '../rating/RatingView'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import { CardContainer } from '../ui/card/CardContainer'
import { OrderTd } from '../ui/table/OrderTd'
import OrderComment from '../order/orderForm/OrderComment'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import info from '../../assets/icons/info.png';
import info_dark from '../../assets/icons/info_dark.png';
import close from '../../assets/icons/close.png';
import close_dark from '../../assets/icons/close_dark.png';
import done from '../../assets/icons/done.png';
import done_dark from '../../assets/icons/done_dark.png';
import arrow_up_ from '../../assets/icons/arrow_up_.png';
import arrow_up_dark_ from '../../assets/icons/arrow_up_dark_.png';
import { deleteOffer } from '../../http/offerApi'
import { v4 } from "uuid";
import CardColValue from '../ui/card/CardColValue'



const OfferItem = observer(({ oneOffer, user, noPartner, oneOrder, UserInfo, setModalActive, firstPoint, thisOrderOffers }) => {
  const { Partner } = useContext(PartnerContext)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const formattedOfferTime = setTime(new Date(oneOffer.time_from), 0, 'show')
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { order } = useContext(OrderContext)
  const { Setting } = useContext(SettingContext)
  const { Transport } = useContext(TransportContext)
  const { Notification } = useContext(NotificationContext)

  const [images, setImages] = useState([])
  const [image, setImage] = useState()

  useEffect(() => {
    if (ComponentFunction.OfferListMoreInfo === false) {
      setShowMoreInfo(false)
    }
  }, [ComponentFunction.OfferListMoreInfo])

  useEffect(() => {
    if (Transport.transport_images.find(el => el.id === oneOffer.transportid)) {
      setImages(Transport.transport_images.find(el => el.id === oneOffer.transportid).urlsArray)
      setImage(Transport.transport_images.find(el => el.id === oneOffer.transportid).urlsArray[0])
    }
  }, [Transport.transport_images])

  const spliceOrder = (id, length) => {
    // order.setFilteredCount(order.filtered_count[ComponentFunction.Function] - length, ComponentFunction.Function)
    // order.setTotalCount(order.totalCount[ComponentFunction.Function] - length, ComponentFunction.Function)
    // order.setDividedOrders(order.divided_orders[ComponentFunction.Function].filter(el => el.id !== id), ComponentFunction.Function)
  }

  const inWork = async () => {
    try {
      await updateOrder('', '', oneOrder.id, user.user.role, 'inWork', oneOrder.order_status, noPartner.id, UserInfo.userInfo.id, oneOffer.cost, oneOffer.time_from, firstPoint.id, oneOffer.transportid)
        .then(sendMail(Translate.language, user.user.role, oneOrder.id, 'order_status', 'inWork', noPartner.id))
        .then(createPartner(UserInfo.userInfo.id, noPartner.id, 'normal'))
        .then(createPartner(noPartner.id, UserInfo.userInfo.id, 'normal'))

        .then(spliceOrder(oneOrder.id, 1))
        .then(fetcher.setDividedOrders(true))
        .then(fetcher.setNewStatus('inWork'))

      setModalActive(false)
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }

  const decline = async () => {
    try {
      await deleteOffer(oneOffer.id, user.user.role).then(data => Notification.addNotification([{
        id: v4(), type: 'success', message: data
      }])).then(fetcher.setOrdersNew(true))

      thisOrderOffers.length <= 1 && setModalActive(false)

    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }

  let thisPartner
  let thisPartnerInfo
  noPartner && Partner.partners.filter(el => el.partnerUserInfoId === noPartner.id).length > 0 ? thisPartner = Partner.partners.find(el => el.partnerUserInfoId === noPartner.id) : thisPartner = {}
  noPartner && Partner.partnerInfos.filter(el => el.id === noPartner.id).length > 0 ? thisPartnerInfo = Partner.partnerInfos.find(el => el.id === noPartner.id) : thisPartnerInfo = noPartner

  return (
    <>
      {user.user.role === 'carrier' && noPartner ?
        <CardColName>{oneOffer.cost}</CardColName> :
        user.user.role === 'customer' && noPartner ?
          <>
            <tr>
              <OrderTd>{thisPartnerInfo.id}</OrderTd>
              <OrderTd
                style={{
                  backgroundColor: thisPartner && thisPartner.status === 'normal' ? 'rgb(241,196,15,0.8)' :
                    thisPartner && thisPartner.status === 'priority' ? 'rgb(129, 199, 132,0.8)' :
                      thisPartner && thisPartner.status === 'blocked' ? 'rgb(254, 111, 103,0.8)' : 'gray'

                }}
              >
                {noPartner.legal === 'person' ?
                  <>{thisPartnerInfo.name_surname_fathersname}</>
                  :
                  <>{thisPartnerInfo.company_name}</>
                }
              </OrderTd>
              <OrderTd>{Math.floor(thisPartnerInfo.total_rating * 100) / 100}</OrderTd>
              <OrderTd>{oneOffer.cost}</OrderTd>
              <OrderTd>{formattedOfferTime}</OrderTd>


              {thisPartner && thisPartner.status === 'blocked' ? <></> :
                <td>
                  <div className='offer_action_container'>
                    <img src={
                      Setting.app_theme === 'dark' && showMoreInfo ? arrow_up_dark_
                        : Setting.app_theme === 'dark' && !showMoreInfo ? info_dark
                          : Setting.app_theme === 'light' && showMoreInfo ? arrow_up_
                            : info}
                      className='offer_action_icon'
                      onClick={() => {
                        if (showMoreInfo === false) {
                          setShowMoreInfo(true)
                          ComponentFunction.setOfferListMoreInfo(true)
                        } else { setShowMoreInfo(false) }
                      }} />
                    <img src={Setting.app_theme === 'dark' ? done_dark : done} className='offer_action_icon' onClick={inWork} />
                    <img src={Setting.app_theme === 'dark' ? close_dark : close} className='offer_action_icon' onClick={decline} />
                  </div>
                </td>
              }

            </tr>
            <tr>
              {showMoreInfo === true ?
                <><td colspan="8">
                  <CardContainer
                    onClick={() => {
                      if (showMoreInfo === false) {
                        setShowMoreInfo(true)
                      } else { setShowMoreInfo(false) }
                    }}
                    style={{
                      borderColor: thisPartner && thisPartner.status === 'normal' ? 'rgb(241,196,15,0.8)' :
                        thisPartner && thisPartner.status === 'priority' ? 'rgb(129, 199, 132,0.8)' :
                          thisPartner && thisPartner.status === 'blocked' ? 'rgb(254, 111, 103,0.8)' : 'lightgray',
                      cursor: 'pointer'
                    }}
                  >
                    {oneOffer.carrier_comment ? <CardColValue >{oneOffer.carrier_comment}</CardColValue> : <></>}
                    <RatingView
                      setShowMoreInfo={setShowMoreInfo}
                      onePartnerInfo={thisPartnerInfo}
                      user={user}
                    />

                    {images.length > 0 ?
                      <div className='offer_images_container'>
                        <div className='offer_large_image_container'>
                          <img src={image} className='offer_large_image' ></img>
                        </div>
                        <div className='offer_image_icons_container'>
                          {images.length > 0 ? images.map(image => <img src={image} className='offer_image_icon' key={image}
                            onClick={(event) => {
                              event.stopPropagation()
                              setImage(image)
                            }}
                          ></img>) : <></>}
                        </div>
                      </div> : <></>}

                  </CardContainer>
                </td>

                </>
                : <></>}


            </tr>
          </>
          : <></>
      }

    </>
  )
})

export default OfferItem