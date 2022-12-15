import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext } from '../..'
import SubscriptionForm from '../../components/subscription/SubscriptionForm'
import './Main.css'
import MainSectionItem from './MainSectionItem'

const MainSection = observer(({ section, items }) => {

  const { Setting } = useContext(SettingContext)

  return (
    <div className={`section_container ${section.class} ${Setting.app_theme === 'light' ? '' : 'dark'}`}>
      <div className='section_header'>{section.header}</div>
      <div className='section_comment'>{section.header_comment}</div>

      {section.type === 'text' ?
        <div className='section_text'>{section.description}</div> :
        section.type === 'items' ?
          <div className='section_content_container'>
            {items.map(item => <MainSectionItem item={item} key={item.id} />)}
          </div> :
          <SubscriptionForm parent={'main'}/>
      }
    </div>

  )
})

export default MainSection