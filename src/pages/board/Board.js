import React, { useEffect, useState } from 'react'
import './Board.css'
import BoardList from './BoardList'
import BoardFilter from './BoardFilter'
import BoardMainBanner from './BoardMainBanner'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { AdContext, FetcherContext, SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import BoardActionComponent from './BoardActionComponent'

const Board = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Ad } = useContext(AdContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const [modalActive, setModalActive] = useState(false)




    useEffect(() => {
        Ad.setTransportOption('board')
        fetcher.setAdTransports(true)
        // setInterval(() => {
        //     Ad.setTransportOption('')
        //     fetcher.setAdTransports(true)
        // }, 60000)
    }, [])

    return (
        <div className={`board_container ${Setting.app_theme}`}>
            <title>{SetNativeTranslate(Translate.language, {
                russian: ['Доска объявлений'],
                english: ['Bulletin board'],
                spanish: ['Tablón de anuncios'],
                turkish: ['Bülten tahtası'],
            })}</title>

            <BoardMainBanner />
            <div className={`board_content_container`}>
                <div className='board_left_container'>
                    <BoardFilter modalActive={modalActive} setModalActive={setModalActive} />
                    <BoardList />
                </div>
                <BoardActionComponent />
            </div>
        </div>
    )
})

export default Board