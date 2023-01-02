import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, SettingContext } from '../../..'


const FilterInput = observer(({ fieldName, inputHandler, placeHolder, type, onBlur, onFocus, filterSet }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const{Setting} = useContext(SettingContext)

    return (
        <input
               className={Setting.app_theme === 'light' ?'filter_input' : 'filter_input dark' }
            name={fieldName}
            value={FilterAndSort[filterSet][ComponentFunction.Function][fieldName]}
            onChange={e => inputHandler(e)}
            placeholder={placeHolder}
            type={type}
            onFocus={onFocus}
            onBlur={onBlur}
        ></input>
    )
})

export default FilterInput