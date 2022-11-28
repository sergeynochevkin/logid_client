import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { ComponentFunctionContext, UserContext, UserInfoContext } from '../..'
import OfferModalContent from './OfferModalContent'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import { CardRow } from '../ui/card/CardRow'
import Modal from '../ui/modal/Modal'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { setTime } from '../../modules/setTime'

const OfferComponent = observer(({ thisOrder, setFetchStart, thisOrderNoPartners, thisCarrierOffer, thisOrderOffers, firstPoint }) => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const [modalActive, setModalActive] = useState(false)

    const parent = 'OfferComponent'

    const initialValue = {
        userInfoId: undefined,
        carrierId: undefined,
        cost: undefined,
        time_from: undefined,
        orderId: undefined,
        carrier_comment: '',
        this_carrier_offer_id: undefined,
    }

    const [formData, setFormData] = useState(initialValue)

    const formReset = () => {
        formData.cost.setValue(thisCarrierOffer ? thisCarrierOffer.cost : '')
        formData.cost.setDirty(false)
        formData.time_from.setValue(thisCarrierOffer ? setTime(new Date(thisCarrierOffer.time_from), 0, 'form') : firstPoint ? setTime(new Date(firstPoint.time), 0, 'form') : '')        
        formData.carrier_comment.setValue(thisCarrierOffer ? thisCarrierOffer.carrier_comment : '')
    }

    return (<>
        <VerticalContainer>

            {user.user.role === 'carrier' ?
                <CardButton
                    onClick={(event) => {
                        event.stopPropagation()
                        setModalActive(true)
                    }}
                >{thisOrderOffers.find(el => el.carrierId === UserInfo.userInfo.id) ? 'Изменить предложение' : 'Сделать предложение'}</CardButton> : <></>}

            {thisOrderOffers.length > 0 ? <CardRow
                onClick={(event) => {
                    event.stopPropagation()
                    setModalActive(true)
                }}
                style={{ cursor: 'pointer' }}
            ><CardColName> Сделано предложений</CardColName><CardColName> {thisOrderOffers.length}</CardColName></CardRow> : <></>}

        </VerticalContainer>
        <Modal modalActive={modalActive} setModalActive={setModalActive} parent={parent} ComponentFunction={ComponentFunction} formReset={formReset}>
            <OfferModalContent
                formData={formData}
                setFormData={setFormData}
                setModalActive={setModalActive}
                UserInfo={UserInfo}
                oneOrder={thisOrder}
                thisOrderOffers={thisOrderOffers}
                user={user}
                thisCarrierOffer={thisCarrierOffer}
                setFetchStart={setFetchStart}
                thisOrderNoPartners={thisOrderNoPartners}
                firstPoint={firstPoint}
                ComponentFunction={ComponentFunction}
                formReset={formReset}
            />
        </Modal>
    </>
    )
})

export default OfferComponent