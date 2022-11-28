import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TransportContext } from '../..'
import TransportItem from './TransportItem'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'

const TransportList = observer(({ setFetchStart }) => {
  const { Transport } = useContext(TransportContext)

  return (

    <HorizontalContainer>
      {Transport.transports.length !== 0 ?
        <>
          {
            Transport.transports.map(oneTransport => <TransportItem
              key={oneTransport.id}
              oneTransport={oneTransport}
              setFetchStart={setFetchStart}
            />)
          }
        </>
        : <div
          style={{
            marginTop: '10vh',
            fontSize: '20px',
          }}
        >Нет траспорта, добавьте, чтобы получать заказы</div>}

    </HorizontalContainer>
  )
})

export default TransportList