import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FilterAndSortContext } from '../../..'
import { Select } from './Select'

export const FilterSelect = observer(({ fieldName, inputHandler, defaultvalue, sortOptions, filterSet }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)

    return (
        <Select
            value={FilterAndSort[filterSet][ComponentFunction.Function][fieldName]}
            onChange={e => inputHandler(e)}
            style={{ minWidth: '50px', fontSize: '10px' }}
            name={fieldName}
        >
            <option hidden>{defaultvalue}</option>
            {sortOptions.map(option => <option key = {option.name} value={option.value}>{option.name}</option>
            )}
        </Select>

    )
})
