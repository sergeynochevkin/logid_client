import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, ManagementContext, SettingContext } from '../../..'

export const FilterSelect = observer(({ fieldName, inputHandler, defaultvalue, sortOptions, filterSet, filterSection }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const {Management} = useContext(ManagementContext)
    const { Setting } = useContext(SettingContext)
    const [store, setStore] = useState()


    return (
        <select
            className={Setting.app_theme === 'light' ? 'filter_select' : 'filter_select dark'}
            value={filterSet ==='managementStoreFilters' ? Management.filters.user[fieldName] :  filterSet !== 'boardFilters' ? FilterAndSort[filterSet][ComponentFunction.Function][fieldName] : FilterAndSort[filterSet][filterSection][fieldName]}
            onChange={e => inputHandler(e)}
            name={fieldName}
        >
            <option hidden>{defaultvalue}</option>
            {sortOptions.map(option => <option key={option.name} value={filterSet !== 'boardFilters' ? option.value : fieldName === 'load_capacity' ? option.capacity : option.type}>{fieldName === 'city' ||  fieldName==='role' || fieldName==='delivery_group' ? option : option.name}</option>
            )}
        </select>

    )
})
