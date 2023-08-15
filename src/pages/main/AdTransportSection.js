import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, FilterAndSortContext, SettingContext, TranslateContext } from '../..'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import BoardListItem from '../board/BoardListItem'

const AdTransportSection = observer(() => {
  const { Ad } = useContext(AdContext)
  const { Setting } = useContext(SettingContext)
  const [transports, setTransports] = useState([])
  const { height, width } = useWindowDimensions();
  const { Translate } = useContext(TranslateContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)

  useEffect(() => {
    FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, main_limit: width < 425 ? 2 : width < 770 ? 3 : 6 }, 'transports')
  }, [])
  
  return (
    <>
      <div className={`ad_transport_container ${Setting.app_theme}`} >
        <div className={`ad_transport_section`}>
          {Ad.transports.main.map(transport => <BoardListItem key = {transport.id} transport={transport} />)}
        </div>
        <div className='how_to_add_text_container'>
          {SetNativeTranslate(Translate.language,
            {
              russian: ['Хотите увидесь свой транспорт здесь? Зарегистрируйтесь, добавьте транспорт и фотографии, заполните рекламный текст и включите показ. Дождитесь модерации. Сейчас это бесплатно!'],
              english: ['Would you like to see your transport here? Sign up, add a vehicle, pop up your ad text, and turn on the display. Wait for moderation. Now it is free!']
            })}
        </div>
      </div>
    </>
  )
})

export default AdTransportSection