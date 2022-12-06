import React from 'react'
import { deletePartnerFromGroup } from '../../http/partnerApi'
import { CardButton } from '../ui/button/CardButton'
import { OrderTd } from '../ui/table/OrderTd'
import { SetTranslate } from '../../modules/SetTranslate'
import close_grey from '../../../src/assets/close_grey.png';

const GroupPartnerItem = ({ setFetchPartnersStart, partner, group, setModalActive, onePartnerInfo }) => {

    const deletePartnerFromGroupAction = async function () {
        await deletePartnerFromGroup(onePartnerInfo.id, group.dataValues.id)
        setFetchPartnersStart(true)
        if (group.partners.length === 1) {
            setModalActive(false)
        }
    }

    console.log(partner.status);

    //set partner status

    return (
        <tr>
            <OrderTd>{onePartnerInfo.id}</OrderTd>
            <OrderTd> {onePartnerInfo.legal === 'person' ?
                <>{onePartnerInfo.name_surname_fathersname}</>
                :
                <>{onePartnerInfo.company_name}</>
            }</OrderTd>
            <OrderTd>{onePartnerInfo.phone}</OrderTd>
            <OrderTd>{partner.status === 'normal' ? SetTranslate('partner_normal') : partner.status === 'blocked' ? SetTranslate('partner_blocked') : partner.status === 'priority' ? SetTranslate('partner_favorite') : ''}</OrderTd>
            <td>            
                <div className='order_list_icon_container'>
                    <img src={close_grey}
                        onClick={deletePartnerFromGroupAction}
                        className={'order_list_icon'}
                        alt='delete group'
                    ></img>
                </div>
            </td>
        </tr>
    )
}

export default GroupPartnerItem