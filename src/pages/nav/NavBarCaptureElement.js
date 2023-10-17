import React from 'react'
import { Button } from '../../components/ui/button/Button';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { LinkContext, UserContext } from '../..';
import Modal from '../../components/ui/modal/Modal';
import { useState } from 'react';
import Auth from '../../components/auth/Auth';
import { useLocation } from 'react-router-dom';

const showButton = () => document.querySelector("#scroll-to-top").classList.add("visible");
const hideButton = () => document.querySelector("#scroll-to-top").classList.remove("visible");


const NavBarCaptureElement = observer(() => {
    const { user } = useContext(UserContext)
    const [modalActive, setModalActive] = useState(false)
    const queryParams = new URLSearchParams(window.location.search)
    const role = queryParams.get("role")
    const { link } = useContext(LinkContext)
    const location = useLocation()

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
                            if ( role === 'carrier' || location.pathname === '/board' ) {
                                addAdAction('add_transport_form')
                            }
                            role === 'customer' && addAdAction('add_order')
                            !role && setModalActive(true)
                        }}
                    >
                        { role === 'carrier' || location.pathname==='/board' ? 'Добавить транспорт' : role === 'customer' ? 'Добавить заказ' : 'Быстра регистрация'}
                    </Button>
                </div> : <></>}

            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                {!role ?
                    <Auth enterPoint={'isRegister'} modalActive={modalActive} setModalActive={setModalActive} />
                    :
                    role === 'carrier' ? <Auth enterPoint={'isRegister'} modalActive={modalActive} setModalActive={setModalActive} after_action={{ action: 'add_ad' }} /> :
                        <Auth enterPoint={'isRegister'} modalActive={modalActive} setModalActive={setModalActive} after_action={{ action: 'add_order' }} />}
            </Modal>
        </>
    )
})

export default NavBarCaptureElement