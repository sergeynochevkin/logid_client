import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { FilterAndSortContext, PartnerContext, RatingContext } from '../..'
import useDebounce from '../../hooks/useDebounce'
import FilterAndSortComponentForServer from '../FilterAndSortComponentForServer'
import PartnerGroupComponent from './PartnerGroupComponent'
import PartnerItem from './PartnerItem'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { OrderTh } from '../ui/table/OrderTh'


const PartnersList = observer(({ setFetchPartnersStart }) => {
  const { Partner } = useContext(PartnerContext)
  const { Rating } = useContext(RatingContext)
  const { FilterAndSort } = useContext(FilterAndSortContext)

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
      <FilterAndSortComponentForServer
        parent={'partners'}
      />
      <VerticalContainer
        style={{ alignItems: 'center' }}>
        <PartnerGroupComponent parent={'partnerList'} setFetchPartnersStart={setFetchPartnersStart}/>
        {Partner.partnerInfos.length !== 0 ?
          <>
            <table>
              <tbody>
                <tr>
                  <OrderTh>id</OrderTh>
                  <OrderTh>Наименование</OrderTh>
                  <OrderTh>Телефон</OrderTh>
                  <OrderTh>Рейтинг</OrderTh>
                  <OrderTh>Группы</OrderTh>
                  <OrderTh>Статус</OrderTh>
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
          : <div
            style={{
              marginTop: '10vh',
              fontSize: '20px'
            }}
          >Нет партнеров</div>}
      </VerticalContainer>
    </>
  )
})

export default PartnersList