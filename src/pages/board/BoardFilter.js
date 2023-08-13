import React from 'react'
import { Input } from '../../components/ui/form/Input'
import { Select } from '../../components/ui/form/Select'
import FilterAndSortComponentForServer from '../../components/filterAndSort/FilterAndSortComponentForServer'
import FilterAndSortSeparateSearchAndSort from '../../components/filterAndSort/FilterAndSortSeparateSearchAndSort'

const BoardFilter = ({modalActive, setModalActive}) => {
    return (
        <div className='board_filter_container'>
            <FilterAndSortSeparateSearchAndSort parent={'board'} modalActive={modalActive} setModalActive={setModalActive} />
        </div>
    )
}

export default BoardFilter