import React from 'react'
import { deleteTransport } from '../../http/transportApi'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardContainer } from '../ui/card/CardContainer'
import { CardEquipment } from '../ui/card/CardEquipment'
import { CardRow } from '../ui/card/CardRow'
import { EquipmentRow } from '../ui/card/EquipmentRow'
import { SetTranslate } from '../../modules/SetTranslate'
import { TranslateContext } from '../..'


const TransportItem = ({ oneTransport, setFetchStart, files }) => {
  const { Translate } = useContext(TranslateContext)
  const deleteClick = async () => {
    await deleteTransport(oneTransport.id);
    setFetchStart(true)
  }

  return (
    <CardContainer>
      <CardRow>
        <CardColName>{SetTranslate(Translate.language,'id')}</CardColName>
        <CardColValue>{oneTransport.id}</CardColValue>
      </CardRow>
      <CardRow>
        <CardColName>{SetTranslate(Translate.language,'transport_tag_field_name')}</CardColName>
        <CardColValue>{oneTransport.tag}</CardColValue>
      </CardRow>
      <CardRow>
        <CardColName>{SetTranslate(Translate.language,'transport_type_field_name')}</CardColName>
        <CardColValue>
          {SetTranslate(Translate.language,oneTransport.type)}
        </CardColValue>
      </CardRow>
      {oneTransport.type === 'minibus' || oneTransport.type === 'truck' ?

        <CardRow>
          <CardColName>{SetTranslate(Translate.language,'load_capacity')}</CardColName>
          <CardColValue>
            {SetTranslate(Translate.language,oneTransport.load_capacity)}
          </CardColValue>
        </CardRow>
        :
        <></>
      }

      {oneTransport.type === 'truck' ?
        <CardRow>
          <CardColName>{SetTranslate(Translate.language,'side_type')}</CardColName>
          <CardColValue>
            {SetTranslate(Translate.language,oneTransport.side_type)}
          </CardColValue>
        </CardRow>
        :
        <></>
      }
      <EquipmentRow>
        {oneTransport.thermo_bag === true ? <CardEquipment>{SetTranslate(Translate.language,'thermo_bag')}</CardEquipment> : <></>}
        {oneTransport.thermo_van === true ? <CardEquipment>{SetTranslate(Translate.language,'thermo_van')}</CardEquipment> : <></>}
        {oneTransport.refrigerator_minus === true ? <CardEquipment>{SetTranslate(Translate.language,'refrigerator_minus')}</CardEquipment> : <></>}
        {oneTransport.refrigerator_plus === true ? <CardEquipment>{SetTranslate(Translate.language,'refrigerator_plus')}</CardEquipment> : <></>}
        {oneTransport.hydraulic_platform === true ? <CardEquipment>{SetTranslate(Translate.language,'hydraulic_platform')}</CardEquipment> : <></>}
        {oneTransport.side_loading === true ? <CardEquipment>{SetTranslate(Translate.language,'side_loading')}</CardEquipment> : <></>}
        {oneTransport.glass_stand === true ? <CardEquipment>{SetTranslate(Translate.language,'glass_stand')}</CardEquipment> : <></>}
      </EquipmentRow>
      {/* output images from the url array, you need to form such an array to do this, get names from multer*/}
      <img src={oneTransport.image}></img>
      <CardRow>
        <CardButton onClick={deleteClick}>{SetTranslate(Translate.language,'delete')}</CardButton>
      </CardRow>
    </CardContainer>
  )
}

export default TransportItem

