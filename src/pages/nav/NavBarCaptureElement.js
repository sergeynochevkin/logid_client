import React from 'react'
import { Button } from '../../components/ui/button/Button';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { LinkContext, UserContext } from '../..';
import Modal from '../../components/ui/modal/Modal';
import { useState } from 'react';
import Auth from '../../components/auth/Auth';

const showButton = () => document.querySelector("#scroll-to-top").classList.add("visible");
const hideButton = () => document.querySelector("#scroll-to-top").classList.remove("visible");
document.addEventListener("scroll", (e) => window.scrollY < 100 ? hideButton() : showButton());

const NavBarCaptureElement = observer(() => {
    const { user } = useContext(UserContext)
    const [modalActive, setModalActive] = useState(false)
    const queryParams = new URLSearchParams(window.location.search)
    const role = queryParams.get("role")
    const { link } = useContext(LinkContext)

    const addAdAction = (option) => {
        link.setAfterActions(true, option)
        setModalActive(true)
    }

    return (
        <>
            {!user.isAuth && role ?
                <div id="scroll-to-top">
                    <Button
                        onClick={() => {
                            role === 'carrier' && addAdAction('add_transport_form')
                            role === 'customer' && addAdAction('add_order')
                            !role && setModalActive(true)
                        }}
                    >
                        {!role ? 'Быстра регистрация' : role === 'carrier' ? 'Добавить транспорт' : 'Добавить заказ'}
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