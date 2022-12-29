import React, { useContext, useState } from 'react'
import AddPartnerComponent from './AddPartnerComponent'
import PartnerGroupComponent from './PartnerGroupComponent'
import PartnersList from './PartnersList'
import { BookMark } from '../ui/button/BookMark'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { ComponentFunctionContext, TranslateContext } from '../..'
import { observer } from 'mobx-react-lite'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const Partners = observer(() => {
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const [modalActive, setModalActive] = useState(false)
  const { Translate } = useContext(TranslateContext)

  return (
    <VerticalContainer>

      <HorizontalContainer>
        <BookMark
          style={{ color: ComponentFunction.partnersComponentFunction === 'list' && 'grey' }}
          onClick={() => {
            ComponentFunction.setPartnersComponentFunction('list')
          }}
        >{SetNativeTranslate(Translate.language,{},'partners_list')}</BookMark>
        <BookMark
          style={{ color: ComponentFunction.partnersComponentFunction === 'groups' && 'grey' }}
          onClick={() => {
            ComponentFunction.setPartnersComponentFunction('groups')
          }}
        >{SetNativeTranslate(Translate.language,{},'groups')}</BookMark>
        <BookMark
          style={{ color: ComponentFunction.partnersComponentFunction === 'add' && 'grey' }}
          onClick={() => {
            ComponentFunction.setPartnersComponentFunction('add')
          }}
        >{SetNativeTranslate(Translate.language,{},'add_partner_by_id')}</BookMark>
      </HorizontalContainer>

      {ComponentFunction.partnersComponentFunction === 'list' ?
        <PartnersList  /> :
        ComponentFunction.partnersComponentFunction === 'groups' ?
          <PartnerGroupComponent  parent={'partners'} modalActive={modalActive} setModalActive={setModalActive} /> :
          ComponentFunction.partnersComponentFunction === 'add' ?
            <AddPartnerComponent /> : <></>}

    </VerticalContainer>
  )
})

export default Partners