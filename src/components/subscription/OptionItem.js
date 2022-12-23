import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext, TranslateContext } from '../..'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const OptionItem = observer(({ option }) => {
    const { Translate } = useContext(TranslateContext)
    const { Adress } = useContext(AdressContext)

    return (
        <div className={'option_item_container'}>
            <div className={'option_item_name'}>{`${(option.name !== 'orders_in_the_city' && option.name !== 'orders_in_the_country') ? `${SetNativeTranslate(Translate.language,{}, 'up_to')} ${option.limit}` : ''} ${SetNativeTranslate(Translate.language,{}, option.name)}`}</div>

            <div className={'option_item_comment'}>{`${SetNativeTranslate(Translate.language,{}, option.comment)} ${option.comment === 'number_of_tracking_cities' || option.comment === 'points_in_order_description' || (option.comment === 'ability_to_place_orders' && option.limit !== 10000) ? option.limit : ''} ${option.comment === 'ability_to_place_orders' && option.limit === 10000 ? `${SetNativeTranslate(Translate.language,{}, 'all_country')} ${SetNativeTranslate(Translate.language,{}, Adress.country.value)}` : SetNativeTranslate(Translate.language,{}, Adress.country.distance)}`}</div>
        </div>
    )
}
)

export default OptionItem