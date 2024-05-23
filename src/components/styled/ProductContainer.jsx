import styled from "styled-components";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 20%;
  padding: 2rem 0.5rem;
  border: 5px solid gray;
  position: relative;
  margin-bottom: 1rem;
  
  input {
    position: absolute;
    left: 25px;
    top: 25px;
  }
  
  p {
    text-align: center;
    font-weight: 400;
    font-size: 1.5rem;
    margin: 0.2rem;
  }
`

export default ProductContainer;