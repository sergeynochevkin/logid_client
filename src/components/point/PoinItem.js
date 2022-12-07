import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { UserContext } from '../..'
import { setTime } from '../../modules/setTime'
import PointStatusForm from './PointStatusForm'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardRow } from '../ui/card/CardRow'
import Modal from '../ui/modal/Modal'
import { SetTranslate } from '../../modules/SetTranslate'

const PoinItem = observer(({ onePoint, oneOrder, setPointFetchStart }) => {
    const [modalActive, setModalActive] = useState(false)
    const { user } = useContext(UserContext)
    const formattedEstimatedTime = setTime(new Date(onePoint.time), 0, 'show')
    const formattedFinishedTime = setTime(new Date(onePoint.finished_time), 0, 'show')

    const initialValue = {
        id: onePoint.id,
        status: '',
        carrier_comment: '',
        updated_by: '',
        updated_time: undefined,
        finished_time: undefined,
        role: ''
    }

    const [formData, setFormData] = useState(initialValue)

    const formReset = () => {
        formData.carrier_comment.setValue('')
        formData.carrier_comment.setDirty(false)
        setFormData(initialValue)
    }

    const parent = 'PointItem'

    return (<>
        <CardRow
            onClick={() => {
                if (((oneOrder.order_status === 'inWork' || oneOrder.order_status === 'postponed') && (onePoint.status !== 'completed' && onePoint.status !== 'canceled')) || ((oneOrder.order_status === 'inWork' || oneOrder.order_status === 'postponed') && user.user.role === 'customer')) {
                    setModalActive(true)
                }

            }}>
            <CardColName> {onePoint.sequence === 1 ? SetTranslate('start') : onePoint.sequence !== 50 ? `${SetTranslate('adress_field_name')} ${onePoint.sequence}` : SetTranslate('finish')}</CardColName>
            <CardColValue
                pointStatus={onePoint.status}
            >{onePoint.point}</CardColValue>
            {onePoint.customer_comment !== '' ?
                <CardColValue>{onePoint.customer_comment}</CardColValue>
                : <></>}
            {onePoint.carrier_comment ? <>
                <CardColValue>{onePoint.carrier_comment}</CardColValue>
            </>
                : <></>}
        </CardRow>
        {onePoint.time && (onePoint.sequence === 1 || onePoint.sequence === 50) ?
            <CardRow>
                <CardColName>{SetTranslate('time')}</CardColName>
                <CardColValue>{formattedEstimatedTime}</CardColValue>
                {onePoint.finished_time && onePoint.status === 'completed' ?
                    <CardColValue>{formattedFinishedTime}</CardColValue> : <></>}
            </CardRow>
            : <></>}
        <Modal
            formReset={formReset}
            parent={parent}
            setModalActive={setModalActive}
            modalActive={modalActive}
        >
            <PointStatusForm
                formData={formData}
                setFormData={setFormData}
                formReset={formReset}
                setModalActive={setModalActive}
                onePoint={onePoint}
                setPointFetchStart={setPointFetchStart}
            />
        </Modal>
    </>
    )
})

export default PoinItem