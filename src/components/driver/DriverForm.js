import React, { useContext, useState } from 'react'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { observer } from 'mobx-react-lite'
import { FieldName } from '../ui/page/FieldName'
import { TranslateContext } from '../..'
import { Input } from '../ui/form/Input'
import { useInput } from '../../hooks/useInput'
import { CardButton } from '../ui/button/CardButton'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import { Form } from '../ui/form/Form'
import NameSurNameFathersName from '../account/userInfoForm/NameSurNameFathersName'

const DriverForm = observer(({ files, pairs, setFiles, setPairs }) => {
    const { Translate } = useContext(TranslateContext)
    const [formData, setFormData] = useState({})
    const [comparePassword, setComparePassword] = useState('')
    const [comparePasswordActive, setComparePasswordActive] = useState(false)
    const [filesFormData, setFilesFormData] = useState(new FormData)




    const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
    formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, SetNativeTranslate(Translate.language, {}, 'phone_content'))
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    formData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, SetNativeTranslate(Translate.language, {
        russian: ['email'],
        english: ['email']
    }))
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/
    formData.password = useInput('', { isEmpty: true, minLength: 6, maxLength: 20, validFormat: validPassword }, SetNativeTranslate(Translate.language, {
        russian: ['пароль'],
        english: ['password']
    }))
    formData.name_surname_fathersname = useInput('', { isEmpty: true, minLength: 10, maxLength: 50 }, SetNativeTranslate(Translate.language, {}, 'name_surname_fathersname_content').toLowerCase())

    return (
        <Form encType="multipart/form-data" >


            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder={SetNativeTranslate(Translate.language, {
                    russian: ['Телефон водителя'],
                    english: ['Drivers phone']
                }, '')}
                    value={formData.phone.value}
                    onChange={(e) => formData.phone.onChange(e)}
                    onBlur={e => formData.phone.onBlur(e)}
                    type="text" name="phone" id='phone'
                    style={{ borderLeft: formData.phone.notValid || formData.phone.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                ></Input>
                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}
                >
                    {(formData.phone.isEmpty && formData.phone.isDirty) || (formData.phone.minLengthError) || (formData.phone.maxLengthError) || (formData.phone.formatError) ?
                        formData.phone.errorMessage :
                        ''
                    }
                </FieldName>

            </VerticalContainer>
            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder={SetNativeTranslate(Translate.language, {
                    russian: ['Email водителя'],
                    english: ['Drivers email']
                })}
                    value={formData.email.value}
                    style={{ borderLeft: (formData.email.notValid || formData.email.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    onChange={(e) => formData.email.onChange(e)}
                    onBlur={e => formData.email.onBlur(e)}
                    type="text"
                    autoComplete='email'
                ></Input>

                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}
                >
                    {(formData.email.isEmpty && formData.email.isDirty) || (formData.email.minLengthError) || (formData.email.maxLengthError) || (formData.email.formatError) ?
                        formData.email.errorMessage :
                        ''
                    }
                </FieldName>
            </VerticalContainer>

            <NameSurNameFathersName formData={formData} setFormData={setFormData} />

            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder={SetNativeTranslate(Translate.language, {
                    russian: ['Пароль водителя'],
                    english: ['Drivers password']
                })}
                    style={{ borderLeft: formData.password.notValid || formData.password.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    value={formData.password.value}
                    onChange={(e) => formData.password.onChange(e)} onBlur={e => formData.password.onBlur(e)} type="password" name="password"
                    autoComplete='current-password'
                ></Input>
                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}
                >
                    {(formData.password.isEmpty && formData.password.isDirty) || (formData.password.minLengthError) || (formData.password.maxLengthError) ?
                        formData.password.errorMessage : (formData.password.formatError) ? SetNativeTranslate(Translate.language, {}, 'password_hint') :
                            ''
                    }
                </FieldName>
            </VerticalContainer>
            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder={SetNativeTranslate(Translate.language, {}, 'password_repeat')} value={comparePassword} onChange={(e) => {
                    setComparePassword(e.target.value)
                    setComparePasswordActive(true)
                }}
                    style={{ borderLeft: formData.password.value !== comparePassword || !comparePassword ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    onBlur={e => formData.password.onBlur(e)}
                    type="password"
                    autoComplete='new-password'
                ></Input>
                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}
                >
                    {formData.password.value !== comparePassword && comparePasswordActive && !formData.password.isEmpty ?
                        SetNativeTranslate(Translate.language, {}, 'compare_passwords') : ''
                    }
                </FieldName>
            </VerticalContainer>

            <DragDropUpload filesFormData={filesFormData} pairs={pairs} setPairs={setPairs} files={files} setFiles={setFiles} parent={'driver_form'} formData={formData} setFormData={setFormData} length={1} min_length={1} extensions={['jpeg', 'png', 'jpg']} />

            <CardButton>{SetNativeTranslate(Translate.language, {}, 'add')}</CardButton>

            <div>Text about drivers account and responsibility</div>
        </Form>

    )
})

export default DriverForm