import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { RatingContext, TranslateContext, UserContext } from '../..'
import OrderRatingModalContent from './OrderRatingModalContent'
import { CardButton } from '../ui/button/CardButton'
import Modal from '../ui/modal/Modal'
import { SetTranslate } from '../../modules/SetTranslate'

const OrderRatingComponent = observer(({ oneOrder, setFetchStart, thisPartnerInfo, setFetchPartnersStart }) => {
    const { user } = useContext(UserContext)
    const [modalActive, setModalActive] = useState(false)
    const { Rating } = useContext(RatingContext)
    const { Translate } = useContext(TranslateContext)


    const initialValue = {
        orderId: undefined,
        raterUserInfoId: undefined,
        ratedUserInfoId: undefined,
        in_time: undefined,
        politeness: undefined,
        facilities: undefined,
        role: user.user.role
    }

    const [formData, setFormData] = useState(initialValue)

    const formReset = () => {
        setFormData(initialValue)
    }

    let ratings = Rating.orderRatings

    return (
        <>
            {Rating.orderRatings.filter(el => el.orderId === oneOrder.id).length > 0 ?
                <>
                    <CardButton disabled style={{ color: 'lightgray', cursor: 'default' }}>
                        {user.user.role === 'carrier' ? SetTranslate(Translate.language, 'rated_customer') :
                            user.user.role === 'customer' ? SetTranslate(Translate.language, 'rated_carrier') : ''}
                    </CardButton>

                </>
                :
                <>
                    <CardButton
                        onClick={(event) => {
                            event.stopPropagation()
                            setModalActive(true)
                        }}
                    >
                        {user.user.role === 'carrier' ? SetTranslate(Translate.language, 'rate_customer') :
                            user.user.role === 'customer' ? SetTranslate(Translate.language, 'rate_carrier') : ''}
                    </CardButton>
                    <Modal
                        modalActive={modalActive}
                        setModalActive={setModalActive}
                        setFormData={setFormData}
                        parent={'orderRatingComponent'}
                        formReset={formReset}
                    >
                        <OrderRatingModalContent
                            setModalActive={setModalActive}
                            formData={formData}
                            setFormData={setFormData}
                            setFetchStart={setFetchStart}
                            oneOrder={oneOrder}
                            thisPartnerInfo={thisPartnerInfo}
                            setFetchPartnersStart={setFetchPartnersStart}
                            formReset={formReset}
                        />
                    </Modal>
                </>
            }
        </>
    )
})

export default OrderRatingComponent