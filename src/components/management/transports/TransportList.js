import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ManagementContext } from '../../..'
import TransportItem from './TransportItem'

const TransportList = observer(() => {
    const { Management } = useContext(ManagementContext)


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
        <div className='management_container'>
            {Management.transports.slice().sort(sortTransport).map(transport => <TransportItem key={transport.id} transport={transport} />)}
        </div>
    )
})

export default TransportList