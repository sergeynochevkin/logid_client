import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FilterAndSortContext, SettingContext, TranslateContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'

export const FilterCheckBox = observer(({ fieldName, inputHandler, defaultvalue, sortOptions, filterSet, filterSection }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    return (
        <div className='filter_check_box_container'>

            <input
                type='checkbox'
                className={Setting.app_theme === 'light' ? 'filter_select' : 'filter_select dark'}
                value={filterSet !== 'boardFilters' ? FilterAndSort[filterSet][ComponentFunction.Function][fieldName] : FilterAndSort[filterSet][filterSection][fieldName]}
                onChange={e => {
                    e.target.value ? e.target.value = false : e.target.value = true
                    inputHandler(e)
                }}
                name={fieldName}
            />
            <label className='filter_checkbox_label' for={fieldName}>{SetNativeTranslate(Translate.language, {}, fieldName)} </label>
        </div>
    )
})


// SetNativeTranslate(Translate.language, {}, equipment.type)