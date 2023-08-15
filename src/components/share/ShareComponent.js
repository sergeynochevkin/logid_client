import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { SettingContext, UserContext } from '../..'
import Modal from '../ui/modal/Modal'
import ShareModalContent from './ShareModalContent'
import share from '../../assets/icons/share.png';
import share_dark from '../../assets/icons/share_dark.png';

const ShareComponent = observer(({parent,thisOrder, shareName, itemId}) => {
    const { user } = useContext(UserContext)
    const { Setting } = useContext(SettingContext)
    const [modalActive, setModalActive] = useState(false)

    return (
        <>
            <div className='nav_bar_theme_icon"'
                onClick={(event) => {
                    event.stopPropagation()
                    setModalActive(true)
                }}
            >
                {Setting.app_theme === 'light' ? <img src={share} className='nav_bar_theme_icon' /> : <img src={share_dark} className='nav_bar_theme_icon' />}
            </div>
            <Modal setModalActive={setModalActive} modalActive={modalActive}>
                <ShareModalContent setModalActive={setModalActive} parent = {parent} thisOrder = {thisOrder} shareName = {shareName} itemId={itemId}/>
            </Modal>
        </>
    )
})

export default ShareComponent