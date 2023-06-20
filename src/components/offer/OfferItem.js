import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ComponentFunctionContext, FetcherContext, OrderContext, PartnerContext, TranslateContext } from '../..'
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

const OfferItem = observer(({ oneOffer, user, noPartner, oneOrder, UserInfo, setModalActive, firstPoint }) => {
  const { Partner } = useContext(PartnerContext)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const formattedOfferTime = setTime(new Date(oneOffer.time_from), 0, 'show')
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { order } = useContext(OrderContext)

  useEffect(() => {
    if (ComponentFunction.OfferListMoreInfo === false) {
      setShowMoreInfo(false)
    }
  }, [ComponentFunction.OfferListMoreInfo])

  const spliceOrder = (id, length) => {
    // order.setFilteredCount(order.filtered_count[ComponentFunction.Function] - length, ComponentFunction.Function)
    // order.setTotalCount(order.totalCount[ComponentFunction.Function] - length, ComponentFunction.Function)
    // order.setDividedOrders(order.divided_orders[ComponentFunction.Function].filter(el => el.id !== id), ComponentFunction.Function)
}

  const inWork = async () => {
    try {
      await updateOrder('', '', oneOrder.id, user.user.role, 'inWork', oneOrder.order_status, noPartner.id, UserInfo.userInfo.id, oneOffer.cost, oneOffer.time_from, firstPoint.id)
        .then(sendMail(Translate.language, user.user.role, oneOrder.id, 'order_status', 'inWork', noPartner.id))
        .then(createPartner(UserInfo.userInfo.id, noPartner.id, 'normal'))
        .then(createPartner(noPartner.id, UserInfo.userInfo.id, 'normal'))

        .then(spliceOrder(oneOrder.id, 1))
        .then(fetcher.setDividedOrders(true))
        .then(fetcher.setNewStatus('inWork'))

      setModalActive(false)
    } catch (e) {
      alert(e.response.data.message)
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
                      thisPartner && thisPartner.status === 'blocked' ? 'rgb(254, 111, 103,0.8)' : 'gray',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (showMoreInfo === false) {
                    setShowMoreInfo(true)
                    ComponentFunction.setOfferListMoreInfo(true)
                  } else { setShowMoreInfo(false) }
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
              <OrderTd>{oneOffer.carrier_comment}</OrderTd>

              {thisPartner && thisPartner.status === 'blocked' ? <></> :
                <td><CardButton
                  style={{
                    padding: '1px 5px 1px 5px',
                    height: '20px'
                  }}
                  onClick={inWork}
                >Принять</CardButton>
                </td>
              }

            </tr>
            <tr>
              {showMoreInfo === true ?
                <td colspan="8">
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
                    <RatingView
                      setShowMoreInfo={setShowMoreInfo}
                      onePartnerInfo={thisPartnerInfo}
                      user={user}
                    />
                  </CardContainer>
                </td>
                : <></>}
            </tr>
          </>
          : <></>
      }

    </>
  )
})

export default OfferItem