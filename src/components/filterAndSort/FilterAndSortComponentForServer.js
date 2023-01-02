import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, PartnerContext, SettingContext, TranslateContext, UserContext } from '../..'
import PartnerGroupItem from '../partner/PartnerGroupItem'
import FilterInput from '../ui/form/FilterInput'
import { FilterSelect } from '../ui/form/FilterSelect'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import '../order/Order.css'
import './FilterAndSort.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const FilterAndSortComponentForServer = observer(({ parent }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const [timeFromOnFocus, setTimeFromOnFocus] = useState(false)
    const [timeToOnFocus, setTimeToOnFocus] = useState(false)
    const { Partner } = useContext(PartnerContext)
    const { user } = useContext(UserContext)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)


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

    const resetFilters = () => {
        if (parent === 'orders') {
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], id: '' }, ComponentFunction.Function)
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], selectedSort: '' }, ComponentFunction.Function)
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], costFrom: '' }, ComponentFunction.Function)
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], costTo: '' }, ComponentFunction.Function)
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], timeFrom: '' }, ComponentFunction.Function)
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], timeTo: '' }, ComponentFunction.Function)
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], name: '' }, ComponentFunction.Function)
            FilterAndSort.setFilters({ ...FilterAndSort.filters[ComponentFunction.Function], partnerName: '' }, ComponentFunction.Function)
        }
        if (parent === 'partners') {
            FilterAndSort.setPartnerFilters({ ...FilterAndSort.filters[ComponentFunction.Function], id: '' }, ComponentFunction.Function)
            FilterAndSort.setPartnerFilters({ ...FilterAndSort.filters[ComponentFunction.Function], partnerName: '' }, ComponentFunction.Function)
            FilterAndSort.setPartnerFilters({ ...FilterAndSort.filters[ComponentFunction.Function], selectedSort: '' }, ComponentFunction.Function)
        }
    }

    return (

        <VerticalContainer>
            <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
                <div className='scroll_content_container'>


                    {parent === 'orders' &&
                        (FilterAndSort.filters[ComponentFunction.Function].id !== '' ||
                            FilterAndSort.filters[ComponentFunction.Function].selectedSort !== '' ||
                            FilterAndSort.filters[ComponentFunction.Function].costFrom !== '' ||
                            FilterAndSort.filters[ComponentFunction.Function].costTo !== '' ||
                            FilterAndSort.filters[ComponentFunction.Function].timeFrom !== '' ||
                            FilterAndSort.filters[ComponentFunction.Function].timeTo !== '' ||
                            FilterAndSort.filters[ComponentFunction.Function].name !== '' ||
                            FilterAndSort.filters[ComponentFunction.Function].partnerName !== ''
                        ) ?
                        <span class="material-symbols-outlined filter_reset_icon"
                            onClick={resetFilters}
                        >
                            filter_alt_off
                        </span> : <></>
                    }
                    {parent === 'partners' &&
                        (FilterAndSort.partnerFilters[ComponentFunction.Function].id !== '' ||
                            FilterAndSort.partnerFilters[ComponentFunction.Function].partnerName !== '' ||
                            FilterAndSort.partnerFilters[ComponentFunction.Function].selectedSort !== ''
                        ) ?
                        <span class="material-symbols-outlined filter_reset_icon"
                            onClick={resetFilters}
                        >
                            filter_alt_off
                        </span> : <></>
                    }





                    <FilterInput
                        fieldName='id'
                        inputHandler={inputHandler}
                        placeHolder={SetNativeTranslate(Translate.language, {}, 'filter_id')}
                        type='number'
                        filterSet={parent === 'orders' ? 'filters' : parent === 'partners' ? 'partnerFilters' : ''}
                    />
                    {parent === 'orders' ? <>
                        <FilterInput
                            fieldName='name'
                            inputHandler={inputHandler}
                            placeHolder={SetNativeTranslate(Translate.language, {}, 'adress')}
                            type='text'
                            filterSet={'filters'}
                        />
                    </> : <></>
                    }
                    <FilterInput
                        fieldName='partnerName'
                        inputHandler={inputHandler}
                        placeHolder={SetNativeTranslate(Translate.language, {}, 'partner')}
                        type='text'
                        filterSet={parent === 'orders' ? 'filters' : parent === 'partners' ? 'partnerFilters' : ''}
                    />
                    {parent === 'orders' ? <>
                        <FilterInput
                            fieldName='costFrom'
                            inputHandler={inputHandler}
                            placeHolder={SetNativeTranslate(Translate.language, {}, 'cost_from')}
                            type='number'
                            filterSet={'filters'}
                        />
                        <FilterInput
                            fieldName='costTo'
                            inputHandler={inputHandler}
                            placeHolder={SetNativeTranslate(Translate.language, {}, 'cost_to')}
                            type='number'
                            filterSet={'filters'}
                        />
                        <FilterInput
                            fieldName='timeFrom'
                            inputHandler={inputHandler}
                            placeHolder={SetNativeTranslate(Translate.language, {}, 'date_from')}
                            type={FilterAndSort.filters[ComponentFunction.Function].timeFrom === '' && timeFromOnFocus === false ? 'text' : timeFromOnFocus === true ? 'datetime-local' : 'datetime-local'}
                            onFocus={() => setTimeFromOnFocus(true)}
                            onBlur={() => setTimeFromOnFocus(false)}
                            setTimeFromOnFocus={setTimeFromOnFocus}
                            filterSet={'filters'}
                        />
                        <FilterInput
                            fieldName='timeTo'
                            inputHandler={inputHandler}
                            placeHolder={SetNativeTranslate(Translate.language, {}, 'date_to')}
                            type={FilterAndSort.filters[ComponentFunction.Function].timeTo === '' && timeToOnFocus === false ? 'text' : timeFromOnFocus === true ? 'datetime-local' : 'datetime-local'}
                            onFocus={() => setTimeToOnFocus(true)}
                            onBlur={() => setTimeToOnFocus(false)}
                            setTimeToOnFocus={setTimeToOnFocus}
                            filterSet={'filters'}
                        />
                        <FilterSelect
                            fieldName='selectedSort'
                            inputHandler={inputHandler}
                            defaultvalue={SetNativeTranslate(Translate.language, {}, 'sorting')}
                            sortOptions={[
                                { value: 'default', name: SetNativeTranslate(Translate.language, {}, 'default') },
                                { value: 'auctionFirst', name: SetNativeTranslate(Translate.language, {}, 'from_auctions') },
                                { value: 'orderFirst', name: SetNativeTranslate(Translate.language, {}, 'from_orders') },
                                { value: 'finalStatus', name: SetNativeTranslate(Translate.language, {}, 'latest_status') },
                                { value: 'transportType', name: SetNativeTranslate(Translate.language, {}, 'transport_type') },
                                { value: 'costUp', name: SetNativeTranslate(Translate.language, {}, 'ascending_cost') },
                                { value: 'costDown', name: SetNativeTranslate(Translate.language, {}, 'descending_cost') },
                                { value: 'firstCreated', name: SetNativeTranslate(Translate.language, {}, 'new_old') },
                                { value: 'lastCreated', name: SetNativeTranslate(Translate.language, {}, 'old_new') },
                            ]}
                            filterSet={'filters'}
                        >
                        </FilterSelect>
                    </> : parent === 'partners' ?
                        <FilterSelect FilterSelect
                            fieldName='selectedSort'
                            inputHandler={inputHandler}
                            defaultvalue={SetNativeTranslate(Translate.language, {}, 'sorting')}
                            sortOptions={[
                                { value: 'default', name: SetNativeTranslate(Translate.language, {}, 'default') },
                                { value: 'name', name: SetNativeTranslate(Translate.language, {}, 'by_partner_name') },
                                { value: 'ratingUp', name: SetNativeTranslate(Translate.language, {}, 'rating_up') },
                                { value: 'ratingDown', name: SetNativeTranslate(Translate.language, {}, 'rating_down') }
                            ]}
                            filterSet={'partnerFilters'}
                        ></FilterSelect>
                        : <></>
                    }
                </div>
            </div>

            <HorizontalContainer>
                {user.user.role === 'carrier' && ComponentFunction.Function === 'new' && Partner.groups.length > 0 ?
                    <>
                        {Partner.groups.filter(el => el.partners.length > 0).map(
                            group => <PartnerGroupItem key={group.dataValues.id} group={group} parent={'orders'} />
                        )}
                    </> :
                    <></>
                }
            </HorizontalContainer>

        </VerticalContainer>

    )
})

export default FilterAndSortComponentForServer