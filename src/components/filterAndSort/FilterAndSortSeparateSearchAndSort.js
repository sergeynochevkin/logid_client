import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import FilterInput from '../ui/form/FilterInput'
import { FilterSelect } from '../ui/form/FilterSelect'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { ComponentFunctionContext, FetcherContext, FilterAndSortContext, SettingContext, TranslateContext } from '../..'
import tune from '../../assets/icons/tune.png';
import tune_dark from '../../assets/icons/tune_dark.png';
import useWindowDimensions from '../../hooks/useWindowDimensions'
import Modal from '../ui/modal/Modal'
import FilterAndSortComponentForServer from './FilterAndSortComponentForServer'

const FilterAndSortSeparateSearchAndSort = observer(({ parent, modalActive, setModalActive }) => {
    const { fetcher } = useContext(FetcherContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Translate } = useContext(TranslateContext)
    const { Setting } = useContext(SettingContext)
    const { height, width } = useWindowDimensions();

    const inputHandler = (e) => {
        if (parent === 'board') {
            FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, [e.target.name]: e.target.value }, 'transports')
            fetcher.setAdTransports(true)
        }
    }

    return (
        <>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <FilterAndSortComponentForServer parent={'board'} modalActive={modalActive} setModalActive={setModalActive} />
            </Modal>
            <div className='board_filters_search_string_container'>
                <FilterInput
                    fieldName='searchString'
                    inputHandler={inputHandler}
                    filterSection={'transports'}
                    type='text'
                    filterSet={'boardFilters'}
                    placeHolder={SetNativeTranslate(Translate.language, {
                        russian: [`Имя, или часть текста объявления`],
                        english: [`Name, or part of the ad text`]
                    })}
                />

                <FilterSelect
                    fieldName='selectedSort'
                    inputHandler={inputHandler}
                    defaultvalue={SetNativeTranslate(Translate.language, {}, 'sorting')}
                    filterSet={'boardFilters'}
                    filterSection={'transports'}
                    sortOptions={[
                        { type: 'default', name: SetNativeTranslate(Translate.language, {}, 'default') },
                        { type: 'name', name: SetNativeTranslate(Translate.language, {}, 'by_partner_name') },
                        { type: 'ratingUp', name: SetNativeTranslate(Translate.language, {}, 'rating_up') },
                        { type: 'ratingDown', name: SetNativeTranslate(Translate.language, {}, 'rating_down') }
                    ]}
                ></FilterSelect>
                {width < 770 &&
                    <img className='board_filter_icon' src={Setting.app_theme === 'light' ? tune : tune_dark}
                        onClick={() => {
                            modalActive && setModalActive(false)
                            !modalActive && setModalActive(true)
                        }}
                    ></img>
                }
            </div>
        </>

    )
})

export default FilterAndSortSeparateSearchAndSort