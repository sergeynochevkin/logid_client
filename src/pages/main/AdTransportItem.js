import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, SettingContext, TranslateContext, UserContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import Modal from '../../components/ui/modal/Modal'
import { CardEquipment } from '../../components/ui/card/CardEquipment'
import { EquipmentRow } from '../../components/ui/card/EquipmentRow'

const AdTransportItem = observer(({ transport }) => {
    const { Setting } = useContext(SettingContext)
    const { Ad } = useContext(AdContext)
    const { Translate } = useContext(TranslateContext)
    const { user } = useContext(UserContext)

    const [images, setImages] = useState([])
    const [image, setImage] = useState()
    const [mainImage, setMainImage] = useState()
    const [modalActive, setModalActive] = useState(false)
    const [ad_user, setAdUser] = useState({})



    useEffect(() => {
        if (Ad.users.find(el => el.transport_id === transport.id)) {
            setAdUser(Ad.users.find(el => el.transport_id === transport.id))
        }
        if (Ad.transport_images.find(el => el.id === transport.id)) {
            setImages(Ad.transport_images.find(el => el.id === transport.id).urlsArray)
            setMainImage(Ad.transport_images.find(el => el.id === transport.id).urlsArray[0])
        }
    }, [])

   

    return (<>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <div className='image_modal_container_ad_main'>
                <img src={image} className='image_modal_ad_main'></img>
            </div>
        </Modal>

        <div className={`ad_transport_item ${Setting.app_theme}`} >
            {/* <div className='ad_transport_item_ad_images_container'> */}
                <div className='ad_transport_item_ad_main_image_container'>
                    <img className='ad_transport_main_image' src={mainImage}
                        onClick={() => {
                            setImage(mainImage)
                            setModalActive(true)
                        }}
                    ></img>
                </div>
                {/* <div className='ad_transport_item_ad_image_icons_container'>
                    {images.length > 0 ? images.slice(1).map(image => <img src={image} className='ad_transport_image_icon' key={image}
                        onClick={() => {
                            setImage(image)
                            setModalActive(true)
                        }}
                    ></img>) : <></>}
                </div> */}
            {/* </div> */}

            <div className='ad_transport_item_ad_header_container'>{`${SetNativeTranslate(Translate.language, {}, transport.type)} ${transport.type === 'minibus' || transport.type === 'truck' ? `${SetNativeTranslate(Translate.language, {}, transport.load_capacity)} ${SetNativeTranslate(Translate.language, {}, transport.side_type)}` : ''}`}</div>

            <div className={`ad_transport_item_ad_text_container ${Setting.app_theme}`}>{transport.ad_text}</div>

            <div className='ad_transport_equipment_container'>
                <div className='ad_transport_equipment_row'>
                    {transport.thermo_bag === true ? <div className='ad_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_bag')}</div> : <></>}
                    {transport.thermo_van === true ? <div className='ad_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_van')}</div> : <></>}
                    {transport.refrigerator_minus === true ? <div className='ad_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_minus')}</div> : <></>}
                    {transport.refrigerator_plus === true ? <div className='ad_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_plus')}</div> : <></>}
                    {transport.hydraulic_platform === true ? <div className='ad_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'hydraulic_platform')}</div> : <></>}
                    {transport.side_loading === true ? <div className='ad_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'side_loading')}</div> : <></>}
                    {transport.glass_stand === true ? <div className='ad_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'glass_stand')}</div> : <></>}
                </div>
            </div>


            <div className='ad_transport_item_contacts_container'>
                <div className='ad_transport_item_ad_text_action_container'>{ad_user.name}, {ad_user.city}</div>
                <div className='ad_transport_item_ad_text_action_container'>{SetNativeTranslate(Translate.language, {
                    russian: [`${user && user.isAuth ? ad_user.phone : 'Авторизуйтесь,чтобы увидеть телефон'}`],
                    english: [`${user && user.isAuth ? ad_user.phone : 'Log in to see the phone'}`],
                })}</div>
            </div>

        </div>
    </>
    )
})

export default AdTransportItem