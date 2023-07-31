import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, SettingContext, TranslateContext } from '../..'
import AdTransportItem from './AdTransportItem'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const AdTransportSection = observer(() => {
  const { Ad } = useContext(AdContext)
  const { Setting } = useContext(SettingContext)
  const [transports, setTransports] = useState([])
  const { height, width } = useWindowDimensions();
  const { Translate } = useContext(TranslateContext)

  function transportAdSelect(length, i) {
    let indexArray = []
    let transportsArray = []

    for (; i < length + 10; i++) {
      let index = Math.floor(Math.random() * Ad.transports.length);
      if (!indexArray.includes(index)) {
        indexArray.push(index)
        if (indexArray.length === length) {
          break
        }
      }
    }
    for (const index of indexArray) {
      transportsArray.push(Ad.transports[index])
    }
    setTransports(transportsArray)
    indexArray = []
    transportsArray = []
  }

  useEffect(() => {
    setTimeout(() => {
      transportAdSelect(width < 770 ? 2 : 6, 0)
    }, 500)
    setInterval(() => {
      transportAdSelect(width < 770 ? 2 : 6, 0)
    }, 10000)
  }, [])

  return (
    <>
      <div className={`ad_transport_container ${Setting.app_theme}`} >
        <div className={`ad_transport_section`}>
          {transports.map(transport => <AdTransportItem key={transport.id} transport={transport} transports={transports} />)}
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