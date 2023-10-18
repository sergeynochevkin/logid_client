import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { FilterSelect } from '../ui/form/FilterSelect'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { ManagementContext, TranslateContext } from '../..'

const FilterAndSortComponentForStore = observer(() => {
    const { Translate } = useContext(TranslateContext)
    const { Management } = useContext(ManagementContext)

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

        </div>
    )
})

export default FilterAndSortComponentForStore