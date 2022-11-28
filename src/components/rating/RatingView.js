import React from 'react'
import { CardColName } from '../ui/card/CardColName'
import { CardRow } from '../ui/card/CardRow'
import { VerticalContainer } from '../ui/page/VerticalContainer'

const RatingView = ({ onePartnerInfo, user, parent }) => {
    const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <VerticalContainer>
            <CardRow>
                <CardColName>Завершено заказов</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.complete_orders_amount === 0 ? 'lightgray' : 'rgb(255, 186, 65, 0.8)',
                    }}
                >{onePartnerInfo.complete_orders_amount}</CardColName>
                <CardColName>Сорвано заказов</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.disruption_amount === 0 ? 'lightgray' : 'rgb(254, 111, 103,0.8)',
                    }}
                >{onePartnerInfo.disruption_amount}</CardColName>
            </CardRow>

            {(user.user.role === 'carrier' && parent !== 'account') || (user.user.role === 'customer' && parent === 'account') ?
                <CardRow>
                    <CardColName>
                        Платежеспособность
                    </CardColName>
                    {parent !== 'account' ?
                        <>
                            {ratingScale.map(grade =>
                                <CardColName
                                    key={grade}
                                    style={{
                                        padding: '5px',
                                        backgroundColor: onePartnerInfo.total_solvency >= grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                                    }}
                                >{grade}</CardColName>
                            )}
                        </> :
                        <CardColName
                            style={{ backgroundColor: onePartnerInfo.total_in_time == 0 ? 'lightgray' : onePartnerInfo.total_in_time < 4 ? 'rgb(254, 111, 103,0.8)' : onePartnerInfo.total_in_time < 7 ? 'rgb(241,196,15,0.8)' : 'rgb(129, 199, 132,0.8)' }}
                        >{onePartnerInfo.total_solvency}</CardColName>
                    }
                    <CardColName>Оценок</CardColName>
                    <CardColName
                        style={{
                            padding: '5px',
                            backgroundColor: onePartnerInfo.solvency_amount === 0 ? 'lightgray' : 'rgb(255, 186, 65, 0.8)',
                        }}
                    >{onePartnerInfo.solvency_amount}</CardColName>
                </CardRow> : <></>}
            <CardRow>
                <CardColName>Вежливость</CardColName>
                {parent !== 'account' ?
                    <>
                        {ratingScale.map(grade =>
                            <CardColName
                                key={grade}
                                style={{
                                    padding: '5px',
                                    backgroundColor: onePartnerInfo.total_politeness >= grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                                }}
                            >{grade}</CardColName>
                        )}     </> :
                    <CardColName
                        style={{ backgroundColor: onePartnerInfo.total_in_time == 0 ? 'lightgray' : onePartnerInfo.total_in_time < 4 ? 'rgb(254, 111, 103,0.8)' : onePartnerInfo.total_in_time < 7 ? 'rgb(241,196,15,0.8)' : 'rgb(129, 199, 132,0.8)' }}
                    >{onePartnerInfo.total_politeness}</CardColName>
                }
                <CardColName>Оценок</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.politeness_amount === 0 ? 'lightgray' : 'rgb(255, 186, 65, 0.8)',
                    }}
                >{onePartnerInfo.politeness_amount}</CardColName>
            </CardRow>
            <CardRow>
                {parent !== 'account' ?
                    <CardColName>
                        {user.user.role === 'carrier' ? 'Отсутствие простоя по вине заказчика' :
                            user.user.role === 'customer' ? 'Своевременная подача и выполнение' : ''}
                    </CardColName> :
                    <CardColName>
                        {user.user.role === 'customer' ? 'Отсутствие простоя по вине заказчика' :
                            user.user.role === 'carrier' ? 'Своевременная подача и выполнение' : ''}
                    </CardColName>}
                {parent !== 'account' ?
                    <>
                        {ratingScale.map(grade =>
                            <CardColName
                                key={grade}
                                style={{
                                    padding: '5px',
                                    backgroundColor: onePartnerInfo.total_in_time >= grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                                }}
                            >{grade}</CardColName>
                        )}
                    </> :
                    <CardColName
                        style={{ backgroundColor: onePartnerInfo.total_in_time == 0 ? 'lightgray' : onePartnerInfo.total_in_time < 4 ? 'rgb(254, 111, 103,0.8)' : onePartnerInfo.total_in_time < 7 ? 'rgb(241,196,15,0.8)' : 'rgb(129, 199, 132,0.8)' }}
                    >{onePartnerInfo.total_in_time}</CardColName>
                }
                <CardColName>Оценок</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.in_time_amount === 0 ? 'lightgray' : 'rgb(255, 186, 65, 0.8)',
                    }}
                >{onePartnerInfo.in_time_amount}</CardColName>
            </CardRow>
            <CardRow>
                {parent !== 'account' ?
                    <CardColName>
                        {user.user.role === 'carrier' ? 'Организация погрузки и выгрузки' :
                            user.user.role === 'customer' ? 'Качество транспорта' : ''}
                    </CardColName> :
                    <CardColName>
                        {user.user.role === 'customer' ? 'Организация погрузки и выгрузки' :
                            user.user.role === 'carrier' ? 'Качество транспорта' : ''}
                    </CardColName>}
                {parent !== 'account' ?
                    <>
                        {ratingScale.map(grade =>
                            <CardColName
                                key={grade}
                                style={{
                                    padding: '5px',
                                    backgroundColor: onePartnerInfo.total_facilities >= grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                                }}
                            >{grade}</CardColName>
                        )}   </> :
                    <CardColName
                        style={{ backgroundColor: onePartnerInfo.total_in_time==0 ? 'lightgray' : onePartnerInfo.total_in_time < 4 ? 'rgb(254, 111, 103,0.8)' : onePartnerInfo.total_in_time < 7 ? 'rgb(241,196,15,0.8)' : 'rgb(129, 199, 132,0.8)' }}
                    >{onePartnerInfo.total_in_time}</CardColName>
                }
                <CardColName>Оценок</CardColName>
                <CardColName
                    style={{
                        padding: '5px',
                        backgroundColor: onePartnerInfo.facilities_amount === 0 ? 'lightgray' : 'rgb(255, 186, 65, 0.8)',
                    }}
                >{onePartnerInfo.facilities_amount}</CardColName>
            </CardRow>
            <CardRow>
            <CardColName>Рейтинг</CardColName>
            <CardColName
                        style={{ backgroundColor: onePartnerInfo.total_rating==0 ? 'lightgray' : onePartnerInfo.total_rating < 4 ? 'rgb(254, 111, 103,0.8)' : onePartnerInfo.total_rating < 7 ? 'rgb(241,196,15,0.8)' : 'rgb(129, 199, 132,0.8)' }}
                    >{Math.floor(onePartnerInfo.total_rating*100)/100}</CardColName>
            
            </CardRow>
        </VerticalContainer>
    )
}

export default RatingView