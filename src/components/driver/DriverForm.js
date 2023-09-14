import React, { useContext, useEffect, useState } from 'react'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { observer } from 'mobx-react-lite'
import { FieldName } from '../ui/page/FieldName'
import { FetcherContext, NotificationContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { Input } from '../ui/form/Input'
import { useInput } from '../../hooks/useInput'
import { CardButton } from '../ui/button/CardButton'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import { Form } from '../ui/form/Form'
import NameSurNameFathersName from '../account/userInfoForm/NameSurNameFathersName'
import { driver_registration } from '../../http/userAPI'
import { v4 } from "uuid";


const DriverForm = observer(({ files, pairs, setFiles, setPairs, setModalActive }) => {
    const { Translate } = useContext(TranslateContext)
    const { Notification } = useContext(NotificationContext)
    const { fetcher } = useContext(FetcherContext)
    const [comparePassword, setComparePassword] = useState('')
    const [comparePasswordActive, setComparePasswordActive] = useState(false)
    const [filesFormData, setFilesFormData] = useState(new FormData)
    const { UserInfo } = useContext(UserInfoContext)
    const { user } = useContext(UserContext)

    let initialValue = {
        email: '', //from form
        role: 'driver', //from form
        phone: '', //from form
        name_surname_fathersname:'', //from form

        user_id: user.user.id,
        user_info_uuid: UserInfo.userInfo.uuid,

        // user_agreement_accepted: false,
        // privacy_policy_accepted: false,
        // age_accepted: false,
        // personal_data_agreement_accepted: false,
        // cookies_accepted: cookies_accepted,

        country: UserInfo.userInfo.country,
        legal: 'person',
        city: UserInfo.userInfo.city,
        city_place_id: UserInfo.userInfo.city_place_id,
        city_latitude: UserInfo.userInfo.city_latitude,
        city_longitude: UserInfo.userInfo.city_longitude

    }

    const [formData, setFormData] = useState(initialValue)


    const click = async (event) => {
        event.preventDefault()
        try {
            let data;
            data = await driver_registration(
                Translate.language,
                formData.email.value,
                formData.role,
                formData.phone.value,

                formData.user_id,
                formData.user_info_uuid,

                formData.country,
                formData.legal,
                formData.city,
                formData.city_place_id,
                formData.city_latitude,
                formData.city_longitude,

                formData.name_surname_fathersname.value

                // formData.user_agreement_accepted,
                // formData.privacy_policy_accepted,
                // formData.age_accepted,
                // formData.cookies_accepted.total,
                // formData.personal_data_agreement_accepted,                      

            )

            Notification.addNotification([{
                id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
                    {
                        russian: ['Водитель зарегистрирован, пароль отрправлен на его email'],
                        english: ['The driver is registered, the password have been sent to his email']
                    }
                )
            }])
            fetcher.setDrivers(true)
            setModalActive(false)
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }

    const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
    formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, SetNativeTranslate(Translate.language, {}, 'phone_content'))
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    formData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, SetNativeTranslate(Translate.language, {
        russian: ['email'],
        english: ['email']
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

            <CardButton
                onClick={click}>{SetNativeTranslate(Translate.language, {}, 'add')}</CardButton>

            {/* <div>Text about drivers account and responsibility</div> */}
        </Form>

    )
})

export default DriverForm