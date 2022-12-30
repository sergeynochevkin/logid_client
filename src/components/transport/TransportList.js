import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TranslateContext, TransportContext } from '../..'
import TransportItem from './TransportItem'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'

import NoData from '../ui/page/NoData'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


const TransportList = observer(() => {
  const { Transport } = useContext(TransportContext)
  const { Translate } = useContext(TranslateContext)

  return (

    <HorizontalContainer>
      {Transport.transports.length !== 0 ?
        <>
          {
            Transport.transports.map(oneTransport => <TransportItem
              key={oneTransport.id}
              oneTransport={oneTransport}             
            />)
          }
        </>
        : <NoData
        >{SetNativeTranslate(Translate.language,{},'no_transport')}</NoData>}

    </HorizontalContainer>
  )
})

export default TransportList