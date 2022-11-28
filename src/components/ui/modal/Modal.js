import React, { useContext } from 'react'
import './Modal.css'
import styled from 'styled-components';
import { UserContext } from '../../..';

const StyledModalContainer = styled.div`
display:flex;
flex-direction: column;
align-items:center;
justify-content:center;
min-width:400px;
min-height:200px;
gap:5px;

`

const Modal = ({ modalActive, setModalActive, children, parent, formReset, ComponentFunction }) => {

  const { user } = useContext(UserContext)

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
      <div className={modalActive ? "modalContent active" : "modalContent"} onClick={e => e.stopPropagation()}>
        <StyledModalContainer>
          {children}
        </StyledModalContainer>
      </div>
    </div>
  )
}

export default Modal