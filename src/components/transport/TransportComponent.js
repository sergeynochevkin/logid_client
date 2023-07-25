import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FileContext, NotificationContext, TranslateContext, TransportContext } from '../..'
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
  const { Notification } = useContext(NotificationContext)
  const [modalActive, setModalActive] = useState(false)
  const [files, setFiles] = useState([])
  const [pairs, setPairs] = useState([])
  const [formFunction, setFormFunction] = useState('')
  const [transportId, setTransportId] = useState('')


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
    ad_text: '',
    ad_show: false,
    id: ''
  }

  const [formData, setFormData] = useState(initialValue)

  const formReset = () => {
    formData.tag.setValue('')
    formData.tag.setDirty(false)
    if (formData.ad_show) {
      formData.ad_text.setValue('')
      formData.ad_text.setDirty(false)
    }
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



  const parent = 'TransportComponent'

  return (
    <Container>
      <Button
        onClick={() => {
          if (Transport.transports.length >= 5) {
            Notification.addNotification([{
              id: v4(), type: 'error', message: SetNativeTranslate(Translate.language,
                {
                  russian: ['В настоящий момент вы можете добавить не более 5 способов доставки, пожалуйсте удалите не актуальные'],
                  english: ['At the moment you can add no more than 5 delivery methods, please delete those that are not relevant']
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