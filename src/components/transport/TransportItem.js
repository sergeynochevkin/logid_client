import React, { useEffect, useState } from 'react'
import { deleteTransport } from '../../http/transportApi'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardContainer } from '../ui/card/CardContainer'
import { CardEquipment } from '../ui/card/CardEquipment'
import { CardRow } from '../ui/card/CardRow'
import { EquipmentRow } from '../ui/card/EquipmentRow'

import { FetcherContext, TranslateContext, TransportContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import Modal from '../ui/modal/Modal'


const TransportItem = observer(({ oneTransport, files }) => {
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { Transport } = useContext(TransportContext)
  const [modalActive, setModalActive] = useState(false)
  const [image, setImage] = useState('')


  const deleteClick = async () => {
    await deleteTransport(oneTransport.id);
    fetcher.setTransports(true)
  }

  const [images, setImages] = useState([])

  useEffect(() => {
    if (Transport.transport_images.find(el => el.id === oneTransport.id)) {
      setImages(Transport.transport_images.find(el => el.id === oneTransport.id).urlsArray)
    }
  }, [Transport.transport_images])

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
      {/* output images from the url array, you need to form such an array to do this, get names from multer*/}
      {/* <img src={oneTransport.image}></img> */}
      <CardRow>
        <CardButton onClick={deleteClick}>{SetNativeTranslate(Translate.language, {}, 'delete')}</CardButton>
      </CardRow>

      <div className='image_container'>
        {images.length > 0 ? images.map(image => <img src={image} className='image_icon' key={image}
          onClick={() => {
            setModalActive(true);
            setImage(image)
          }}
        ></img>) : <></>}
      </div>

      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <div className='image_modal_container'>
          <img src={image} className='image_modal'></img>
        </div>
      </Modal>

    </CardContainer>
  )
})

export default TransportItem

