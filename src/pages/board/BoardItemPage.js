import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AdContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import BoardListItem from './BoardListItem'
import { observer } from 'mobx-react-lite'
import Modal from '../../components/ui/modal/Modal'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { Button } from '../../components/ui/button/Button'
import Auth from '../../components/auth/Auth'
import { v4 } from "uuid";
import { transportContactViewed } from '../../http/transportApi'


const BoardItemPage = observer(() => {
    const { Ad } = useContext(AdContext)
    const { Translate } = useContext(TranslateContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Setting } = useContext(SettingContext)
    let { id } = useParams()
    id = parseInt(id)
    const [transport, setTransport] = useState({})
    const [images, setImages] = useState([])
    const [image, setImage] = useState()
    const [mainImage, setMainImage] = useState()
    const [ad_user, setAdUser] = useState({})
    const [modalActive, setModalActive] = useState(false)
    const [modalActive1, setModalActive1] = useState(false)
    const [showContact, setShowContact] = useState(false)


    useEffect(() => {
        if (Ad.users.find(el => el.transport_id === id)) {
            setAdUser(Ad.users.find(el => el.transport_id === id))
        }
        if (Ad.transport_images.find(el => el.id === parseInt(id))) {
            setImages(Ad.transport_images.find(el => el.id === id).urlsArray)
            setMainImage(Ad.transport_images.find(el => el.id === id).urlsArray[0])
        }
    }, [])



    useEffect(() => {
        setTransport({ ...Ad.transports.find(el => el.id === id) })
    }, [])

    const contactViewedAction = async () => {
        try {
            await transportContactViewed(id, UserInfo.userInfo.id)
        } catch (error) {
            Notification.addNotification([{ id: v4(), type: 'error', message: error.response.data.message }])
        }
    }

    return (
        <>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <div className='board_item_page_image_modal_container'>
                    <img
                        src={mainImage} className='board_item_page_modal_image'></img>
                </div>
            </Modal>
            <Modal setModalActive={setModalActive1} modalActive={modalActive1}>
                <Auth enterPoint={'isLogin'} setModalActive={setModalActive1} modalActive={modalActive1} after_action={{ action: 'transport_contact_viewed', transportId: transport.id }} />
            </Modal>
            <div className={`board_item_page_container ${Setting.app_theme}`}>
                <div className='board_item_ad_container'>

                    <div className='board_item_page_images_container'>

                        <div className='board_item_page_header'>{`${SetNativeTranslate(Translate.language, {}, transport.type)} ${transport.type === 'minibus' || transport.type === 'truck' ? `${SetNativeTranslate(Translate.language, {}, transport.load_capacity)} ${SetNativeTranslate(Translate.language, {}, transport.side_type)}` : ''}`}</div>

                        <div className='board_item_page_main_image_container'>
                            <img className='board_item_page_main_image' src={mainImage}
                                onClick={() => {
                                    setModalActive(true)
                                }}
                            ></img>
                        </div>
                        <div className='board_item_page_image_icons_container'>
                            {images.length > 0 ? images.map(image => <img
                                style={{ filter: image === mainImage ? 'brightness(0.5)' : '' }}
                                onClick={() => { setMainImage(image) }}
                                src={image} className='board_item_page_image_icon' key={image}></img>) : <></>}
                        </div>
                    </div>

                    <div className='board_item_page_equipment_container'>
                        <div className='board_item_page_equipment_row'>
                            {transport.thermo_bag === true ? <div className='board_item_page_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_bag')}</div> : <></>}
                            {transport.thermo_van === true ? <div className='board_item_page_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'thermo_van')}</div> : <></>}
                            {transport.refrigerator_minus === true ? <div className='board_item_page_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_minus')}</div> : <></>}
                            {transport.refrigerator_plus === true ? <div className='board_item_page_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'refrigerator_plus')}</div> : <></>}
                            {transport.hydraulic_platform === true ? <div className='board_item_page_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'hydraulic_platform')}</div> : <></>}
                            {transport.side_loading === true ? <div className='board_item_page_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'side_loading')}</div> : <></>}
                            {transport.glass_stand === true ? <div className='board_item_page_equipment_item'>{SetNativeTranslate(Translate.language, {}, 'glass_stand')}</div> : <></>}
                        </div>
                    </div>


                    <div className='board_item_page_info_container'>
                        <div>{ad_user.city}</div>
                        <div>{ad_user.name}</div>
                        <div>{user.isAuth && showContact ? ad_user.phone :
                            <Button
                                onClick={() => {
                                    if (!user.isAuth) {
                                        setModalActive1(true)
                                    } else {
                                        contactViewedAction()
                                    }
                                    setShowContact(true)
                                }}
                            >
                                {SetNativeTranslate(Translate.language, {
                                    russian: ['Показать телефон'],
                                    english: ['Show phone']
                                })}
                            </Button>
                        }</div>
                        <div>{transport.ad_text}</div>
                        <div className='board_item_page_info_statistics_container'>
                            <div>number of visits</div>
                            <div>number_of_visits_today</div>
                        </div>
                    </div>

                </div>
                <div className={`board_right_container ${Setting.app_theme}`}></div>
            </div>


        </>
    )
})

export default BoardItemPage