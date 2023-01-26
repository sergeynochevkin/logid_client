import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { TranslateContext } from '../..'
import { useInput } from '../../hooks/useInput'
import { sendCaptureFormMail } from '../../http/mailApi'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import Phone from '../account/userInfoForm/Phone'
import { Button } from '../ui/button/Button'
import './CaptureForm.css'

const CaptureForm = observer(({ setCallRequested, section }) => {
    const { Translate } = useContext(TranslateContext)
    const [formSend, setFormSend] = useState(false)
    const [formData, setFormData] = useState(
        { phone: '' }
    )

    const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
    formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, SetNativeTranslate(Translate.language, {}, 'phone_content').toLowerCase())


    return (
        <div className='capture_form_container'>

            {!formSend ?
                <>
                    <div className='capture_form_title'>{SetNativeTranslate(Translate.language, {
                        russian: ['У вас есть вопросы?'],
                        english: ['Do you have any questions?']
                    })}</div>
                    <Phone formData={formData} />
                    <Button
                        disabled={formData.phone.notValid}
                        onClick={() => {
                            sendCaptureFormMail(formData.phone.value, section.header.toLowerCase())
                            setFormSend(true)
                            setTimeout(() => {
                                setCallRequested(true)
                            }, 2000)
                        }}
                    >{SetNativeTranslate(Translate.language, {
                        russian: ['Заказать звонок'],
                        english: ['Request a call']
                    })}</Button>
                </>
                : <div className='capture_form_title'>{SetNativeTranslate(Translate.language, {
                    russian: ['Мы свяжемся с вами в течении 24 часов'],
                    english: ['We will contact you within 24 hours']
                })}</div>}
        </div>
    )
})

export default CaptureForm