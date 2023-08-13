import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, FetcherContext, FilterAndSortContext, SettingContext, TranslateContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'

export const FilterCheckBox = observer(({ fieldName, inputHandler, defaultvalue, sortOptions, filterSet, filterSection }) => {
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)

    return (
        <div className='filter_check_box_container'>

            <input
                type='checkbox'
                className={Setting.app_theme === 'light' ? 'filter_select' : 'filter_select dark'}
                value={FilterAndSort[filterSet][filterSection][fieldName]}
                onChange={e => {
                    if (FilterAndSort[filterSet][filterSection][fieldName] !== true) {
                        FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, [fieldName]: true }, 'transports')
                    } else {
                        FilterAndSort.setBoardFilters({ ...FilterAndSort.boardFilters.transports, [fieldName]: false }, 'transports')
                    }
                    fetcher.setAdTransports(true)
                }}
                name={fieldName}
            />
            <label className='filter_checkbox_label' >{SetNativeTranslate(Translate.language, {}, fieldName)} </label>
        </div>
    )
})

