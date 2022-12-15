import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext, SubscriptionContext, UserInfoContext } from '../..'
import { SetTranslate } from '../../modules/SetTranslate'
import './Subscription.css'
import SubscriptionPlanItem from './SubscriptionPlanItem'

const SubscriptionForm = observer(({ setFetchPartnersStart, setModalActive, parent }) => {
    const { Subscription } = useContext(SubscriptionContext)
    const { Setting } = useContext(SettingContext)
    const { UserInfo } = useContext(UserInfoContext)

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
                {Subscription.plans.filter(el => el.plan_id !== 0 & el.country === UserInfo.userInfo.country).map(plan =>
                    <SubscriptionPlanItem key={plan.id} plan={plan} setFetchPartnersStart={setFetchPartnersStart} setModalActive={setModalActive} parent={parent} />
                )}

            </div>
        </div>
    )
})

export default SubscriptionForm