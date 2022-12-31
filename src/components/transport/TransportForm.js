import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { FetcherContext, TranslateContext, UserInfoContext } from '../..'
import { createTransport } from '../../http/transportApi'
import { uploadImages } from '../../http/fileApi'
import { Form } from '../ui/form/Form'
import TransportFormSection from './TransportFormSection'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import TransportFormTag from './TransportFormTag'
import './Transport.css'

const Container = styled.div`
display:flex;
gap:10px;
align-items:center;
flex-direction:column;`

const TransportForm = observer(({ setModalActive, formData, formReset, setFormData }) => {
  const { UserInfo } = useContext(UserInfoContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)

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
          await uploadImages(filesFormData, Translate.language)

          //log
          for (const value of filesFormData.values()) {
            // console.log(value);
          };
          for (const key of filesFormData.keys()) {
            // console.log(key);
          }
        })
      formReset()
      fetcher.setTransports(true)
      setModalActive(false)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className='transport_form_container'>
      <Form enctype="multipart/form-data">
        <TransportFormTag formData={formData}></TransportFormTag>
        {/* <DragDropUpload filesFormData={filesFormData} parent={'transportForm'} formData={formData} setFormData={setFormData} length={10} extensions={['jpeg', 'png', 'jpg']} ></DragDropUpload> */}
        <TransportFormSection formData={formData} setFormData={setFormData} click={click} setModalActive={setModalActive} formReset={formReset} />
      </Form>
    </div>
  )
})

export default TransportForm