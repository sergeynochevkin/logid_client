import React, { useContext, useState } from 'react'
import { FilterAndSortContext, NotificationContext, SettingContext, TranslateContext } from '../..'
import { deleteGroup } from '../../http/partnerApi'
import GroupPartnerList from './GroupPartnerList'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import { CardRow } from '../ui/card/CardRow'
import Modal from '../ui/modal/Modal'
import { OrderTd } from '../ui/table/OrderTd'
import { v4 } from "uuid";
import { observer } from 'mobx-react-lite'
import close_grey from '../../../src/assets/close_grey.png';
import '../order/Order.css'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


const PartnerGroupItem = observer(({ group, setFetchPartnersStart, parent, selectedGroups, setSelectedGroups, setFetchStart }) => {
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const [modalActive, setModalActive] = useState(false)
    const { Notification } = useContext(NotificationContext)
    const {Setting} = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    const group_deleted = SetNativeTranslate(Translate.language,{},'group_deleted')

    const deleteGroupAction = async () => {
        await deleteGroup(group.dataValues.id)
        Notification.addNotification([{ id: v4(), type: 'error', message: `${group_deleted} ${group.dataValues.name}` }])
        setFetchPartnersStart(true)
    }

    return (
        <>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <GroupPartnerList setFetchPartnersStart={setFetchPartnersStart} group={group} setModalActive={setModalActive} />
            </Modal>

            {parent !== 'table' ?
                <CardRow>
                    <CardColName
                        style={{
                            cursor: parent === 'partnerList' || parent === 'orders' || parent === 'groupModal' ? 'pointer' : '',



                            backgroundColor: parent !== 'partnerList' && parent !== 'orders' && selectedGroups.includes(group.dataValues.id) ? 'rgb(241,196,15,0.8)' :
                            
                                (parent === 'partnerList' || parent === 'orders') && Setting.app_theme === 'light' ? 'white' :                                
                                (parent === 'partnerList' || parent === 'orders') && Setting.app_theme === 'dark' ? 'black'
                                 : '',

                                                                                                 
                            border: parent === 'partnerList' && FilterAndSort.partnerFilters.partnersByGroups.includes(group.dataValues.id) ? 'solid black 1px' :
                                parent === 'orders' && FilterAndSort.filters.partnersByGroups.includes(group.dataValues.id) ? 'solid black 1px' :

                                    parent === 'partnerList' || parent === 'orders' ? 'solid lightgrey 1px' : '',



                            borderRadius: parent === 'partnerList' || parent === 'orders' ? '5px' : ''
                        }}

                        onClick={() => {
                            if (parent === 'partnerList') {
                                if (!FilterAndSort.partnerFilters.partnersByGroups.includes(group.dataValues.id)) {
                                    let newValue = [(group.dataValues.id)]
                                    let state = [...FilterAndSort.partnerFilters.partnersByGroups, ...newValue]
                                    FilterAndSort.setPartnerFilters(state, 'partnersByGroups')
                                }
                                else {
                                    let state = FilterAndSort.partnerFilters.partnersByGroups.filter(el => el !== group.dataValues.id)
                                    FilterAndSort.setPartnerFilters(state, 'partnersByGroups')
                                }
                                setFetchPartnersStart(true)
                            }

                            if (parent === 'orders') {
                                if (!FilterAndSort.filters.partnersByGroups.includes(group.dataValues.id)) {
                                    let newValue = [(group.dataValues.id)]
                                    let state = [...FilterAndSort.filters.partnersByGroups, ...newValue]
                                    FilterAndSort.setFilters(state, 'partnersByGroups')
                                }
                                else {
                                    let state = FilterAndSort.filters.partnersByGroups.filter(el => el !== group.dataValues.id)
                                    FilterAndSort.setFilters(state, 'partnersByGroups')
                                }
                                setFetchStart(true)
                            }


                            if (parent === 'groupModal') {
                                if (!selectedGroups.includes(group.dataValues.id)) {
                                    setSelectedGroups([...selectedGroups, group.dataValues.id])
                                } else {
                                    setSelectedGroups(selectedGroups.filter(el => el !== group.dataValues.id))
                                }
                            }
                        }}
                    >{group.dataValues.name}</CardColName>
                    {parent !== 'groupModal' && parent !== 'partnerList' && parent !== 'orders' ?
                        <CardColName
                        >{group.partners.length === 0 ? 0 : group.partners.length}</CardColName> : <></>}
                </CardRow>
                :
                <tr>
                    <OrderTd>{group.dataValues.name}</OrderTd>
                    <OrderTd
                        onClick={() => {
                            if (group.partners.length > 0) {
                                setModalActive(true)
                            }
                        }}
                        style={{
                            cursor: group.partners.length > 0 ? 'pointer' : 'default',
                            backgroundColor: group.partners.length > 0 ? 'rgb(241,196,15,0.8)' : ''
                        }}
                    >{group.partners.length === 0 ? 0 : group.partners.length}</OrderTd>
                    <td>
                        <div className='order_list_icon_container'>
                            <img src={close_grey}
                                onClick={deleteGroupAction}
                                className={'order_list_icon'}
                                alt='delete group'
                            ></img>
                        </div>
                    </td>
                </tr>
            }
        </>

    )
})

export default PartnerGroupItem