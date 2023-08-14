import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, SettingContext } from '../../..'


const FilterInput = observer(({ fieldName, inputHandler, placeHolder, type, onBlur, onFocus, filterSet, filterSection }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Setting } = useContext(SettingContext)

    return (
        <input
            className={Setting.app_theme === 'light' ? `filter_input ${filterSet === 'boardFilters' && 'board_search'}` : `filter_input dark ${filterSet === 'boardFilters' && 'board_search'}`}
            name={fieldName}
            value={filterSet !== 'boardFilters'  ?  FilterAndSort[filterSet][ComponentFunction.Function][fieldName] : FilterAndSort[filterSet][filterSection][fieldName]}
            onChange={e => inputHandler(e)}
            placeholder={placeHolder}
            type={type}
            onFocus={onFocus}
            onBlur={onBlur}
        ></input>
    )
})

export default FilterInput