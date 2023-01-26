import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext, UserContext } from '../..'
import SubscriptionForm from '../../components/subscription/SubscriptionForm'
import './Main.css'
import MainSectionItem from './MainSectionItem'
import '../../components/order/Order.css'
import CaptureForm from '../../components/captureForm/CaptureForm'

const MainSection = observer(({ section, items, callRequested, setCallRequested }) => {

  const { Setting } = useContext(SettingContext)
  const { user } = useContext(UserContext)

  return (
    <div className={`section_container ${section.class} ${Setting.app_theme === 'light' ? '' : 'dark'}`}>


      <div className='section_header'>{section.header}</div>
      <div className='section_header_comment'>{section.header_comment}</div>

      {section.type === 'text' ?
        <div className='section_text'>{section.description}</div> :
        section.type === 'options' ?
          <div>
            <div className='section_content_container'>
              <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
                <div className='main_section_items_container'>
                  {items.filter(el => el.id >= 1 && el.id <= 16).map(item => <MainSectionItem item={item} key={item.id} />)}
                </div>
              </div>
            </div>
            <div className='swipe_icon_container'>
              <span className="material-symbols-outlined">
                swipe
              </span>
            </div>
          </div>
          : section.type === 'reviews' ?
            <div>
              <div className='section_content_container'>
                <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
                  <div className='main_section_items_container'>
                    {items.filter(el => el.id >= 17 && el.id <= 22).map(item => <MainSectionItem item={item} key={item.id} />)}
                  </div>
                </div>
              </div>
              <div className='swipe_icon_container'>
                <span className="material-symbols-outlined">
                  swipe
                </span>
              </div>
            </div>
            : <div className='self_content_container'>
              <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
                <SubscriptionForm parent={'main'} mainRole={section.role} />
              </div>
              <div className='swipe_icon_container'>
                <span className="material-symbols-outlined">
                  swipe
                </span>
              </div>
            </div>
      }
      {!user.user.role && !callRequested ? <CaptureForm setCallRequested={setCallRequested} section = {section}/> : <></>}

    </div>

  )
})

export default MainSection