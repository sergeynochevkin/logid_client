import React, { useEffect, useState } from 'react'
import './Board.css'
import BoardList from './BoardList'
import BoardFilter from './BoardFilter'
import BoardMainBanner from './BoardMainBanner'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { FetcherContext, SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import BoardActionComponent from './BoardActionComponent'

const Board = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const [modalActive, setModalActive] = useState(false)

    


    useEffect(() => {
        fetcher.setAdTransports(true)
        setInterval(() => {
            fetcher.setAdTransports(true)
        }, 60000)
    }, [])

    return (
        <div className={`board_container ${Setting.app_theme}`}>
            <title>{SetNativeTranslate(Translate.language, {
                russian: ['Доска объявлений'],
                english: ['Bulletin board']
            })}</title>

            <BoardMainBanner />
            <div className={`board_content_container`}>
                <div className='board_left_container'>
                    <BoardFilter modalActive={modalActive} setModalActive={setModalActive}/>
                    <BoardList />
                </div>
                <BoardActionComponent  />
            </div>
        </div>
    )
})

export default Board