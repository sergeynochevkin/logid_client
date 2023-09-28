import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { DriverContext, TranslateContext, TransportContext, UserContext } from '../..'
import TransportItem from './TransportItem'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'

import NoData from '../ui/page/NoData'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


const TransportList = observer(({ setModalActive, formData, setFormData, formReset, pairs, setPairs, files, setFiles, setFormFunction, setTransportId }) => {
  const { Transport } = useContext(TransportContext)
  const { Translate } = useContext(TranslateContext)
  const { user } = useContext(UserContext)
  const { Driver } = useContext(DriverContext)

  return (

    <HorizontalContainer>
      {Transport.transports.length !== 0 ?
        <>
          {
            Transport.transports.map(oneTransport => <TransportItem
              key={oneTransport.id}
              oneTransport={oneTransport}
              oneDriver={Driver.drivers.find(el => el.user_info.id === oneTransport.driver_id)}
              setModalActive={setModalActive}
              formData={formData}
              setFormData={setFormData}
              formReset={formReset}
              pairs={pairs}
              setPairs={setPairs}
              files={files}
              setFiles={setFiles}
              setFormFunction={setFormFunction}
              setTransportId={setTransportId}
            />)
          }
        </>
        :
        user.user.role === 'carrier' ?
          <NoData
          >{SetNativeTranslate(Translate.language, {}, 'no_transport')}</NoData> : <NoData
          >{SetNativeTranslate(Translate.language, {
            russian: ['Нет транспорта, чтобы получать заказы, запросите добавление транспорта в своем автопарке'],
            english: ['There is no transport to receive orders, request adding transport to your fleet'],
            spanish: ['No hay transporte para recibir pedidos, solicita agregar transporte a tu flota'],
            turkish: ['Sipariş almak için nakliye bulunmuyor, filonuza nakliye eklenmesini talep edin'],
            сhinese: ['没有交通工具可以接收订单，请请求为您的车队添加交通工具'],
            hindi: ['ऑर्डर प्राप्त करने के लिए कोई परिवहन नहीं है, अपने बेड़े में परिवहन जोड़ने का अनुरोध करें'],
          })}</NoData>}

    </HorizontalContainer>
  )
})

export default TransportList