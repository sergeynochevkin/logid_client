import React from 'react'
import OfferItem from './OfferItem'
import { CardButton } from '../ui/button/CardButton'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'
import { Smaller } from '../ui/text/Smaller'

const OfferList = ({ oneOrder, user, setModalActive, thisOrderOffers, UserInfo, thisOrderNoPartners, setFetchStart, firstPoint, ComponentFunction }) => {

  // const sortOffers = (a, b) => {
  //   if (a.cost > b.cost) {
  //     return 1
  //   } else {
  //     return -1
  //   }
  // }

  return (
    <VerticalContainer
      style={{ alignItems: 'center' }}
    >
      {thisOrderOffers.filter(el => el.carrierId !== UserInfo.userInfo.id).length > 0 ? <Smaller>{user.user.role === 'carrier' ? 'Предложения других перевозчиков' : 'Предложения перевозчиков'}</Smaller> : <></>}
      {thisOrderOffers.filter(el => el.carrierId !== UserInfo.userInfo.id).length > 0 ?
        <HorizontalContainer
          style={{
            flexDirection: user.user.role === 'customer' ? 'column' : 'default',
            gap: user.user.role === 'customer' ? '0px' : 'default',
          }}
        >

          {user.user.role === 'customer' ?
            <table>
              <tbody>
                <tr>
                  <OrderTh>Id</OrderTh>
                  <OrderTh>Нименование</OrderTh>
                  <OrderTh>Рейтинг</OrderTh>
                  <OrderTh>Цена</OrderTh>
                  <OrderTh>Время подачи</OrderTh>
                  <OrderTh>Комментарий</OrderTh>
                </tr>
              </tbody>
              <tbody>
                {
                  thisOrderOffers.filter(el => el.carrierId !== UserInfo.userInfo.id).map(oneOffer => <OfferItem
                    key={oneOffer.id}
                    oneOffer={oneOffer}
                    oneOrder={oneOrder}
                    user={user}
                    UserInfo={UserInfo}
                    noPartner={thisOrderNoPartners.find(el => el.id === oneOffer.carrierId)}
                    setModalActive={setModalActive}
                    setFetchStart={setFetchStart}
                    firstPoint={firstPoint}
                  />)
                }
              </tbody>
            </table> : user.user.role === 'carrier' ?
              <>
                {
                  thisOrderOffers.filter(el => el.carrierId !== UserInfo.userInfo.id).sortOffers().map(oneOffer => <OfferItem
                    key={oneOffer.id}
                    oneOffer={oneOffer}
                    oneOrder={oneOrder}
                    user={user}
                    UserInfo={UserInfo}
                    noPartner={thisOrderNoPartners.find(el => el.id === oneOffer.carrierId)}
                  />)
                }
              </> : <></>
          }
        </HorizontalContainer> : <></>}
      {user.user.role === 'customer' ? <CardButton
        onClick={() => {
          setModalActive(false)
          ComponentFunction.setOfferListMoreInfo(false)
        }}
      >Закрыть окно</CardButton> : <></>}
    </VerticalContainer>
  )
}

export default OfferList