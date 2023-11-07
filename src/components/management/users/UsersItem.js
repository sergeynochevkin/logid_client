import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ManagementContext, SettingContext, TranslateContext, UserContext } from '../../..'
import useComponentVisible from '../../../hooks/useComponentVisible'

import more from '../../../assets/icons/more.png'
import more_dark from '../../../assets/icons/more_dark.png'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import UsersItemActionMenu from './UsersItemActionMenu'
import Modal from '../../ui/modal/Modal'



const UsersItem = observer(({ oneUser, selected, setSelected, initialValue, actionIcons, setActionIcons, modalActive, setModalActive, action, setAction, setGroup, formData, setFormData }) => {
    const { Setting } = useContext(SettingContext)
    const [actionMenuActive, setActionMenuActive] = useState(false)
    const { Translate } = useContext(TranslateContext)
    const { Management } = useContext(ManagementContext)
    const { user } = useContext(UserContext)
    const [images, setImages] = useState([])
    const [image, setImage] = useState('')
    const [modalActive1, setModalActive1] = useState(false)




    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    useEffect(() => {
        if (Management.user_images.find(el => el.id === oneUser.user_info.id)) {
            setImages(Management.user_images.find(el => el.id === oneUser.user_info.id).urlsArray)
        }
    }, [])

    return (
        <>
            <div
                style={{ boxShadow: !formData.members.includes(oneUser.id) ? '' : `${Setting.app_theme === 'light' ? '0px 2.5px 5px 0px rgb(129, 199, 132,0.8)' : '0px 2.5px 5px 0px rgb(129, 199, 132,0.8)'}` }}
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
                <div className={`management_row ${Setting.app_theme}`}>

                    <div onClick={(e) => {
                        if (images[0]) {
                            e.stopPropagation()
                            setModalActive1(true);
                            setImage(images[0])
                        }
                    }}
                        className={`user_avatar_container ${Setting.app_theme}`} style={{ backgroundImage: images[0] ? `url(${images[0]})` : '', backgroundPosition: 'center', backgroundSize: 'contain' }}>
                        {!images[0] && !oneUser.user_info.email ? 'N' : !images[0] && oneUser.user_info.email ? oneUser.user_info.email.charAt().toUpperCase() : ''}
                    </div>

                    <div className='management_item'>{oneUser.user_info.id}</div>
                    <div className='management_item'>{oneUser.email}</div>
                    <div className='management_item'>{SetNativeTranslate(Translate.language, '', oneUser.role)}</div>
                    <div className='management_item'>{SetNativeTranslate(Translate.language, '', oneUser.user_info.country)}</div>
                    <div className='management_item'>{oneUser.user_info.city}</div>
                    <div className='management_item'>{`Transports ${oneUser.transports.length}`}</div>
                    {Object.keys(oneUser.user_info).length === 0 ? <div className='management_item'> No profile! </div> : <></>}
                </div>
                <div className='management_more_icon_container'>
                    <img
                        onClick={(event) => {
                            event.stopPropagation()
                            if (actionMenuActive) {
                                setActionMenuActive(false)
                                setFormData(initialValue)
                                setIsComponentVisible(false)
                            }
                            if (!actionMenuActive) {
                                setActionMenuActive(true)
                                setFormData(initialValue)
                                setFormData({ ...formData, members: [oneUser.id] })
                                setIsComponentVisible(true)
                            }
                        }}
                        className='management_more_icon' src={Setting.app_theme === 'light' ? more : more_dark} />
                    {actionMenuActive && isComponentVisible ?
                        <UsersItemActionMenu formData={formData} setFormData={setFormData} oneUser={oneUser} setActionMenuActive={setActionMenuActive} setAction={setAction} action={action} setActionIcons={setActionIcons} actionIcons={actionIcons} modalActive={modalActive} setModalActive={setModalActive} setGroup={setGroup} /> : <></>
                    }
                </div>
                <Modal modalActive={modalActive1} setModalActive={setModalActive1}>
                    <div className='image_modal_container'>
                        <img src={image} className='image_modal'></img>
                    </div>
                </Modal>
            </div>
        </>
    )
})

export default UsersItem