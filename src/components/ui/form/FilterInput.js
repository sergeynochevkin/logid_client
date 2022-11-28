import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FilterAndSortContext } from '../../..'
import { Input } from './Input'


const FilterInput = observer(({ fieldName, inputHandler, placeHolder, type, onBlur, onFocus, filterSet }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)

    return (
        <Input
            name={fieldName}
            value={FilterAndSort[filterSet][ComponentFunction.Function][fieldName]}
            onChange={e => inputHandler(e)}
            placeholder={placeHolder}
            type={type}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{ minWidth: '50px', fontSize: '10px' }}
        ></Input>
    )
})

export default FilterInput