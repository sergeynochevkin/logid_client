import React, { useContext } from 'react'
import './Modal.css'
import styled from 'styled-components';
import { SettingContext, UserContext } from '../../..';
import { observer } from 'mobx-react-lite';

import close from '../../../assets/icons/close.png';
import close_dark from '../../../assets/icons/close_dark.png';

const Modal = observer(({ modalActive, setModalActive, children, parent, formReset, ComponentFunction }) => {

  const { user } = useContext(UserContext)
  const { Setting } = useContext(SettingContext)

  if (parent === 'agreement') {
    modalActive = ComponentFunction.agreement_modal
  }

  const modalCloseAction = () => {
    if (parent === 'TransportComponent' || parent === 'driverForm' || parent === 'Payment' || parent === 'PointItem' || parent === 'orderRatingComponent' || parent === 'otherRatingComponent' || parent === 'createGroup' || (parent === 'OfferComponent' && user.user.role === 'carrier')) {
      formReset()
      setModalActive(false)
    }
    else if (parent === 'OfferComponent') {
      ComponentFunction.setOfferListMoreInfo(false)
      setModalActive(false)
    }
    else if (parent === 'agreement') {
      ComponentFunction.setAgreementModal(false)
    } else {
      setModalActive(false)
    }
  }
  return (
    <div className={modalActive ? "modal active" : "modal"}
      onClick={(event) => {
        event.stopPropagation()
        modalCloseAction()
      }}
    >
      <div className={modalActive && Setting.app_theme === 'light' ? "modalContent active" : modalActive && Setting.app_theme === 'dark' ? "modalContent dark active" : Setting.app_theme === 'light' ? "modalContent" : "modalContent dark"} onClick={e => e.stopPropagation()}>
        <img className={"modal_close_icon"} src={Setting.app_theme === 'light' ? close : close_dark}
          onClick={(event) => {
            event.stopPropagation()
            modalCloseAction()
          }}
        />
        <div className='modal_container'>
          {children}
        </div>
      </div>
    </div>
  )
})

export default Modal