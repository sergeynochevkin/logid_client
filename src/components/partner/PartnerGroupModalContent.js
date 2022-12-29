import React from 'react'
import PartnerGroupComponent from './PartnerGroupComponent'

const PartnerGroupModalContent = ({ setModalActive, onePartnerInfo }) => {

  return (    
    <PartnerGroupComponent parent='groupModal' setModalActive={setModalActive} onePartnerInfo={onePartnerInfo}  />
  )
}

export default PartnerGroupModalContent