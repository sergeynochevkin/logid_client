import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { ManagementContext, SettingContext } from '../../..'
import { useState } from 'react'
import Modal from '../../ui/modal/Modal'

const TransportItem = observer(({ transport }) => {
    const [images, setImages] = useState([])
    const [image, setImage] = useState('')
    const [modalActive1, setModalActive1] = useState(false)
    const { Setting } = useContext(SettingContext)


    const { Management } = useContext(ManagementContext)


    console.log(JSON.stringify(Management.transport_images));

    useEffect(() => {
        if (Management.transport_images.find(el => el.id === transport.id)) {
            setImages(Management.transport_images.find(el => el.id === transport.id).urlsArray)
        }
    }, [Management.transport_images])

    const setModerated = () => {

    }

    return (
        <div className='management_transport_row'>

            <div className='management_transport_item'>{transport.id}</div>
            <div className='management_transport_item'>{transport.userInfoId}</div>
            <div className='management_transport_item'>{transport.tag}</div>
            <div className='management_transport_item'>{transport.type}</div>
            {transport.side_type && <div className='management_transport_item'>{transport.side_type}</div>}
            {transport.load_capacity && <div className='management_transport_item'>{transport.load_capacity}</div>}
            {transport.ad_text && <div className='management_transport_item ad_text'>{transport.ad_text}</div>}
            <div className='management_transport_item'>{transport.ad_show ? 'ad on' : 'ad off'}</div>
            <div className='management_transport_item activated'>{transport.moderated ? 'moderated' : 'not moderated'}</div>         
            {transport.thermo_bag === true && <div className='management_transport_item'>thermo bag</div>}
            {transport.refrigerator_minus === true && <div className='management_transport_item'>refrigerator minus</div>}
            {transport.refrigerator_plus === true && <div className='management_transport_item'>refrigerator_plus</div>}
            {transport.hydraulic_platform === true && <div className='management_transport_item'>hydraulic platform</div>}
            {transport.side_loading === true && <div className='management_transport_item'>side loading</div>}
            {transport.glass_stand === true && <div className='management_transport_item'>glass stand</div>}
            <div className='management_transport_images_container'>

                {images.length > 0 ? images.map(image => <img src={image} className='management_transport_image_icon' key={image}
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
    )
})

export default TransportItem