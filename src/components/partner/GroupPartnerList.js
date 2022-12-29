import React, { useContext } from 'react'
import { PartnerContext, SettingContext, TranslateContext } from '../..'
import GroupPartnerItem from './GroupPartnerItem'
import { CardButton } from '../ui/button/CardButton'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'
import './Partner.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'

const GroupPartnerList = observer( ({ group, setModalActive }) => {
    const { Partner } = useContext(PartnerContext)
    const { Translate } = useContext(TranslateContext)
    const {Setting} = useContext(SettingContext)

    const thisGroupPartners = Partner.partnerInfos.filter(el => group.partners.includes(el.id))

    return (

        <div
            className={Setting.app_theme ==='light' ? 'group_list_container' : 'group_list_container dark'}
        >
            <div
                className='group_list_name'
            >{group.dataValues.name}</div>
            <table>
                <tbody>
                    <tr>
                        <OrderTh>{SetNativeTranslate(Translate.language,{},'id')}</OrderTh>
                        <OrderTh>{SetNativeTranslate(Translate.language,{},'partner_name')}</OrderTh>
                        <OrderTh>{SetNativeTranslate(Translate.language,{},'phone')}</OrderTh>
                        <OrderTh>{SetNativeTranslate(Translate.language,{},'status')}</OrderTh>
                    </tr>
                </tbody>
                <tbody>
                    {
                        thisGroupPartners.map(partner =>
                            <GroupPartnerItem
                                key={partner.id}
                                onePartnerInfo={partner}
                                partner={Partner.partners.find(el => el.partnerUserInfoId === partner.id)}
                                
                                group={group}
                                setModalActive={setModalActive}
                            />
                        )
                    }
                </tbody>
            </table>
            <CardButton
                style={{ marginTop: '20px' }}
                onClick={() => {
                    setModalActive(false)
                }}
            >{SetNativeTranslate(Translate.language,{},'close')}</CardButton>
        </div>


    )
})

export default GroupPartnerList