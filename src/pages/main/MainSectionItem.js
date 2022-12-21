import { observer } from 'mobx-react-lite'
import React from 'react'
import './Main.css'

const MainSectionItem = observer(({ item }) => {
    return (
        <div className='section_item_container'>
            <div className='section_item_icon'>{item.icon}</div>
            <div className='section_item_name'>{item.name}</div>
            <div className='section_item_description'>{item.description}</div>
        </div>
    )
})

export default MainSectionItem