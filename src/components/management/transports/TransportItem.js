import { observer } from 'mobx-react-lite'
import React from 'react'

const TransportItem = observer(({ transport }) => {
    return (
        <div className='management_transport_row'>
            <div className='management_transport_item'>{transport.id}</div>
            <div className='management_transport_item'>{transport.userInfoId}</div>
            <div className='management_transport_item'>{transport.tag}</div>
            <div className='management_transport_item'>{transport.type}</div>
            {transport.side_type && <div className='management_transport_item'>{transport.side_type}</div>}
            {transport.load_capacity && <div className='management_transport_item'>{transport.load_capacity}</div>}
            <div className='management_transport_item'>{transport.ad_text}</div>
            <div className='management_transport_item'>{transport.ad_show ? 'ad on' : 'ad off'}</div>
            <div className='management_transport_item'>{transport.moderated ? 'moderated' : 'not moderated'}</div>
            {transport.thermo_bag === true && <div className='management_transport_item'>thermo bag</div>}
            {transport.refrigerator_minus === true && <div className='management_transport_item'>refrigerator minus</div>}
            {transport.refrigerator_plus === true && <div className='management_transport_item'>refrigerator_plus</div>}
            {transport.hydraulic_platform === true && <div className='management_transport_item'>hydraulic platform</div>}
            {transport.side_loading === true && <div className='management_transport_item'>side loading</div>}
            {transport.glass_stand === true && <div className='management_transport_item'>glass stand</div>}
            <div className='management_transport_images_container'></div>
        </div>
    )
})

export default TransportItem