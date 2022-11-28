import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
Width:100%;
height:400px;
background-color:black;
color:white;
display:flex;

`
const Logo = styled.div`
color:white;
padding-left:50px;
padding-top:50px;
font-weight:bold;
`

const Footer = () => {
  return (
    <Container>
      <Logo>logid</Logo>
    </Container>
  )
}

export default Footer