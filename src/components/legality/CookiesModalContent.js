import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { Button } from '../ui/button/Button'
import './Legality.css'

const CookiesModalContent = observer(({ setModalActive, cookies_accepted }) => {

    const { Translate } = useContext(TranslateContext)

    const cookiesAction = (value) => {
        setTimeout(() => {
            localStorage.setItem('cookies_accepted', JSON.stringify({ ...cookies_accepted, total: value, auth: value, main: value }))
        }, 1000)
        setModalActive(false)
    }

    return (
        <div className={'accept_cookie_container'}>
            {!cookies_accepted.main ?
                <div className='accept_cookie_text_container'>{SetNativeTranslate(Translate.language, {
                    russian: ['Для полноценного функционирования сервиса выполняется сбор и обработка cookie файлов в вашем браузере. Для продолжения работы подтвердите согласие'],
                    english: ['Cookies are collected and processed in your browser, for the full functioning of the service. Please confirm your consent to continue'],
                    spanish: ['Para que el servicio funcione plenamente, las cookies se recopilan y procesan en su navegador. Por favor confirma tu consentimiento para continuar'],
                    turkish: ['Hizmetin tam olarak çalışması için çerezler tarayıcınızda toplanır ve işlenir. Lütfen devam etmek için onayınızı onaylayın'],
                })}</div> :
                <div className='accept_cookie_text_container'>{SetNativeTranslate(Translate.language, {
                    russian: ['Вы уже разрешили сбор и обработку cookie файлов в вашем браузере'],
                    english: ['You have already allowed the collection and processing of cookies in your browser'],
                    spanish: ['Ya has permitido la recogida y tratamiento de cookies en tu navegador'],
                    turkish: ['Tarayıcınızda çerezlerin toplanmasına ve işlenmesine zaten izin verdiniz'],
                })}</div>
            }
            {!cookies_accepted.main &&
                <div className={'accept_cookie_buttons_container'}>
                    <Button
                        onClick={() => {
                            cookiesAction(true)
                        }}
                    >{SetNativeTranslate(Translate.language, {}, 'accept')}</Button>
                    <Button
                        onClick={() => {
                            cookiesAction(false)
                        }}
                    >{SetNativeTranslate(Translate.language, {}, 'decline')}</Button>
                </div>
            }
        </div>
    )
})

export default CookiesModalContent