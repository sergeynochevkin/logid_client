import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import styled from 'styled-components'
import { SettingContext } from '../../..';
import image from '../../../assets/busNavi.jpg';
import { SetTranslate } from '../../../modules/SetTranslate';


const HalfTwoContainer = styled.div`
height:50vh;
width:100%;
background-image:url(${image});
background-position:center;
background-size:contain;
background-repeat:no-repeat;
z-index:2;
max-width:700px;
`
const MainBanner = observer(() => {
const {Setting} = useContext(SettingContext)

    return (
        <div className={'main_banner_container'}>
            <div className={'main_nbanner_half_1_container'}>
                <div className={Setting.app_theme === 'light' ?  'main_banner_slogan' : 'main_banner_slogan main_banner_slogan_dark'}>{SetTranslate(Translate.language,'main_slogan')}</div>
            </div>
            <HalfTwoContainer className={'main_nbanner_half_2_container'}>
            </HalfTwoContainer>
        </div>
    )
})

export default MainBanner