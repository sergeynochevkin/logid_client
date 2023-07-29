import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { FetcherContext, ManagementContext, NotificationContext, SettingContext } from '../../..'
import { useState } from 'react'
import Modal from '../../ui/modal/Modal'
import { updateField } from '../../../http/managementApi'
import { v4 } from "uuid";
import ManagementActionMenu from '../ActionMenu/ManagementActionMenu'
import useComponentVisible from '../../../hooks/useComponentVisible'
import UsersItemActionMenu from '../users/UsersItemActionMenu'
import ManagementActionMenuComponent from '../ActionMenu/ManagementActionMenuComponent'

const TransportItem = observer(({ transport, formData, setFormData, initialValue, setModalActive, setActionIcons, setAction, actionIcons, setCurrentStatus }) => {
    const [images, setImages] = useState([])
    const [image, setImage] = useState('')
    const [modalActive1, setModalActive1] = useState(false)
    const { fetcher } = useContext(FetcherContext)
    const { Notification } = useContext(NotificationContext)

    const { Management } = useContext(ManagementContext)

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (Management.transport_images.find(el => el.id === transport.id)) {
            setImages(Management.transport_images.find(el => el.id === transport.id).urlsArray)
        }
    }, [Management.transport_images])

    const managementAction = async (option, field, new_value, id) => {
        try {
            await updateField(option, field, new_value, id).then(data => Notification.addNotification([{ id: v4(), type: new_value === true ? 'success' : 'error', message: data }]))
            fetcher.setManagementTransports(true)
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }



    return (
        <div>
            <div className='management_row'>
                <div className='management_item'>{transport.id}</div>
                <div className='management_item'>{transport.userInfoId}</div>
                <div className='management_item'>{transport.tag}</div>
                <div className='management_item'>{transport.type}</div>
                {transport.side_type && <div className='management_item'>{transport.side_type}</div>}
                {transport.load_capacity && <div className='management_item'>{transport.load_capacity}</div>}
                {transport.ad_text && <div className='management_item ad_text'>{transport.ad_text}</div>}
                <div className='management_item'>{transport.ad_show ? 'ad on' : 'ad off'}</div>
                <div className='management_item'>{transport.moderated}</div>
                {transport.moderation_comment !== '' && <div className='management_item'>{transport.moderation_comment}</div>}
                {transport.thermo_bag === true && <div className='management_item'>thermo bag</div>}
                {transport.refrigerator_minus === true && <div className='management_item'>refrigerator minus</div>}
                {transport.refrigerator_plus === true && <div className='management_item'>refrigerator_plus</div>}
                {transport.hydraulic_platform === true && <div className='management_item'>hydraulic platform</div>}
                {transport.side_loading === true && <div className='management_item'>side loading</div>}
                {transport.glass_stand === true && <div className='management_item'>glass stand</div>}
                <div className='management_images_container'>

                    {images.length > 0 ? images.map(image => <img src={image} className='management_image_icon' key={image}
                        onClick={() => {
                            setModalActive1(true);
                            setImage(image)
                        }}
                    ></img>) : <></>}
                </div>
                <Modal modalActive={modalActive1} setModalActive={setModalActive1}>
                    <div className='image_modal_container'>
                        <img src={image} className='image_modal'></img>
                    </div>
                </Modal>
            </div>

            {/* action menu */}
            <ManagementActionMenuComponent setFormData={setFormData} formData={formData} initialValue={initialValue} setModalActive={setModalActive}
                setActionIcons={setActionIcons} setAction={setAction} actionIcons={actionIcons} item={transport} setCurrentStatus={setCurrentStatus}
            />
            {/* action menu */}

        </div>
    )
})

export default TransportItem