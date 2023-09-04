import React, { useContext, useState } from 'react'
import { TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { Button } from '../ui/button/Button'
import DriverForm from './DriverForm'
import Modal from '../ui/modal/Modal'
import DriverList from './DriverList'

const DriverComponent = () => {
    const { Translate } = useContext(TranslateContext)
    const [modalActive, setModalActive] = useState(false)
    const [files, setFiles] = useState([])
    const [pairs, setPairs] = useState([])


    return (
        <>
            <div className='driver_component_container'>
                <Button
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                        setModalActive(true)
                    }}
                >{SetNativeTranslate(Translate.language, {}, 'add')}</Button>
                {/* <DriverList /> */}
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <DriverForm files={files} pairs={pairs} setFiles={setFiles} setPairs={setPairs} />
            </Modal>
        </>
    )
}

export default DriverComponent