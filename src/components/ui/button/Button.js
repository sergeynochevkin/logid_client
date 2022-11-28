import styled from 'styled-components'

export const Button = styled.button`
    height: 30px;
    background-color: black;
    color: white;
    border: black 1px solid;
    vertical-align: center;
    font-size: 12px;
    padding: 5px 20px 5px 20px;
    text-align: center;
    border-radius: 5px;
    cursor:pointer;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); 
    &:hover {
    color: black;
    background-color: rgb(255, 255, 255,0.5);
    box-shadow: none; 
  
}
&:disabled {
        background-color: lightgrey;
        border: lightgrey 1px solid;
        color: grey;    
        cursor:not-allowed
}
`
