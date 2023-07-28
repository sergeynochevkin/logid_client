import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ManagementContext, SettingContext, TranslateContext, UserContext } from '../../..'
import useComponentVisible from '../../../hooks/useComponentVisible'

import more from '../../../assets/icons/more.png'
import more_dark from '../../../assets/icons/more_dark.png'
import block from '../../../assets/icons/block.png'
import block_dark from '../../../assets/icons/block_dark.png'
import remove from '../../../assets/icons/remove.png'
import remove_dark from '../../../assets/icons/remove_dark.png'
import mail from '../../../assets/icons/mail.png'
import mail_dark from '../../../assets/icons/mail_dark.png'
import alert from '../../../assets/icons/alert.png'
import alert_dark from '../../../assets/icons/alert_dark.png'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import UsersItemActionMenu from './UsersItemActionMenu'
import Modal from '../../ui/modal/Modal'
import UsersItemActionModalContent from './UsersItemActionModalContent'



const UsersItem = observer(({ oneUser, selected, setSelected, initialValue, actionIcons, setActionIcons, modalActive, setModalActive, action, setAction, setGroup, formData, setFormData }) => {
    const { Setting } = useContext(SettingContext)
    const [actionMenuActive, setActionMenuActive] = useState(false)
    const { Translate } = useContext(TranslateContext)
    const { Management } = useContext(ManagementContext)
    const { user } = useContext(UserContext)

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='users_item_container'
                style={{ boxShadow: !formData.members.includes(oneUser.id) ? '' : `${Setting.app_theme === 'light' ? '0px 2.5px 5px 0px rgba(0, 0, 0, 0.5)' : '0px 2.5px 5px 0px rgba(255, 255, 255, 0.5)'}` }}
                onClick={() => {
                    if (!formData.members.includes(oneUser.id)) {
                        let data = [...formData.members]
                        data.push(oneUser.id)
                        setFormData({ ...formData, members: [...data] })
                    }
                    if (formData.members.includes(oneUser.id)) {
                        let data = [...formData.members.filter(el => el !== oneUser.id)]
                        setFormData({ ...formData, members: [...data] })
                    }
                }}
            >
                <div className={`users_item_properties_container ${Setting.app_theme}`}>
                    <div className='users_item_property'>{oneUser.email}</div>
                    <div className='users_item_property'>{SetNativeTranslate(Translate.language, '', oneUser.role)}</div>
                    <div className='users_item_property'>{SetNativeTranslate(Translate.language, '', oneUser.user_info.country)}</div>
                    <div className='users_item_property'>{oneUser.user_info.city}</div>
                    <div className='users_item_property'>{oneUser.transports.length}</div>
                    <div className='users_item_property'>{!Object.keys(oneUser.user_info).length === 0 && 'No profile!'}</div>
                </div>
                <div className='management_more_icon_container'>
                    <img
                        onClick={(event) => {
                            event.stopPropagation()
                            if (actionMenuActive) {
                                setActionMenuActive(false)
                                setFormData(initialValue)
                                setIsComponentVisible(false)
                                console.log(formData.members)
                            }
                            if (!actionMenuActive) {
                                setActionMenuActive(true)
                                setFormData(initialValue)
                                setFormData({ ...formData, members: [oneUser.id] })
                                setIsComponentVisible(true)
                                console.log(formData.members)
                            }
                        }}
                        className='management_more_icon' src={Setting.app_theme === 'light' ? more : more_dark} />
                    {actionMenuActive && isComponentVisible ?
                        <UsersItemActionMenu formData={formData} setFormData={setFormData} oneUser={oneUser} setActionMenuActive={setActionMenuActive} setAction={setAction} action={action} setActionIcons={setActionIcons} actionIcons={actionIcons} modalActive={modalActive} setModalActive={setModalActive} setGroup={setGroup} /> : <></>
                    }
                </div>
            </div>
        </>
    )
})

export default UsersItem