import React, { useContext } from 'react'
import { PartnerContext, TranslateContext } from '../..'
import GroupPartnerItem from './GroupPartnerItem'
import { CardButton } from '../ui/button/CardButton'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'
import { SetTranslate } from '../../modules/SetTranslate'

const GroupPartnerList = ({ group, setFetchPartnersStart, setModalActive }) => {
    const { Partner } = useContext(PartnerContext)
    const { Translate } = useContext(TranslateContext)

    const thisGroupPartners = Partner.partnerInfos.filter(el => group.partners.includes(el.id))

    return (

        <VerticalContainer
            style={{ alignItems: 'center' }}
        >
            <div
                style={{ fontSize: '16px' }}
            >{group.dataValues.name}</div>
            <table>
                <tbody>
                    <tr>
                        <OrderTh>{SetTranslate(Translate.language,'id')}</OrderTh>
                        <OrderTh>{SetTranslate(Translate.language,'partner_name')}</OrderTh>
                        <OrderTh>{SetTranslate(Translate.language,'phone')}</OrderTh>
                        <OrderTh>{SetTranslate(Translate.language,'status')}</OrderTh>
                    </tr>
                </tbody>
                <tbody>
                    {
                        thisGroupPartners.map(partner =>
                            <GroupPartnerItem
                                key={partner.id}
                                onePartnerInfo={partner}
                                partner={Partner.partners.find(el => el.partnerUserInfoId === partner.id)}
                                setFetchPartnersStart={setFetchPartnersStart}
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
            >{SetTranslate(Translate.language,'close')}</CardButton>
        </VerticalContainer>


    )
}

export default GroupPartnerList