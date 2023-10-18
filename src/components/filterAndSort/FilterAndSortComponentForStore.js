import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { FilterSelect } from '../ui/form/FilterSelect'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { ManagementContext, SettingContext, TranslateContext } from '../..'
import filter_off from '../../assets/icons/filter_off.png';
import filter_off_dark from '../../assets/icons/filter_off_dark.png';

const FilterAndSortComponentForStore = observer(() => {
    const { Translate } = useContext(TranslateContext)
    const { Management } = useContext(ManagementContext)
    const { Setting } = useContext(SettingContext)

    const inputHandler = (e) => { }

    return (
        <div className='filters_container'>
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
            <img className={`filter_reset_icon`}
                src={Setting.app_theme === 'light' ? filter_off : filter_off_dark}
            />

        </div>
    )
})

export default FilterAndSortComponentForStore