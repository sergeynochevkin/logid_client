import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { ComponentFunctionContext, PartnerContext } from '../../..'
import { useInput } from '../../../hooks/useInput'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Select } from '../../ui/form/Select'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const OrderForWho = ({ formData, setFormData, orderForWho, setOrderForWho }) => {
    const { Partner } = useContext(PartnerContext)
    formData.for_group = useInput('', { isEmpty: true },)
    formData.for_partner = useInput('', { isEmpty: true },)

    return (

        <>
            {Partner.partnerInfos.length > 0 || Partner.groups.length > 0 ?
                <>
                    <Select
                        onChange={(e) => {
                            formData.for_group.setValue('')
                            formData.for_partner.setValue('')
                            setOrderForWho(e.target.value)
                        }}
                        multiple={false}
                    >
                        <option defaultValue='all'>{SetTranslate('order_for_all')}</option>
                        {Partner.groups.length > 0 ?
                            <option value='group'>{SetTranslate('order_for_group')}</option>
                            : <></>}
                        {Partner.partnerInfos.length > 0 ?
                            <option value='partner'>{SetTranslate('order_for_partner')}</option>
                            : <></>}
                    </Select>
                    {orderForWho === 'group' ?
                        <VerticalContainer
                            style={{ gap: '0px' }}
                        >
                            <Select
                                multiple={false}
                                value={formData.for_group.value}
                                style={{ borderLeft: (formData.for_group.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                                onChange={(e) => formData.for_group.onChange(e)}
                                onBlur={e => formData.for_group.onBlur(e)}
                                name="for_group" id="for_group"
                            >
                                <option defaultValue hidden>{SetTranslate('select_group')}</option>
                                {Partner.groups.map(group =>
                                    <option key={group.dataValues.id} value={group.dataValues.id}>{group.dataValues.name}</option>

                                )}
                            </Select>
                            <FieldName
                                style={{
                                    fontWeight: 'normal',
                                    color: 'rgb(254, 111, 103,0.8)'
                                }}
                            >
                                {(formData.for_group.isEmpty && formData.for_group.isDirty) ?
                                    SetTranslate('select_group_validation') :
                                    ''
                                }
                            </FieldName>
                        </VerticalContainer>
                        : <></>
                    }
                    {orderForWho === 'partner' ?
                        <VerticalContainer
                            style={{ gap: '0px' }}
                        >
                            <Select
                                multiple={false}
                                value={formData.for_partner.value}
                                style={{ borderLeft: (formData.for_partner.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                                onChange={(e) => formData.for_partner.onChange(e)}
                                onBlur={e => formData.for_partner.onBlur(e)}
                                name="for_partner" id="for_partner"
                            >
                                <option defaultValue hidden>{SetTranslate('select_partner')}</option>
                                {Partner.partnerInfos.map(partner =>
                                    <option key={partner.id} value={partner.id}>
                                        {
                                            partner.legal === 'person' ?
                                                <>{partner.name_surname_fathersname}</>
                                                :
                                                <>{partner.company_name}</>
                                        }
                                    </option>
                                )}
                            </Select>
                            <FieldName
                                style={{
                                    fontWeight: 'normal',
                                    color: 'rgb(254, 111, 103,0.8)'
                                }}
                            >
                                {(formData.for_partner.isEmpty && formData.for_partner.isDirty) ?
                                    SetTranslate('select_partner_validation') :
                                    ''
                                }
                            </FieldName>
                        </VerticalContainer>

                        : <></>
                    }

                </> : <></>}
        </>
    )
}

export default OrderForWho