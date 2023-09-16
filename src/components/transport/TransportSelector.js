import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TranslateContext, TransportContext } from '../..'
import TransportSelectorItem from './TransportSelectorItem'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const TransportSelector = observer(({ thisOrder, setModalActive, transport, setTransport, inWork }) => {
    const { Transport } = useContext(TransportContext)
    const { Translate } = useContext(TranslateContext)

    return (
        <div className='transport_selector_container'>
            <div className='transport_selector_header'>{SetNativeTranslate(Translate.language,
                {
                    russian: ['Выбeрите способ доставки'],
                    english: ['Choose a shipping method'],
                    spanish: ['Seleccione el método de entrega'],
                    turkish: ['Teslimat yöntemini seçin'],
                }
                , '')}</div>
            <div className='transport_items_container'>
                {Transport.transports.filter(el => el.type === thisOrder.type).map(transport => <TransportSelectorItem key={transport.id} thisTransport={transport} setModalActive={setModalActive} transport={transport} setTransport={setTransport} inWork={inWork} />)}
            </div>
        </div>
    )
})

export default TransportSelector