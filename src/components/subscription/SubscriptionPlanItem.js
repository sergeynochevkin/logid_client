import React, { useContext } from 'react'

import { Button } from '../ui/button/Button'
import { CardButton } from '../ui/button/CardButton'
import { setColor } from '../../modules/setColor'
import { AdressContext, FetcherContext, NotificationContext, SettingContext, SubscriptionContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import OptionItem from './OptionItem'
import { observer } from 'mobx-react-lite'
import { updateSubscription } from '../../http/subscriptionApi'
import { setTime } from '../../modules/setTime'
import { v4 } from "uuid";
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const SubscriptionPlanItem = observer(({ plan, parent, setModalActive, mainRole, setYoomoneyToken, setModalActive2, paymentId, setPaymentId }) => {
    const { Subscription } = useContext(SubscriptionContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Notification } = useContext(NotificationContext)
    const { Setting } = useContext(SettingContext)
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)

    let optionsByPlan
    let initialTime
    let paid_to
    let updateSubscriptionAction

    const sortOptions = (a, b) => {
        if (a.option_id > b.option_id) {
            return 1
        } else if (a.option_id < b.option_id) {
            return -1
        } else {
            return 0
        }
    }

    if (plan) {
        optionsByPlan = Subscription.options_by_plans.filter(el => el.planId === plan.plan_id)
        if (parent === 'main') {
            optionsByPlan = Subscription.options.filter(el => optionsByPlan.map(el => el.optionId).includes(el.option_id) && (el.role === 'both' || el.role === mainRole) && el.country === Adress.country.value)
        } else {
            optionsByPlan = Subscription.options.filter(el => optionsByPlan.map(el => el.optionId).includes(el.option_id) && (el.role === 'both' || el.role === user.user.role) && el.country === UserInfo.userInfo.country)
        }


        initialTime = new Date();
        initialTime.setHours(23, 59, 59, 0)
        paid_to = setTime(initialTime, 1440 * plan.period, 'form')
        updateSubscriptionAction = async function () {
            try {
                await updateSubscription('', Translate.language, UserInfo.userInfo.id, plan.plan_id, paid_to).then(data => {
                    Notification.addNotification([{ id: v4(), type: 'success', message: data.message }])
                    if (plan.plan_id !== 1 && plan.plan_id !== 2 && UserInfo.userInfo.country === 'russia') {
                        setYoomoneyToken(data.token)
                        setPaymentId(data.payment_id)
                        setModalActive2(true)
                    } else {
                        fetcher.setSubscriptions(true)
                    }
                    setModalActive(false)
                })
            } catch (e) {
                Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
            }
        }
    }

    return (
        <>
            {plan ?
                <div className={parent === 'status' && plan.name === 'none' ? 'plan_item_container height padding' : parent === 'status' ? 'plan_item_container height' : plan.plan_id === Subscription.subscription.planId && user.user.role ? 'plan_item_container current' :
                    'plan_item_container'}
                    style={{
                        boxShadow: `0px 5px 10px 0px ${setColor(plan.name)}`,

                        color: Setting.app_theme === 'dark' ? 'white' : 'black'
                    }}>

                    <div className={'plan_name_container'}>
                        <div className={'plan_item_name'}>{SetNativeTranslate(Translate.language, {}, plan.name)}</div>
                        <div className={'plan_item_name_bage'}>{SetNativeTranslate(Translate.language, {}, plan.bage)}</div>
                    </div>

                    {parent !== 'status' ?
                        <div className={'options_container'}>
                            {plan ? optionsByPlan.sort(sortOptions).map(option => <OptionItem key={option.id} option={option} />) : <></>}
                        </div>
                        : <></>
                    }
                    <>
                        <div className={'price'}>{plan && plan.plan_id !== 1 ? plan.price : <div className='price_place_holder'></div>}</div>
                        {plan && plan.plan_id !== 1 ?
                            <div className='price_and_validity'>
                                <div className={'plan_item_name_bage'}>{Adress.country.currency}</div>
                                {plan.plan_id === Subscription.subscription.planId && user.user.role && Adress.country.value === 'russia' ?
                                    <div className={'plan_item_name_bage'}>{`${SetNativeTranslate(Translate.language, {}, 'active_until')} ${setTime(new Date(Subscription.subscription.paid_to), 0, 'show')}`}</div>
                                    : <div className='paid_to_place_holder'></div>}
                            </div>
                            : <></>}
                    </>

                    {(parent !== 'status' && plan.plan_id === 1) && parent !== 'main' ? <div className='button_place_holder'></div> : parent === 'main' ? <></> :
                        <Button
                            onClick={() => {
                                if (parent === 'status') {
                                    setModalActive(true)
                                } else {
                                    updateSubscriptionAction()
                                }
                            }}
                        >{Subscription.subscription.planId === 1 ? SetNativeTranslate(Translate.language, {}, 'subscribe') : plan.plan_id === Subscription.subscription.planId ? SetNativeTranslate(Translate.language, {}, 'renew') : SetNativeTranslate(Translate.language, {}, 'switch')}</Button>
                    }
                </div> : <></>}
        </>
    )
})

export default SubscriptionPlanItem

