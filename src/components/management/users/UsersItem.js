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



const UsersItem = observer(({ oneUser, selected, setSelected, setAllSelected, allSelected }) => {
    const { Setting } = useContext(SettingContext)
    const [actionMenuActive, setActionMenuActive] = useState(false)
    const { Translate } = useContext(TranslateContext)
    const { Management } = useContext(ManagementContext)
    const { user } = useContext(UserContext)
    const [modalActive, setModalActive] = useState(false)
    const [action, setAction] = useState('')
    const [actionIcons, setActionIcons] = useState({
        one: '',
        two: '',
    })

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='users_item_container'
                style={{ boxShadow: selected.includes(oneUser.id) ? '' : `${Setting.app_theme === 'light' ? '0px 2.5px 5px 0px rgba(0, 0, 0, 0.5)' : '0px 2.5px 5px 0px rgba(255, 255, 255, 0.5)'}` }}
                onClick={() => {
                    if (!selected.includes(oneUser.id)) {
                        setSelected([...selected, oneUser.id])
                        if (selected.length + 1 === Management.users.length) {
                            setAllSelected(true)
                        }
                    }
                    selected.includes(oneUser.id) && setSelected(selected.filter(el => el !== oneUser.id))
                    if (selected.includes(oneUser.id) && allSelected) {
                        setAllSelected(false)
                    }
                }}
            >
                <div className={`users_item_properties_container ${Setting.app_theme}`}>
                    <div className='users_item_property'>{oneUser.email}</div>
                    <div className='users_item_property'>{SetNativeTranslate(Translate.language, '', oneUser.role)}</div>
                    <div className='users_item_property'>{SetNativeTranslate(Translate.language, '', oneUser.user_info.country)}</div>
                    <div className='users_item_property'>{oneUser.user_info.city}</div>
                    <div className='users_item_property'>{oneUser.transports.length}</div>
                </div>
                <div className='management_more_icon_container'>
                    <img
                        onClick={(event) => {
                            event.stopPropagation()
                            if (actionMenuActive) {
                                setActionMenuActive(false)
                                setIsComponentVisible(false)
                            }
                            if (!actionMenuActive) {
                                setActionMenuActive(true)
                                setIsComponentVisible(true)
                            }
                        }}
                        className='management_more_icon' src={Setting.app_theme === 'light' ? more : more_dark} />
                    {actionMenuActive && isComponentVisible ?
                        <UsersItemActionMenu setActionMenuActive={setActionMenuActive} setModalActive={setModalActive} setAction={setAction} action={action} setActionIcons={setActionIcons} actionIcons={actionIcons} /> : <></>
                    }
                </div>
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <UsersItemActionModalContent setAction={setAction} action={action} actionIcons={actionIcons} setModalActive={setModalActive} oneUser={oneUser}/>
            </Modal>
        </>
    )
})

export default UsersItem