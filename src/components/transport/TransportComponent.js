import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DriverContext, FileContext, LinkContext, NotificationContext, TranslateContext, TransportContext, UserContext } from '../..'
import { fetchFile } from '../../http/fileApi'
import TransportForm from './TransportForm'
import TransportList from './TransportList'
import { Button } from '../ui/button/Button'
import Modal from '../ui/modal/Modal'
import { v4 } from "uuid";

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { useInput } from '../../hooks/useInput'

const Container = styled.div`
display:flex;
gap:5px;
align-items:center;
flex-direction:column;
`
const TransportComponent = observer(() => {
  const { Translate } = useContext(TranslateContext)
  const { Transport } = useContext(TransportContext)
  const { user } = useContext(UserContext)
  const { Notification } = useContext(NotificationContext)
  const [modalActive, setModalActive] = useState(false)
  const [files, setFiles] = useState([])
  const [pairs, setPairs] = useState([])
  const [formFunction, setFormFunction] = useState('')
  const [transportId, setTransportId] = useState('')
  const { link } = useContext(LinkContext)
  const { Driver } = useContext(DriverContext)


  const initialValue = {
    thermo_bag: false,
    hydraulic_platform: false,
    side_loading: false,
    glass_stand: false,
    refrigerator_minus: false,
    refrigerator_plus: false,
    thermo_van: false,
    userInfoId: undefined,
    tag: '',
    type: '',
    ad_name: '',
    ad_text: '',
    ad_show: true,
    id: undefined,
    driver_id: undefined
  }

  const [formData, setFormData] = useState(initialValue)

  const formReset = () => {
    formData.tag.setValue('')
    formData.tag.setDirty(false)
    formData.driver_id.setValue('')
    formData.driver_id.setDirty(false)
    formData.ad_text.setValue('')
    formData.ad_text.setDirty(false)
    formData.type.setValue('')
    formData.load_capacity.setValue('')
    formData.side_type.setValue('')
    formData.type.setDirty(false)
    formData.load_capacity.setDirty(false)
    formData.side_type.setDirty(false)
    setFormData(initialValue)
    setFiles([])
    setPairs([])
  }

  formData.load_capacity = useInput('', { isEmpty: true },)
  formData.side_type = useInput('', { isEmpty: true },)
  formData.type = useInput('', { isEmpty: true },)
  formData.driver_id = useInput(Driver.drivers.length === 0 ? user.user.id : '', { isEmpty: true },)
  const parent = 'TransportComponent'

  useEffect(() => {
    if (link.after_actions.add_transport_form) {
      setModalActive(true)
      link.setAfterActions(false, 'add_transport_form')
    }
  }, [])


  return (
    <Container>
      <Button
        onClick={() => {
          if (Transport.transports.length >= 10) {
            Notification.addNotification([{
              id: v4(), type: 'error', message: SetNativeTranslate(Translate.language,
                {
                  russian: ['В настоящий момент вы можете добавить не более 10 способов доставки, пожалуйсте удалите не актуальные'],
                  english: ['At the moment you can add no more than 10 delivery methods, please delete those that are not relevant'],
                  spanish: ['Actualmente no puede agregar más de 10 métodos de entrega; elimínelos si no son relevantes'],
                  turkish: ['Şu anda 10`dan fazla teslimat yöntemi ekleyemezsiniz; bunlar alakalı değilse lütfen silin'],
                  сhinese: ['目前您最多可以添加10种配送方式，请删除不相关的配送方式'],
                  hindi: ['वर्तमान में आप 10 से अधिक डिलीवरी विधियां नहीं जोड़ सकते हैं, कृपया जो प्रासंगिक नहीं हैं उन्हें हटा दें'],
                }
              )
            }])
          } else {
            setFormFunction('create')
            setModalActive(true)
          }
        }}
        style={{ marginTop: '10px' }}
      >{SetNativeTranslate(Translate.language, {}, 'add')}</Button>
      <Modal
        parent={parent}
        formReset={formReset}
        modalActive={modalActive}
        setModalActive={setModalActive}
      >
        <TransportForm
          formData={formData}
          setFormData={setFormData}
          formReset={formReset}
          setModalActive={setModalActive}
          pairs={pairs}
          setPairs={setPairs}
          files={files}
          setFiles={setFiles}
          formFunction={formFunction}
          transportId={transportId}
        />
      </Modal>
      <TransportList
        setModalActive={setModalActive}
        formData={formData}
        setFormData={setFormData}
        formReset={formReset}
        pairs={pairs}
        setPairs={setPairs}
        files={files}
        setFiles={setFiles}
        formFunction={formFunction}
        setFormFunction={setFormFunction}
        setTransportId={setTransportId}
      // formData,setFormData,formReset,pairs, setPairs, files, setFiles
      />
    </Container>
  )
})

export default TransportComponent