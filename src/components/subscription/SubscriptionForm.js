import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SubscriptionContext } from '../..'
import { SetTranslate } from '../../modules/SetTranslate'
import './Subscription.css'
import SubscriptionPlanItem from './SubscriptionPlanItem'

const SubscriptionForm = observer(({setFetchPartnersStart, setModalActive}) => {
    const { Subscription } = useContext(SubscriptionContext)

    return (
        <div
            className={'container'}
        >
            <div className={'name'}>{SetTranslate('choose_subscription_plan')}</div>
            <div
                className={'plans_container'}
            >
                {Subscription.plans.filter(el => el.id !== 0).map(plan =>
                    <SubscriptionPlanItem key={plan.id} plan={plan} setFetchPartnersStart={setFetchPartnersStart} setModalActive={setModalActive} />
                )}

            </div>
        </div>
    )
})

export default SubscriptionForm