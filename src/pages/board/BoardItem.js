import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, SettingContext, TranslateContext, UserContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import Modal from '../../components/ui/modal/Modal'
import { CardEquipment } from '../../components/ui/card/CardEquipment'
import { EquipmentRow } from '../../components/ui/card/EquipmentRow'

const BoardItem = observer(({ transport }) => {
    const { Setting } = useContext(SettingContext)
    const { Ad } = useContext(AdContext)
    const { Translate } = useContext(TranslateContext)
    const { user } = useContext(UserContext)

    const [images, setImages] = useState([])
    const [image, setImage] = useState()
    const [mainImage, setMainImage] = useState()
    const [modalActive, setModalActive] = useState(false)
    const [board_user, setAdUser] = useState({})



    useEffect(() => {
        if (Ad.users.find(el => el.transport_id === transport.id)) {
            setAdUser(Ad.users.find(el => el.transport_id === transport.id))
        }
        if (Ad.transport_images.find(el => el.id === transport.id)) {
            setImages(Ad.transport_images.find(el => el.id === transport.id).urlsArray)
            setMainImage(Ad.transport_images.find(el => el.id === transport.id).urlsArray[0])
        }
    }, [Ad.transport_images])

   

    return (<>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <div className='image_modal_container_board_main'>
                <img src={image} className='image_modal_board_main'></img>
            </div>
        </Modal>

        <div className={`board_transport_item ${Setting.app_theme}`} >
            {/* <div className='board_transport_item_board_images_container'> */}
                <div className='board_transport_item_board_main_image_container'>
                    <img className='board_transport_main_image' src={mainImage}
                        onClick={() => {
                            setImage(mainImage)
                            setModalActive(true)
                        }}
                    ></img>
                </div>
                {/* <div className='board_transport_item_board_image_icons_container'>
                    {images.length > 0 ? images.slice(1).map(image => <img src={image} className='board_transport_image_icon' key={image}
                        onClick={() => {
                            setImage(image)
                            setModalActive(true)
                        }}
                    ></img>) : <></>}
                </div> */}
            {/* </div> */}

            <div className='board_transport_item_board_header_container'>{`${SetNativeTranslate(Translate.language, {}, transport.type)} ${transport.type === 'minibus' || transport.type === 'truck' ? `${SetNativeTranslate(Translate.language, {}, transport.loboard_capacity)} ${SetNativeTranslate(Translate.language, {}, transport.side_type)}` : ''}`}</div>

            <div className={`board_transport_item_board_text_container ${Setting.app_theme}`}>{transport.ad_text}</div>

            <div className='board_transport_equipment_container'>
                <div className='board_transport_equipment_row'>
                    {transport.thermo_bag === true ? <div className='board_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_bag')}</div> : <></>}
                    {transport.thermo_van === true ? <div className='board_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_van')}</div> : <></>}
                    {transport.refrigerator_minus === true ? <div className='board_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_minus')}</div> : <></>}
                    {transport.refrigerator_plus === true ? <div className='board_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_plus')}</div> : <></>}
                    {transport.hydraulic_platform === true ? <div className='board_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'hydraulic_platform')}</div> : <></>}
                    {transport.side_loading === true ? <div className='board_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'side_loading')}</div> : <></>}
                    {transport.glass_stand === true ? <div className='board_transport_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'glass_stand')}</div> : <></>}
                </div>
            </div>


            <div className='board_transport_item_contacts_container'>
                <div className='board_transport_item_board_text_action_container'>{board_user.name}, {board_user.city}</div>
                <div className='board_transport_item_board_text_action_container'>{SetNativeTranslate(Translate.language, {
                    russian: [`${user && user.isAuth ? board_user.phone : 'Авторизуйтесь,чтобы увидеть телефон'}`],
                    english: [`${user && user.isAuth ? board_user.phone : 'Log in to see the phone'}`],
                })}</div>
            </div>

        </div>
    </>
    )
})

export default BoardItem