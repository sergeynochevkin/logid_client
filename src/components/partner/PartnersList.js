import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { FetcherContext, FilterAndSortContext, PartnerContext, RatingContext, TranslateContext } from '../..'
import useDebounce from '../../hooks/useDebounce'
import FilterAndSortComponentForServer from '../filterAndSort/FilterAndSortComponentForServer'
import PartnerGroupComponent from './PartnerGroupComponent'
import PartnerItem from './PartnerItem'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'

import NoData from '../ui/page/NoData'
import '../order/Order.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


const PartnersList = observer(() => {
  const { Partner } = useContext(PartnerContext)
  const { Rating } = useContext(RatingContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)
  const { Translate } = useContext(TranslateContext)
  const { fetcher } = useContext(FetcherContext)
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
        fetcher.setPartners(true)
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
        <PartnerGroupComponent parent={'partnerList'}  />
        <div className={'scroll_bar_container'}>
        {Partner.partnerInfos.length !== 0 ?
          <>
            <table className={'order_table'}>
              <tbody >
                <tr>
                  <OrderTh>{SetNativeTranslate(Translate.language,{},'id')}</OrderTh>
                  <OrderTh>{SetNativeTranslate(Translate.language,{},'partner_name')}</OrderTh>
                  <OrderTh>{SetNativeTranslate(Translate.language,{},'phone')}</OrderTh>
                  <OrderTh>{SetNativeTranslate(Translate.language,{},'rating_field_name')}</OrderTh>
                  <OrderTh>{SetNativeTranslate(Translate.language,{},'groups_field_name')}</OrderTh>
                  <OrderTh>{SetNativeTranslate(Translate.language,{},'status')}</OrderTh>
                </tr>
              </tbody>
              <tbody>

              
                {Partner.partners.length>0 &&
                  Partner.partnerInfos.map(onePartnerInfo =>
                    <PartnerItem
                      key={onePartnerInfo.id}
                      onePartnerInfo={onePartnerInfo}
                      onePartner={Partner.partners.find(el => el.partnerUserInfoId === onePartnerInfo.id)}
                      onePartnerOtherRatingByThisUserInfo={Rating.otherRatings.find(el => el.ratedUserInfoId === onePartnerInfo.id)}
                      
                    />
                  )
                }
              </tbody>
            </table>
          </>
          : <NoData
          >{SetNativeTranslate(Translate.language,{},'no_partners')}</NoData>}
          </div>
      </VerticalContainer>
    </>
  )
})

export default PartnersList