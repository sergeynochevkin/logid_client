import React, { useContext } from 'react'
import { deletePartnerFromGroup } from '../../http/partnerApi'
import { OrderTd } from '../ui/table/OrderTd'
import { SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'

const GroupPartnerItem = observer(({ setFetchPartnersStart, partner, group, setModalActive, onePartnerInfo }) => {

    const { Translate } = useContext(TranslateContext)
    const {Setting} = useContext(SettingContext)

    const deletePartnerFromGroupAction = async function () {
        await deletePartnerFromGroup(onePartnerInfo.id, group.dataValues.id)
        setFetchPartnersStart(true)
        if (group.partners.length === 1) {
            setModalActive(false)
        }
    }
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
            <OrderTd>{partner.status === 'normal' ? SetNativeTranslate(Translate.language, {}, 'partner_normal') : partner.status === 'blocked' ? SetNativeTranslate(Translate.language, {}, 'partner_blocked') : partner.status === 'priority' ? SetNativeTranslate(Translate.language, {}, 'partner_favorite') : ''}</OrderTd>
            <td>
                <div className='order_list_icon_container'>
                    <span className={Setting.app_theme === 'light' ? "material-symbols-outlined order_action_icon" : "material-symbols-outlined order_action_icon dark"}
                        alt='delete group'
                        onClick={deletePartnerFromGroupAction}
                    >
                        person_remove
                    </span>                  
                </div>
            </td>
        </tr>
    )
})

export default GroupPartnerItem