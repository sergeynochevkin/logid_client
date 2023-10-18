import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { FilterSelect } from '../ui/form/FilterSelect'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { ManagementContext, SettingContext, TranslateContext } from '../..'
import filter_off from '../../assets/icons/filter_off.png';
import filter_off_dark from '../../assets/icons/filter_off_dark.png';
import '../order/Order.css'
import '../management/Management.css'
import './FilterAndSort.css'
import search from '../../assets/icons/search.png'
import search_dark from '../../assets/icons/search_dark.png'
import arrow_back from '../../assets/icons/arrow_back.png'
import arrow_back_dark from '../../assets/icons/arrow_back_dark.png'

const FilterAndSortComponentForStore = observer(() => {
    const { Translate } = useContext(TranslateContext)
    const { Management } = useContext(ManagementContext)
    const { Setting } = useContext(SettingContext)
    const [searchActive, setSearchActive] = useState(false)


    const inputHandler = (e) => { }

    return (
        <div className='filters_row'>

            {!searchActive ?
                <img src={Setting.app_theme === 'light' ? search : search_dark} className='management_sync_icon' alt='search'
                    onClick={() => {
                        setSearchActive(true)
                    }}
                ></img> :
                <img src={Setting.app_theme === 'light' ? arrow_back : arrow_back_dark} className='management_sync_icon' alt='search'
                    onClick={() => {
                        setSearchActive(false)
                    }}
                ></img>}

            {searchActive && <input type='text' className={`management_search ${Setting.app_theme}`}></input>}

            {!searchActive &&
                <>
                    <FilterSelect
                        defaultvalue={SetNativeTranslate(Translate.language, {
                            russian: ['Город'],
                            english: ['City']
                        },)}
                        fieldName='city'
                        sortOptions={[

                        ]}
                        filterSet='managementStoreFilters'
                    />
                    <FilterSelect
                        defaultvalue={SetNativeTranslate(Translate.language, {
                            russian: ['Роль'],
                            english: ['Role']
                        },)}
                        fieldName='role'
                        sortOptions={[

                        ]}
                        filterSet='managementStoreFilters'
                    />
                    <FilterSelect
                        defaultvalue={SetNativeTranslate(Translate.language, {
                            russian: ['Группа доставки'],
                            english: ['Delivery group']
                        },)}
                        fieldName='delivery_group'
                        sortOptions={[

                        ]}
                        filterSet='managementStoreFilters'
                    />

                </>}
            <img className={`filter_reset_icon`}
                src={Setting.app_theme === 'light' ? filter_off : filter_off_dark}
            />

        </div>
    )
})

export default FilterAndSortComponentForStore