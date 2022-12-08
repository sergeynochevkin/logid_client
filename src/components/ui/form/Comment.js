import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { SettingContext } from '../../..'
import './Form.css'

const Comment = observer(({ children, props }) => {

   const { Setting } = useContext(SettingContext)

   return (
      <div {...props} className = {Setting.app_theme === 'light' ? 'form_comment' : 'form_comment_dark'}>{children}</div>
   )
})

export { Comment }