import React, { useContext } from 'react'
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
import { observer } from 'mobx-react-lite';
import { UserInfoContext } from '../..';


const ShareModalContent = observer(({ setModalActive, parent }) => {
    const { UserInfo } = useContext(UserInfoContext)

    return (
        <div className='share_modal_container'>
            <div className='share_modal_icons_container'>
                <div className='modal_social_share'
                    onClick={() => {
                        setModalActive(false)
                    }}>
                    <WhatsappShareButton url={parent === 'account_uuid' ? `https://logid.app?referal_id=${UserInfo.userInfo.id}&&action=add_partner` : 'https://logid.app/'} title='logid'>
                        <WhatsappIcon size={32} ></WhatsappIcon>
                    </WhatsappShareButton>
                    <TelegramShareButton url={parent === 'account_uuid' ? `https://logid.app?referal_id=${UserInfo.userInfo.id}&&action=add_partner` : 'https://logid.app/'} title='logid'>
                        <TelegramIcon size={32} ></TelegramIcon>
                    </TelegramShareButton>
                    <VKShareButton url={parent === 'account_uuid' ? `https://logid.app?referal_id=${UserInfo.userInfo.id}&&action=add_partner` : 'https://logid.app/'} title='logid'>
                        <VKIcon size={32} ></VKIcon>
                    </VKShareButton>
                </div>
            </div>
        </div>
    )
})

export default ShareModalContent