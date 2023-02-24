import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { SettingContext, TranslateContext } from '../../..'
import { sendManagementNotification } from '../../../http/managementApi'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'

const UsersItemActionModalContent = observer(({ action, setAction, actionIcons, setModalActive, handlingUser, formData, setFormData, initialValue }) => {

    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const [checked, setChecked] = useState(false)

    const sendNotificationAction = async () => {
        await sendManagementNotification(formData)
    }

    const sortUsers = (a, b) => {
        if (a && b) {
            if (a > b) {
                return 1
            } else {
                return -1
            }
        } else {
            return
        }
    }

    return (
        <div className={`users_action_menu_modal_container ${Setting.app_theme}`}>
            {formData.members.length === 1 ?
                <div className='users_action_menu_header'>{
                    action === 'mail' ? SetNativeTranslate(Translate.language, {
                        russian: ['Отправка email пользователю', handlingUser.email],
                        english: ['Sending an email to a user', handlingUser.email]
                    }) :
                        SetNativeTranslate(Translate.language, {
                            russian: ['Отправка уведомления пользователю', handlingUser.email],
                            english: ['Sending an alert to a user', handlingUser.email]
                        })
                }</div>
                :
                <div className='users_action_menu_header'>{
                    action === 'mail' ? SetNativeTranslate(Translate.language, {
                        russian: ['Отправка email пользователям', formData.members.sort(sortUsers).join(', ')],
                        english: ['Sending an email to users', formData.members.sort(sortUsers).join(', ')]
                    }) :
                        SetNativeTranslate(Translate.language, {
                            russian: ['Отправка уведомления пользователям'],
                            english: ['Sending an alert to users']
                        })
                }</div>
            }

            <input placeholder={
                SetNativeTranslate(Translate.language, {
                    russian: ['Введите тему сообщения'],
                    english: ['Enter message subject']
                })
            } className={`management_search ${Setting.app_theme}`} value={formData.message}
                onChange={(event) => {
                    setFormData({ ...formData, subject: event.target.value })
                }}
            />
            <textarea placeholder={
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
                    <input type={'checkbox'} checked={formData.type === 'mail_alert'} value={checked}
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

            <div className='users_action_menu_modal_buttons_container'>
                <img className='management_sync_icon' src={actionIcons.one}
                    onClick={() => {
                        setModalActive(false)
                    }}
                />
                <img className='management_sync_icon' src={actionIcons.two}
                    onClick={() => {
                        sendNotificationAction()
                        setFormData(initialValue)
                        //add loader and message
                        setTimeout(() => {
                            setModalActive(false)
                        }, 500)
                    }}
                />
            </div>
        </div>
    )
})

export default UsersItemActionModalContent