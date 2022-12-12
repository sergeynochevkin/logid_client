import React from 'react'
import { Button } from '../ui/button/Button'
import './Legality.css'

const CookiesModalContent = ({ setModalActive }) => {
    return (
        <div className={'accept_cookie_container'}>
            <div className='accept_cookie_text_container'>Для полноценного функционирования сервиса выполняется сбор и обработка cookie файлов в вашем браузере. Для продолжения работы подтвердите согласие</div>
            <div className={'accept_cookie_buttons_container'}>
                <Button
                    onClick={() => {
                        setModalActive(false)
                    }}
                >Подтвердить</Button>
                <Button
                    onClick={() => {
                        setModalActive(false)
                    }}
                >Отклонить</Button>
            </div>
        </div>
    )
}

export default CookiesModalContent