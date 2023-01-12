import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext, SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const PersonalDataAgreementRussia = observer(() => {
  const { Translate } = useContext(TranslateContext)
  const { Adress } = useContext(AdressContext)
  const { Setting } = useContext(SettingContext)

  return (
    <div className='modal_doc_container'>
      {Adress.country.value === 'russia' &&
        <div className={`modal_doc ${Setting.app_theme === 'dark' && 'dark'} new-line`}>{SetNativeTranslate(Translate.language, {
          russian: [``],
          english: [``]
        })}</div>
      }
    </div>
  )
})

export default PersonalDataAgreementRussia