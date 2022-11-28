import React from 'react'
import styled from 'styled-components'
import image from '../../../assets/busNavi.jpg';

const Container = styled.div`
min-height:50vh;
width:100%;
display:flex;
justify-content:center;
align-items:center;
z-index:-1;
flex-wrap:wrap;
gap:20px;
`
const HalfOneContainer = styled.div`
height:50vh;
width:100%;
display:flex;
justify-content:center;
align-items:center;
z-index:-1;
max-width:700px;
max-height:30vh;
`
const HalfTwoContainer = styled.div`
height:50vh;
width:100%;
background-image:url(${image});
background-position:center;
background-size:contain;
background-repeat:no-repeat;
z-index:-1;
max-width:700px;
`
const Slogan = styled.div`
font-size:52px;
color:black;
text-align:center;
`

const MainBanner = () => {
    return (
        <Container>
            <HalfOneContainer>
                <Slogan>Здесь встречаются заказчики и перевозчики</Slogan>
            </HalfOneContainer>
            <HalfTwoContainer></HalfTwoContainer>



        </Container>
    )
}

export default MainBanner