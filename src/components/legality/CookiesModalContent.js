import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { SetTranslate } from '../../modules/SetTranslate'
import { Button } from '../ui/button/Button'
import './Legality.css'

const CookiesModalContent = observer(({ setModalActive }) => {

    const { Translate } = useContext(TranslateContext)

    return (
        <div className={'accept_cookie_container'}>
            <div className='accept_cookie_text_container'>{SetNativeTranslate(Translate.language, {
                russian: ['Для полноценного функционирования сервиса выполняется сбор и обработка cookie файлов в вашем браузере. Для продолжения работы подтвердите согласие'],
                english: ['For the full functioning of the service, cookies are collected and processed in your browser. Please confirm your consent to continue.']
            })}</div>
            <div className={'accept_cookie_buttons_container'}>
                <Button
                    onClick={() => {
                        setModalActive(false)
                    }}
                >{SetTranslate('accept')}</Button>
                <Button
                    onClick={() => {
                        setModalActive(false)
                    }}
                >{SetTranslate('decline')}</Button>
            </div>
        </div>
    )
})

export default CookiesModalContent