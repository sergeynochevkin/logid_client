import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext, UserContext } from '../..'
import SubscriptionForm from '../../components/subscription/SubscriptionForm'
import './Main.css'
import MainSectionItem from './MainSectionItem'
import '../../components/order/Order.css'

const MainSection = observer(({ section, items }) => {

  const { Setting } = useContext(SettingContext)

  return (
    <div className={`section_container ${section.class} ${Setting.app_theme === 'light' ? '' : 'dark'}`}>
      <div className='section_header'>{section.header}</div>
      <div className='section_header_comment'>{section.header_comment}</div>

      {section.type === 'text' ?
        <div className='section_text'>{section.description}</div> :
        section.type === 'items' ?
          <div className='section_content_container'>
            <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
            <div className='main_section_items_container'>
              {items.map(item => <MainSectionItem item={item} key={item.id} />)}
              </div>
            </div></div> : <div className='self_content_container'>
            <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
              <SubscriptionForm parent={'main'} mainRole={section.role} />
            </div>
          </div>
      }
    </div>

  )
})

export default MainSection