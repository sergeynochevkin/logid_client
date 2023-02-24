import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext, TranslateContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'

const UsersItemActionModalContent = observer(({ action, setAction, actionIcons, setModalActive, handlingUser, group }) => {

    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    return (
        <div className={`users_action_menu_modal_container ${Setting.app_theme}`}>
            {!group ?
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
                        russian: ['Отправка email пользователям'],
                        english: ['Sending an email to users']
                    }) :
                        SetNativeTranslate(Translate.language, {
                            russian: ['Отправка уведомления пользователям'],
                            english: ['Sending an alert to users']
                        })
                }</div>
            }

            <textarea placeholder={action === 'mail' &&
                SetNativeTranslate(Translate.language, {
                    russian: ['Введите содержание сообщения'],
                    english: ['Enter message content']
                })
            } rows='5' className={`management_search ${Setting.app_theme}`} />

            {action === 'mail' || action === 'alert' ?

                <label className='management_checkbox_text'>
                    <input type={'checkbox'}></input>
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
                <img className='management_sync_icon' src={actionIcons.two} />
            </div>
        </div>
    )
})

export default UsersItemActionModalContent