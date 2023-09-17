import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdContext, FilterAndSortContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import BoardListItem from './BoardListItem'
import NoData from '../../components/ui/page/NoData'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const BoardList = observer(() => {
  const { Ad } = useContext(AdContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Translate } = useContext(TranslateContext)
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)

  return (
    <>
      {!user.isAuth ?
        <div className='board_items_container'>
          {FilterAndSort.boardFilters.transports.city && FilterAndSort.boardFilters.transports.city !== 'Все' && FilterAndSort.boardFilters.transports.city !== 'All' && Ad.transports.board.length === 0 ?
            <NoData>
              {SetNativeTranslate(Translate.language, {
                russian: ['Перевозчики в выбранном городе еще не опубликовали предложений, разместите заказ'],
                english: ['Carriers in the selected city have not yet published offers, place an order'],
                spanish: ['Transportistas de la ciudad seleccionada aún no han publicado ofertas, haz tu pedido'],
                turkish: ['Seçilen şehirdeki operatörler henüz teklif yayınlamadı, siparişinizi verin'],
                сhinese: ['所选城市运营商尚未发布优惠，请下单'],
                hindi: ['चयनित शहर के वाहकों ने अभी तक ऑफ़र प्रकाशित नहीं किए हैं, अपना ऑर्डर दें'],
              })}

            </NoData> :
            Ad.transports.board.length === 0 ?
              <NoData>
                {SetNativeTranslate(Translate.language, {
                  russian: ['Нет предложений, разместите заказ'],
                  english: ['No offers, place an order'],
                  spanish: ['No hay ofertas, haz un pedido'],
                  turkish: ['Teklif yok, sipariş verin'],
                  сhinese: ['没有优惠，请下订单'],
                  hindi: ['कोई ऑफ़र नहीं, ऑर्डर दें'],
                })}
              </NoData> :
              Ad.transports.board.map(transport => <BoardListItem key={transport.id} transport={transport} />)
          }
        </div>
        :
        <div className='board_items_container'>
          {FilterAndSort.boardFilters.transports.city && FilterAndSort.boardFilters.transports.city !== 'Все' && FilterAndSort.boardFilters.transports.city !== 'All' && Ad.transports.board.filter(el => el.userInfoId !== UserInfo.userInfo.id).length === 0 ?
            <NoData>
              {SetNativeTranslate(Translate.language, {
                russian: ['Перевозчики в выбранном городе еще не опубликовали предложений, разместите заказ'],
                english: ['Carriers in the selected city have not yet published offers, place an order'],
                spanish: ['Transportistas de la ciudad seleccionada aún no han publicado ofertas, haz tu pedido'],
                turkish: ['Seçilen şehirdeki operatörler henüz teklif yayınlamadı, siparişinizi verin'],
                сhinese: ['所选城市运营商尚未发布优惠，请下单'],
                hindi: ['चयनित शहर के वाहकों ने अभी तक ऑफ़र प्रकाशित नहीं किए हैं, अपना ऑर्डर दें'],
              })}

            </NoData> :
            Ad.transports.board.filter(el => el.userInfoId !== UserInfo.userInfo.id).length === 0 ?
              <NoData>
                {SetNativeTranslate(Translate.language, {
                  russian: ['Нет предложений, разместите заказ'],
                  english: ['No offers, place an order'],
                  spanish: ['No hay ofertas, haz un pedido'],
                  turkish: ['Teklif yok, sipariş verin'],
                  сhinese: ['没有优惠，请下订单'],
                  hindi: ['कोई ऑफ़र नहीं, ऑर्डर दें'],
                })}
              </NoData> :
              Ad.transports.board.filter(el => el.userInfoId !== UserInfo.userInfo.id).map(transport => <BoardListItem key={transport.id} transport={transport} />)
          }
        </div>
      }
    </>
  )
})

export default BoardList