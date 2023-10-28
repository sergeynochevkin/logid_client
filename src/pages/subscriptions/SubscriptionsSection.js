import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../..'
import SubscriptionForm from '../../components/subscription/SubscriptionForm'
import swipe from '../../assets/icons/swipe.png';
import swipe_dark from '../../assets/icons/swipe_dark.png';

const SubscriptionsSection = observer(({ section }) => {
    const { Setting } = useContext(SettingContext)

    return (

        <div className={`section_container ${section.class} ${Setting.app_theme === 'light' ? '' : 'dark'}`}>
            <div className='self_content_container'>
                <div className='text_middle'>{section.header}</div>
                <div className='text_small'>{section.header_comment}</div>
                <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
                    <SubscriptionForm parent={'main'} mainRole={section.role} />
                </div>
                <div className='swipe_icon_container'>
                    <img className='swipe_icon' src={Setting.app_theme === 'light' ? swipe : swipe_dark} />
                </div>
            </div>
        </div>

    )
})

export default SubscriptionsSection