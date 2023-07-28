import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { ManagementContext, SettingContext, TranslateContext } from '../../..'
import { sendManagementNotification } from '../../../http/managementApi'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'

const UsersItemActionModalContent = observer(({ action, setAction, actionIcons, setModalActive, formData, setFormData, initialValue }) => {

    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const [checked, setChecked] = useState(false)
    const { Management } = useContext(ManagementContext)

    const sendNotificationAction = async () => {
        await sendManagementNotification(formData)
    }

    return (
        <div className={`management_action_menu_modal_container ${Setting.app_theme}`}>
            {formData.members.length === 1 ?
                <div className='users_action_menu_header'>{
                    action === 'mail' ? SetNativeTranslate(Translate.language, {
                        russian: ['Отправка email пользователю', Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')],
                        english: ['Sending an email to a user', Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')]
                    }) :
                        SetNativeTranslate(Translate.language, {
                            russian: ['Отправка уведомления пользователю',Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')],
                            english: ['Sending an alert to a user', Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')]
                        })
                }</div>
                :
                <div className='management_action_menu_header'>{
                    action === 'mail' ? SetNativeTranslate(Translate.language, {
                        russian: ['Отправка email пользователям', Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')],
                        english: ['Sending an email to users', Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')]
                    }) :
                        SetNativeTranslate(Translate.language, {
                            russian: ['Отправка уведомления пользователям', Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')],
                            english: ['Sending an alert to users', Management.users.filter(el => formData.members.includes(el.id)).map(el => el.email).join(', ')]
                        })
                }</div>
            }

            <input 
             style={{ borderLeft: formData.subject === '' ? 'rgb(254, 111, 103,0.8) solid 1px' : '' }}
            placeholder={
                SetNativeTranslate(Translate.language, {
                    russian: ['Введите тему сообщения'],
                    english: ['Enter message subject']
                })
            } className={`management_search ${Setting.app_theme}`} value={formData.subject}
                onChange={(event) => {
                    setFormData({ ...formData, subject: event.target.value })
                }}
            />
            <textarea
                style={{ borderLeft: formData.message === '' ? 'rgb(254, 111, 103,0.8) solid 1px' : '' }}
                placeholder={
                    SetNativeTranslate(Translate.language, {
                        russian: ['Введите содержание сообщения'],
                        english: ['Enter message content']
                    })
                } rows='5' className={`management_search ${Setting.app_theme}`} value={formData.message}
                onChange={(event) => {
                    setFormData({ ...formData, message: event.target.value })
                }}
            />

            {action === 'mail' || action === 'alert' ?

                <label className='management_checkbox_text'>
                    <input className='management_checkbox' type={'checkbox'} checked={formData.type === 'mail_alert'} value={checked}
                        onChange={() => {
                            if (formData.type === 'mail_alert') {
                                setFormData({ ...formData, type: action })
                                setChecked(false)
                            } else {
                                setFormData({ ...formData, type: 'mail_alert' })
                                setChecked(true)
                            }
                        }}
                    ></input>
                    {
                        SetNativeTranslate(Translate.language, {
                            russian: ['дублировать', action === 'mail' ? 'в уведомлении' : 'на email'],
                            english: ['duplicate', action === 'mail' ? 'in notification' : 'to email']
                        })
                    }
                </label>

                : <></>}

            <div className='management_action_menu_modal_buttons_container'>
                <img className='management_sync_icon' src={actionIcons.one}
                    onClick={() => {
                        setModalActive(false)
                    }}
                />
                <img className={`management_sync_icon ${formData.subject === '' || !formData.messge === '' ? 'disabled' : ''}`} src={actionIcons.two}
                    onClick={() => {
                        if (formData.subject !=='' && formData.mesage !=='') {
                            sendNotificationAction()
                            //add loader and message
                            setTimeout(() => {
                                setModalActive(false)
                                setFormData(initialValue)
                            }, 500)
                        }
                    }}
                />
            </div>
        </div>
    )
})

export default UsersItemActionModalContent