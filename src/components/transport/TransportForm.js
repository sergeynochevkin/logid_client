import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
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

const TransportForm = observer(({ setModalActive, formData, formReset, setFormData, parent }) => {
  const { UserInfo } = useContext(UserInfoContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const [filesFormData, setFilesFormData] = useState(new FormData)
  const [files, setFiles] = useState([])



  if (parent !== 'fast_sign_up') {
    formData.userInfoId = UserInfo.userInfo.id
  }

  const dataInit = (files) => {
    setFilesFormData(new FormData)

    files.forEach(file => {
      filesFormData.append('files', file, file.name)
    })

    return filesFormData
  }

  const click = async (event) => {
    event.preventDefault()
    try {
      let data;
      data = await createTransport(
        formData
      )
        .then(async data => {
          dataInit(files)
          console.log(filesFormData.getAll('files'))
          // filesFormData.append('option', 'transport')
          // filesFormData.append('id', data.id)
          // filesFormData.append('language', Translate.language)
          await uploadImages('transport', data.id, Translate.language, filesFormData)
        }
        )
      formReset()
      fetcher.setTransports(true)
      setModalActive(false)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className='transport_form_container'>
      <Form encType="multipart/form-data" >
        <TransportFormTag formData={formData} ></TransportFormTag>       
        
        <DragDropUpload filesFormData={filesFormData} files={files} setFiles={setFiles} parent={'transportForm'} formData={formData} setFormData={setFormData} length={10} extensions={['jpeg', 'png', 'jpg']} ></DragDropUpload>

        <TransportFormSection formData={formData} setFormData={setFormData} click={click} setModalActive={setModalActive} formReset={formReset} />
      </Form>
    </div>
  )
})

export default TransportForm