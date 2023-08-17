import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { AdressContext, ComponentFunctionContext, TranslateContext } from '../..'
import { useInput } from '../../hooks/useInput'
import { sendCaptureFormMail } from '../../http/mailApi'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import Phone from '../account/userInfoForm/Phone'
import { Button } from '../ui/button/Button'
import { CheckBoxContainer } from '../ui/form/CheckBoxContainer'
import { CheckBoxSection } from '../ui/form/CheckBoxSection'
import './CaptureForm.css'

const CaptureForm = observer(({ setCallRequested, section }) => {
    const { Translate } = useContext(TranslateContext)
    const [formSend, setFormSend] = useState(false)
    const [agreement, setAgreement] = useState(false)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Adress } = useContext(AdressContext)

    const [formData, setFormData] = useState(
        { phone: '' }
    )

    const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
    formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, SetNativeTranslate(Translate.language, {}, 'phone_content'))


    return (
        <div className='capture_form_container'>

            {!formSend ?
                <>
                    <div className='capture_form_title'>{SetNativeTranslate(Translate.language, {
                        russian: ['У вас есть вопросы?'],
                        english: ['Do you have any questions?']
                    })}</div>
                    <Phone formData={formData} />

                    {Adress.country.value === 'russia' &&
                        <CheckBoxContainer >
                            <CheckBoxSection >
                                <input type='checkbox' className='auth_checkbox' checked={agreement && 'checked'} value={agreement} onChange={() => {
                                    !agreement ? setAgreement(true) :
                                        setAgreement(false)
                                }}></input>
                                <label className='auth_check_box_label' >
                                    <div className='auth_checkbox_text'>
                                        <div>{SetNativeTranslate(Translate.language, {
                                            russian: [`подтвердите`],
                                            english: [`confirm your`]
                                        })}</div>
                                        <div className='auth_agreement_link'
                                            onClick={() => {
                                                ComponentFunction.setAgreement('PersonalDataAgreement')
                                                ComponentFunction.setAgreementModal(true)
                                            }}
                                        >
                                            {SetNativeTranslate(Translate.language, {
                                                russian: [`согласие на обработку персональных данных`],
                                                english: [`consent to the processing of personal data`]
                                            })}
                                        </div>
                                    </div>
                                </label>
                            </CheckBoxSection>
                        </CheckBoxContainer>
                    }

                    <Button
                        disabled={formData.phone.notValid || (!agreement && Adress.country.value === 'russia')}
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