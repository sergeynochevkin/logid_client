import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { ManagementContext } from '../../..'
import AnaliticsReportItem from './AnaliticsReportItem'
import '../../../App.css'

const AnaliticsReport = observer(() => {
    const { Management } = useContext(ManagementContext)
    const [items, setItems] = useState([])

    const sortItems = (a, b) => {
        if (a.count > b.count) {
            return -1
        } else {
            return 1
        }
    }
    const dataHandler = () => {

        let data = []
        for (const city of new Set(Management.users.filter(el => Management.report_roles.includes(el.role)).map(el => el.user_info.city))) {
            let obj = {
                id: undefined,
                name: '',
                count: 0
            }
            obj.id = data.length + 1
            obj.name = city
            obj.count = Management.users.filter(el => Management.report_roles.includes(el.role)).filter(el => el.user_info.city === city).length
            data.push(obj)
        }
        setItems([...data])
    }
    useEffect(() => {
        dataHandler()
    }, [])
    useEffect(() => {
        dataHandler()
    }, [Management.users])



    return (
        <div>
            {items.sort(sortItems).map(el => <AnaliticsReportItem key={el.id} oneItem={el} />)}
        </div>
    )
})

export default AnaliticsReport