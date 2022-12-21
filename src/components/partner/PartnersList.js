import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { FilterAndSortContext, PartnerContext, RatingContext, TranslateContext } from '../..'
import useDebounce from '../../hooks/useDebounce'
import FilterAndSortComponentForServer from '../FilterAndSortComponentForServer'
import PartnerGroupComponent from './PartnerGroupComponent'
import PartnerItem from './PartnerItem'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'
import { SetTranslate } from '../../modules/SetTranslate'
import NoData from '../ui/page/NoData'
import '../order/Order.css'


const PartnersList = observer(({ setFetchPartnersStart }) => {
  const { Partner } = useContext(PartnerContext)
  const { Rating } = useContext(RatingContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Translate } = useContext(TranslateContext)

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(FilterAndSort.partnerFilters.partners, 500);

  useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        // Выставить состояние isSearching
        setIsSearching(true);
        // Сделать запрос к АПИ
        setFetchPartnersStart(true)
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  )

  return (
    <>

      <VerticalContainer
        style={{ alignItems: 'center' }}>
        <FilterAndSortComponentForServer
          parent={'partners'}
        />
        <PartnerGroupComponent parent={'partnerList'} setFetchPartnersStart={setFetchPartnersStart} />
        <div className={'scroll_bar_container'}>
        {Partner.partnerInfos.length !== 0 ?
          <>
            <table className={'order_table'}>
              <tbody >
                <tr>
                  <OrderTh>{SetTranslate('id')}</OrderTh>
                  <OrderTh>{SetTranslate('partner_name')}</OrderTh>
                  <OrderTh>{SetTranslate('phone')}</OrderTh>
                  <OrderTh>{SetTranslate('rating_field_name')}</OrderTh>
                  <OrderTh>{SetTranslate('groups_field_name')}</OrderTh>
                  <OrderTh>{SetTranslate('status')}</OrderTh>
                </tr>
              </tbody>
              <tbody>
                {
                  Partner.partnerInfos.map(onePartnerInfo =>
                    <PartnerItem
                      key={onePartnerInfo.id}
                      onePartnerInfo={onePartnerInfo}
                      onePartner={Partner.partners.find(el => el.partnerUserInfoId === onePartnerInfo.id)}
                      onePartnerOtherRatingByThisUserInfo={Rating.otherRatings.find(el => el.ratedUserInfoId === onePartnerInfo.id)}
                      setFetchPartnersStart={setFetchPartnersStart}
                    />
                  )
                }
              </tbody>
            </table>
          </>
          : <NoData
          >{SetTranslate('no_partners')}</NoData>}
          </div>
      </VerticalContainer>
    </>
  )
})

export default PartnersList