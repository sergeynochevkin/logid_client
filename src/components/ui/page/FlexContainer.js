import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { LoadingContext } from '../../..'
import Loader from '../loader/Loader'

const Container = styled.div`
padding:10px;
display:flex;
flex-direction:column;
gap:10px;
justify-content:center;
flex-wrap:wrap;
`
const FlexContainer = observer(({ children }) => {
  const { loading } = useContext(LoadingContext)
  return (
    <>
      {loading.loading === false

        ?

        <Container>{children}</Container>

        :

        <Loader />
        
        }
    </>
  )
})

export default FlexContainer
