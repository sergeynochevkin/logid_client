import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ManagementContext } from '../../..'
import TransportItem from './TransportItem'

const TransportList = observer(() => {
    const { Management } = useContext(ManagementContext)

    return (
        <div className='management_transport_container'>
            {Management.transports.map(transport => <TransportItem key={transport.id} transport = {transport}/>)}
        </div>
    )
})

export default TransportList