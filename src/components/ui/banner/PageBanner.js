import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
height:10vh;
width:100%;
display:flex;
justify-content:center;
align-items:center;
z-index:-1;
background-color: white;
`
const Slogan = styled.div`
font-size:42px;
color:black;
`

const PageBanner = ({ children, ...props }) => {

    return (
        <Container>
            <Slogan {...props}>{children}</Slogan>
        </Container>
    )
}

export default PageBanner