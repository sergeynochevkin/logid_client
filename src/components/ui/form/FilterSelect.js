import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, SettingContext } from '../../..'

export const FilterSelect = observer(({ fieldName, inputHandler, defaultvalue, sortOptions, filterSet }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const{Setting} = useContext(SettingContext)

    return (
        <select
            className={Setting.app_theme === 'light' ?'filter_select' : 'filter_select dark' }
            value={FilterAndSort[filterSet][ComponentFunction.Function][fieldName]}
            onChange={e => inputHandler(e)}
            name={fieldName}
        >
            <option hidden>{defaultvalue}</option>
            {sortOptions.map(option => <option key={option.name} value={option.value}>{option.name}</option>
            )}
        </select>

    )
})
