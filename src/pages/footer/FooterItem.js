import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext } from '../..'
import './Footer.css'

const FooterItem = observer(({ item, setModalActive, setAgreement }) => {

  const { ComponentFunction } = useContext(ComponentFunctionContext)

  return (
    <>
      {item.id === 1 ? <img src={item.icon} className='footer_logo' /> :
        <div className={item.class}
          onClick={() => {
            if (item.id === 4) {
              ComponentFunction.setAgreement('UserAgeement')
              ComponentFunction.setAgreementModal(true)
            }
            if (item.id === 5) {
              ComponentFunction.setAgreement('PersonalDataAgreement')
              ComponentFunction.setAgreementModal(true)
            }
            if (item.id === 6) {
              ComponentFunction.setAgreement('PrivacyPolicy')
              ComponentFunction.setAgreementModal(true)
            }
          }}
        >{item.name}</div>
      }
    </>
  )
})

export default FooterItem