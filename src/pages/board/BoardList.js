import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdContext, FilterAndSortContext, TranslateContext } from '../..'
import BoardListItem from './BoardListItem'
import NoData from '../../components/ui/page/NoData'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const BoardList = observer(() => {
  const { Ad } = useContext(AdContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Translate } = useContext(TranslateContext)

  return (
    <div className='board_items_container'>
      {FilterAndSort.boardFilters.transports.city && FilterAndSort.boardFilters.transports.city !== 'Все' && FilterAndSort.boardFilters.transports.city !== 'All' && Ad.transports.board.length === 0 ?
        <NoData>
          {SetNativeTranslate(Translate.language, {
            russian: ['Перевозчики в выбранном городе еще не опубликовали предложений, разместите заказ'],
            english: ['Carriers in the selected city have not yet published offers, place an order']
          })}

          </NoData> :
        Ad.transports.board.length === 0 ?
          <NoData>
            {SetNativeTranslate(Translate.language, {
              russian: ['Нет предложений, разместите заказ'],
              english: ['No offers, place an order']
            })}
          </NoData> :
          Ad.transports.board.map(transport => <BoardListItem key={transport.id} transport={transport} />)
      }
    </div>
  )
})

export default BoardList