import { observer } from 'mobx-react-lite'
import React from 'react'
import OfferForm from './OfferForm'
import OfferList from './OfferList'

const OfferModalContent = observer(({ setModalActive, UserInfo, oneOrder, Offer, user, thisOrderOffers, thisCarrierOffer, formData, setFormData, setFetchStart, thisOrderNoPartners, firstPoint, ComponentFunction, formReset }) => {

    return (
        <>
            {user.user.role === 'carrier' ?
                <OfferForm
                    setModalActive={setModalActive}
                    UserInfo={UserInfo}
                    oneOrder={oneOrder}
                    thisCarrierOffer={thisCarrierOffer}
                    formData={formData}
                    setFormData={setFormData}
                    setFetchStart={setFetchStart}
                    firstPoint={firstPoint}
                    formReset={formReset}
                /> : <></>}
            <OfferList
                oneOrder={oneOrder}
                Offer={Offer}
                user={user}
                setModalActive={setModalActive}
                thisOrderOffers={thisOrderOffers}
                UserInfo={UserInfo}
                thisOrderNoPartners={thisOrderNoPartners}
                setFetchStart={setFetchStart}
                firstPoint={firstPoint}
                ComponentFunction={ComponentFunction}                
            />
        </>
    )
})

export default OfferModalContent