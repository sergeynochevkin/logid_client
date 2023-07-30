import React, { useContext } from 'react'
import logistics from '../../assets/logistics.jpg';
import courier from '../../assets/courier.jpg';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import { TranslateContext } from '../..';
import { observer } from 'mobx-react-lite';

const BoardMainBanner = observer(() => {

  const queryParams = new URLSearchParams(window.location.search)
  const target = queryParams.get("target")

  const { Translate } = useContext(TranslateContext)

  return (
    <div className='board_main_banner_container' style={{ backgroundImage: `url(${target !== 'courier' ? logistics : courier})`, width: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionY: 'center' }}>
      <div className='board_slogan'>{SetNativeTranslate(Translate.language, {
        russian: ['доска объявлений логайди'],
        english: ['logid bulletin board']
      })}</div>
    </div>
  )
})

export default BoardMainBanner