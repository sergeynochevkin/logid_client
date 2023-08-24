import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AdContext, FetcherContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { observer } from 'mobx-react-lite'
import Modal from '../../components/ui/modal/Modal'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { Button } from '../../components/ui/button/Button'
import Auth from '../../components/auth/Auth'
import { v4 } from "uuid";
import { transportContactViewed } from '../../http/transportApi'
import phone from '../../assets/icons/phone.png';
import phone_dark from '../../assets/icons/phone_dark.png';
import eye from '../../assets/icons/eye.png';
import eye_dark from '../../assets/icons/eye_dark.png';
import arrow_back from '../../assets/icons/arrow_back.png';
import arrow_back_dark from '../../assets/icons/arrow_back_dark.png';
import { addContactView } from '../../http/adApi'
import ShareComponent from '../../components/share/ShareComponent'
import { setTime } from '../../modules/setTime'


const BoardItemPage = observer(() => {
    const { Ad } = useContext(AdContext)
    const { Translate } = useContext(TranslateContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Setting } = useContext(SettingContext)
    const { fetcher } = useContext(FetcherContext)
    let { id } = useParams()
    id = parseInt(id)
    const [transport, setTransport] = useState({})
    const [images, setImages] = useState([])
    const [mainImage, setMainImage] = useState()
    const [ad_user, setAdUser] = useState({})
    const [modalActive, setModalActive] = useState(false)
    const [modalActive1, setModalActive1] = useState(false)
    const [showContact, setShowContact] = useState(false)

    let ip = localStorage.getItem('currentIp')

    useEffect(() => {
        Ad.setTransportOption('board')
        fetcher.setAdTransports(true)
        window.scrollTo(0, 0)
    }, [])


    useEffect(() => {
        setTransport({ ...Ad.transports[Ad.transport_option].find(el => el.id === id) })
    }, [Ad.transports[Ad.transport_option]])

    useEffect(() => {
        if (Ad.users[Ad.transport_option].find(el => el.transport_id === id)) {
            setAdUser(Ad.users[Ad.transport_option].find(el => el.transport_id === id))
        }
        if (Ad.transport_images[Ad.transport_option].find(el => el.id === parseInt(id))) {
            setImages(Ad.transport_images[Ad.transport_option].find(el => el.id === id).urlsArray)
            setMainImage(Ad.transport_images[Ad.transport_option].find(el => el.id === id).urlsArray[0])
        }
    }, [Ad.transport_images[Ad.transport_option]])


    const contactViewedAction = async () => {
        try {
            await addContactView('transport', id, ip, UserInfo.userInfo.id)
            fetcher.setAdTransports(true)
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
                {Object.keys(transport).length > 0 && images.length > 0 ?
                    <div className='board_item_ad_container'>
                        <div className='board_item_page_header_container'>
                            <div className='board_item_page_header_back_container'>
                                <Link to='../board'>
                                    <img className='nav_bar_theme_icon' src={Setting.app_theme === 'light' ? arrow_back : arrow_back_dark}></img>
                                </Link>
                                <div className='board_item_page_header'>{`${SetNativeTranslate(Translate.language, {}, transport.type)} ${transport.type === 'minibus' || transport.type === 'truck' ? `${SetNativeTranslate(Translate.language, {}, transport.load_capacity)} ${SetNativeTranslate(Translate.language, {}, transport.side_type)}` : ''}`}</div>
                            </div>
                            <ShareComponent parent='board_item' shareName={ad_user.name} itemId={id} />
                        </div>

                        <div className='board_item_page_images_container'>

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
                            <div className='board_item_page_info'>
                                <div className='board_item_page_ad_text'>{ad_user.city}</div>
                                <div>{ad_user.name}</div>
                                <div>{(user.isAuth && showContact) || transport.userInfoId === UserInfo.userInfo.id ? ad_user.phone :
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
                            </div>

                            <div className='board_item_page_ad_text'>{transport.ad_text}</div>
                        </div>
                        <div className='board_item_page_info_statistics_container'>
                            <div>{SetNativeTranslate(Translate.language, {
                                russian:['рейтинг logid'],
                                english:['logid rating']
                            })}</div>
                            <div className='board_item_page_info_statistics_rating'>{ad_user.rating === 'no_rating' ?
                            SetNativeTranslate(Translate.language, {
                                russian:['нет оценок'],
                                english:['no ratings']
                            })
                            : `${ad_user.rating}/10`
                            }</div>
                            <div>{setTime(new Date(transport.updatedAt), 0, 'show')}</div>
                            <img className='board_item_page_icon' src={Setting.app_theme === 'light' ? eye : eye_dark}></img>
                            <div>{ad_user.viewed}</div>
                            <div>({ad_user.viewed_today})</div>
                            <img className='board_item_page_icon' src={Setting.app_theme === 'light' ? phone : phone_dark}></img>
                            <div>{ad_user.contact_viewed}</div>
                            <div>({ad_user.contact_viewed_today})</div>
                        </div>
                    </div> : <></>}
                {/* <div className={`board_right_container ${Setting.app_theme}`}></div> */}

            </div>


        </>
    )
})

export default BoardItemPage