import React from 'react'

const TransportOfferSelectorItem = ({ thisTransport, setFormData, formData }) => {

    return (
        <div className='transport_selector_item' style={{ border: formData.transportid === thisTransport.id ? 'solid grey 1px' : '' }}
            onClick={() => {
                setFormData({ ...formData, transportid: thisTransport.id })
            }}
        >{thisTransport.tag}</div>
    )
}

export default TransportOfferSelectorItem