import React, { useContext } from 'react'
import { SettingContext } from '../../..'
import './Footer.css'

const Footer = () => {
  const {Setting} = useContext(SettingContext)
  return (
    <div className={Setting.app_theme === 'light' ? 'footer_container': 'footer_container footer_container_dark'}>
      <div className='footer_logo'>logid</div>
    </div>
  )
}

export default Footer