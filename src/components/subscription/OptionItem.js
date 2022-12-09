import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext } from '../..'
import { SetTranslate } from '../../modules/SetTranslate'

const OptionItem = observer(({ option }) => {

    const { Adress } = useContext(AdressContext)

    return (
        <div className={'option_item_container'}>
            <div className={'option_item_name'}>{`${(option.name !== 'orders_in_the_city' && option.name !== 'orders_in_the_country') ? `${SetTranslate('up_to')} ${option.limit}` : ''} ${SetTranslate(option.name)}`}</div>

            <div className={'option_item_comment'}>{`${SetTranslate(option.comment)} ${option.comment === 'number_of_tracking_cities' || option.comment === 'points_in_order_description' || (option.comment === 'ability_to_place_orders' && option.limit !== 10000) ? option.limit : ''} ${option.comment === 'ability_to_place_orders' && option.limit === 10000 ? `${SetTranslate('all_country')} ${SetTranslate(Adress.country.value)}` : SetTranslate(Adress.country.distance)}`}</div>
        </div>
    )
}
)

export default OptionItem