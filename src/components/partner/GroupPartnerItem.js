import React from 'react'
import { deletePartnerFromGroup } from '../../http/partnerApi'
import { CardButton } from '../ui/button/CardButton'
import { OrderTd } from '../ui/table/OrderTd'

const GroupPartnerItem = ({ setFetchPartnersStart, partner, group, setModalActive }) => {

    const deletePartnerFromGroupAction = async function () {
        await deletePartnerFromGroup(partner.id, group.dataValues.id)
        setFetchPartnersStart(true)
        if (group.partners.length === 1) {
            setModalActive(false)
        }
    }

    return (
        <tr>
            <OrderTd>{partner.id}</OrderTd>
            <OrderTd> {partner.legal === 'person' ?
                <>{partner.name_surname_fathersname}</>
                :
                <>{partner.company_name}</>
            }</OrderTd>
            <OrderTd>{partner.phone}</OrderTd>
            <OrderTd>{partner.status === 'normal' ? 'Нормальный' : partner.status === 'blocked' ? 'Заблокирован' : 'В избранном'}</OrderTd>
            <td>
                <CardButton
                    onClick={deletePartnerFromGroupAction}
                >Удалить</CardButton>
            </td>
        </tr>
    )
}

export default GroupPartnerItem