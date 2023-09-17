import React, { useEffect, useState } from 'react'
import { deleteTransport } from '../../http/transportApi'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardContainer } from '../ui/card/CardContainer'
import { CardEquipment } from '../ui/card/CardEquipment'
import { CardRow } from '../ui/card/CardRow'
import { EquipmentRow } from '../ui/card/EquipmentRow'
import { DriverContext, FetcherContext, NotificationContext, SettingContext, TranslateContext, TransportContext, UserContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import Modal from '../ui/modal/Modal'
import { v4 } from "uuid";
import { Link } from 'react-router-dom'
import link from '../../assets/icons/link.png';
import link_dark from '../../assets/icons/link_dark.png';


const TransportItem = observer(({ oneTransport, setModalActive, formData, setFormData, formReset, pairs, setPairs, files, setFiles, setFormFunction, setTransportId }) => {
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { Transport } = useContext(TransportContext)
  const { Notification } = useContext(NotificationContext)
  const { user } = useContext(UserContext)
  const { Driver } = useContext(DriverContext)
  const { Setting } = useContext(SettingContext)
  const [modalActive1, setModalActive1] = useState(false)
  const [image, setImage] = useState('')
  const [images, setImages] = useState([])


  useEffect(() => {
    if (Transport.transport_images.find(el => el.id === oneTransport.id)) {
      setImages(Transport.transport_images.find(el => el.id === oneTransport.id).urlsArray)
    }
  }, [Transport.transport_images])

  const deleteClick = async () => {
    try {
      await deleteTransport(oneTransport.id).then(data => Notification.addNotification([{ id: v4(), type: 'error', message: data }]))
      fetcher.setTransports(true)
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }


  const editClick = async () => {
    setFormFunction(oneTransport.from_fast ? 'update_from_fast' : 'update')
    setTransportId(oneTransport.id)

    formData.type.setValue(oneTransport.type)
    formData.tag.setValue(oneTransport.tag)
    formData.driver_id.setValue(oneTransport.driver_id)
    formData.side_type.setValue(oneTransport.side_type)
    formData.load_capacity.setValue(oneTransport.load_capacity)
    formData.ad_text.setValue(oneTransport.ad_text)
    formData.thermo_bag = oneTransport.thermo_bag
    formData.hydraulic_platform = oneTransport.hydraulic_platform
    formData.side_loading = oneTransport.side_loading
    formData.glass_stand = oneTransport.glass_stand
    formData.refrigerator_minus = oneTransport.refrigerator_minus
    formData.refrigerator_plus = oneTransport.refrigerator_plus
    formData.thermo_van = oneTransport.thermo_van
    formData.ad_show = oneTransport.ad_show
    formData.id = oneTransport.id
    formData.ad_name = oneTransport.ad_name


    let blob
    const createImage = async (image) => {
      blob = await fetch(image).then(r => r.blob()).then(data => {
        let newFile = new File([data], `${v4()}.${data.type.split('/')[1]}`, { type: data.type })
        let newPair = { file: newFile, url: URL.createObjectURL(newFile) }
        newFiles.push(newFile)
        newPairs.push(newPair)
      })
      setFiles([...files, ...newFiles])
      setPairs([...pairs, ...newPairs])
    }

    let newFiles = []
    let newPairs = []

    for (const image of images) {
      createImage(image)
    }

    setModalActive(true)
  }

  // thermo_bag: false,
  // hydraulic_platform: false,
  // side_loading: false,
  // glass_stand: false,
  // refrigerator_minus: false,
  // refrigerator_plus: false,
  // thermo_van: false,
  // userInfoId: undefined,
  // tag: '',
  // type: '',
  // ad_text: '',
  // ad_show: false




  return (
    <CardContainer>
      <CardRow>
        <CardColName>{SetNativeTranslate(Translate.language, {}, 'id')}</CardColName>
        <CardColValue>{oneTransport.id}</CardColValue>
      </CardRow>
      <CardRow>
        <CardColName>{SetNativeTranslate(Translate.language, {}, 'transport_tag_field_name')}</CardColName>
        <CardColValue>{oneTransport.tag}</CardColValue>
      </CardRow>
      <CardRow>
        <CardColName>{SetNativeTranslate(Translate.language, {}, 'transport_type_field_name')}</CardColName>
        <CardColValue>
          {SetNativeTranslate(Translate.language, {}, oneTransport.type)}
        </CardColValue>
      </CardRow>
      {oneTransport.driver_id &&
        <CardRow><CardColName>{SetNativeTranslate(Translate.language, {
          russian: ['Водитель'],
          english: ['Driver'],
          spanish: ['Conductor'],
          turkish: ['Sürücü'],
          сhinese: ['司机'],
          hindi: ['चालक'],
        })}</CardColName><CardColValue>{oneTransport.driver_id === user.user.id ? SetNativeTranslate(Translate.language, {
          russian: ['Вы'],
          english: ['You'],
          spanish: ['Sen'],
          turkish: ['Sen'],
          сhinese: ['你'],
          hindi: ['आप'],
        }) : Driver.drivers.find(el => el.id === oneTransport.driver_id).user_info?.name_surname_fathersname}</CardColValue></CardRow>
      }
      {oneTransport.type === 'minibus' || oneTransport.type === 'truck' ?

        <CardRow>
          <CardColName>{SetNativeTranslate(Translate.language, {}, 'load_capacity')}</CardColName>
          <CardColValue>
            {SetNativeTranslate(Translate.language, {}, oneTransport.load_capacity)}
          </CardColValue>
        </CardRow>
        :
        <></>
      }

      {oneTransport.type === 'truck' ?
        <CardRow>
          <CardColName>{SetNativeTranslate(Translate.language, {}, 'side_type')}</CardColName>
          <CardColValue>
            {SetNativeTranslate(Translate.language, {}, oneTransport.side_type)}
          </CardColValue>
        </CardRow>
        :
        <></>
      }
      <EquipmentRow>
        {oneTransport.thermo_bag === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'thermo_bag')}</CardEquipment> : <></>}
        {oneTransport.thermo_van === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'thermo_van')}</CardEquipment> : <></>}
        {oneTransport.refrigerator_minus === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'refrigerator_minus')}</CardEquipment> : <></>}
        {oneTransport.refrigerator_plus === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'refrigerator_plus')}</CardEquipment> : <></>}
        {oneTransport.hydraulic_platform === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'hydraulic_platform')}</CardEquipment> : <></>}
        {oneTransport.side_loading === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'side_loading')}</CardEquipment> : <></>}
        {oneTransport.glass_stand === true ? <CardEquipment>{SetNativeTranslate(Translate.language, {}, 'glass_stand')}</CardEquipment> : <></>}
      </EquipmentRow>

      {oneTransport.ad_name &&
        <CardRow>          <CardColName>{SetNativeTranslate(Translate.language, {
          english: ['Advertising name'],
          russian: ['Имя для рекламы'],
          spanish: ['Nombre publicitario'],
          turkish: ['Reklam adı'],
          сhinese: ['广告名称'],
          hindi: ['विज्ञापन का नाम'],

        })}</CardColName>
          <CardColValue>{oneTransport.ad_name}</CardColValue>
        </CardRow>
      }
      {oneTransport.ad_text &&
        <>
          <CardColName>{SetNativeTranslate(Translate.language, {
            english: ['Advertising text'],
            russian: ['Рекламный текст'],
            spanish: ['Texto publicitario'],
            turkish: ['Reklam metni'],
            сhinese: ['广告文字'],
            hindi: ['विज्ञापन पाठ'],

          })}</CardColName>
          <CardColValue>{oneTransport.ad_text}</CardColValue>
        </>}
      <CardRow>      {oneTransport.ad_show && oneTransport.moderated === 'checked_accepted' ? <CardEquipment style={{ backgroundColor: 'rgb(129, 199, 132,0.8)' }}>{SetNativeTranslate(Translate.language, {
        english: ['Shown on main page'],
        russian: ['Показывается на главной'],
        spanish: ['Mostrado en la página principal'],
        turkish: ['Ana sayfada gösterilir'],
        сhinese: ['显示在主页上'],
        hindi: ['मुख्य पृष्ठ पर दिखाया गया है'],

      })}</CardEquipment> : oneTransport.ad_show && oneTransport.moderated === 'not_checked' ?
        <CardEquipment style={{ backgroundColor: 'rgb(254, 145, 40,0.8)' }}>{SetNativeTranslate(Translate.language, {
          english: ['Moderation'],
          russian: ['На модерации'],
          spanish: ['Moderación'],
          turkish: ['Moderasyon'],
          сhinese: ['适度'],
          hindi: ['संयम'],

        })}</CardEquipment> : oneTransport.ad_show && oneTransport.moderated === 'checked_not_accepted' ?
          <CardEquipment style={{ backgroundColor: 'rgb(254, 111, 103,0.8)' }}>{SetNativeTranslate(Translate.language, {
            english: [`Not accepted ${oneTransport.moderation_comment}`],
            russian: [`Отклонено ${oneTransport.moderation_comment}`],
            spanish: [`Rechazado ${oneTransport.moderation_comment}`],
            turkish: [`Reddedilmiş ${oneTransport.moderation_comment}`],
            сhinese: ['拒绝'],
            hindi: ['अस्वीकार कर दिया'],

          })}</CardEquipment> : <></>
      }
        {oneTransport.ad_show && oneTransport.moderated === 'checked_accepted' ? <Link to={`/board/item/${oneTransport.id}`}>
          <img className='nav_bar_theme_icon' src={Setting.app_theme === 'light' ? link : link_dark}></img>
        </Link> : <></>}
      </CardRow>


      <CardRow>
        <CardButton onClick={deleteClick}>{SetNativeTranslate(Translate.language, {}, 'delete')}</CardButton>

        <CardButton onClick={editClick}>{SetNativeTranslate(Translate.language, {
          russian: ['Редактировать'],
          english: ['Edit'],
          spanish: ['Editar'],
          turkish: ['Düzenlemek'],
          сhinese: ['编辑'],
          hindi: ['संपादन करना'],

        })}</CardButton>
      </CardRow>

      <div className='image_container'>
        {images.length > 0 ? images.map(image => <img src={image} className='image_icon' key={image}
          onClick={() => {
            setModalActive1(true);
            setImage(image)
          }}
        ></img>) : <></>}
      </div>

      <Modal modalActive={modalActive1} setModalActive={setModalActive1}>
        <div className='image_modal_container'>
          <img src={image} className='image_modal'></img>
        </div>
      </Modal>

    </CardContainer>
  )
})

export default TransportItem

