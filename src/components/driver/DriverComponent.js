import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FetcherContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { Button } from '../ui/button/Button'
import DriverForm from './DriverForm'
import Modal from '../ui/modal/Modal'
import DriverList from './DriverList'
import './Driver.css'
import useComponentVisible from '../../hooks/useComponentVisible'

const DriverComponent = observer(() => {
    const { Translate } = useContext(TranslateContext)
    const [modalActive, setModalActive] = useState(false)
    const [files, setFiles] = useState([])
    const [pairs, setPairs] = useState([])

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    return (
        <>
            <div className='driver_component_container' ref = {ref}>
                <Button
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                        setModalActive(true)
                    }}
                >{SetNativeTranslate(Translate.language, {}, 'add')}</Button>
                <DriverList />
            </div>

            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <DriverForm files={files} pairs={pairs} setFiles={setFiles} setPairs={setPairs} setModalActive={setModalActive} />
            </Modal>
        </>
    )
})

export default DriverComponent