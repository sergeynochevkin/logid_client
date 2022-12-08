import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext, SubscriptionContext, UserInfoContext } from '../..'
import './Subscription.css'
import SubscriptionPlanItem from './SubscriptionPlanItem'

const SubscriptionStatusComponent = observer(({ setModalActive }) => {
  const { Subscription } = useContext(SubscriptionContext)
  const { Setting } = useContext(SettingContext)
  const { UserInfo } = useContext(UserInfoContext)

  let currentPlan = Subscription.plans.find(el => el.plan_id === Subscription.subscription.planId && el.country === UserInfo.userInfo.country)

  return (
    <>
      <SubscriptionPlanItem parent={'status'} plan={currentPlan} setModalActive={setModalActive} />
    </>
  )
})

export default SubscriptionStatusComponent