import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { ComponentFunctionContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import OfferModalContent from './OfferModalContent'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import { CardRow } from '../ui/card/CardRow'
import Modal from '../ui/modal/Modal'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { setTime } from '../../modules/setTime'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import AccountCompletionForm from '../account/AccountCompletionForm'

const OfferComponent = observer(({ thisOrder, thisOrderNoPartners, thisCarrierOffer, thisOrderOffers, firstPoint }) => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Translate } = useContext(TranslateContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const [modalActive, setModalActive] = useState(false)
    const [modalActive2, setModalActive2] = useState(false)

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

            {/* userInfo stopper! */}
            {user.user.role === 'carrier' ?
                <CardButton
                    onClick={(event) => {
                        event.stopPropagation()
                        if (!UserInfo.userInfo.legal) {
                            setModalActive2(true)
                        } else {
                            setModalActive(true)
                        }
                    }}
                >{thisOrderOffers.find(el => el.carrierId === UserInfo.userInfo.id) ? SetNativeTranslate(Translate.language, {}, 'change_offer') : SetNativeTranslate(Translate.language, {}, 'make_offer')}</CardButton> : <></>}

            {thisOrderOffers.length > 0 ? <CardRow
                onClick={(event) => {
                    event.stopPropagation()
                    setModalActive(true)
                }}
                style={{ cursor: 'pointer' }}
            ><CardColName>{SetNativeTranslate(Translate.language, {}, 'total_offers')}</CardColName><CardColName> {thisOrderOffers.length}</CardColName></CardRow> : <></>}

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

                thisOrderNoPartners={thisOrderNoPartners}
                firstPoint={firstPoint}
                ComponentFunction={ComponentFunction}
                formReset={formReset}
            />
        </Modal>


        <Modal modalActive={modalActive2} setModalActive={setModalActive2}>
            <AccountCompletionForm setModalActive={setModalActive2} parent={'make_offer'} />
        </Modal>

    </>
    )
})

export default OfferComponent