import React, { useContext } from 'react'
import OfferItem from './OfferItem'
import { CardButton } from '../ui/button/CardButton'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'
import { Smaller } from '../ui/text/Smaller'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { TranslateContext } from '../..'

const OfferList = ({ oneOrder, user, setModalActive, thisOrderOffers, UserInfo, thisOrderNoPartners, firstPoint, ComponentFunction }) => {

  const { Translate } = useContext(TranslateContext)

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
      {thisOrderOffers.filter(el => el.carrierId !== UserInfo.userInfo.id).length > 0 ? <Smaller>{user.user.role === 'carrier' ? SetNativeTranslate(Translate.language, {
        russian: ['Предложения других перевозчиков'],
        english: ['Offers from other carriers'],
        spanish: ['Ofertas de otros transportistas'],
        turkish: ['Diğer operatörlerin teklifleri'],
        сhinese: [''],
        hindi: [''],

      }) : SetNativeTranslate(Translate.language, {
        russian: ['Предложения перевозчиков'],
        english: ['Carrier offers'],
        spanish: ['Ofertas de transportistas'],
        turkish: ['Operatör teklifleri'],
        сhinese: ['其他运营商的优惠'],
        hindi: ['अन्य वाहकों से ऑफर'],

      })}</Smaller> : <></>}
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
                  <OrderTh>
                    {SetNativeTranslate(Translate.language, {
                      russian: ['Наименование'],
                      english: ['Name'],
                      spanish: ['Nombre'],
                      turkish: ['İsim'],
                      сhinese: ['姓名'],
                      hindi: ['नाम'],

                    })}
                  </OrderTh>
                  <OrderTh>
                    {SetNativeTranslate(Translate.language, {
                      russian: ['Рейтинг'],
                      english: ['Rating'],
                      spanish: ['Clasificación'],
                      turkish: ['Değerlendirme'],
                      сhinese: ['评分'],
                      hindi: ['रेटिंग'],

                    })}
                  </OrderTh>
                  <OrderTh>
                    {SetNativeTranslate(Translate.language, {
                      russian: ['Цена'],
                      english: ['Cost'],
                      spanish: ['Precio'],
                      turkish: ['Fiyat'],
                      сhinese: ['价格'],
                      hindi: ['कीमत'],

                    })}
                  </OrderTh>
                  <OrderTh>
                    {SetNativeTranslate(Translate.language, {
                      russian: ['Время подачи'],
                      english: ['Arrival time'],
                      spanish: ['Hora de llegada'],
                      turkish: ['Varış zamanı'],
                      сhinese: ['到达时间'],
                      hindi: ['आगमन का समय'],

                    })}
                  </OrderTh>
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
                    thisOrderOffers={thisOrderOffers}

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

    </VerticalContainer>
  )
}

export default OfferList