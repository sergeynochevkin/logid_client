import React from 'react'
import styled from 'styled-components';
import loader from '../../../assets/loader.gif';

const LoaderImage = styled.img`
width:150px;
height:150px;
margin-top:50px;
`

const Loader = () => {
    return (
        <div>
                    <LoaderImage src={loader}></LoaderImage>
        </div>
    )
}

export default Loader