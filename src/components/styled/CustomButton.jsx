import styled from "styled-components";

const CustomButton = styled.button`
    padding: 0.5rem 2rem;
    margin: 0.5rem;
    border-radius: 5%;
    font-weight: bold;
    font-size: 1.2rem;
  
    &:hover {
        background-color: gray;
        cursor: pointer;
    }
`

export default CustomButton;