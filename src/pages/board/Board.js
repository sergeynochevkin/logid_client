import React, { useEffect, useState } from 'react'
import './Board.css'
import BoardList from './BoardList'
import BoardFilter from './BoardFilter'
import BoardMainBanner from './BoardMainBanner'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { AdContext, ComponentFunctionContext, FetcherContext, LinkContext, NotificationContext, SettingContext, TranslateContext, UserContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import BoardActionComponent from './BoardActionComponent'
import { USER_ROUTE } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'
import { v4 } from "uuid";
import Modal from '../../components/ui/modal/Modal'
import Auth from '../../components/auth/Auth'


const Board = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Notification } = useContext(NotificationContext)
    const { link } = useContext(LinkContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [modalActive1, setModalActive1] = useState(false)
    const { Ad } = useContext(AdContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const [modalActive, setModalActive] = useState(false)




    useEffect(() => {
        Ad.setTransportOption('board')
        fetcher.setAdTransports(true)
        // setInterval(() => {
        //     Ad.setTransportOption('')
        //     fetcher.setAdTransports(true)
        // }, 60000)
    }, [])

    const addAdAction = () => {
        link.setAfterActions(true, 'add_transport_form')
        if (user.isAuth && user.user.role === 'carrier') {
            ComponentFunction.setPageFunction('transport')
            navigate(USER_ROUTE)
        } else if (user.isAuth && (user.user.role === 'customer' || user.user.role === 'driver')) {
            Notification.addNotification([{
                id: v4(), type: 'error', message: user.user.role === 'customer' ?
                    SetNativeTranslate(Translate.language, {
                        russian: ['Вы являетесь заказчиком и не можете добавлять транспорт, создайте аккаунт перевозчика'],
                        english: ['You are a customer and cannot add transport, create a carrier account'],
                        spanish: ['Eres cliente y no puedes agregar transporte, crea una cuenta de transportista'],
                        turkish: ['Müşterisiniz ve ulaşım ekleyemezsiniz, taşıyıcı hesabı oluşturamazsınız'],
                        сhinese: ['您是客户，无法添加运输、创建承运人帐户'],
                        hindi: ['आप एक ग्राहक हैं और परिवहन नहीं जोड़ सकते, एक वाहक खाता बनाएँ'],
                    })
                    :
                    SetNativeTranslate(Translate.language, {
                        russian: ['Вы являетесь водителем и не можете добавлять транспорт, создайте самостоятельный аккаунт перевозчика'],
                        english: ['You are a driver and cannot add transport, create your own carrier account'],
                        spanish: ['Eres conductor y no puedes agregar transporte, crea tu propia cuenta de transportista'],
                        turkish: ['Sürücüsünüz ve ulaşım ekleyemezsiniz, kendi operatör hesabınızı oluşturun'],
                        сhinese: ['您是司机，无法添加运输，请创建您自己的承运人帐户'],
                        hindi: ['आप एक ड्राइवर हैं और परिवहन नहीं जोड़ सकते, अपना स्वयं का वाहक खाता बनाएं'],
                    })
            }])
        }
        else {
            setModalActive1(true)
        }
    }

    return (
        <div className={`board_container ${Setting.app_theme}`}>
            <title>logid - доска объявлений</title>

            <BoardMainBanner addAdAction={addAdAction} />
            <div className={`board_content_container`}>
                <div className='board_left_container'>
                    <BoardFilter modalActive={modalActive} modalActive1={modalActive1} setModalActive1={setModalActive1} setModalActive={setModalActive} addAdAction={addAdAction} />
                    <BoardList />
                </div>
                <BoardActionComponent />
            </div>

            <Modal modalActive={modalActive1} setModalActive={setModalActive1}>
                <Auth enterPoint={'isRegister'} modalActive={modalActive1} setModalActive={setModalActive1} after_action={{ action: 'add_ad' }} />
            </Modal>
        </div>
    )
})

export default Board