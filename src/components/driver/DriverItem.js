import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { CardRow } from '../ui/card/CardRow'
import CardColValue from '../ui/card/CardColValue'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { TranslateContext } from '../..'
import './Driver.css'
import { CardColName } from '../ui/card/CardColName'

const DriverItem = observer(({ driver }) => {

  const { Translate } = useContext(TranslateContext)

  return (
    <CardRow>
      <CardColValue>{driver.id}</CardColValue>
      {/* <CardColValue>{driver.email}</CardColValue> */}
      <CardColValue>{driver.user_info.name_surname_fathersname}</CardColValue>
      <CardColValue>{driver.user_info.phone}</CardColValue>
      {driver.isActivated ?
        <>
          <CardColName>{SetNativeTranslate(Translate.language, {
            russian: ['Завершил заказов'],
            english: ['Finished orders'],
            spanish: ['Pedidos terminados'],
            turkish: ['Biten siparişler'],
            сhinese: ['已完成订单'],
            hindi: ['पूर्ण आदेश'],


          })}</CardColName><CardColValue>{driver.user_info.complete_orders_amount}</CardColValue>
        </> :
        <CardColValue>{SetNativeTranslate(Translate.language, {
          russian: ['Не активирован'],
          english: ['Not activated'],
          spanish: ['No activado'],
          turkish: ['Etkinleştirilmedi'],
          сhinese: ['未激活'],
          hindi: ['सक्रिय नहीं'],


        })}</CardColValue>
      }
    </CardRow>
  )
})

export default DriverItem