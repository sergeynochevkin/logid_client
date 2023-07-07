import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TransportContext } from '../..'

const TransportSelector = observer(({ thisOrder }) => {
    const { Transport } = useContext(TransportContext)

    return (
        <>
            {Transport.transports.map(transport => <div key={transport.id}>{transport.id}</div>)}
        </>
    )
})

export default TransportSelector