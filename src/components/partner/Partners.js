import React, { useContext, useState } from 'react'
import AddPartnerComponent from './AddPartnerComponent'
import PartnerGroupComponent from './PartnerGroupComponent'
import PartnersList from './PartnersList'
import { BookMark } from '../ui/button/BookMark'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { ComponentFunctionContext } from '../..'
import { observer } from 'mobx-react-lite'
import { SetTranslate } from '../../modules/SetTranslate'

const Partners = observer(({ setFetchPartnersStart }) => {
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const [modalActive, setModalActive] = useState(false)

  return (
    <VerticalContainer>

      <HorizontalContainer>
        <BookMark
          style={{ color: ComponentFunction.partnersComponentFunction === 'list' && 'grey' }}
          onClick={() => {
            ComponentFunction.setPartnersComponentFunction('list')
          }}
        >{SetTranslate('partners_list')}</BookMark>
        <BookMark
          style={{ color: ComponentFunction.partnersComponentFunction === 'groups' && 'grey' }}
          onClick={() => {
            ComponentFunction.setPartnersComponentFunction('groups')
          }}
        >{SetTranslate('groups')}</BookMark>
        <BookMark
          style={{ color: ComponentFunction.partnersComponentFunction === 'add' && 'grey' }}
          onClick={() => {
            ComponentFunction.setPartnersComponentFunction('add')
          }}
        >{SetTranslate('add_partner_by_id')}</BookMark>
      </HorizontalContainer>

      {ComponentFunction.partnersComponentFunction === 'list' ?
        <PartnersList setFetchPartnersStart={setFetchPartnersStart} /> :
        ComponentFunction.partnersComponentFunction === 'groups' ?
          <PartnerGroupComponent setFetchPartnersStart={setFetchPartnersStart} parent={'partners'} modalActive={modalActive} setModalActive={setModalActive} /> :
          ComponentFunction.partnersComponentFunction === 'add' ?
            <AddPartnerComponent /> : <></>}

    </VerticalContainer>
  )
})

export default Partners