import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CardRow } from '../ui/card/CardRow'
import CardColValue from '../ui/card/CardColValue'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { FetcherContext, SettingContext, TranslateContext } from '../..'
import './Driver.css'
import { CardColName } from '../ui/card/CardColName'
import SettingItem from '../setting/SettingItem'
import { CardButton } from '../ui/button/CardButton'
import { updateSetting } from '../../http/settingApi'

const DriverItem = observer(({ driver }) => {
  const { fetcher } = useContext(FetcherContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const [settingsVisible, setSettingsVisible] = useState(false)


  const updateSettingAction = async (setting) => {
    if (setting.value === false) {
      await updateSetting(setting.id, true, driver.user_info.id)
      fetcher.setDrivers(true)
    }
    if (setting.value === true) {
      await updateSetting(setting.id, false, driver.user_info.id)
      fetcher.setDrivers(true)
    }
  }

  const sortSetings = (a, b) => {
    if (a.id > b.id) {
      return 1
    } else {
      return -1
    }
  }


  return (
    <div className={`item_container driver ${Setting.app_theme} `}>
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
      <CardButton onClick={() => {
        settingsVisible && setSettingsVisible(false)
        !settingsVisible && setSettingsVisible(true)
      }}>{settingsVisible ? 
      SetNativeTranslate(Translate.language,{
        russian: ['Скрыть настройки'],
        english: ['Hide settings'],
          spanish: ['Ocultar configuración'],
          turkish: ['Ayarları gizle'],
          сhinese: ['隐藏设置'],
          hindi: ['सेटिंग्स छिपाएँ'],
      })
       : 
       SetNativeTranslate(Translate.language,{}, 'settings')
       }</CardButton>
      <img></img>
      {settingsVisible && driver.user_info.user_app_settings.slice().sort(sortSetings).filter(el=>el.name !=='can_make_offer' && el.name !=='can_set_order_as_disrupted').map(setting => <SettingItem key={setting.id} setting={setting} updateSettingAction={updateSettingAction} />)}
    </div>
  )
})

export default DriverItem