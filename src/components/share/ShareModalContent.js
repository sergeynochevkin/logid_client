import React from 'react'
import './Share.css'
import {
    TelegramIcon,
    TelegramShareButton,
    VKIcon,
    VKShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";


const ShareModalContent = ({ setModalActive }) => {
    return (
        <div className='share_modal_container'>
            <div className='share_modal_icons_container'>
                <div className='modal_social_share'
                    onClick={() => {
                        setModalActive(false)
                    }}>
                    <WhatsappShareButton url={'https://logid.app/'} title='logid'>
                        <WhatsappIcon size={32} ></WhatsappIcon>
                    </WhatsappShareButton>
                    <TelegramShareButton url={'https://logid.app/'} title='logid'>
                        <TelegramIcon size={32} ></TelegramIcon>
                    </TelegramShareButton>
                    <VKShareButton url={'https://logid.app/'} title='logid'>
                        <VKIcon size={32} ></VKIcon>
                    </VKShareButton>
                </div>
            </div>
        </div>
    )
}

export default ShareModalContent