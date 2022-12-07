import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { SettingContext, SubscriptionContext } from '../..'
import './Subscription.css'
import SubscriptionPlanItem from './SubscriptionPlanItem'

const SubscriptionStatusComponent = observer(({setModalActive}) => {
  const { Subscription } = useContext(SubscriptionContext)
  const { Setting } = useContext(SettingContext)
  

  let currentPlan = Subscription.plans.find(el=>el.id === Subscription.subscription.planId)

  return (
    <>
      <SubscriptionPlanItem parent = {'status'} plan={currentPlan} setModalActive={setModalActive} />
    </>
  )
})

export default SubscriptionStatusComponent