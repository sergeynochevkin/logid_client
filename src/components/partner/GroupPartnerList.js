import React, { useContext } from 'react'
import { PartnerContext } from '../..'
import GroupPartnerItem from './GroupPartnerItem'
import { CardButton } from '../ui/button/CardButton'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'

const GroupPartnerList = ({ group, setFetchPartnersStart, setModalActive }) => {
    const { Partner } = useContext(PartnerContext)    
    
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
                        <OrderTh>id</OrderTh>
                        <OrderTh>Наименование</OrderTh>
                        <OrderTh>Телефон</OrderTh>
                        <OrderTh>Статус</OrderTh>
                    </tr>
                </tbody>
                <tbody>
                    {
                        thisGroupPartners.map(partner =>
                            <GroupPartnerItem
                                key={partner.id}
                                onePartnerInfo={partner}
                                partner={partner}
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
            >Закрыть</CardButton>
        </VerticalContainer>


    )
}

export default GroupPartnerList