import React, { useContext } from 'react'
import { SetTranslate } from '../../modules/SetTranslate'
import { Button } from '../ui/button/Button'
import { CardButton } from '../ui/button/CardButton'
import { useColor } from '../../hooks/useColor'
import { AdressContext, NotificationContext, SettingContext, SubscriptionContext, UserContext, UserInfoContext } from '../..'
import OptionItem from './OptionItem'
import { observer } from 'mobx-react-lite'
import { updateSubscription } from '../../http/subscriptionApi'
import { setTime } from '../../modules/setTime'
import { v4 } from "uuid";

const SubscriptionPlanItem = observer(({ plan, parent, setModalActive, setFetchPartnersStart }) => {
    const { Subscription } = useContext(SubscriptionContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Notification } = useContext(NotificationContext)
    const { Setting } = useContext(SettingContext)
    const { Adress } = useContext(AdressContext)

    let optionsByPlan
    let initialTime
    let paid_to
    let updateSubscriptionAction

    if (plan) {
        optionsByPlan = Subscription.options_by_plans.filter(el => el.planId === plan.plan_id)
        optionsByPlan = Subscription.options.filter(el => optionsByPlan.map(el => el.optionId).includes(el.option_id) && (el.role === 'both' || el.role === user.user.role) && el.country === UserInfo.userInfo.country)

        initialTime = new Date();
        initialTime.setHours(23, 59, 59, 0)
        paid_to = setTime(initialTime, 1440 * plan.period, 'form')
        updateSubscriptionAction = async function () {
            try {
                await updateSubscription(UserInfo.userInfo.id, plan.plan_id, paid_to).then(data => Notification.addNotification([{ id: v4(), type: 'success', message: data }]))
                setFetchPartnersStart(true)
                setModalActive(false)
            } catch (e) {
                Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
            }
        }
    }

    return (
        <>
            {plan ?
                <div className={parent === 'status' && plan.name === 'none' ? 'plan_item_container height padding' : parent === 'status' ? 'plan_item_container height' : plan.plan_id === Subscription.subscription.planId ? 'plan_item_container current' :
                    'plan_item_container'}
                    style={{ boxShadow: `0px 5px 10px 0px ${useColor(plan.name)}`, color: plan.plan_id !== Subscription.subscription.planId && Setting.app_theme === 'dark' ? 'white' : parent === 'status' && Setting.app_theme === 'dark' ? 'white' : 'black' }}>
                    <div className={'plan_name_container'}>
                        <div className={'plan_item_name'}>{SetTranslate(plan.name)}</div>
                        <div className={'plan_item_name_bage'}>{SetTranslate(plan.bage)}</div>
                    </div>
                    {parent !== 'status' ?
                        <div className={'options_container'}>
                            {plan ? optionsByPlan.map(option => <OptionItem key={option.id} option={option} />) : <></>}
                        </div>
                        : <></>
                    }
                    <>
                        <div className={'price'}>{plan && plan.plan_id !== 1  ? plan.price : ''}</div>
                        {plan && plan.plan_id !== 1  ?
                            <div className='price_and_validity'>
                                <div className={'plan_item_name_bage'}>{Adress.country.currency}</div>
                                {plan.plan_id === Subscription.subscription.planId ?
                                    <div className={'plan_item_name_bage'}>{`${SetTranslate('active_until')} ${setTime(new Date(Subscription.subscription.paid_to), 0, 'show')}`}</div>
                                    : <></>}
                            </div>
                            : <></>}
                    </>

                    {parent !== 'status' && plan.plan_id === 1 ? <></> :
                        <Button
                            onClick={() => {
                                if (parent === 'status') {
                                    setModalActive(true)
                                } else {
                                    updateSubscriptionAction()
                                }
                            }}
                        >{Subscription.subscription.planId === 1 ? SetTranslate('subscribe') : plan.plan_id === Subscription.subscription.planId ? SetTranslate('renew') : SetTranslate('switch')}</Button>
                    }
                </div> : <></>}
        </>
    )
})

export default SubscriptionPlanItem

