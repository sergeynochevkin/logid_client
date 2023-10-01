import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CardRow } from '../ui/card/CardRow'
import CardColValue from '../ui/card/CardColValue'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { DriverContext, FetcherContext, SettingContext, TranslateContext } from '../..'
import './Driver.css'
import { CardColName } from '../ui/card/CardColName'
import SettingItem from '../setting/SettingItem'
import { CardButton } from '../ui/button/CardButton'
import { updateSetting } from '../../http/settingApi'
import useComponentVisible from '../../hooks/useComponentVisible'
import Modal from '../ui/modal/Modal'

const DriverItem = observer(({ driver }) => {
  const { fetcher } = useContext(FetcherContext)
  const { Setting } = useContext(SettingContext)
  const { Driver } = useContext(DriverContext)

  const { Translate } = useContext(TranslateContext)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [images, setImages] = useState([])
  const [image, setImage] = useState({})
  const [modalActive, setModalActive] = useState(false)




  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

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

  useEffect(() => {
    if (Driver.images.find(el => el.id === driver.user_info.id)) {
      setImages(Driver.images.find(el => el.id === driver.user_info.id).urlsArray)
    }
  }, [])





  return (
    <>
      <div className={`item_container driver ${Setting.app_theme} `}>




        {images[0] &&
          <div
            onClick={(event) => {
              event.stopPropagation()
              setImage(images[0])
              setModalActive(true)
            }}
            className='driver_avatar_container' style={{ backgroundImage: `url(${images[0]})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
          </div>
        }


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

        <div ref={ref}>
          <CardButton onClick={() => {
            !isComponentVisible && setIsComponentVisible(true)
            isComponentVisible && setIsComponentVisible(false)
          }}>{isComponentVisible ?
            SetNativeTranslate(Translate.language, {
              russian: ['Скрыть настройки'],
              english: ['Hide settings'],
              spanish: ['Ocultar configuración'],
              turkish: ['Ayarları gizle'],
              сhinese: ['隐藏设置'],
              hindi: ['सेटिंग्स छिपाएँ'],
            })
            :
            SetNativeTranslate(Translate.language, {}, 'settings')
            }</CardButton>
          {isComponentVisible ?
            <div className='driver_settings_container'>{driver.user_info.user_app_settings.slice().sort(sortSetings).filter(el => el.name !== 'can_make_offer' && el.name !== 'can_set_order_as_disrupted').map(setting => <SettingItem key={setting.id} setting={setting} updateSettingAction={updateSettingAction} />)}</div> : <></>
          }
        </div>
      </div>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <div className='image_modal_container'>
          <img src={image} className='image_modal'></img>
        </div>
      </Modal>
    </>
  )
})

export default DriverItem