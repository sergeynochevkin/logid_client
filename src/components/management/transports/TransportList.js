import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { ManagementContext } from '../../..'
import TransportItem from './TransportItem'
import ManagementActionMenuModalContent from '../ActionMenu/ManagementActionMenuModalContent'
import Modal from '../../ui/modal/Modal'

const TransportList = observer(() => {
    const { Management } = useContext(ManagementContext)

    //action menu
    const [action, setAction] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [actionIcons, setActionIcons] = useState({
        one: '',
        two: '',
    })

    let initialValue = {
        type: '',
        members: [],
        subject: '',
        message: ''
    }

    const [formData, setFormData] = useState(
        initialValue
    )

    const buttonAction = (action, iconOne, iconTwo) => {
        setFormData({ ...formData, type: action })
        setActionIcons({ ...actionIcons, one: iconOne, two: iconTwo })
        setAction(action)
        setModalActive(true)
    }
    //action menu


    const sortTransport = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else if (a.id < b.id) {
            return -1
        } else {
            return 0
        }
    }




    return (
        <><div className='management_container'>
            {Management.transports.slice().sort(sortTransport).map(transport => <TransportItem key={transport.id} transport={transport} formData={formData} setFormData={setFormData} initialValue={initialValue} modalActive={modalActive} setModalActive={setModalActive}
                setActionIcons={setActionIcons} setAction={setAction} actionIcons={actionIcons}
            />)}
        </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <ManagementActionMenuModalContent initialValue={initialValue} formData={formData} setFormData={setFormData} setAction={setAction} action={action} setModalActive={setModalActive} actionIcons={actionIcons} setActionIcons={setActionIcons} />
            </Modal>
        </>
    )
})

export default TransportList