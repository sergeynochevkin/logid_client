import React, { useContext } from 'react'
import { deletePartnerFromGroup } from '../../http/partnerApi'
import { OrderTd } from '../ui/table/OrderTd'
import { FetcherContext, SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'

import person_remove from '../../assets/icons/person_remove.png';
import person_remove_dark from '../../assets/icons/person_remove_dark.png';

const GroupPartnerItem = observer(({ partner, group, setModalActive, onePartnerInfo }) => {
    const { fetcher } = useContext(FetcherContext)
    const { Translate } = useContext(TranslateContext)
    const { Setting } = useContext(SettingContext)

    const deletePartnerFromGroupAction = async function () {
        await deletePartnerFromGroup(onePartnerInfo.id, group.dataValues.id)
        fetcher.setPartners(true)
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
                    <img className={"order_action_icon"} src={Setting.app_theme === 'light' ? person_remove : person_remove_dark}
                        alt='delete group'
                        onClick={deletePartnerFromGroupAction}
                    />

                </div>
            </td>
        </tr>
    )
})

export default GroupPartnerItem