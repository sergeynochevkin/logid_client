import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { AdressContext, SettingContext, SubscriptionContext, UserInfoContext } from '../..'

import './Subscription.css'
import SubscriptionPlanItem from './SubscriptionPlanItem'

const SubscriptionForm = observer(({ setModalActive, parent, mainRole, setYoomoneyToken, setModalActive2, setActivateForm, activateForm, paymentId, setPaymentId }) => {
    const { Subscription } = useContext(SubscriptionContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Adress } = useContext(AdressContext)

    const sortPlans = (a, b) => {
        if (a.plan_id > b.plan_id) {
            return 1
        } else if (a.plan_id < b.plan_id) {
            return -1
        } else {
            return 0
        }
    }

    return (
        <div className='scroll_bar_container'>
            <div
                className={'container'}
            >
                {/* {parent !== 'main' &&
                <div className={Setting.app_theme === 'light' ? 'plan_form_name' : 'plan_form_name plan_form_name_dark'}>{SetNativeTranslate(Translate.language,{},'choose_subscription_plan')}</div>
            } */}
                <div
                    className={'plans_container'}
                >
                    {parent !== 'main' ?
                        Subscription.plans.filter(el => el.plan_id !== 0 && el.country === UserInfo.userInfo.country).sort(sortPlans).map(plan =>
                            <SubscriptionPlanItem key={plan.id} plan={plan} setModalActive={setModalActive} parent={parent} setYoomoneyToken={setYoomoneyToken} setModalActive2={setModalActive2} activateForm={activateForm} setActivateForm={setActivateForm} paymentId={paymentId} setPaymentId={setPaymentId} />
                        ) :
                        mainRole === 'carrier' ?

                            Subscription.plans.filter(el => el.plan_id !== 0 && el.country === Adress.country.value).sort(sortPlans).map(plan =>
                                <SubscriptionPlanItem key={plan.id} plan={plan} setModalActive={setModalActive} parent={parent} mainRole={mainRole} setYoomoneyToken={setYoomoneyToken} setModalActive2={setModalActive2} activateForm={activateForm} setActivateForm={setActivateForm} paymentId={paymentId} setPaymentId={setPaymentId} />
                            )
                            : mainRole === 'customer' ?

                                Subscription.plans.filter(el => el.plan_id !== 0 && el.country === Adress.country.value).sort(sortPlans).map(plan =>
                                    <SubscriptionPlanItem key={plan.id} plan={plan} setModalActive={setModalActive} parent={parent} mainRole={mainRole} setYoomoneyToken={setYoomoneyToken} setModalActive2={setModalActive2} activateForm={activateForm} setActivateForm={setActivateForm} paymentId={paymentId} setPaymentId={setPaymentId} />
                                )
                                : <></>
                    }

                </div>
            </div>
        </div>
    )
})

export default SubscriptionForm