import React from 'react'

const FooterItem = ({item, setModalActive, setAgreement}) => {
  return (
    <div className={item.class}
    onClick={()=>{
      if(item.id === 4){
        setAgreement('UserAgeement')    
        setModalActive(true)    
      }
      if(item.id === 5){
        setAgreement('PersonalDataAgreement')
        setModalActive(true)
      }
      if(item.id === 6){
        setAgreement('PrivacyPolicy')
        setModalActive(true)
      }     
    }}
    >{item.name}</div>
  )
}

export default FooterItem