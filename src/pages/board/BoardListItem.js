import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import Modal from '../../components/ui/modal/Modal'
import { CardEquipment } from '../../components/ui/card/CardEquipment'
import { EquipmentRow } from '../../components/ui/card/EquipmentRow'
import { Link, useNavigate } from 'react-router-dom'
import { v4 } from "uuid";
import { transportViewed } from '../../http/transportApi'
import { addView } from '../../http/adApi'


const BoardListItem = observer(({ transport }) => {
    const { Setting } = useContext(SettingContext)
    const { Ad } = useContext(AdContext)
    const { Translate } = useContext(TranslateContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const navigate = useNavigate()

    // const [images, setImages] = useState([])
    // const [image, setImage] = useState()
    const [mainImage, setMainImage] = useState()
    const [modalActive, setModalActive] = useState(false)
    const [board_user, setAdUser] = useState({})

    let ip = localStorage.getItem('currentIp')
    let header = `${SetNativeTranslate(Translate.language, {}, transport.type)} ${transport.type === 'minibus' || transport.type === 'truck' ? `${SetNativeTranslate(Translate.language, {}, transport.load_capacity)} ${SetNativeTranslate(Translate.language, {}, transport.side_type)}` : ''}`

    useEffect(() => {
        if (Ad.users.find(el => el.transport_id === transport.id)) {
            setAdUser(Ad.users.find(el => el.transport_id === transport.id))
        }
        if (Ad.transport_images.find(el => el.id === transport.id)) {
            // setImages(Ad.transport_images.find(el => el.id === transport.id).urlsArray)
            setMainImage(Ad.transport_images.find(el => el.id === transport.id).urlsArray[0])
        }
    }, [Ad.transport_images])


    const viewedAction = async () => {
        try {
            await addView('transport', transport.id, ip)
        } catch (error) {
            Notification.addNotification([{ id: v4(), type: 'error', message: error.response.data.message }])
        }
    }

    return (
        <>
            {/* <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <div className='image_modal_container_board_main'>
                    <img src={image} className='image_modal_board_main'></img>
                </div>
            </Modal> */}
            <Link to={`/board/item/${transport.id}`} className='board_list_link'
                onClick={() => {
                    viewedAction()
                }}
            >
                <div className={`board_transport_item ${Setting.app_theme}`}
                // onClick={() => {
                //     handleSelect(transport.id)
                // }}
                >
                    {/* <div className='board_list_item_images_container'> */}
                    <div className='board_list_item_main_image_container'>
                        <img className='board_list_item_main_image' src={mainImage}
                        ></img>
                    </div>
                    {/* <div className='board_list_item_board_image_icons_container'>
                    {images.length > 0 ? images.slice(1).map(image => <img src={image} className='board_list_item_image_icon' key={image}
                        onClick={() => {
                            setImage(image)
                            setModalActive(true)
                        }}
                    ></img>) : <></>}
                </div> */}
                    {/* </div> */}

                    <div className='board_list_item_header_container'>{`${header.slice(0, 30)}${header.length > 30 ? '...' : ''}`}</div>

                    <div className={`board_transport_item_board_text_container ${Setting.app_theme}`}>{`${transport.ad_text.slice(0, 60)}${transport.ad_text.length > 60 ? '...' : ''}`}</div>


                    <div className='board_list_item_equipment_container'>
                        <div className='board_list_item_equipment_row'>
                            {transport.thermo_bag === true ? <div className='board_list_item_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_bag')}</div> : <></>}
                            {transport.thermo_van === true ? <div className='board_list_item_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_van')}</div> : <></>}
                            {transport.refrigerator_minus === true ? <div className='board_list_item_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_minus')}</div> : <></>}
                            {transport.refrigerator_plus === true ? <div className='board_list_item_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_plus')}</div> : <></>}
                            {transport.hydraulic_platform === true ? <div className='board_list_item_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'hydraulic_platform')}</div> : <></>}
                            {transport.side_loading === true ? <div className='board_list_item_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'side_loading')}</div> : <></>}
                            {transport.glass_stand === true ? <div className='board_list_item_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'glass_stand')}</div> : <></>}
                        </div>
                    </div>



                    <div className='board_list_item_contacts_container'>
                        <div className='board_transport_item_board_text_action_container'> {board_user.city}</div>
                        {/* <div className='board_transport_item_board_text_action_container'>{SetNativeTranslate(Translate.language, {
                            russian: [`${user && user.isAuth ? board_user.phone : 'Авторизуйтесь,чтобы увидеть телефон'}`],
                            english: [`${user && user.isAuth ? board_user.phone : 'Log in to see the phone'}`],
                        })}</div> */}
                    </div>

                </div>
            </Link>
        </>
    )
})

export default BoardListItem