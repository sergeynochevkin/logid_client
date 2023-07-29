import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { ManagementContext, SettingContext, TranslateContext } from '../../..'

import useComponentVisible from '../../../hooks/useComponentVisible'

import block from '../../../assets/icons/block.png'
import block_dark from '../../../assets/icons/block_dark.png'
import remove from '../../../assets/icons/remove.png'
import remove_dark from '../../../assets/icons/remove_dark.png'
import mail from '../../../assets/icons/mail.png'
import mail_dark from '../../../assets/icons/mail_dark.png'
import alert from '../../../assets/icons/alert.png'
import alert_dark from '../../../assets/icons/alert_dark.png'
import arrow_back from '../../../assets/icons/arrow_back.png'
import arrow_back_dark from '../../../assets/icons/arrow_back_dark.png'
import send from '../../../assets/icons/send.png'
import send_dark from '../../../assets/icons/send_dark.png'
import history from '../../../assets/icons/history.png'
import history_dark from '../../../assets/icons/history_dark.png'
import moderated from '../../../assets/icons/moderated.png'
import moderated_dark from '../../../assets/icons/moderated_dark.png'
import not_moderated from '../../../assets/icons/not_moderated.png'
import not_moderated_dark from '../../../assets/icons/not_moderated_dark.png'


const ManagementActionMenu = observer(({ formData, setFormData, setModalActive, setActionMenuActive, setActionIcons, setAction, actionIcons, item }) => {
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { Management } = useContext(ManagementContext)


  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  const buttonAction = (action, iconOne, iconTwo) => {
    setFormData({ ...formData, type: action })
    setActionMenuActive(false)
    setActionIcons({ ...actionIcons, one: iconOne, two: iconTwo })
    setAction(action)
    setModalActive(true)
  }


  return (
    <>
      <div className='item_action_menu' ref={ref}>

        {
          <img src={Setting.app_theme === 'light' ? moderated : moderated_dark} className='management_sync_icon' alt='mail'
          onClick={(event) => {
            event.stopPropagation()
            buttonAction('transport_moderation', Setting.app_theme === 'light' ? arrow_back : arrow_back_dark, Setting.app_theme === 'light' ? send : send_dark)
          }}
        ></img>
        }

      </div>
    </>

  )
})

export default ManagementActionMenu