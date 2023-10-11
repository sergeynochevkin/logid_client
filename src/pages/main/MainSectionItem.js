import { observer } from 'mobx-react-lite'
import React from 'react'
import './Main.css'
import '../../App.css'

const MainSectionItem = observer(({ item }) => {
    return (
        <div className='section_item_container'>
            {item.class === 'user_review' ?
                <div className='user_image_container'>
                    <div className='user_image' style={{ backgroundImage: `url(${[item.av]})`, backgroundSize: 'contain' }} />
                </div>

                :

                <div >  <img className='section_item_icon' src={item.icon} loading='lazy'/></div>
            }
            <div className='text_middle'>{item.name}</div>
            <div className='text_small'>{item.description}</div>
        </div>
    )
})

export default MainSectionItem