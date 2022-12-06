import React from 'react'

const OptionItem = ({option}) => {
    return (

        <div className={'option_item_container'}>
        <div className={'option_item_name'}>{option.name}</div>
        <div className={'option_item_comment'}>{option.comment}</div>
        </div>
    )
}

export default OptionItem