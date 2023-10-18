import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, ComponentFunctionContext, EquipmentTypeContext, FetcherContext, FilterAndSortContext, PartnerContext, SettingContext, TranslateContext, TransportTypeContext, UserContext } from '../..'
import PartnerGroupItem from '../partner/PartnerGroupItem'
import FilterInput from '../ui/form/FilterInput'
import { FilterSelect } from '../ui/form/FilterSelect'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import '../order/Order.css'
import './FilterAndSort.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

import filter_off from '../../assets/icons/filter_off.png';
import filter_off_dark from '../../assets/icons/filter_off_dark.png';
import { Select } from '../ui/form/Select'
import { CheckBoxContainer } from '../ui/form/CheckBoxContainer'
import { CheckBoxSection } from '../ui/form/CheckBoxSection'
import { FilterCheckBox } from '../ui/form/FilterCheckBox'
import { CardButton } from '../ui/button/CardButton'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const FilterAndSortComponentForServer = observer(({ parent, modalActive, setModalActive }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Adress } = useContext(AdressContext)
    const [timeFromOnFocus, setTimeFromOnFocus] = useState(false)
    const [timeToOnFocus, setTimeToOnFocus] = useState(false)
    const { Partner } = useContext(PartnerContext)
    const { user } = useContext(UserContext)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const { TransportType } = useContext(TransportTypeContext)
    const { EquipmentType } = useContext(EquipmentTypeContext)
    const { fetcher } = useContext(FetcherContext)
    const { height, width } = useWindowDimensions();



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
        if (parent === 'board') {
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, [e.target.name]: e.target.value }, 'transports')
            fetcher.setAdTransports(true)
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
            FilterAndSort.setPartnerFilters({ ...FilterAndSort.partnerFilters[ComponentFunction.Function], id: '' }, ComponentFunction.Function)
            FilterAndSort.setPartnerFilters({ ...FilterAndSort.partnerFilters[ComponentFunction.Function], partnerName: '' }, ComponentFunction.Function)
            FilterAndSort.setPartnerFilters({ ...FilterAndSort.partnerFilters[ComponentFunction.Function], selectedSort: '' }, ComponentFunction.Function)
        }
        if (parent === 'board') {
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, limit: 20 }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, searchString: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, selectedSort: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, city: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, type: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, side_type: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, load_capacity: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, thermo_bag: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, hydraulic_platform: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, side_loading: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, glass_stand: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, refrigerator_minus: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, refrigerator_plus: '' }, 'transports')
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, thermo_van: '' }, 'transports')
            fetcher.setAdTransports(true)
        }
    }

    return (
        <div className='filters_container'
            style={{ flexDirection: 'unset' }}>


            {parent === 'board' && <>

                <div className='vertical_filters_container'>

                    <div className='board_filters_selectors_container'>
                        <div className={`board_filters_selectors ${Setting.app_theme}`}>


                            <FilterSelect
                                fieldName='city'
                                inputHandler={inputHandler}
                                defaultvalue={SetNativeTranslate(Translate.language, {
                                    russian: ['Город'],
                                    english: ['City'],
                                    spanish: ['Ciudad'],
                                    turkish: ['Şehir'],
                                    сhinese: ['城市'],
                                    hindi: ['शहर'],
                                },)}
                                filterSet={'boardFilters'}
                                filterSection={'transports'}
                                sortOptions={[
                                    SetNativeTranslate(Translate.language, {
                                        russian: ['Все'],
                                        english: ['All'],
                                        spanish: ['Todo'],
                                        turkish: ['Tüm'],
                                        сhinese: ['全部'],
                                        hindi: ['सभी'],

                                    }), ...Adress.cities
                                ]}
                            ></FilterSelect>


                            <FilterSelect
                                fieldName='type'
                                inputHandler={inputHandler}
                                filterSet={'boardFilters'}
                                filterSection={'transports'}
                                defaultvalue={SetNativeTranslate(Translate.language, {
                                    russian: ['Способ доставки'],
                                    english: ['Way of delivery'],
                                    spanish: ['Método de entrega'],
                                    turkish: ['Teslimat yöntemi'],
                                    сhinese: ['运输方式'],
                                    hindi: ['डिलिवरी विधि'],

                                })}
                                sortOptions={
                                    FilterAndSort.boardFilters.transports.hydraulic_platform || FilterAndSort.boardFilters.transports.side_loading || FilterAndSort.boardFilters.transports.glass_stand || FilterAndSort.boardFilters.transports.load_capacity === '10' || FilterAndSort.boardFilters.transports.load_capacity === '20' || FilterAndSort.boardFilters.transports.load_capacity === '5' ? [...TransportType.types.slice(7, 8)] :
                                        FilterAndSort.boardFilters.transports.refrigerator_minus || FilterAndSort.boardFilters.transports.refrigerator_plus || FilterAndSort.boardFilters.transports.thermo_van || FilterAndSort.boardFilters.transports.load_capacity === '1.5' || FilterAndSort.boardFilters.transports.load_capacity === '3' ? [...TransportType.types.slice(5, 9)] :
                                            FilterAndSort.boardFilters.transports.thermo_bag ? [...TransportType.types.slice(1, 5)] :
                                                !FilterAndSort.boardFilters.transports.load_capacity && !FilterAndSort.boardFilters.transports.side_type ?
                                                    [...TransportType.types] :
                                                    FilterAndSort.boardFilters.transports.side_type ? [...TransportType.types.slice(7, 8)] :
                                                        FilterAndSort.boardFilters.transports.load_capacity === '1.5' || FilterAndSort.boardFilters.transports.load_capacity === '3' ?
                                                            [...TransportType.types.slice(6, 8)] : (FilterAndSort.boardFilters.transports.load_capacity === '5' || FilterAndSort.boardFilters.transports.load_capacity === '10' || FilterAndSort.boardFilters.transports.load_capacity === '20') ? [...TransportType.types.slice(7, 8)] : [...TransportType.types.slice(5, 10)]
                                }
                            ></FilterSelect>

                            {/* all module */}
                            {/* {!FilterAndSort.boardFilters.transports.type && */}
                            <>

                                {!FilterAndSort.boardFilters.transports.thermo_bag && FilterAndSort.boardFilters.transports.type !== 'walk' && FilterAndSort.boardFilters.transports.type !== 'car' && FilterAndSort.boardFilters.transports.type !== 'electric_scooter' && FilterAndSort.boardFilters.transports.type !== 'scooter' && FilterAndSort.boardFilters.transports.type !== 'bike' && FilterAndSort.boardFilters.transports.type !== 'combi' ?
                                    <FilterSelect
                                        fieldName='load_capacity'
                                        inputHandler={inputHandler}
                                        filterSet={'boardFilters'}
                                        filterSection={'transports'}
                                        defaultvalue={SetNativeTranslate(Translate.language, {
                                            russian: ['Грузоподъемность'],
                                            english: ['Load capacity'],
                                            spanish: ['Capacidad de carga'],
                                            turkish: ['Yükleme kapasitesi'],
                                            сhinese: ['承载量'],
                                            hindi: ['भार क्षमता'],

                                        })}
                                        sortOptions={[
                                            ...TransportType.load_capacities
                                        ]}
                                    /> : <></>
                                }

                                {!FilterAndSort.boardFilters.transports.thermo_bag && FilterAndSort.boardFilters.transports.type !== 'walk' && FilterAndSort.boardFilters.transports.type !== 'car' && FilterAndSort.boardFilters.transports.type !== 'electric_scooter' && FilterAndSort.boardFilters.transports.type !== 'scooter' && FilterAndSort.boardFilters.transports.type !== 'bike' && FilterAndSort.boardFilters.transports.type !== 'combi' ?
                                    <FilterSelect
                                        fieldName='side_type'
                                        inputHandler={inputHandler}
                                        filterSet={'boardFilters'}
                                        filterSection={'transports'}
                                        defaultvalue={SetNativeTranslate(Translate.language, {
                                            russian: ['Тип кузова'],
                                            english: ['Side type'],
                                            spanish: ['Tipo lateral'],
                                            turkish: ['Yan tip'],
                                            сhinese: ['侧面型'],
                                            hindi: ['पार्श्व प्रकार'],

                                        })}
                                        sortOptions={
                                            (FilterAndSort.boardFilters.transports.thermo_van || FilterAndSort.boardFilters.transports.refrigerator_minus || FilterAndSort.boardFilters.transports.refrigerator_plus ? [...TransportType.side_types.slice(2, 3)] : [...TransportType.side_types])
                                        }
                                    /> : <></>}

                                {(FilterAndSort.boardFilters.transports.thermo_bag ? [...EquipmentType.types.slice(0, 1)] :
                                    FilterAndSort.boardFilters.transports.side_loading || FilterAndSort.boardFilters.transports.glass_stand || FilterAndSort.boardFilters.transports.thermo_van || FilterAndSort.boardFilters.transports.refrigerator_minus || FilterAndSort.boardFilters.transports.refrigerator_plus || FilterAndSort.boardFilters.transports.hydraulic_platform ? [...EquipmentType.types.slice(1, 9)] :
                                        FilterAndSort.boardFilters.transports.load_capacity ? [...EquipmentType.types.slice(2, 7)] :
                                            !FilterAndSort.boardFilters.transports.type ? [...EquipmentType.types] :
                                                FilterAndSort.boardFilters.transports.type === 'walk' || FilterAndSort.boardFilters.transports.type === 'car' || FilterAndSort.boardFilters.transports.type === 'electric_scooter' || FilterAndSort.boardFilters.transports.type === 'scooter' || FilterAndSort.boardFilters.transports.type === 'bike' ? [...EquipmentType.types.slice(0, 1)] :
                                                    FilterAndSort.boardFilters.transports.type === 'combi' || FilterAndSort.boardFilters.transports.type === 'minibus' ? [...EquipmentType.types.slice(1, 4)] :
                                                        FilterAndSort.boardFilters.transports.type === 'truck' && FilterAndSort.boardFilters.transports.side_type !== 'hard_top' ? [...EquipmentType.types.slice(4, 7)] :
                                                            [...EquipmentType.types.slice(1, 7)])
                                    .map(equipment =>
                                        <FilterCheckBox
                                            key={equipment.id}
                                            fieldName={equipment.type}
                                            inputHandler={inputHandler}
                                            filterSet={'boardFilters'}
                                            filterSection={'transports'}
                                        />
                                    )}

                            </>
                            {/* } */}


                            <div className='board_filter_buttons_container'>
                                {width < 770 &&
                                    <CardButton
                                        onClick={() => { setModalActive(false) }}
                                    >{SetNativeTranslate(Translate.language, {
                                        russian: ['Показать'],
                                        english: ['Show'],
                                        spanish: ['Espectáculo'],
                                        turkish: ['Göstermek'],
                                        сhinese: ['展示'],
                                        hindi: ['दिखाओ'],

                                    })}</CardButton>
                                }


                                <CardButton
                                    onClick={() => {
                                        resetFilters()
                                        setModalActive(false)
                                    }}

                                >{SetNativeTranslate(Translate.language, {
                                    russian: ['Сбросить'],
                                    english: ['Reset'],
                                    spanish: ['Reiniciar'],
                                    turkish: ['Sıfırla'],
                                    сhinese: ['重置'],
                                    hindi: ['रीसेट'],

                                })}</CardButton>
                            </div>
                        </div>
                    </div>
                </div>

            </>}

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
                <img className={`filter_reset_icon`}
                    src={Setting.app_theme === 'light' ? filter_off : filter_off_dark}
                    onClick={resetFilters}
                />
                : <></>
            }
            {
                parent === 'partners' &&
                    (FilterAndSort.partnerFilters[ComponentFunction.Function].id !== '' ||
                        FilterAndSort.partnerFilters[ComponentFunction.Function].partnerName !== '' ||
                        FilterAndSort.partnerFilters[ComponentFunction.Function].selectedSort !== ''
                    ) ?
                    <img className={`filter_reset_icon`}
                        src={Setting.app_theme === 'light' ? filter_off : filter_off_dark}
                        onClick={resetFilters}
                    />
                    : <></>
            }
            <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
                <div className='scroll_content_container'>
                    {parent !== 'board' &&
                        <FilterInput
                            fieldName='id'
                            inputHandler={inputHandler}
                            placeHolder={SetNativeTranslate(Translate.language, {}, 'filter_id')}
                            type='number'
                            filterSet={parent === 'orders' ? 'filters' : parent === 'partners' ? 'partnerFilters' : ''}
                        />
                    }
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
                    {(user.user.role === 'customer' && (ComponentFunction.Function !== 'new' && ComponentFunction.Function !== 'postponed') && parent !== 'board') || (user.user.role === 'carrier' && parent !== 'board') ?
                        <FilterInput
                            fieldName='partnerName'
                            inputHandler={inputHandler}
                            placeHolder={SetNativeTranslate(Translate.language, {}, 'partner')}
                            type='text'
                            filterSet={parent === 'orders' ? 'filters' : parent === 'partners' ? 'partnerFilters' : ''}
                        /> : <></>}
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
                        <FilterSelect
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

            {
                parent !== 'board' &&
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
            }

        </div>

    )
})

export default FilterAndSortComponentForServer