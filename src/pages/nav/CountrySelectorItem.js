import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const CountrySelectorItem = observer(({ country, setModalActive }) => {
    const { Translate } = useContext(TranslateContext)
    const { Adress } = useContext(AdressContext)

    return (
        <div className='country_selector_item'
            onClick={() => {
                Adress.setCountry(country)
                setModalActive(false)
            }}
        >{SetNativeTranslate(Translate.language, {}, country.value)}</div>
    )
}
)
export default CountrySelectorItem