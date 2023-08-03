import React from 'react'
import './Board.css'
import BoardList from './BoardList'
import BoardFilter from './BoardFilter'
import BoardMainBanner from './BoardMainBanner'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { SettingContext, TranslateContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const Board = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    return (
        <div className={`board_container ${Setting.app_theme}`}>
            <title>{SetNativeTranslate(Translate.language, {
                russian:['Доска объявлений'],
                english:['Bulletin board']
            })}</title>

            <BoardMainBanner />
            <div className={`board_content_container`}>
                <div className='board_left_container'>
                    <BoardFilter />
                    <BoardList />
                </div>
                <div className={`board_right_container ${Setting.app_theme}`}></div>
            </div>
        </div>
    )
})

export default Board