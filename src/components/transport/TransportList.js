import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TransportContext } from '../..'
import TransportItem from './TransportItem'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { SetTranslate } from '../../modules/SetTranslate'


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
        >{SetTranslate('no_transport')}</div>}

    </HorizontalContainer>
  )
})

export default TransportList