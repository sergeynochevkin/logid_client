import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserInfoContext } from '../..'
import { createTransport } from '../../http/transportApi'
import { uploadImages } from '../../http/fileApi'
import { Form } from '../ui/form/Form'
import TransportFormSection from './TransportFormSection'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import TransportFormTag from './TransportFormTag'
import { useInput } from '../../hooks/useInput'

const Container = styled.div`
display:flex;
gap:10px;
align-items:center;
flex-direction:column;`

const TransportForm = observer(({ setFetchStart, setModalActive, formData, formReset, setFormData }) => {
  const { UserInfo } = useContext(UserInfoContext)

  const filesFormData = new FormData()

  formData.userInfoId = UserInfo.userInfo.id
   
  
  const click = async (event) => {
    event.preventDefault()
    try { 
      let data;
      data = await createTransport(
        formData
      )
        .then(async data => {

          filesFormData.append('transportId', data.id)
          await uploadImages(filesFormData)

          
          //log
          for (const value of filesFormData.values()) {
            // console.log(value);
          };
          for (const key of filesFormData.keys()) {
            // console.log(key);
          }
        })
      formReset()
      setFetchStart(true)
      setModalActive(false)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container>
      <Form enctype="multipart/form-data">
        <TransportFormTag formData={formData}></TransportFormTag>
        <DragDropUpload filesFormData={filesFormData} parent={'transportForm'} formData={formData} setFormData={setFormData} length={10} extensions={['jpeg', 'png', 'jpg']} ></DragDropUpload>
        <TransportFormSection formData={formData} setFormData={setFormData} click={click} setModalActive={setModalActive} formReset={formReset} />
        </Form>
    </Container>
  )
})

export default TransportForm