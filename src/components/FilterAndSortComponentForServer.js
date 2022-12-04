import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, PartnerContext, SettingContext, UserContext } from '..'
import PartnerGroupItem from './partner/PartnerGroupItem'
import FilterInput from './ui/form/FilterInput'
import { FilterSelect } from './ui/form/FilterSelect'
import { HorizontalContainer } from './ui/page/HorizontalContainer'
import { VerticalContainer } from './ui/page/VerticalContainer'
import './order/Order.css'
import { SetTranslate } from '../modules/SetTranslate'

const FilterAndSortComponentForServer = observer(({ parent, setFetchStart, setFetchPartnersStart }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const [timeFromOnFocus, setTimeFromOnFocus] = useState(false)
    const [timeToOnFocus, setTimeToOnFocus] = useState(false)
    const { Partner } = useContext(PartnerContext)
    const { user } = useContext(UserContext)
    const { Setting } = useContext(SettingContext)


    useEffect(() => {
        setTimeFromOnFocus(false)
        setTimeToOnFocus(false)
    }, [ComponentFunction.Function])


    const inputHandler = (e) => {
        if (parent === 'orders') {
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], [e.target.name]: e.target.value }, ComponentFunction.Function)
        }
        if (parent === 'partners') {
            FilterAndSort.setPartnerFilters({ ...FilterAndSort.partnerFilters[ComponentFunction.Function], [e.target.name]: e.target.value }, ComponentFunction.Function)
        }
    }

    return (

        <VerticalContainer>
            <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
                <div className='scroll_content_container'>
                    <FilterInput
                        fieldName='id'
                        inputHandler={inputHandler}
                        placeHolder='id'
                        type='number'
                        filterSet={parent === 'orders' ? 'filters' : parent === 'partners' ? 'partnerFilters' : ''}
                    />
                    {parent === 'orders' ? <>
                        <FilterInput
                            fieldName='name'
                            inputHandler={inputHandler}
                            placeHolder='Адрес'
                            type='text'
                            filterSet={'filters'}
                        />
                    </> : <></>
                    }
                    <FilterInput
                        fieldName='partnerName'
                        inputHandler={inputHandler}
                        placeHolder='Партнер'
                        type='text'
                        filterSet={parent === 'orders' ? 'filters' : parent === 'partners' ? 'partnerFilters' : ''}
                    />
                    {parent === 'orders' ? <>
                        <FilterInput
                            fieldName='costFrom'
                            inputHandler={inputHandler}
                            placeHolder='Стоимость от'
                            type='number'
                            filterSet={'filters'}
                        />
                        <FilterInput
                            fieldName='costTo'
                            inputHandler={inputHandler}
                            placeHolder='стоимость до'
                            type='number'
                            filterSet={'filters'}
                        />
                        <FilterInput
                            fieldName='timeFrom'
                            inputHandler={inputHandler}
                            placeHolder='Дата от'
                            type={FilterAndSort.filters[ComponentFunction.Function].timeFrom === '' && timeFromOnFocus === false ? 'text' : timeFromOnFocus === true ? 'datetime-local' : 'datetime-local'}
                            onFocus={() => setTimeFromOnFocus(true)}
                            onBlur={() => setTimeFromOnFocus(false)}
                            setTimeFromOnFocus={setTimeFromOnFocus}
                            filterSet={'filters'}
                        />
                        <FilterInput
                            fieldName='timeTo'
                            inputHandler={inputHandler}
                            placeHolder='Дата до'
                            type={FilterAndSort.filters[ComponentFunction.Function].timeTo === '' && timeToOnFocus === false ? 'text' : timeFromOnFocus === true ? 'datetime-local' : 'datetime-local'}
                            onFocus={() => setTimeToOnFocus(true)}
                            onBlur={() => setTimeToOnFocus(false)}
                            setTimeToOnFocus={setTimeToOnFocus}
                            filterSet={'filters'}
                        />
                        <FilterSelect
                            fieldName='selectedSort'
                            inputHandler={inputHandler}
                            defaultvalue='Сортировка'
                            sortOptions={[
                                { value: 'default', name: SetTranslate('default') },
                                { value: 'auctionFirst', name: SetTranslate('from_auctions') },
                                { value: 'orderFirst', name: SetTranslate('from_orders') },
                                { value: 'finalStatus', name: SetTranslate('latest_status') },
                                { value: 'transportType', name: SetTranslate('transport_type') },
                                { value: 'costUp', name: SetTranslate('ascending_cost') },
                                { value: 'costDown', name: SetTranslate('descending_cost') },
                                { value: 'firstCreated', name: SetTranslate('new_old') },
                                { value: 'lastCreated', name: SetTranslate('old_new') },
                            ]}
                            filterSet={'filters'}
                        >
                        </FilterSelect>
                    </> : parent === 'partners' ?
                        <FilterSelect FilterSelect
                            fieldName='selectedSort'
                            inputHandler={inputHandler}
                            defaultvalue='Сортировка'
                            sortOptions={[
                                { value: 'default', name: 'По умолчанию' },
                                { value: 'name', name: 'По наименованию' },
                                { value: 'ratingUp', name: 'По возрастанию рейтинга' },
                                { value: 'ratingDown', name: 'По убыванию рейтинга' }
                            ]}
                            filterSet={'partnerFilters'}
                        ></FilterSelect>
                        : <></>
                    }
                </div>

                <HorizontalContainer>
                    {user.user.role === 'carrier' && ComponentFunction.Function === 'new' && Partner.groups.length > 0 ?
                        <>
                            {Partner.groups.filter(el => el.partners.length > 0).map(
                                group => <PartnerGroupItem key={group.dataValues.id} group={group} setFetchStart={setFetchStart} parent={'orders'} />
                            )}
                        </> :
                        <></>
                    }
                </HorizontalContainer>
            </div>
        </VerticalContainer>

    )
})

export default FilterAndSortComponentForServer