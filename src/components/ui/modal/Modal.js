import React, { useContext } from 'react'
import './Modal.css'
import styled from 'styled-components';
import { SettingContext, UserContext } from '../../..';
import { observer } from 'mobx-react-lite';

const Modal = observer(({ modalActive, setModalActive, children, parent, formReset, ComponentFunction }) => {

  const { user } = useContext(UserContext)
  const { Setting } = useContext(SettingContext)

  return (
    <div className={modalActive ? "modal active" : "modal"} onClick={(event) => {
      event.stopPropagation()
      if (parent === 'TransportComponent' || parent === 'PointItem' || parent === 'orderRatingComponent' || parent === 'otherRatingComponent' || parent === 'createGroup' || (parent === 'OfferComponent' && user.user.role === 'carrier')) {
        formReset()
      }
      if (parent === 'OfferComponent') {
        ComponentFunction.setOfferListMoreInfo(false)
      }
      setModalActive(false)
    }}>
      <div className={modalActive && Setting.app_theme === 'light' ? "modalContent active" : modalActive && Setting.app_theme === 'dark' ? "modalContent modalContent_dark active" : Setting.app_theme === 'light' ? "modalContent" : "modalContent_dark"} onClick={e => e.stopPropagation()}>
        <div className='modal_container'>
          {children}
        </div>
      </div>
    </div>
  )
})

export default Modal