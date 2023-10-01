import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { CardButton } from '../ui/button/CardButton'
import Modal from '../ui/modal/Modal'
import AvatarModalContent from './AvatarModalContent'
import { UserInfoContext } from '../..'

const AvatarComponent = observer(() => {
    const { UserInfo } = useContext(UserInfoContext)
    const [files, setFiles] = useState([])
    const [pairs, setPairs] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [images, setImages] = useState([])

    const formReset = () => {
        setFiles([])
        setPairs([])
    }

    useEffect(() => {
        if (UserInfo.images.find(el => el.id === UserInfo.userInfo.id)) {
            setImages(UserInfo.images.find(el => el.id === UserInfo.userInfo.id).urlsArray)
        }
    }, [UserInfo.userInfo.images])

    return (
        <>
            <div className='avatar_section_container'>
                <div onClick={() => {
                    !modalActive ? setModalActive(true) : setModalActive(false)
                }}
                    className='avatar_container' style={{ backgroundImage: `url(${images[0]})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
                    <CardButton>{!images[0] ? 'Add foto' : ''}</CardButton>
                </div>

            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive} formReset={formReset} >
                <AvatarModalContent modalActive={setModalActive} files={files} pairs={pairs} setFiles={setFiles} setPairs={setPairs} formReset={formReset} setModalActive={setModalActive} option={images[0] ? 'update' : ''} />
            </Modal>
        </>
    )
})

export default AvatarComponent