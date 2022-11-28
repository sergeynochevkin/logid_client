import React from 'react'
import PartnerGroupComponent from './PartnerGroupComponent'

const PartnerGroupModalContent = ({ setModalActive, onePartnerInfo, setFetchPartnersStart }) => {

  return (    
    <PartnerGroupComponent parent='groupModal' setModalActive={setModalActive} onePartnerInfo={onePartnerInfo} setFetchPartnersStart={setFetchPartnersStart} />
  )
}

export default PartnerGroupModalContent