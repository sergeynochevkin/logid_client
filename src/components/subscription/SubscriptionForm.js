import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { AdressContext, SettingContext, SubscriptionContext, UserInfoContext } from '../..'
import { SetTranslate } from '../../modules/SetTranslate'
import './Subscription.css'
import SubscriptionPlanItem from './SubscriptionPlanItem'

const SubscriptionForm = observer(({ setFetchPartnersStart, setModalActive, parent, mainRole }) => {
    const { Subscription } = useContext(SubscriptionContext)
    const { Setting } = useContext(SettingContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Adress } = useContext(AdressContext)
 
    return (
        <div
            className={'container'}
        >
            {parent !== 'main' &&
                <div className={Setting.app_theme === 'light' ? 'plan_form_name' : 'plan_form_name plan_form_name_dark'}>{SetTranslate('choose_subscription_plan')}</div>
            }
            <div
                className={'plans_container'}
            >
                {/* если выйти исчезает так как теряет user_info */}
                {parent !== 'main' ?
                    Subscription.plans.filter(el => el.plan_id !== 0 && el.country === UserInfo.userInfo.country).map(plan =>
                        <SubscriptionPlanItem key={plan.id} plan={plan} setFetchPartnersStart={setFetchPartnersStart} setModalActive={setModalActive} parent={parent} />
                    ) :
                    mainRole === 'carrier' ?

                        Subscription.plans.filter(el => el.plan_id !== 0 && el.country === Adress.country.value).map(plan =>
                            <SubscriptionPlanItem key={plan.id} plan={plan} setFetchPartnersStart={setFetchPartnersStart} setModalActive={setModalActive} parent={parent} mainRole={mainRole} />
                        )
                        : mainRole === 'customer' ?

                            Subscription.plans.filter(el => el.plan_id !== 0 && el.country === Adress.country.value).map(plan =>
                                <SubscriptionPlanItem key={plan.id} plan={plan} setFetchPartnersStart={setFetchPartnersStart} setModalActive={setModalActive} parent={parent} mainRole={mainRole} />
                            )
                            : <></>
                }

            </div>
        </div>
    )
})

export default SubscriptionForm