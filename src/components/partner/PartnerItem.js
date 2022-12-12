import React, { useContext, useEffect, useState } from 'react'
import Modal from '../ui/modal/Modal'
import PartnerModalContent from './PartnerModalContent'
import { PartnerContext, TranslateContext } from '../..'
import PartnerGroupModalContent from './PartnerGroupModalContent'
import { OrderTd } from '../ui/table/OrderTd'
import { SetTranslate } from '../../modules/SetTranslate'

const PartnerItem = ({ onePartnerInfo, onePartner, setFetchPartnersStart, onePartnerOtherRatingByThisUserInfo }) => {
  const [modalActive, setModalActive] = useState(false)
  const { Partner } = useContext(PartnerContext)
  const [modalFunction, setModalFunction] = useState('')
  const [partnerGroups, setPartnerGroups] = useState([1])

  useEffect(() => {
    setPartnerGroups(Partner.groups.filter(el => el.partners.includes(onePartnerInfo.id)).map(el => el.dataValues.id))
  }, [Partner.groups])

  return (
    <>
      <Modal
        modalActive={modalActive}
        setModalActive={setModalActive}
      >
        {modalFunction === 'partnerInfo' ?
          <PartnerModalContent
            setModalActive={setModalActive}
            onePartnerInfo={onePartnerInfo}
            onePartner={onePartner}
            setFetchPartnersStart={setFetchPartnersStart}
          />
          :
          modalFunction === 'groups' ?
            <PartnerGroupModalContent setModalActive={setModalActive} onePartnerInfo={onePartnerInfo} setFetchPartnersStart={setFetchPartnersStart} /> : <></>
        }

      </Modal>
      <tr>
        <OrderTd>{onePartnerInfo.id}</OrderTd>
        <OrderTd
          style={{
            backgroundColor: onePartner.status === 'normal' ? 'rgb(241,196,15,0.8)' :
              onePartner.status === 'priority' ? 'rgb(129, 199, 132,0.8)' :
                onePartner.status === 'blocked' ? 'rgb(254, 111, 103,0.8)' : '',
            cursor: 'pointer'
          }}
          onClick={() => {
            setModalFunction('partnerInfo')
            setModalActive(true)
          }}
        >
          {onePartnerInfo.legal === 'person' ?
            <>{onePartnerInfo.name_surname_fathersname}</>
            :
            <>{onePartnerInfo.company_name}</>
          }
        </OrderTd>
        <OrderTd>{onePartnerInfo.phone}</OrderTd>
        <OrderTd>{(!onePartnerInfo.in_time_amount &&
          !onePartnerInfo.solvency_amount &&
          !onePartnerInfo.politeness_amount &&
          !onePartnerInfo.facilities_amount)
          ? SetTranslate('no_ratings') : Math.floor(onePartnerInfo.total_rating * 100) / 100}</OrderTd>
        <OrderTd
          onClick={() => {
            if (Partner.groups.length !== 0) {
              setModalFunction('groups')
              setModalActive(true)
            }
          }}
          style={{
            cursor: Partner.groups.length !== 0 ? 'pointer' : 'default',
            backgroundColor: partnerGroups.length > 0 ? 'rgb(241,196,15,0.8)' : ''
          }}
        >{Partner.groups.length === 0 ? SetTranslate('no_groups') : partnerGroups.length === 0 ? SetTranslate('can_choose_groups') : `${partnerGroups.length}`}</OrderTd>
        <OrderTd>{onePartner.status === 'normal' ? SetTranslate('partner_normal') : onePartner.status === 'blocked' ? SetTranslate('partner_blocked') : onePartner.status === 'priority' ? SetTranslate('partner_favorite') : ''}</OrderTd>
      </tr>
    </>
  )
}

export default PartnerItem


