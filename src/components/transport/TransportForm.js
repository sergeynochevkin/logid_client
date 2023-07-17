import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FetcherContext, TranslateContext, UserInfoContext } from '../..'
import { createTransport } from '../../http/transportApi'
import { uploadFiles } from '../../http/fileApi'
import { Form } from '../ui/form/Form'
import TransportFormSection from './TransportFormSection'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import TransportFormTag from './TransportFormTag'
import './Transport.css'

const TransportForm = observer(({ setModalActive, formData, formReset, setFormData, parent }) => {
  const { UserInfo } = useContext(UserInfoContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const [filesFormData, setFilesFormData] = useState(new FormData)
  const [files, setFiles] = useState([])

  let dataTransfer = new DataTransfer();
  let fileList

  if (parent !== 'fast_sign_up') {
    formData.userInfoId = UserInfo.userInfo.id
  }

  const dataInit = (files) => {
    setFilesFormData(new FormData())
    files.forEach(file => {
      dataTransfer.items.add(file)
    })

    fileList = dataTransfer.files
    // console.dir(fileList)
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
          await uploadFiles('transport', data.id, Translate.language, fileList)
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