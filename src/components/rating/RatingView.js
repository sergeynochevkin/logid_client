import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

import { CardColName } from '../ui/card/CardColName'
import { CardRow } from '../ui/card/CardRow'
import { VerticalContainer } from '../ui/page/VerticalContainer'

import '../ui/card/Card.css'


const RatingView = observer(({ onePartnerInfo, user, parent }) => {
    const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const { Translate } = useContext(TranslateContext)

    return (
        <VerticalContainer>
            <CardRow>
                <CardColName>{SetNativeTranslate(Translate.language,{},'completed_orders')}</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.complete_orders_amount !== 0 && 'rgb(255, 186, 65, 0.3)',
                    }}
                >{onePartnerInfo.complete_orders_amount}</CardColName>
                <CardColName>{SetNativeTranslate(Translate.language,{},'disrupted_orders')}</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.disruption_amount !== 0 && 'rgb(254, 111, 103,0.3)',
                    }}
                >{onePartnerInfo.disruption_amount}</CardColName>
            </CardRow>

            {((user.user.role === 'carrier' || user.user.role === 'driver') && parent !== 'account') || (user.user.role === 'customer' && parent === 'account') ?
                <CardRow>
                    <CardColName>
                        {SetNativeTranslate(Translate.language,{},'solvency')}
                    </CardColName>
                    {parent !== 'account' ?
                        <>
                            {ratingScale.map(grade =>
                                <CardColName
                                    key={grade}
                                    style={{
                                        padding: '5px',
                                        backgroundColor: onePartnerInfo.total_solvency >= grade && 'rgb(255, 186, 65, 0.3)',
                                    }}
                                >{grade}</CardColName>
                            )}
                        </> :
                        <CardColName
                            style={{ backgroundColor: onePartnerInfo.total_solvency == 0 ? '' : onePartnerInfo.total_solvency < 4 ? 'rgb(254, 111, 103,0.3)' : onePartnerInfo.total_solvency < 7 ? 'rgb(241,196,15,0.3)' : 'rgb(129, 199, 132,0.3)' }}
                        >{onePartnerInfo.total_solvency}</CardColName>
                    }
                    <CardColName>{SetNativeTranslate(Translate.language,{},'number_of_ratings')}</CardColName>
                    <CardColName
                        style={{
                            padding: '5px',
                            backgroundColor: onePartnerInfo.solvency_amount !== 0 && 'rgb(255, 186, 65, 0.3)',
                        }}
                    >{onePartnerInfo.solvency_amount}</CardColName>
                </CardRow> : <></>}
            <CardRow>
                <CardColName>{SetNativeTranslate(Translate.language,{},'politeness')}</CardColName>
                {parent !== 'account' ?
                    <>
                        {ratingScale.map(grade =>
                            <CardColName
                                key={grade}
                                style={{
                                    padding: '5px',
                                    backgroundColor: onePartnerInfo.total_politeness >= grade && 'rgb(255, 186, 65, 0.3)',
                                }}
                            >{grade}</CardColName>
                        )}     </> :
                    <CardColName
                        style={{ backgroundColor: onePartnerInfo.total_politeness == 0 ? '' : onePartnerInfo.total_politeness < 4 ? 'rgb(254, 111, 103,0.3)' : onePartnerInfo.total_politeness < 7 ? 'rgb(241,196,15,0.3)' : 'rgb(129, 199, 132,0.3)' }}
                    >{Math.floor(onePartnerInfo.total_politeness * 100) / 100}</CardColName>
                }
                <CardColName>{SetNativeTranslate(Translate.language,{},'number_of_ratings')}</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.politeness_amount !== 0 && 'rgb(255, 186, 65, 0.3)',
                    }}
                >{onePartnerInfo.politeness_amount}</CardColName>
            </CardRow>
            <CardRow>
                {parent !== 'account' ?
                    <CardColName>
                        {(user.user.role === 'carrier'  || user.user.role === 'driver') ? SetNativeTranslate(Translate.language,{},'no_downtime') :
                            user.user.role === 'customer' ? SetNativeTranslate(Translate.language,{},'submission_fulfillment') : ''}
                    </CardColName> :
                    <CardColName>
                        {user.user.role === 'customer' ? SetNativeTranslate(Translate.language,{},'no_downtime') :
                            (user.user.role === 'carrier' ||  user.user.role === 'driver') ? SetNativeTranslate(Translate.language,{},'submission_fulfillment') : ''}
                    </CardColName>}
                {parent !== 'account' ?
                    <>
                        {ratingScale.map(grade =>
                            <CardColName
                                key={grade}
                                style={{
                                    padding: '5px',
                                    backgroundColor: onePartnerInfo.total_in_time >= grade && 'rgb(255, 186, 65, 0.3)',
                                }}
                            >{grade}</CardColName>
                        )}
                    </> :
                    <CardColName
                        style={{ backgroundColor: onePartnerInfo.total_in_time == 0 ? '' : onePartnerInfo.total_in_time < 4 ? 'rgb(254, 111, 103,0.3)' : onePartnerInfo.total_in_time < 7 ? 'rgb(241,196,15,0.3)' : 'rgb(129, 199, 132,0.3)' }}
                    >{Math.floor(onePartnerInfo.total_in_time * 100) / 100}</CardColName>
                }
                <CardColName>{SetNativeTranslate(Translate.language,{},'number_of_ratings')}</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.in_time_amount !== 0 && 'rgb(255, 186, 65, 0.3)',
                    }}
                >{onePartnerInfo.in_time_amount}</CardColName>
            </CardRow>
            <CardRow>
                {parent !== 'account' ?
                    <CardColName>
                        {(user.user.role === 'carrier' || user.user.role === 'driver') ? SetNativeTranslate(Translate.language,{},'loading_unloading') :
                            user.user.role === 'customer' ? SetNativeTranslate(Translate.language,{},'transport_quality') : ''}
                    </CardColName> :
                    <CardColName>
                        {user.user.role === 'customer' ? SetNativeTranslate(Translate.language,{},'loading_unloading') :
                            (user.user.role === 'carrier' ||   user.user.role === 'driver') ? SetNativeTranslate(Translate.language,{},'transport_quality') : ''}
                    </CardColName>}
                {parent !== 'account' ?
                    <>
                        {ratingScale.map(grade =>
                            <CardColName
                                key={grade}
                                style={{
                                    padding: '5px',
                                    backgroundColor: onePartnerInfo.total_facilities >= grade && 'rgb(255, 186, 65, 0.3)',
                                }}
                            >{grade}</CardColName>
                        )}   </> :
                    <CardColName
                        style={{ backgroundColor: onePartnerInfo.total_facilities == 0 ? '' : onePartnerInfo.total_facilities < 4 ? 'rgb(254, 111, 103,0.3)' : onePartnerInfo.total_facilities < 7 ? 'rgb(241,196,15,0.3)' : 'rgb(129, 199, 132,0.3)' }}
                    >{Math.floor(onePartnerInfo.total_facilities * 100) / 100}</CardColName>
                }
                <CardColName>{SetNativeTranslate(Translate.language,{},'number_of_ratings')}</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.facilities_amount !== 0 && 'rgb(255, 186, 65, 0.3)',
                    }}
                >{onePartnerInfo.facilities_amount}</CardColName>
            </CardRow>
            <CardRow>
                <CardColName>{SetNativeTranslate(Translate.language,{},'total_rating')}</CardColName>
                <CardColName
                    style={{ backgroundColor: onePartnerInfo.total_rating == 0 ? '' : onePartnerInfo.total_rating < 4 ? 'rgb(254, 111, 103,0.3)' : onePartnerInfo.total_rating < 7 ? 'rgb(241,196,15,0.3)' : 'rgb(129, 199, 132,0.3)' }}
                >{Math.floor(onePartnerInfo.total_rating * 100) / 100}</CardColName>

            </CardRow>
        </VerticalContainer>
    )
}
)
export default RatingView