import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FetcherContext, NotificationContext, TranslateContext, UserInfoContext } from '../..'
import { createTransport, updateTransport } from '../../http/transportApi'
import { uploadFiles } from '../../http/fileApi'
import { Form } from '../ui/form/Form'
import TransportFormSection from './TransportFormSection'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import TransportFormTag from './TransportFormTag'
import './Transport.css'
import TransportFormAdText from './TransportFormAdText'
import { CheckBoxContainer } from '../ui/form/CheckBoxContainer'
import { CheckBoxSection } from '../ui/form/CheckBoxSection'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { v4 } from "uuid";
import { FieldName } from '../ui/page/FieldName'
import TransportFormAdName from './TransportFormAdName'

const TransportForm = observer(({ setModalActive, formData, formReset, setFormData, parent, pairs, setPairs, files, setFiles, formFunction, transportId }) => {
  const { UserInfo } = useContext(UserInfoContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
  const { Notification } = useContext(NotificationContext)
  const [filesFormData, setFilesFormData] = useState(new FormData)

  const [error, setError] = useState({ tag: true, ad_text: true, ad_name:true })

  let dataTransfer = new DataTransfer();
  let fileList

  if (parent !== 'fast_sign_up') {
    formData.userInfoId = UserInfo.userInfo.id
  }

  useEffect(() => {
    if (formData.ad_text.isEmpty) {
      formData.ad_show = false
    }
  }, [formData.ad_text.isEmpty])

  const dataInit = (files) => {
    files.forEach(file => {
      dataTransfer.items.add(file)
    })

    fileList = dataTransfer.files
  }

  const click = async (event) => {
    event.preventDefault()
    try {
      let data;

      if (formFunction === 'create') {
        data = await createTransport(
          formData
        )
          .then(async data => {
            dataInit(files)
            await uploadFiles('transport', data.id, Translate.language, formFunction, fileList).then(
              Notification.addNotification([{
                id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
                  {
                    russian: ['Транспорт добавлен'],
                    english: ['Transport created']
                  })
              }])
            )
          }
          )
      }

      if (formFunction === 'update' || formFunction === 'update_from_fast') {
        data = await updateTransport(
          formData
        )
          .then(async data => {
            dataInit(files)
            await uploadFiles('transport', transportId, Translate.language, formFunction, fileList).then(
              Notification.addNotification([{
                id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
                  {
                    russian: ['Транспорт обновлен'],
                    english: ['Transport updated']
                  })
              }])
            )
          }
          )
      }

      formReset()
      fetcher.setTransports(true)
      setModalActive(false)
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }

  return (
    <div className='transport_form_container'>
      <Form encType="multipart/form-data" >

        <TransportFormTag formData={formData} setError={setError} error={error} />

        <TransportFormAdName formData={formData} setError={setError} error={error} />
        <TransportFormAdText formData={formData} setError={setError} error={error} />

        <div className='transport_form_check_box_and_error_container'>
          <CheckBoxContainer >
            <CheckBoxSection >
              <input 
              // disabled={formData.ad_text.isEmpty || formData.ad_name.isEmpty}
               style={{ cursor: formData.ad_text.isEmpty || formData.ad_name.isEmpty ? 'not-allowed' : '' }} 
              type='checkbox' className='auth_checkbox' checked={formData.ad_show && 'checked'} value={formData.ad_show}

                onChange={() => {
                  let data = { ...formData }
                  if (!data.ad_show) {
                    data.ad_show = true
                  } else {
                    data.ad_show = false
                  }
                  setFormData(data)
                }}

              ></input>
              <>
                <label className='auth_check_box_label'  >{SetNativeTranslate(Translate.language, {
                  russian: [`Рекламировать транспорт на главной странице`],
                  english: [`Advertise transport on the main page`]
                })}</label>
              </>
            </CheckBoxSection>
          </CheckBoxContainer>
          <FieldName
            style={{
              fontWeight: 'normal',
              color: 'rgb(254, 111, 103,0.8)'
            }}
          >
            {
              formData.ad_text.isEmpty ?
                SetNativeTranslate(Translate.language, {
                  russian: ['Для показа рекламы заполните рекламный текст и имя'],
                  english: ['To display ads, fill in the ad text and name']
                }) :
                ''
            }
          </FieldName>
        </div>

        <DragDropUpload filesFormData={filesFormData} pairs={pairs} setPairs={setPairs} files={files} setFiles={setFiles} parent={'transportForm'} formData={formData} setFormData={setFormData} length={5} min_length={1} extensions={['jpeg', 'png', 'jpg']} ></DragDropUpload>

        <TransportFormSection formData={formData} setFormData={setFormData} click={click} setModalActive={setModalActive} formReset={formReset} files={files} formFunction={formFunction} error={error} />


      </Form>
    </div>
  )
})

export default TransportForm