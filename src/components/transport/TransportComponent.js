import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FileContext, TransportContext, UserInfoContext } from '../..'
import { useFetching } from '../../hooks/useFetching'
import { fetchFile } from '../../http/fileApi'
import { fetchTransport } from '../../http/transportApi'
import TransportForm from './TransportForm'
import TransportList from './TransportList'
import { Button } from '../ui/button/Button'
import Modal from '../ui/modal/Modal'

const Container = styled.div`
display:flex;
gap:5px;
align-items:center;
flex-direction:column;
`
const TransportComponent = observer(() => {
  const [fetchStart, setFetchStart] = useState(false)
  const { UserInfo } = useContext(UserInfoContext)
  const { Transport } = useContext(TransportContext)
  const [modalActive, setModalActive] = useState(false)
 

  const [fetching, error] = useFetching(async () => {
    await fetchTransport(UserInfo.userInfo.id).then(async data => {
      Transport.setTransports(data);
    }).then(setFetchStart(false))
  })

  useEffect(() => {
    fetching()
  }, [fetchStart])

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

  const parent = 'TransportComponent'

  return (
    <Container>
      <Button
        onClick={() => {
          setModalActive(true)
        }}
        style={{ marginTop: '10px' }}
      >Добавить транспорт</Button>
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
          fetchStart={fetchStart}
          setFetchStart={setFetchStart}
          setModalActive={setModalActive}
        />
      </Modal>
      <TransportList
        fetchStart={fetchStart}
        setFetchStart={setFetchStart}
      />
    </Container>
  )
})

export default TransportComponent