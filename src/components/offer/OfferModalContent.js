import { observer } from 'mobx-react-lite'
import React from 'react'
import OfferForm from './OfferForm'
import OfferList from './OfferList'

const OfferModalContent = observer(({ setModalActive, UserInfo, oneOrder, Offer, user, thisOrderOffers, thisCarrierOffer, formData, setFormData,  thisOrderNoPartners, firstPoint, ComponentFunction, formReset }) => {

    return (
        <div className='offer_modal_container'>
            {user.user.role === 'carrier' ?
                <OfferForm
                    setModalActive={setModalActive}
                    UserInfo={UserInfo}
                    oneOrder={oneOrder}
                    thisCarrierOffer={thisCarrierOffer}
                    formData={formData}
                    setFormData={setFormData}
                    
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
                
                firstPoint={firstPoint}
                ComponentFunction={ComponentFunction}                
            />
        </div>
    )
})

export default OfferModalContent