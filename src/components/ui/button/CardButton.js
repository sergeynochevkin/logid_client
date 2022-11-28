import styled from 'styled-components'

export const CardButton = styled.button`    
    background-color: transparent;
    color: black;
    border: none;
    vertical-align: center;
    font-size: 10px;
    font-weight:bold;
    padding: 0px 5px 0px 5px;
    text-align: center;
    border-radius: 5px;
    cursor:pointer;
    &:hover {
        color: grey;
}
&:disabled {
        color: grey;    
        cursor:not-allowed
}
`
