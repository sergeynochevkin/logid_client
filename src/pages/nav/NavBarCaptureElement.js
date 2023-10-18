import React from 'react'
import { Button } from '../../components/ui/button/Button';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { LinkContext, TranslateContext, UserContext } from '../..';
import Modal from '../../components/ui/modal/Modal';
import { useState } from 'react';
import Auth from '../../components/auth/Auth';
import { useLocation } from 'react-router-dom';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';

const showButton = () => document.querySelector("#scroll-to-top").classList.add("visible");
const hideButton = () => document.querySelector("#scroll-to-top").classList.remove("visible");


const NavBarCaptureElement = observer(() => {
    const { user } = useContext(UserContext)
    const [modalActive, setModalActive] = useState(false)
    const queryParams = new URLSearchParams(window.location.search)
    const role = queryParams.get("role")
    const { link } = useContext(LinkContext)
    const location = useLocation()
    const { Translate } = useContext(TranslateContext)

    const addAdAction = (option) => {
        link.setAfterActions(true, option)
        setModalActive(true)
    }

    if (role || location.pathname === '/board') {
        document.addEventListener("scroll", (e) => window.scrollY < 100 ? hideButton() : showButton())
    }

    return (
        <>
            {!user.isAuth && (role || location.pathname === '/board') ?
                <div id="scroll-to-top">
                    <Button
                        onClick={() => {
                            if (role === 'carrier' || location.pathname === '/board') {
                                addAdAction('add_transport_form')
                            }
                            role === 'customer' && addAdAction('add_order')
                            !role && setModalActive(true)
                        }}
                    >
                        {role === 'carrier' || location.pathname === '/board' ?
                            SetNativeTranslate(Translate.language, {
                                russian: ['Добавить транспорт'],
                                english: ['Add transport'],
                                spanish: ['Añadir transporte'],
                                turkish: ['Taşıma ekle'],
                                сhinese: ['添加交通工具'],
                                hindi: ['परिवहन जोड़ें'],

                            })
                            : role === 'customer' ?
                                SetNativeTranslate(Translate.language, {
                                    russian: ['Добавить заказ'],
                                    english: ['Add an order'],
                                    spanish: ['Añadir un pedido'],
                                    turkish: ['Sipariş ekle'],
                                    сhinese: ['添加订单'],
                                    hindi: ['एक ऑर्डर जोड़ें'],

                                })
                                :
                                SetNativeTranslate(Translate.language, {
                                    russian: ['Быстрая регистрация'],
                                    english: ['Fast sign up'],
                                    spanish: ['Regístrate rápido'],
                                    turkish: ['Hızlı kaydol'],
                                    сhinese: ['快速注册'],
                                    hindi: ['तेजी से साइन अप करें'],
                                })
                        }
                    </Button>
                </div> : <></>}

            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                {
                    role === 'carrier' || location.pathname === '/board' ? <Auth enterPoint={'isRegister'} modalActive={modalActive} setModalActive={setModalActive} after_action={{ action: 'add_ad' }} /> : role === 'customer' ?
                        <Auth enterPoint={'isRegister'} modalActive={modalActive} setModalActive={setModalActive} after_action={{ action: 'add_order' }} /> :
                        <Auth enterPoint={'isRegister'} modalActive={modalActive} setModalActive={setModalActive} />
                }
            </Modal>
        </>
    )
})

export default NavBarCaptureElement