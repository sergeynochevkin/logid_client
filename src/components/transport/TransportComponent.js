import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FileContext, TranslateContext } from '../..'
import { fetchFile } from '../../http/fileApi'
import TransportForm from './TransportForm'
import TransportList from './TransportList'
import { Button } from '../ui/button/Button'
import Modal from '../ui/modal/Modal'

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
  const [modalActive, setModalActive] = useState(false)
 
 
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
  }

  const [formData, setFormData] = useState(initialValue)

  const formReset = () => {
    formData.tag.setValue('')
    formData.type.setValue('')
    formData.load_capacity.setValue('')
    formData.side_type.setValue('')
    formData.tag.setDirty(false)
    formData.type.setDirty(false)
    formData.load_capacity.setDirty(false)
    formData.side_type.setDirty(false)
    setFormData(initialValue)
  }

  formData.load_capacity = useInput('', { isEmpty: true },)
  formData.side_type = useInput('', { isEmpty: true },)
  formData.type = useInput('', { isEmpty: true },)

  const parent = 'TransportComponent'

  return (
    <Container>
      <Button
        onClick={() => {
          setModalActive(true)
        }}
        style={{ marginTop: '10px' }}
      >{SetNativeTranslate(Translate.language,{},'add')}</Button>
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
        />
      </Modal>
      <TransportList   
      />
    </Container>
  )
})

export default TransportComponent